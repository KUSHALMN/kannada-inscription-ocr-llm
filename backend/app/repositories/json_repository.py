import os
import json
import uuid
import asyncio
import re
from datetime import datetime
from typing import List, Optional
from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.core.exceptions import ResourceNotFoundException, EpigraphyException
from backend.app.repositories.base import (
    InscriptionRepository,
    ActivityRepository,
    ScriptRepository,
    LanguageRepository,
)
from backend.app.schemas import (
    InscriptionRecord,
    InscriptionFilter,
    ResearchActivityItem,
    ScriptClassMetadata,
    ScriptClassId,
    SourceLanguageMetadata,
    SourceLanguageId,
)


class JsonFileInscriptionRepository(InscriptionRepository):
    """
    JSON File implementation of InscriptionRepository.
    Loads data/inscriptions.json at startup into memory.
    Writes back atomically (write temp file then os.replace) under an asyncio.Lock.
    """

    def __init__(self, file_path: Optional[str] = None):
        self.file_path = file_path or os.path.join(settings.DATA_DIR, "inscriptions.json")
        self._lock = asyncio.Lock()
        self._inscriptions: List[InscriptionRecord] = []
        self._load()

    def _load(self) -> None:
        """Loads records from the JSON file into memory."""
        if os.path.exists(self.file_path):
            with open(self.file_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
                self._inscriptions = [InscriptionRecord.model_validate(item) for item in raw_data]
            logger.info("Loaded %d inscription records from %s", len(self._inscriptions), self.file_path)
        else:
            self._inscriptions = []
            logger.warning("Inscription file %s does not exist; initialized with empty dataset.", self.file_path)

    async def _write_atomic(self) -> None:
        """
        Writes self._inscriptions back to self.file_path atomically:
        writes to a unique temporary file in the same directory, flushes and syncs to disk,
        and then calls os.replace.
        """
        dir_name = os.path.dirname(os.path.abspath(self.file_path))
        os.makedirs(dir_name, exist_ok=True)
        temp_file = os.path.join(dir_name, f"inscriptions_{uuid.uuid4().hex}.tmp")

        data = [item.model_dump(by_alias=True) for item in self._inscriptions]

        # Perform atomic disk write
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.flush()
            os.fsync(f.fileno())

        os.replace(temp_file, self.file_path)
        logger.debug("Atomically persisted %d inscription records to %s", len(self._inscriptions), self.file_path)

    @staticmethod
    def _extract_year(rec: InscriptionRecord) -> float:
        """Extracts approximate chronological year for sorting steles."""
        text = f"{rec.historical_context.approximate_date} {rec.historical_context.century} {rec.historical_context.regnal_period}"
        is_bce = "BCE" in text.upper() or "BC" in text.upper()
        numbers = re.findall(r"\d+", text)
        if not numbers:
            return 0.0
        val = float(numbers[0])
        # If single-digit century number like 5 in '5th Century'
        if val <= 30 and ("CENTURY" in text.upper() or "C." in text.upper()) and len(numbers) == 1:
            val = (val - 1) * 100 + 50
        return -val if is_bce else val

    @staticmethod
    def _parse_last_updated(date_str: str) -> float:
        """Parses human date string or ISO timestamp into timestamp float."""
        try:
            return datetime.strptime(date_str, "%d %b %Y").timestamp()
        except Exception:
            try:
                return datetime.fromisoformat(date_str).timestamp()
            except Exception:
                return 0.0

    @staticmethod
    def _matches_search(rec: InscriptionRecord, query: str) -> bool:
        """
        Case-insensitive search across title, kannadaTitle, dynasty, ruler,
        village, recognizedText, and glossary terms.
        """
        q = query.lower().strip()
        if not q:
            return True

        if q in rec.title.lower():
            return True
        if q in rec.kannada_title.lower():
            return True
        if q in rec.historical_context.dynasty.lower():
            return True
        if q in rec.historical_context.ruler.lower():
            return True
        if q in rec.historical_context.find_spot.village.lower():
            return True
        if q in rec.transcription.recognized_text.lower():
            return True

        for item in rec.translation.glossary:
            if (
                q in item.term.lower()
                or q in item.iast.lower()
                or q in item.modern_kannada_equivalent.lower()
                or q in item.english_definition.lower()
            ):
                return True

        return False

    async def list(self, filter_params: Optional[InscriptionFilter] = None) -> List[InscriptionRecord]:
        async with self._lock:
            result = list(self._inscriptions)

        if not filter_params:
            return result

        if filter_params.script_class and filter_params.script_class != "all":
            val = filter_params.script_class.value if hasattr(filter_params.script_class, "value") else str(filter_params.script_class)
            result = [x for x in result if x.script_class.value == val]

        if filter_params.source_language and filter_params.source_language != "all":
            val = filter_params.source_language.value if hasattr(filter_params.source_language, "value") else str(filter_params.source_language)
            result = [x for x in result if x.source_language.value == val]

        if filter_params.substrate and filter_params.substrate != "all":
            val = filter_params.substrate.value if hasattr(filter_params.substrate, "value") else str(filter_params.substrate)
            result = [x for x in result if x.substrate.value == val]

        if filter_params.review_status and filter_params.review_status != "all":
            val = filter_params.review_status.value if hasattr(filter_params.review_status, "value") else str(filter_params.review_status)
            result = [x for x in result if x.review_status.value == val]

        if filter_params.historical_period and filter_params.historical_period != "all":
            hp = filter_params.historical_period.lower().strip()
            result = [
                x for x in result
                if hp in x.historical_context.century.lower()
                or hp in x.historical_context.approximate_date.lower()
                or hp in x.historical_context.regnal_period.lower()
            ]

        if filter_params.search_query and filter_params.search_query.strip():
            result = [x for x in result if self._matches_search(x, filter_params.search_query)]

        if filter_params.sort_by:
            sort_val = filter_params.sort_by.value if hasattr(filter_params.sort_by, "value") else str(filter_params.sort_by)
            if sort_val == "date_asc":
                result.sort(key=self._extract_year)
            elif sort_val == "date_desc":
                result.sort(key=self._extract_year, reverse=True)
            elif sort_val == "title":
                result.sort(key=lambda x: x.title.lower())
            elif sort_val == "confidence":
                result.sort(key=lambda x: x.transcription.script_confidence, reverse=True)
            elif sort_val == "recently_updated":
                result.sort(key=lambda x: self._parse_last_updated(x.last_updated), reverse=True)

        return result

    async def get(self, inscription_id: str) -> Optional[InscriptionRecord]:
        async with self._lock:
            for ins in self._inscriptions:
                if ins.id == inscription_id:
                    return ins
            return None

    async def create(self, record: InscriptionRecord) -> InscriptionRecord:
        async with self._lock:
            for existing in self._inscriptions:
                if existing.id == record.id:
                    raise EpigraphyException(
                        f"Inscription with ID '{record.id}' already exists.",
                        code="DUPLICATE_ID",
                        status_code=409,
                    )
            self._inscriptions.insert(0, record)
            await self._write_atomic()
            logger.info("Created inscription record %s", record.id)
            return record

    async def update(self, inscription_id: str, record: InscriptionRecord) -> InscriptionRecord:
        async with self._lock:
            found_idx = None
            for idx, existing in enumerate(self._inscriptions):
                if existing.id == inscription_id:
                    found_idx = idx
                    break

            if found_idx is None:
                raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found for update.")

            self._inscriptions[found_idx] = record
            await self._write_atomic()
            logger.info("Updated inscription record %s", inscription_id)
            return record


class JsonFileActivityRepository(ActivityRepository):
    """
    JSON File implementation of ActivityRepository.
    Loads data/activity.json at startup into memory.
    Writes back atomically under an asyncio.Lock.
    """

    def __init__(self, file_path: Optional[str] = None):
        self.file_path = file_path or os.path.join(settings.DATA_DIR, "activity.json")
        self._lock = asyncio.Lock()
        self._activities: List[ResearchActivityItem] = []
        self._load()

    def _load(self) -> None:
        if os.path.exists(self.file_path):
            with open(self.file_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
                self._activities = [ResearchActivityItem.model_validate(item) for item in raw_data]
            logger.info("Loaded %d activity items from %s", len(self._activities), self.file_path)
        else:
            self._activities = []
            logger.warning("Activity file %s does not exist; initialized empty.", self.file_path)

    async def _write_atomic(self) -> None:
        dir_name = os.path.dirname(os.path.abspath(self.file_path))
        os.makedirs(dir_name, exist_ok=True)
        temp_file = os.path.join(dir_name, f"activity_{uuid.uuid4().hex}.tmp")

        data = [item.model_dump(by_alias=True) for item in self._activities]

        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.flush()
            os.fsync(f.fileno())

        os.replace(temp_file, self.file_path)

    async def list(self, limit: int = 10) -> List[ResearchActivityItem]:
        async with self._lock:
            return list(self._activities[:limit])

    async def add(self, item: ResearchActivityItem) -> ResearchActivityItem:
        async with self._lock:
            self._activities.insert(0, item)
            await self._write_atomic()
            logger.info("Recorded research activity: %s (%s)", item.id, item.type)
            return item


class JsonFileScriptRepository(ScriptRepository):
    """
    JSON File implementation of ScriptRepository.
    Loads data/scripts.json at startup into memory.
    """

    def __init__(self, file_path: Optional[str] = None):
        self.file_path = file_path or os.path.join(settings.DATA_DIR, "scripts.json")
        self._scripts: List[ScriptClassMetadata] = []
        self._load()

    def _load(self) -> None:
        if os.path.exists(self.file_path):
            with open(self.file_path, "r", encoding="utf-8") as f:
                raw = json.load(f)
                self._scripts = [ScriptClassMetadata.model_validate(item) for item in raw]
            self._scripts.sort(key=lambda x: x.order_index if x.order_index is not None else 99)
            logger.info("Loaded %d script classes from %s", len(self._scripts), self.file_path)
        else:
            self._scripts = []

    async def list(self) -> List[ScriptClassMetadata]:
        return list(self._scripts)

    async def get(self, script_id: ScriptClassId) -> Optional[ScriptClassMetadata]:
        for s in self._scripts:
            if s.id == script_id:
                return s
        return None


class JsonFileLanguageRepository(LanguageRepository):
    """
    JSON File implementation of LanguageRepository.
    Loads data/languages.json at startup into memory.
    """

    def __init__(self, file_path: Optional[str] = None):
        self.file_path = file_path or os.path.join(settings.DATA_DIR, "languages.json")
        self._languages: List[SourceLanguageMetadata] = []
        self._load()

    def _load(self) -> None:
        if os.path.exists(self.file_path):
            with open(self.file_path, "r", encoding="utf-8") as f:
                raw = json.load(f)
                self._languages = [SourceLanguageMetadata.model_validate(item) for item in raw]
            logger.info("Loaded %d languages from %s", len(self._languages), self.file_path)
        else:
            self._languages = []

    async def list(self) -> List[SourceLanguageMetadata]:
        return list(self._languages)

    async def get(self, language_id: SourceLanguageId) -> Optional[SourceLanguageMetadata]:
        for l in self._languages:
            if l.id == language_id:
                return l
        return None
