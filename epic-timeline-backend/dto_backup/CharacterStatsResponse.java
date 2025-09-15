package com.epicstuff.dto;

import com.epicstuff.enums.CharacterType;
import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class CharacterStatsResponse {
    private Long characterId;
    private String characterName;
    
    // // [DONE] Character type enum
    private CharacterType characterType;
    
    // // [DONE] Boolean flag statistics
    private Boolean isAlive;
    private Boolean isImmortal;
    private Boolean hasSpokenLines;
    private Boolean isTitleCharacter;
    private Boolean isAntagonist;
    private Boolean isProtagonist;
    private Boolean isHistoricalFigure;
    
    // // [DONE] Relationship counts
    private Integer songCount;
    private Integer locationCount;
    private Integer sagaCount;
    private Integer relationshipCount;
    
    // // [DONE] Array statistics
    private Integer roleCount;
    private Integer traitCount;
    private Integer abilityCount;
    private Integer weaknessCount;
    private Integer allegianceCount;
    private Integer alternativeNameCount;
    private Integer titleCount;
    private Integer epithetCount;
    private Integer weaponCount;
    private Integer memorableQuoteCount;
    
    // // [DONE] Array content (for analysis)
    private List<String> allRoles;
    private List<String> allTraits;
    private List<String> allAbilities;
    private List<String> allWeaknesses;
    private List<String> allAllegiances;
    private Map<String, Long> roleFrequency;
    private Map<String, Long> traitFrequency;
    
    // // [DONE] Physical description stats
    private String height;
    private String build;
    private String hairColor;
    private String eyeColor;
    private Boolean hasPortrait;
    
    // // [DONE] Voice information stats
    private String voiceActorName;
    private Double vocalRangeMin;
    private Double vocalRangeMax;
    private Boolean hasVoiceInfo;
    
    // // [DONE] Background information stats
    private String birthPlace;
    private String familyOrigin;
    private Integer familyMemberCount;
    private Integer historicalEventCount;
    private Boolean hasOriginStory;
    
    // // [DONE] Related entities
    private List<String> songTitles;
    private List<String> locationNames;
    private List<String> sagaTitles;
    private List<CharacterRelationshipResponse> relationships;
    private Map<String, Long> relationshipTypeCount;
}