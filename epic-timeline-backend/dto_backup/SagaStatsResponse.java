package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class SagaStatsResponse {
    private Long sagaId;
    private String sagaTitle;
    private Integer totalSongs;
    private Integer totalCharacters;
    private Integer totalLocations;
    private Integer totalEvents;
    private Double averageSongDuration;
    private Integer totalDurationSeconds;
    
    // // [DONE] Array statistics
    private List<String> allGenres;
    private List<String> allThemes; 
    private List<String> allInspirations;
    private Map<String, Integer> genreCount;
    private Map<String, Integer> themeCount;
    
    // // [DONE] Relationship statistics
    private Map<String, Integer> characterTypeCount;
    private List<String> mostFeaturedCharacters;
    private List<String> keyLocations;
    private List<String> pivotalEvents;
}
