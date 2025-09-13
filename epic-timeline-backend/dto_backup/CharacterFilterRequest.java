package com.epicstuff.dto;

import com.epicstuff.enums.CharacterType;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class CharacterFilterRequest {
    // ✅ Character type enum filter
    private CharacterType characterType;
    
    // ✅ Boolean flag filters
    private Boolean isAlive;
    private Boolean isImmortal;
    private Boolean hasSpokenLines;
    private Boolean isTitleCharacter;
    private Boolean isAntagonist;
    private Boolean isProtagonist;
    private Boolean isHistoricalFigure;
    
    // ✅ Array content filters
    private String role;
    private String trait;
    private String ability;
    private String weakness;
    private String allegiance;
    private String title;
    private String epithet;
    private String weapon;
    
    // ✅ Relationship filters
    private Long songId;
    private Long locationId;
    private Long sagaId;
    
    // ✅ Search filter
    private String search;
    
    // ✅ Physical description filters
    private String hairColor;
    private String eyeColor;
    private String build;
    
    // ✅ Voice actor filter
    private String voiceActorName;
    
    // ✅ Background filters
    private String birthPlace;
    private String familyOrigin;
}