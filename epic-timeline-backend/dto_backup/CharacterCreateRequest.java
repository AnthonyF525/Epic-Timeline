package com.epicstuff.dto;

import com.epicstuff.enums.CharacterType;
import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class CharacterCreateRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 200, message = "Name must be between 1 and 200 characters")
    private String name;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;
    
    // ✅ Character type enum validation (required)
    @NotNull(message = "Character type is required")
    private CharacterType characterType;
    
    // ✅ Boolean flags validation (all required with defaults)
    @NotNull(message = "isAlive flag is required")
    private Boolean isAlive;
    
    @NotNull(message = "isImmortal flag is required")
    private Boolean isImmortal;
    
    @NotNull(message = "hasSpokenLines flag is required")
    private Boolean hasSpokenLines;
    
    @NotNull(message = "isTitleCharacter flag is required")
    private Boolean isTitleCharacter;
    
    @NotNull(message = "isAntagonist flag is required")
    private Boolean isAntagonist;
    
    @NotNull(message = "isProtagonist flag is required")
    private Boolean isProtagonist;
    
    @NotNull(message = "isHistoricalFigure flag is required")
    private Boolean isHistoricalFigure;
    
    // ✅ Array validation - roles (at least one required)
    @NotEmpty(message = "At least one role is required")
    @Size(max = 15, message = "Cannot have more than 15 roles")
    private List<@NotBlank @Size(max = 100) String> roles;
    
    // ✅ Array validation - traits (optional but limited)
    @Size(max = 20, message = "Cannot have more than 20 traits")
    private List<@NotBlank @Size(max = 100) String> traits;
    
    // ✅ Array validation - abilities (optional but limited)
    @Size(max = 25, message = "Cannot have more than 25 abilities")
    private List<@NotBlank @Size(max = 150) String> abilities;
    
    // ✅ Array validation - weaknesses (optional)
    @Size(max = 15, message = "Cannot have more than 15 weaknesses")
    private List<@NotBlank @Size(max = 150) String> weaknesses;
    
    // ✅ Array validation - allegiances (optional)
    @Size(max = 10, message = "Cannot have more than 10 allegiances")
    private List<@NotBlank @Size(max = 100) String> allegiances;
    
    // ✅ Array validation - alternative names (optional)
    @Size(max = 20, message = "Cannot have more than 20 alternative names")
    private List<@NotBlank @Size(max = 100) String> alternativeNames;
    
    // ✅ Array validation - titles (optional)
    @Size(max = 15, message = "Cannot have more than 15 titles")
    private List<@NotBlank @Size(max = 100) String> titles;
    
    // ✅ Array validation - epithets (optional)
    @Size(max = 20, message = "Cannot have more than 20 epithets")
    private List<@NotBlank @Size(max = 100) String> epithets;
    
    // ✅ Array validation - weapons (optional)
    @Size(max = 15, message = "Cannot have more than 15 weapons")
    private List<@NotBlank @Size(max = 100) String> weapons;
    
    // ✅ Array validation - memorable quotes (optional)
    @Size(max = 30, message = "Cannot have more than 30 memorable quotes")
    private List<@NotBlank @Size(max = 500) String> memorableQuotes;
    
    // ✅ Entity relationships (optional)
    @Size(max = 100, message = "Cannot be in more than 100 songs")
    private List<@NotNull Long> songIds;
    
    @Size(max = 50, message = "Cannot be at more than 50 locations")
    private List<@NotNull Long> locationIds;
    
    @Size(max = 10, message = "Cannot be in more than 10 sagas")
    private List<@NotNull Long> sagaIds;
    
    // ✅ Nested object validation (optional)
    @Valid
    private PhysicalDescriptionRequest physicalDescription;
    
    @Valid
    private BackgroundInfoRequest backgroundInfo;
    
    @Valid
    private VoiceActorInfoRequest voiceActorInfo;
    
    // ✅ Character relationships (optional for creation)
    @Size(max = 50, message = "Cannot have more than 50 relationships")
    private List<@Valid CharacterRelationshipRequest> relationships;
}

@Data
@Builder
class PhysicalDescriptionRequest {
    @Size(max = 50, message = "Height description cannot exceed 50 characters")
    private String height;
    
    @Size(max = 50, message = "Build description cannot exceed 50 characters")
    private String build;
    
    @Size(max = 50, message = "Hair color cannot exceed 50 characters")
    private String hairColor;
    
    @Size(max = 50, message = "Eye color cannot exceed 50 characters")
    private String eyeColor;
    
    @Pattern(regexp = "^(https?://).*", message = "Portrait URL must start with http:// or https://")
    private String portraitUrl;
}

@Data
@Builder
class BackgroundInfoRequest {
    @Size(max = 100, message = "Birth place cannot exceed 100 characters")
    private String birthPlace;
    
    @Size(max = 100, message = "Family origin cannot exceed 100 characters")
    private String familyOrigin;
    
    @Size(max = 20, message = "Cannot have more than 20 family members")
    private List<@NotBlank @Size(max = 100) String> familyMembers;
    
    @Size(max = 30, message = "Cannot have more than 30 historical events")
    private List<@NotBlank @Size(max = 200) String> historicalEvents;
    
    @Size(max = 1000, message = "Origin story cannot exceed 1000 characters")
    private String originStory;
}

@Data
@Builder
class VoiceActorInfoRequest {
    @Size(max = 100, message = "Voice actor name cannot exceed 100 characters")
    private String voiceActorName;
    
    @DecimalMin(value = "20.0", message = "Vocal range minimum must be at least 20 Hz")
    @DecimalMax(value = "4000.0", message = "Vocal range minimum cannot exceed 4000 Hz")
    private Double vocalRangeMin;
    
    @DecimalMin(value = "50.0", message = "Vocal range maximum must be at least 50 Hz")
    @DecimalMax(value = "8000.0", message = "Vocal range maximum cannot exceed 8000 Hz")
    private Double vocalRangeMax;
}

@Data
@Builder
class CharacterRelationshipRequest {
    @NotNull(message = "Related character ID is required")
    private Long relatedCharacterId;
    
    @NotBlank(message = "Relationship type is required")
    @Size(max = 50, message = "Relationship type cannot exceed 50 characters")
    private String relationshipType;
    
    @Size(max = 300, message = "Relationship description cannot exceed 300 characters")
    private String description;
}