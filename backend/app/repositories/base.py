from abc import ABC, abstractmethod
from typing import List, Optional
from backend.app.schemas import (
    InscriptionRecord,
    InscriptionFilter,
    ResearchActivityItem,
    ScriptClassMetadata,
    ScriptClassId,
    SourceLanguageMetadata,
    SourceLanguageId,
)


class InscriptionRepository(ABC):
    """
    Abstract Inscription Repository interface.
    Decoupled from storage implementation (JSON file, SQLite, PostgreSQL).
    """

    @abstractmethod
    async def list(self, filter_params: Optional[InscriptionFilter] = None) -> List[InscriptionRecord]:
        """List and filter inscription records."""
        pass

    @abstractmethod
    async def get(self, inscription_id: str) -> Optional[InscriptionRecord]:
        """Get an inscription record by its unique ID."""
        pass

    @abstractmethod
    async def create(self, record: InscriptionRecord) -> InscriptionRecord:
        """Create and persist a new inscription record."""
        pass

    @abstractmethod
    async def update(self, inscription_id: str, record: InscriptionRecord) -> InscriptionRecord:
        """Update an existing inscription record."""
        pass


class ActivityRepository(ABC):
    """
    Abstract Activity Repository interface for logging research audit events.
    """

    @abstractmethod
    async def list(self, limit: int = 10) -> List[ResearchActivityItem]:
        """Retrieve recent activity items up to limit."""
        pass

    @abstractmethod
    async def add(self, item: ResearchActivityItem) -> ResearchActivityItem:
        """Record and persist a research activity item."""
        pass


class ScriptRepository(ABC):
    """
    Abstract Script Repository interface for the 10 historical script classes.
    """

    @abstractmethod
    async def list(self) -> List[ScriptClassMetadata]:
        """List all 10 paleographical script eras."""
        pass

    @abstractmethod
    async def get(self, script_id: ScriptClassId) -> Optional[ScriptClassMetadata]:
        """Get script metadata by ID."""
        pass


class LanguageRepository(ABC):
    """
    Abstract Language Repository interface for the 6 epigraphical languages.
    """

    @abstractmethod
    async def list(self) -> List[SourceLanguageMetadata]:
        """List all 6 historical languages."""
        pass

    @abstractmethod
    async def get(self, language_id: SourceLanguageId) -> Optional[SourceLanguageMetadata]:
        """Get source language metadata by ID."""
        pass
