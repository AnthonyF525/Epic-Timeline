package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;
import java.util.List;

@Data
@Builder
public class SagaUpdateRequest {
    
    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;
    
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z", 
             message = "Release date must be in ISO format (yyyy-MM-ddTHH:mm:ssZ)")
    private String releaseDate;
    
    @Min(value = 1, message = "Episode count must be at least 1")
    @Max(value = 100, message = "Episode count cannot exceed 100")
    private Integer episodeCount;
    
    // ✅ Update arrays - validation only if provided
    @Size(min = 1, max = 10, message = "Must have between 1 and 10 genres")
    private List<@NotBlank @Size(max = 50) String> genres;
    
    @Size(min = 1, max = 15, message = "Must have between 1 and 15 themes")
    private List<@NotBlank @Size(max = 50) String> themes;
    
    @Size(max = 20, message = "Cannot have more than 20 inspirations")
    private List<@NotBlank @Size(max = 100) String> inspirations;
    
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
