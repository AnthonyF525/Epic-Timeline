package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import java.util.List;

@Data
@Builder
public class SagaCreateRequest {
    
    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    
    @NotNull(message = "Release date is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z", 
             message = "Release date must be in ISO format (yyyy-MM-ddTHH:mm:ssZ)")
    private String releaseDate;
    
    @Min(value = 1, message = "Episode count must be at least 1")
    @Max(value = 100, message = "Episode count cannot exceed 100")
    private Integer episodeCount;
    
    // // [DONE] Array validation - at least one genre required
    @NotEmpty(message = "At least one genre is required")
    @Size(max = 10, message = "Cannot have more than 10 genres")
    private List<@NotBlank @Size(max = 50) String> genres;
    
    // // [DONE] Array validation - at least one theme required  
    @NotEmpty(message = "At least one theme is required")
    @Size(max = 15, message = "Cannot have more than 15 themes")
    private List<@NotBlank @Size(max = 50) String> themes;
    
    // // [DONE] Array validation - inspirations optional but limited
    @Size(max = 20, message = "Cannot have more than 20 inspirations")
    private List<@NotBlank @Size(max = 100) String> inspirations;
    
    // // [DONE] URL validation
    @Pattern(regexp = "^(https?://).*", message = "Album art URL must start with http:// or https://")
    private String albumArtUrl;
    
    @Pattern(regexp = "^(https?://).*", message = "Amazon Music URL must start with http:// or https://")
    private String amazonMusicUrl;
    
    @Pattern(regexp = "^(https?://).*", message = "YouTube playlist URL must start with http:// or https://")
    private String youtubePlaylistUrl;
    
    @Min(value = 1, message = "Total duration must be at least 1 second")
    @Max(value = 86400, message = "Total duration cannot exceed 24 hours")
    private Integer totalDurationSeconds;
}
