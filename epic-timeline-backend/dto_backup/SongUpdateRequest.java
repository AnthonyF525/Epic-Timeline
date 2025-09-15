package com.epicstuff.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.*;
import java.util.List;

@Data
@Builder
public class SongUpdateRequest {

    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    @Min(value = 1, message = "Track number must be at least 1")
    @Max(value = 100, message = "Track number cannot exceed 100")
    private Integer trackNumber;

    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @Min(value = 1, message = "Duration must be at least 1 second")
    @Max(value = 1800, message = "Duration cannot exceed 30 minutes")
    private Integer durationSeconds;

    // // [DONE] Update arrays - validation only if provided
    @Size(min = 1, max = 10, message = "Must have between 1 and 10 themes")
    private List<@NotBlank @Size(max = 50) String> themes;

    @Size(min = 1, max = 8, message = "Must have between 1 and 8 genres")
    private List<@NotBlank @Size(max = 50) String> genres;

    @Size(max = 15, message = "Cannot have more than 15 instruments")
    private List<@NotBlank @Size(max = 50) String> instruments;

    @Size(max = 10, message = "Cannot have more than 10 vocal styles")
    private List<@NotBlank @Size(max = 50) String> vocals;

    @Size(max = 8, message = "Cannot have more than 8 moods")
    private List<@NotBlank @Size(max = 50) String> moods;

    @Size(max = 12, message = "Cannot have more than 12 tags")
    private List<@NotBlank @Size(max = 30) String> tags;

    @Size(max = 20, message = "Cannot have more than 20 characters")
    private List<@NotNull Long> characterIds;

    @Size(max = 20, message = "Cannot have more than 20 song sections")
    private List<@NotBlank @Size(max = 100) String> songSections;

    @Size(max = 15, message = "Cannot have more than 15 lyric highlights")
    private List<@NotBlank @Size(max = 200) String> lyricHighlights;

    @Size(max = 5, message = "Cannot have more than 5 Amazon Music IDs")
    private List<@NotBlank @Size(max = 50) String> amazonMusicIds;

    @Size(max = 10, message = "Cannot have more than 10 YouTube IDs")
    private List<@NotBlank @Size(max = 50) String> youtubeIds;

    @Size(max = 10, message = "Cannot have more than 10 inspiration sources")
    private List<@NotBlank @Size(max = 100) String> inspirationSources;

    @Size(max = 100, message = "Lyricist name cannot exceed 100 characters")
    private String lyricist;

    @Size(max = 100, message = "Composer name cannot exceed 100 characters")
    private String composer;

    @Size(max = 100, message = "Producer name cannot exceed 100 characters")
    private String producer;

    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Recording date must be in format yyyy-MM-dd")
    private String recordingDate;

    @Pattern(regexp = "^(https?://).*", message = "Album art URL must start with http:// or https://")
    private String albumArtUrl;

    private Boolean isInstrumental;
    private Boolean hasDialogue;
    private Boolean isReprise;

    private Long originalSongId;
}
