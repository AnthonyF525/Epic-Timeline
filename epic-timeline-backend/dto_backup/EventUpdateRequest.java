package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class EventUpdateRequest {
    
    @Size(min = 1, max = 300, message = "Title must be between 1 and 300 characters")
    private String title;
    
    @Size(min = 10, max = 3000, message = "Description must be between 10 and 3000 characters")
    private String description;
    
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z", 
             message = "Event date must be in ISO format (yyyy-MM-ddTHH:mm:ssZ)")
    private String eventDate;
    
    // // [DONE] Boolean flag updates (optional)
    private Boolean isHistorical;
    private Boolean isMythological;
    private Boolean hasWitnesses;
    private Boolean hasMultipleVersions;
    private Boolean isPivotal;
    
    @Valid
    private EventContextRequest eventContext;
    
    // // [DONE] Relationship array updates (with validation)
    @Size(min = 1, max = 50, message = "Must have between 1 and 50 characters")
    private List<@NotNull Long> characterIds;
    
    @Size(min = 1, max = 20, message = "Must have between 1 and 20 locations")
    private List<@NotNull Long> locationIds;
    
    @Size(max = 10, message = "Cannot be in more than 10 sagas")
    private List<@NotNull Long> sagaIds;
    
    @Size(max = 30, message = "Cannot have more than 30 related songs")
    private List<@NotNull Long> songIds;
    
    // // [DONE] Content array updates
    @Size(max = 25, message = "Cannot have more than 25 key details")
    private List<@NotBlank @Size(max = 300) String> keyDetails;
    
    @Size(max = 40, message = "Cannot have more than 40 witnesses")
    private List<@NotBlank @Size(max = 200) String> witnesses;
    
    @Size(max = 30, message = "Cannot have more than 30 consequences")
    private List<@NotBlank @Size(max = 400) String> consequences;
    
    @Size(max = 15, message = "Cannot have more than 15 alternative accounts")
    private List<@NotBlank @Size(max = 500) String> alternativeAccounts;
    
    @Size(max = 20, message = "Cannot have more than 20 cultural impacts")
    private List<@NotBlank @Size(max = 300) String> culturalImpacts;
    
    @Size(max = 25, message = "Cannot have more than 25 historical sources")
    private List<@NotBlank @Size(max = 200) String> historicalSources;
    
    @Size(max = 30, message = "Cannot have more than 30 related artifacts")
    private List<@NotBlank @Size(max = 200) String> relatedArtifacts;
    
    @Valid
    private WeatherConditionsRequest weatherConditions;
    
    @Valid
    private PoliticalContextRequest politicalContext;
}