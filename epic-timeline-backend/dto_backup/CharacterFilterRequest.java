package com.epicstuff.dto;

import com.epicstuff.enums.CharacterType;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class CharacterFilterRequest {
    // // [DONE] Character type enum filter
    private CharacterType characterType;
    
    // // [DONE] Boolean flag filters
    private Boolean isAlive;
    private Boolean isImmortal;
    private Boolean hasSpokenLines;
    private Boolean isTitleCharacter;
    private Boolean isAntagonist;
    private Boolean isProtagonist;
    private Boolean isHistoricalFigure;
    
    // // [DONE] Array content filters
    private String role;
    private String trait;
    private String ability;
    private String weakness;
    private String allegiance;
    private String title;
    private String epithet;
    private String weapon;
    
    // // [DONE] Relationship filters
    private Long songId;
    private Long locationId;
    private Long sagaId;
    
    // // [DONE] Search filter
    private String search;
    
    // // [DONE] Physical description filters
    private String hairColor;
    private String eyeColor;
    private String build;
    
    // // [DONE] Voice actor filter
    private String voiceActorName;
    
    // // [DONE] Background filters
    private String birthPlace;
    private String familyOrigin;
}