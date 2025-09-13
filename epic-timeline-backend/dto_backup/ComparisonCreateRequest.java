package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import javax.validation.Valid;
import java.util.List;

@Data
@Builder
public class ComparisonCreateRequest {
    
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;
    
    // ✅ Comparison type enum validation (required)
    @NotNull(message = "Comparison type is required")
    private ComparisonType comparisonType;
    
    // ✅ Entity validation (both entities required)
    @NotNull(message = "Entity one ID is required")
    private Long entityOneId;
    
    @NotNull(message = "Entity two ID is required")
    private Long entityTwoId;
    
    // ✅ Analysis metadata (required)
    @NotNull(message = "Analysis type is required")
    @Pattern(regexp = "similarities|differences|strengths_weaknesses|historical_impact|character_development|thematic_analysis", 
             message = "Analysis type must be: similarities, differences, strengths_weaknesses, historical_impact, character_development, or thematic_analysis")
    private String analysisType;
    
    @NotNull(message = "Conclusion is required")
    @Pattern(regexp = "entity_one_superior|entity_two_superior|equivalent|incomparable|context_dependent", 
             message = "Conclusion must be: entity_one_superior, entity_two_superior, equivalent, incomparable, or context_dependent")
    private String conclusion;
    
    // ✅ Boolean flags validation (required)
    @NotNull(message = "isPublic flag is required")
    private Boolean isPublic;
    
    @NotNull(message = "isDetailed flag is required")
    private Boolean isDetailed;
    
    // ✅ Array validation - comparison criteria (at least 3 required)
    @NotEmpty(message = "At least 3 comparison criteria are required")
    @Size(min = 3, max = 20, message = "Must have between 3 and 20 comparison criteria")
    private List<@Valid ComparisonCriteriaRequest> criteria;
    
    // ✅ Array validation - themes (at least 1 required)
    @NotEmpty(message = "At least one theme is required")
    @Size(max = 10, message = "Cannot have more than 10 themes")
    private List<@NotBlank @Size(max = 50) String> themes;
    
    // ✅ Array validation - tags (optional)
    @Size(max = 15, message = "Cannot have more than 15 tags")
    private List<@NotBlank @Size(max = 30) String> tags;
    
    // ✅ Array validation - sources (optional but recommended)
    @Size(max = 20, message = "Cannot have more than 20 sources")
    private List<@NotBlank @Size(max = 200) String> sources;
    
    // ✅ Array validation - key insights (optional)
    @Size(max = 15, message = "Cannot have more than 15 key insights")
    private List<@NotBlank @Size(max = 300) String> keyInsights;
    
    // ✅ Array validation - related entities (optional)
    @Size(max = 10, message = "Cannot have more than 10 related character IDs")
    private List<@NotNull Long> relatedCharacterIds;
    
    @Size(max = 10, message = "Cannot have more than 10 related location IDs")
    private List<@NotNull Long> relatedLocationIds;
    
    @Size(max = 10, message = "Cannot have more than 10 related event IDs")
    private List<@NotNull Long> relatedEventIds;
    
    @Size(max = 5, message = "Cannot have more than 5 related saga IDs")
    private List<@NotNull Long> relatedSagaIds;
    
    // ✅ Nested object validation (optional)
    @Valid
    private ComparisonMetricsRequest metrics;
    
    @Valid
    private ComparisonContextRequest context;
}

@Data
@Builder
class ComparisonCriteriaRequest {
    @NotBlank(message = "Criteria name is required")
    @Size(min = 3, max = 100, message = "Criteria name must be between 3 and 100 characters")
    private String criteriaName;
    
    @Size(max = 500, message = "Criteria description cannot exceed 500 characters")
    private String description;
    
    @NotNull(message = "Entity one score is required")
    @DecimalMin(value = "0.0", message = "Score must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Score must be between 0 and 10")
    private Double entityOneScore;
    
    @NotNull(message = "Entity two score is required")
    @DecimalMin(value = "0.0", message = "Score must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Score must be between 0 and 10")
    private Double entityTwoScore;
    
    @NotNull(message = "Weight is required")
    @DecimalMin(value = "0.1", message = "Weight must be between 0.1 and 3.0")
    @DecimalMax(value = "3.0", message = "Weight must be between 0.1 and 3.0")
    private Double weight;
    
    @Size(max = 300, message = "Justification cannot exceed 300 characters")
    private String justification;
}

@Data
@Builder
class ComparisonMetricsRequest {
    @DecimalMin(value = "0.0", message = "Overall score must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Overall score must be between 0 and 10")
    private Double overallEntityOneScore;
    
    @DecimalMin(value = "0.0", message = "Overall score must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Overall score must be between 0 and 10")
    private Double overallEntityTwoScore;
    
    @DecimalMin(value = "0.0", message = "Confidence level must be between 0 and 1")
    @DecimalMax(value = "1.0", message = "Confidence level must be between 0 and 1")
    private Double confidenceLevel;
    
    @Min(value = 1, message = "Analysis depth must be at least 1")
    @Max(value = 10, message = "Analysis depth cannot exceed 10")
    private Integer analysisDepth;
    
    @Min(value = 0, message = "Bias level must be at least 0")
    @Max(value = 5, message = "Bias level cannot exceed 5")
    private Integer biasLevel;
}

@Data
@Builder
class ComparisonContextRequest {
    @Size(max = 100, message = "Historical period cannot exceed 100 characters")
    private String historicalPeriod;
    
    @Size(max = 100, message = "Cultural context cannot exceed 100 characters")
    private String culturalContext;
    
    @Size(max = 200, message = "Comparison purpose cannot exceed 200 characters")
    private String comparisonPurpose;
    
    @Size(max = 100, message = "Target audience cannot exceed 100 characters")
    private String targetAudience;
    
    @Size(max = 10, message = "Cannot have more than 10 methodologies")
    private List<@NotBlank @Size(max = 50) String> methodologies;
    
    @Size(max = 10, message = "Cannot have more than 10 limitations")
    private List<@NotBlank @Size(max = 150) String> limitations;
}