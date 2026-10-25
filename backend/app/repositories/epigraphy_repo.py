import os
import json
import threading
from typing import List, Optional, Dict
from datetime import datetime
from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.core.exceptions import ResourceNotFoundException
from backend.app.schemas import (
    ScriptClassMetadata,
    SourceLanguageMetadata,
    InscriptionRecord,
    ResearchActivityItem,
    ArchaicGlossaryItem,
    InscriptionFilter,
    ScriptClassId,
    SourceLanguageId,
)


class EpigraphyRepository:
    """
    In-memory, persistent file-backed repository for epigraphical records,
    historical scripts, source languages, research activities, and archaic lexicon.
    Features O(1) indexed hash lookups for instant dossier retrieval.
    """
    def __init__(self, data_dir: Optional[str] = None):
        self.data_dir = data_dir or settings.DATA_DIR
        self._lock = threading.RLock()
        self._scripts: List[ScriptClassMetadata] = []
        self._languages: List[SourceLanguageMetadata] = []
        self._inscriptions: List[InscriptionRecord] = []
        self._inscription_map: Dict[str, InscriptionRecord] = {}
        self._activity: List[ResearchActivityItem] = []
        self._lexicon: List[ArchaicGlossaryItem] = []
        self._load_all()

    def _load_all(self):
        with self._lock:
            scripts_path = os.path.join(self.data_dir, "scripts.json")
            if os.path.exists(scripts_path):
                with open(scripts_path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                    self._scripts = [ScriptClassMetadata.model_validate(x) for x in raw]
                logger.info("Loaded %d script classes from %s", len(self._scripts), scripts_path)

            langs_path = os.path.join(self.data_dir, "languages.json")
            if os.path.exists(langs_path):
                with open(langs_path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                    self._languages = [SourceLanguageMetadata.model_validate(x) for x in raw]
                logger.info("Loaded %d source languages from %s", len(self._languages), langs_path)

            ins_path = os.path.join(self.data_dir, "inscriptions.json")
            if os.path.exists(ins_path):
                with open(ins_path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                    self._inscriptions = [InscriptionRecord.model_validate(x) for x in raw]
                    self._inscription_map = {x.id: x for x in self._inscriptions}
                logger.info("Loaded %d inscriptions into memory and index map from %s", len(self._inscriptions), ins_path)

            act_path = os.path.join(self.data_dir, "activity.json")
            if os.path.exists(act_path):
                with open(act_path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                    self._activity = [ResearchActivityItem.model_validate(x) for x in raw]
                logger.info("Loaded %d research activity items from %s", len(self._activity), act_path)

            lex_path = os.path.join(self.data_dir, "lexicon.json")
            if os.path.exists(lex_path):
                with open(lex_path, "r", encoding="utf-8") as f:
                    raw = json.load(f)
                    self._lexicon = [ArchaicGlossaryItem.model_validate(x) for x in raw]
                logger.info("Loaded %d lexicon entries from %s", len(self._lexicon), lex_path)

    def get_scripts(self) -> List[ScriptClassMetadata]:
        with self._lock:
            return list(self._scripts)

    def get_script_by_id(self, script_id: ScriptClassId) -> ScriptClassMetadata:
        with self._lock:
            for s in self._scripts:
                if s.id == script_id:
                    return s
            raise ResourceNotFoundException(f"Script epoch '{script_id}' not found.")

    def get_languages(self) -> List[SourceLanguageMetadata]:
        with self._lock:
            return list(self._languages)

    def get_language_by_id(self, language_id: SourceLanguageId) -> SourceLanguageMetadata:
        with self._lock:
            for l in self._languages:
                if l.id == language_id:
                    return l
            raise ResourceNotFoundException(f"Source language '{language_id}' not found.")

    def get_inscriptions(self, filter_params: Optional[InscriptionFilter] = None) -> List[InscriptionRecord]:
        with self._lock:
            result = list(self._inscriptions)

        if not filter_params:
            return result

        # Filter by scriptClass
        if filter_params.script_class and filter_params.script_class != "all":
            result = [x for x in result if x.script_class.value == filter_params.script_class]

        # Filter by sourceLanguage
        if filter_params.source_language and filter_params.source_language != "all":
            result = [x for x in result if x.source_language.value == filter_params.source_language]

        # Filter by substrate
        if filter_params.substrate and filter_params.substrate != "all":
            result = [x for x in result if x.substrate.value == filter_params.substrate]

        # Filter by reviewStatus
        if filter_params.review_status and filter_params.review_status != "all":
            result = [x for x in result if x.review_status.value == filter_params.review_status]

        # Filter by historicalPeriod / century
        if filter_params.historical_period and filter_params.historical_period != "all":
            hp = filter_params.historical_period.lower()
            result = [
                x for x in result
                if hp in x.historical_context.century.lower() or hp in x.historical_context.approximate_date.lower()
            ]

        # Free-text search query across title, kannadaTitle, dynasty, ruler, accessionNumber, findSpot
        if filter_params.search_query and filter_params.search_query.strip():
            q = filter_params.search_query.lower().strip()
            result = [
                x for x in result
                if q in x.title.lower()
                or q in x.kannada_title.lower()
                or q in x.accession_number.lower()
                or q in x.historical_context.dynasty.lower()
                or q in x.historical_context.ruler.lower()
                or q in x.historical_context.find_spot.village.lower()
                or q in x.historical_context.find_spot.district.lower()
            ]

        # Sort criteria
        if filter_params.sort_by:
            if filter_params.sort_by == "title_asc":
                result.sort(key=lambda x: x.title.lower())
            elif filter_params.sort_by == "title_desc":
                result.sort(key=lambda x: x.title.lower(), reverse=True)
            elif filter_params.sort_by == "recently_updated":
                result.sort(key=lambda x: x.last_updated, reverse=True)
            elif filter_params.sort_by == "chronological_asc":
                result.sort(key=lambda x: x.id)
            elif filter_params.sort_by == "chronological_desc":
                result.sort(key=lambda x: x.id, reverse=True)

        return result

    def get_inscription_by_id(self, inscription_id: str) -> InscriptionRecord:
        with self._lock:
            record = self._inscription_map.get(inscription_id)
            if record:
                return record
            raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")

    def create_inscription(self, record: InscriptionRecord) -> InscriptionRecord:
        with self._lock:
            self._inscriptions.insert(0, record)
            self._inscription_map[record.id] = record
            logger.info("Created new inscription record: %s (%s)", record.id, record.accession_number)
            return record

    def update_inscription(self, inscription_id: str, updated_record: InscriptionRecord) -> InscriptionRecord:
        with self._lock:
            if inscription_id not in self._inscription_map:
                raise ResourceNotFoundException(f"Inscription '{inscription_id}' not found for update.")
            for idx, ins in enumerate(self._inscriptions):
                if ins.id == inscription_id:
                    self._inscriptions[idx] = updated_record
                    break
            self._inscription_map[inscription_id] = updated_record
            logger.info("Updated inscription record in repository and index: %s", inscription_id)
            return updated_record

    def get_recent_activity(self, limit: int = 10) -> List[ResearchActivityItem]:
        with self._lock:
            return list(self._activity[:limit])

    def add_activity(self, item: ResearchActivityItem):
        with self._lock:
            self._activity.insert(0, item)

    def get_lexicon(self, query: Optional[str] = None) -> List[ArchaicGlossaryItem]:
        with self._lock:
            if not query or not query.strip():
                return list(self._lexicon)
            q = query.lower().strip()
            return [
                item for item in self._lexicon
                if q in item.term.lower() or q in item.iast.lower() or q in item.modern_kannada_equivalent.lower() or q in item.english_definition.lower()
            ]


# Singleton instance
epigraphy_repository = EpigraphyRepository()
