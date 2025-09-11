package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;

@Data
@Builder
public class AutoComparisonRequest {
    
    @NotNull(message = "Comparison type is required")
    private ComparisonType comparisonType;
    
    @NotNull(message = "Entity one ID is required")
    private Long entityOneId;
    
    @NotNull(message = "Entity two ID is required")
    private Long entityTwoId;
    
    @NotBlank(message = "Analysis type is required")
    @Pattern(regexp = "general|detailed|thematic|narrative|character_focused|technical", 
             message = "Analysis type must be: general, detailed, thematic, narrative, character_focused, or technical")
    private String analysisType;
    
    @Min(value = 3, message = "Must have at least 3 criteria")
    @Max(value = 15, message = "Cannot have more than 15 criteria")
    private Integer criteriaCount = 5;
    
    private Boolean includeMetrics = true;
    private Boolean includeContext = true;
    private Boolean isPublic = true;
}