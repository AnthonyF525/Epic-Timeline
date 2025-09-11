package com.epicstuff.dto;

import com.epicstuff.enums.CharacterType;
import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class CharacterUpdateRequest {
    
    @Size(min = 1, max = 200, message = "Name must be between 1 and 200 characters")
    private String name;
    
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;
    
    // ✅ Character type enum (optional for updates)
    private CharacterType characterType;
    
    // ✅ Boolean flag updates (optional)
    private Boolean isAlive;
    private Boolean isImmortal;
    private Boolean hasSpokenLines;
    private Boolean isTitleCharacter;
    private Boolean isAntagonist;
    private Boolean isProtagonist;
    private Boolean isHistoricalFigure;
    
    // ✅ Array updates (with validation)
    @Size(min = 1, max = 15, message = "Must have between 1 and 15 roles")
    private List<@NotBlank @Size(max = 100) String> roles;
    
    @Size(max = 20, message = "Cannot have more than 20 traits")
    private List<@NotBlank @Size(max = 100) String> traits;
    
    @Size(max = 25, message = "Cannot have more than 25 abilities")
    private List<@NotBlank @Size(max = 150) String> abilities;
    
    @Size(max = 15, message = "Cannot have more than 15 weaknesses")
    private List<@NotBlank @Size(max = 150) String> weaknesses;
    
    @Size(max = 10, message = "Cannot have more than 10 allegiances")
    private List<@NotBlank @Size(max = 100) String> allegiances;
    
    @Size(max = 20, message = "Cannot have more than 20 alternative names")
    private List<@NotBlank @Size(max = 100) String> alternativeNames;
    
    @Size(max = 15, message = "Cannot have more than 15 titles")
    private List<@NotBlank @Size(max = 100) String> titles;
    
    @Size(max = 20, message = "Cannot have more than 20 epithets")
    private List<@NotBlank @Size(max = 100) String> epithets;
    
    @Size(max = 15, message = "Cannot have more than 15 weapons")
    private List<@NotBlank @Size(max = 100) String> weapons;
    
    @Size(max = 30, message = "Cannot have more than 30 memorable quotes")
    private List<@NotBlank @Size(max = 500) String> memorableQuotes;
    
    @Size(max = 100, message = "Cannot be in more than 100 songs")
    private List<@NotNull Long> songIds;
    
    @Size(max = 50, message = "Cannot be at more than 50 locations")
    private List<@NotNull Long> locationIds;
    
    @Size(max = 10, message = "Cannot be in more than 10 sagas")
    private List<@NotNull Long> sagaIds;
    
    @Valid
    private PhysicalDescriptionRequest physicalDescription;
    
    @Valid
    private BackgroundInfoRequest backgroundInfo;
    
    @Valid
    private VoiceActorInfoRequest voiceActorInfo;
}