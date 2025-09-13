package com.epicstuff.dto;

import java.util.List;
import java.util.Map;

public class SongStatsResponse {
    private Long songId;
    private String songTitle;
    private Integer durationSeconds;
    private Integer characterCount;
    private List<String> allThemes;
    private Map<String, Integer> themeCount;
    private List<String> characterNames;

    // Constructors
    public SongStatsResponse() {}

    // Builder pattern for compatibility with service
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private SongStatsResponse response = new SongStatsResponse();

        public Builder songId(Long songId) {
            response.setSongId(songId);
            return this;
        }

        public Builder songTitle(String songTitle) {
            response.setSongTitle(songTitle);
            return this;
        }

        public Builder durationSeconds(Integer durationSeconds) {
            response.setDurationSeconds(durationSeconds);
            return this;
        }

        public Builder characterCount(Integer characterCount) {
            response.setCharacterCount(characterCount);
            return this;
        }

        public Builder allThemes(List<String> allThemes) {
            response.setAllThemes(allThemes);
            return this;
        }

        public Builder themeCount(Map<String, Integer> themeCount) {
            response.setThemeCount(themeCount);
            return this;
        }

        public Builder characterNames(List<String> characterNames) {
            response.setCharacterNames(characterNames);
            return this;
        }

        public SongStatsResponse build() {
            return response;
        }
    }

    // Getters and setters
    public Long getSongId() { return songId; }
    public void setSongId(Long songId) { this.songId = songId; }

    public String getSongTitle() { return songTitle; }
    public void setSongTitle(String songTitle) { this.songTitle = songTitle; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public Integer getCharacterCount() { return characterCount; }
    public void setCharacterCount(Integer characterCount) { this.characterCount = characterCount; }

    public List<String> getAllThemes() { return allThemes; }
    public void setAllThemes(List<String> allThemes) { this.allThemes = allThemes; }

    public Map<String, Integer> getThemeCount() { return themeCount; }
    public void setThemeCount(Map<String, Integer> themeCount) { this.themeCount = themeCount; }

    public List<String> getCharacterNames() { return characterNames; }
    public void setCharacterNames(List<String> characterNames) { this.characterNames = characterNames; }
}
