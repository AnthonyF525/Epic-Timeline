package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;

@Data
@Builder
public class EventConsequenceRequest {
    @NotBlank(message = "Consequence description is required")
    @Size(min = 10, max = 400, message = "Consequence must be between 10 and 400 characters")
    private String description;
    
    @NotNull(message = "Consequence type is required")
    @Pattern(regexp = "immediate|short_term|long_term|permanent", 
             message = "Consequence type must be: immediate, short_term, long_term, or permanent")
    private String consequenceType;
    
    @NotNull(message = "Impact level is required")
    @Pattern(regexp = "minor|moderate|major|critical", 
             message = "Impact level must be: minor, moderate, major, or critical")
    private String impactLevel;
    
    @Size(max = 10, message = "Cannot affect more than 10 characters")
    private List<@NotNull Long> affectedCharacterIds;
    
    @Size(max = 5, message = "Cannot affect more than 5 locations")
    private List<@NotNull Long> affectedLocationIds;
}