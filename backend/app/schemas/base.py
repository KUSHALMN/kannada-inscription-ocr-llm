from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """
    Base Pydantic v2 model configuring camelCase alias generation
    to mirror frontend TypeScript contracts exactly.
    Allows population by both snake_case attribute and camelCase alias.
    """
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
        validate_assignment=True,
    )
