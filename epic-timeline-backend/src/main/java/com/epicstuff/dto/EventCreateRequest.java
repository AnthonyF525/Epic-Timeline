package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class EventCreateRequest {
    
    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 300, message = "Title must be between 1 and 300 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 3000, message = "Description must be between 10 and 3000 characters")
    private String description;
    
    @NotBlank(message = "Event date is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z", 
             message = "Event date must be in ISO format (yyyy-MM-ddTHH:mm:ssZ)")
    private String eventDate;
    
    // ✅ Boolean flags validation (all required with defaults)
    @NotNull(message = "isHistorical flag is required")
    private Boolean isHistorical;
    
    @NotNull(message = "isMythological flag is required")
    private Boolean isMythological;
    
    @NotNull(message = "hasWitnesses flag is required")
    private Boolean hasWitnesses;
    
    @NotNull(message = "hasMultipleVersions flag is required")
    private Boolean hasMultipleVersions;
    
    @NotNull(message = "isPivotal flag is required")
    private Boolean isPivotal;
    
    // ✅ Required nested object validation
    @NotNull(message = "Event context is required")
    @Valid
    private EventContextRequest eventContext;
    
    // ✅ Array validation - character relationships (at least one character required)
    @NotEmpty(message = "At least one character must be involved in the event")
    @Size(max = 50, message = "Cannot have more than 50 characters")
    private List<@NotNull Long> characterIds;
    
    // ✅ Array validation - location relationships (at least one location required)
    @NotEmpty(message = "At least one location is required")
    @Size(max = 20, message = "Cannot have more than 20 locations")
    private List<@NotNull Long> locationIds;
    
    // ✅ Array validation - saga relationships (optional)
    @Size(max = 10, message = "Cannot be in more than 10 sagas")
    private List<@NotNull Long> sagaIds;
    
    // ✅ Array validation - song relationships (optional)
    @Size(max = 30, message = "Cannot have more than 30 related songs")
    private List<@NotNull Long> songIds;
    
    // ✅ Array validation - key details (optional but limited)
    @Size(max = 25, message = "Cannot have more than 25 key details")
    private List<@NotBlank @Size(max = 300) String> keyDetails;
    
    // ✅ Array validation - witnesses (optional)
    @Size(max = 40, message = "Cannot have more than 40 witnesses")
    private List<@NotBlank @Size(max = 200) String> witnesses;
    
    // ✅ Array validation - consequences (optional)
    @Size(max = 30, message = "Cannot have more than 30 consequences")
    private List<@NotBlank @Size(max = 400) String> consequences;
    
    // ✅ Array validation - alternative accounts (optional)
    @Size(max = 15, message = "Cannot have more than 15 alternative accounts")
    private List<@NotBlank @Size(max = 500) String> alternativeAccounts;
    
    // ✅ Array validation - cultural impacts (optional)
    @Size(max = 20, message = "Cannot have more than 20 cultural impacts")
    private List<@NotBlank @Size(max = 300) String> culturalImpacts;
    
    // ✅ Array validation - historical sources (optional)
    @Size(max = 25, message = "Cannot have more than 25 historical sources")
    private List<@NotBlank @Size(max = 200) String> historicalSources;
    
    // ✅ Array validation - related artifacts (optional)
    @Size(max = 30, message = "Cannot have more than 30 related artifacts")
    private List<@NotBlank @Size(max = 200) String> relatedArtifacts;
    
    // ✅ Optional nested objects
    @Valid
    private WeatherConditionsRequest weatherConditions;
    
    @Valid
    private PoliticalContextRequest politicalContext;
}

@Data
@Builder
class EventContextRequest {
    @NotNull(message = "Event type is required")
    @Pattern(regexp = "battle|journey|meeting|ceremony|death|birth|marriage|ascension|transformation|discovery|betrayal|alliance|siege|celebration|treaty|prophecy", 
             message = "Event type must be one of: battle, journey, meeting, ceremony, death, birth, marriage, ascension, transformation, discovery, betrayal, alliance, siege, celebration, treaty, prophecy")
    private String eventType;
    
    @NotNull(message = "Importance level is required")
    @Pattern(regexp = "minor|moderate|significant|major|pivotal|legendary", 
             message = "Importance must be: minor, moderate, significant, major, pivotal, or legendary")
    private String importance;
    
    @NotNull(message = "Outcome is required")
    @Pattern(regexp = "victory|defeat|neutral|tragic|triumphant|inconclusive|transformative", 
             message = "Outcome must be: victory, defeat, neutral, tragic, triumphant, inconclusive, or transformative")
    private String outcome;
    
    @Size(max = 30, message = "Cannot have more than 30 themes")
    private List<@NotBlank @Size(max = 100) String> themes;
    
    @Size(max = 20, message = "Cannot have more than 20 tags")
    private List<@NotBlank @Size(max = 50) String> tags;
    
    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 525600, message = "Duration cannot exceed 1 year in minutes")
    private Integer durationMinutes;
}

@Data
@Builder
class WeatherConditionsRequest {
    @Size(max = 50, message = "Weather cannot exceed 50 characters")
    private String weather;
    
    @Size(max = 50, message = "Season cannot exceed 50 characters")
    private String season;
    
    @Size(max = 50, message = "Time of day cannot exceed 50 characters")
    private String timeOfDay;
    
    @DecimalMin(value = "-50.0", message = "Temperature must be above -50°C")
    @DecimalMax(value = "60.0", message = "Temperature must be below 60°C")
    private Double temperatureCelsius;
    
    private Boolean wasStormy;
    private Boolean hadNaturalPhenomena;
}

@Data
@Builder
class PoliticalContextRequest {
    @Size(max = 30, message = "Cannot have more than 30 ruling powers")
    private List<@NotBlank @Size(max = 100) String> rulingPowers;
    
    @Size(max = 40, message = "Cannot have more than 40 alliances")
    private List<@NotBlank @Size(max = 150) String> alliances;
    
    @Size(max = 50, message = "Cannot have more than 50 conflicts")
    private List<@NotBlank @Size(max = 200) String> ongoingConflicts;
    
    @Size(max = 20, message = "Cannot have more than 20 treaties")
    private List<@NotBlank @Size(max = 150) String> activeTreaties;
    
    @Size(max = 15, message = "Cannot have more than 15 diplomatic statuses")
    private List<@NotBlank @Size(max = 100) String> diplomaticStatus;
}