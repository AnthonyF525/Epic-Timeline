package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class CharacterRelationshipResponse {
    private Long id;
    private Long relatedCharacterId;
    private String relatedCharacterName;
    private String relationshipType;
    private String description;
}