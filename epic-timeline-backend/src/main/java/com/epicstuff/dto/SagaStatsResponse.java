package com.epicstuff.dto;

import java.util.List;
import java.util.Map;

public class SagaStatsResponse {
    private Long sagaId;
    private String sagaTitle;
    private Long totalEvents;
    private Long totalCharacters;
    private Long totalLocations;
    private Long totalSongs;
    private Double averageSongDuration;
    private Integer totalDurationSeconds;
    private List<String> allGenres;
    private List<String> allThemes;
    private List<String> allInspirations;
    private Map<String, Long> genreCount;
    private Map<String, Long> themeCount;
    private Map<String, Long> characterTypeCount;
    private List<String> mostFeaturedCharacters;
    private List<String> keyLocations;
    private List<String> pivotalEvents;

    public SagaStatsResponse() {}

    public SagaStatsResponse(Long sagaId, String sagaTitle, Long totalEvents, Long totalCharacters, 
                            Long totalLocations, Long totalSongs, Double averageSongDuration, 
                            Integer totalDurationSeconds, List<String> allGenres, List<String> allThemes,
                            List<String> allInspirations, Map<String, Long> genreCount, Map<String, Long> themeCount,
                            Map<String, Long> characterTypeCount, List<String> mostFeaturedCharacters,
                            List<String> keyLocations, List<String> pivotalEvents) {
        this.sagaId = sagaId;
        this.sagaTitle = sagaTitle;
        this.totalEvents = totalEvents;
        this.totalCharacters = totalCharacters;
        this.totalLocations = totalLocations;
        this.totalSongs = totalSongs;
        this.averageSongDuration = averageSongDuration;
        this.totalDurationSeconds = totalDurationSeconds;
        this.allGenres = allGenres;
        this.allThemes = allThemes;
        this.allInspirations = allInspirations;
        this.genreCount = genreCount;
        this.themeCount = themeCount;
        this.characterTypeCount = characterTypeCount;
        this.mostFeaturedCharacters = mostFeaturedCharacters;
        this.keyLocations = keyLocations;
        this.pivotalEvents = pivotalEvents;
    }

    public Long getSagaId() { return sagaId; }
    public void setSagaId(Long sagaId) { this.sagaId = sagaId; }

    public String getSagaTitle() { return sagaTitle; }
    public void setSagaTitle(String sagaTitle) { this.sagaTitle = sagaTitle; }

    public Long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(Long totalEvents) { this.totalEvents = totalEvents; }

    public Long getTotalCharacters() { return totalCharacters; }
    public void setTotalCharacters(Long totalCharacters) { this.totalCharacters = totalCharacters; }

    public Long getTotalLocations() { return totalLocations; }
    public void setTotalLocations(Long totalLocations) { this.totalLocations = totalLocations; }

    public Long getTotalSongs() { return totalSongs; }
    public void setTotalSongs(Long totalSongs) { this.totalSongs = totalSongs; }

    public Double getAverageSongDuration() { return averageSongDuration; }
    public void setAverageSongDuration(Double averageSongDuration) { this.averageSongDuration = averageSongDuration; }

    public Integer getTotalDurationSeconds() { return totalDurationSeconds; }
    public void setTotalDurationSeconds(Integer totalDurationSeconds) { this.totalDurationSeconds = totalDurationSeconds; }

    public List<String> getAllGenres() { return allGenres; }
    public void setAllGenres(List<String> allGenres) { this.allGenres = allGenres; }

    public List<String> getAllThemes() { return allThemes; }
    public void setAllThemes(List<String> allThemes) { this.allThemes = allThemes; }

    public List<String> getAllInspirations() { return allInspirations; }
    public void setAllInspirations(List<String> allInspirations) { this.allInspirations = allInspirations; }

    public Map<String, Long> getGenreCount() { return genreCount; }
    public void setGenreCount(Map<String, Long> genreCount) { this.genreCount = genreCount; }

    public Map<String, Long> getThemeCount() { return themeCount; }
    public void setThemeCount(Map<String, Long> themeCount) { this.themeCount = themeCount; }

    public Map<String, Long> getCharacterTypeCount() { return characterTypeCount; }
    public void setCharacterTypeCount(Map<String, Long> characterTypeCount) { this.characterTypeCount = characterTypeCount; }

    public List<String> getMostFeaturedCharacters() { return mostFeaturedCharacters; }
    public void setMostFeaturedCharacters(List<String> mostFeaturedCharacters) { this.mostFeaturedCharacters = mostFeaturedCharacters; }

    public List<String> getKeyLocations() { return keyLocations; }
    public void setKeyLocations(List<String> keyLocations) { this.keyLocations = keyLocations; }

    public List<String> getPivotalEvents() { return pivotalEvents; }
    public void setPivotalEvents(List<String> pivotalEvents) { this.pivotalEvents = pivotalEvents; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long sagaId;
        private String sagaTitle;
        private Long totalEvents;
        private Long totalCharacters;
        private Long totalLocations;
        private Long totalSongs;
        private Double averageSongDuration;
        private Integer totalDurationSeconds;
        private List<String> allGenres;
        private List<String> allThemes;
        private List<String> allInspirations;
        private Map<String, Long> genreCount;
        private Map<String, Long> themeCount;
        private Map<String, Long> characterTypeCount;
        private List<String> mostFeaturedCharacters;
        private List<String> keyLocations;
        private List<String> pivotalEvents;

        public Builder sagaId(Long sagaId) { this.sagaId = sagaId; return this; }
        public Builder sagaTitle(String sagaTitle) { this.sagaTitle = sagaTitle; return this; }
        public Builder totalEvents(Long totalEvents) { this.totalEvents = totalEvents; return this; }
        public Builder totalCharacters(Long totalCharacters) { this.totalCharacters = totalCharacters; return this; }
        public Builder totalLocations(Long totalLocations) { this.totalLocations = totalLocations; return this; }
        public Builder totalSongs(Long totalSongs) { this.totalSongs = totalSongs; return this; }
        public Builder averageSongDuration(Double averageSongDuration) { this.averageSongDuration = averageSongDuration; return this; }
        public Builder totalDurationSeconds(Integer totalDurationSeconds) { this.totalDurationSeconds = totalDurationSeconds; return this; }
        public Builder allGenres(List<String> allGenres) { this.allGenres = allGenres; return this; }
        public Builder allThemes(List<String> allThemes) { this.allThemes = allThemes; return this; }
        public Builder allInspirations(List<String> allInspirations) { this.allInspirations = allInspirations; return this; }
        public Builder genreCount(Map<String, Long> genreCount) { this.genreCount = genreCount; return this; }
        public Builder themeCount(Map<String, Long> themeCount) { this.themeCount = themeCount; return this; }
        public Builder characterTypeCount(Map<String, Long> characterTypeCount) { this.characterTypeCount = characterTypeCount; return this; }
        public Builder mostFeaturedCharacters(List<String> mostFeaturedCharacters) { this.mostFeaturedCharacters = mostFeaturedCharacters; return this; }
        public Builder keyLocations(List<String> keyLocations) { this.keyLocations = keyLocations; return this; }
        public Builder pivotalEvents(List<String> pivotalEvents) { this.pivotalEvents = pivotalEvents; return this; }

        public SagaStatsResponse build() {
            return new SagaStatsResponse(sagaId, sagaTitle, totalEvents, totalCharacters, totalLocations,
                                       totalSongs, averageSongDuration, totalDurationSeconds, allGenres, allThemes,
                                       allInspirations, genreCount, themeCount, characterTypeCount,
                                       mostFeaturedCharacters, keyLocations, pivotalEvents);
        }
    }
}
