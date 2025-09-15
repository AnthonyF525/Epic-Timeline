package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class ComparisonUpdateRequest {
    
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    private String title;
    
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;
    
    // // [DONE] Comparison type enum (optional for updates)
    private ComparisonType comparisonType;
    
    // // [DONE] Analysis metadata updates
    @Pattern(regexp = "similarities|differences|strengths_weaknesses|historical_impact|character_development|thematic_analysis", 
             message = "Analysis type must be: similarities, differences, strengths_weaknesses, historical_impact, character_development, or thematic_analysis")
    private String analysisType;
    
    @Pattern(regexp = "entity_one_superior|entity_two_superior|equivalent|incomparable|context_dependent", 
             message = "Conclusion must be: entity_one_superior, entity_two_superior, equivalent, incomparable, or context_dependent")
    private String conclusion;
    
    // // [DONE] Boolean flag updates
    private Boolean isPublic;
    private Boolean isDetailed;
    
    // // [DONE] Array updates (with validation)
    @Size(min = 3, max = 20, message = "Must have between 3 and 20 comparison criteria")
    private List<@Valid ComparisonCriteriaRequest> criteria;
    
    @Size(min = 1, max = 10, message = "Must have between 1 and 10 themes")
    private List<@NotBlank @Size(max = 50) String> themes;
    
    @Size(max = 15, message = "Cannot have more than 15 tags")
    private List<@NotBlank @Size(max = 30) String> tags;
    
    @Size(max = 20, message = "Cannot have more than 20 sources")
    private List<@NotBlank @Size(max = 200) String> sources;
    
    @Size(max = 15, message = "Cannot have more than 15 key insights")
    private List<@NotBlank @Size(max = 300) String> keyInsights;
    
    @Size(max = 10, message = "Cannot have more than 10 related character IDs")
    private List<@NotNull Long> relatedCharacterIds;
    
    @Size(max = 10, message = "Cannot have more than 10 related location IDs")
    private List<@NotNull Long> relatedLocationIds;
    
    @Size(max = 10, message = "Cannot have more than 10 related event IDs")
    private List<@NotNull Long> relatedEventIds;
    
    @Size(max = 5, message = "Cannot have more than 5 related saga IDs")
    private List<@NotNull Long> relatedSagaIds;
    
    @Valid
    private ComparisonMetricsRequest metrics;
    
    @Valid
    private ComparisonContextRequest context;
}