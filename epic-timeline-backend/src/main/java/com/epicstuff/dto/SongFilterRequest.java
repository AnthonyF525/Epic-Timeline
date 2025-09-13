package com.epicstuff.dto;

import java.util.List;

public class SongFilterRequest {
    private Long sagaId;
    private String theme;
    private String genre;
    private String mood;
    private String instrument;
    private String vocal;
    private Long characterId;
    private Boolean isInstrumental;
    private Boolean hasDialogue;
    private Boolean isReprise;
    private Integer minDuration;
    private Integer maxDuration;
    private String search;

    // Constructors
    public SongFilterRequest() {}

    // Getters and setters
    public Long getSagaId() { return sagaId; }
    public void setSagaId(Long sagaId) { this.sagaId = sagaId; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getInstrument() { return instrument; }
    public void setInstrument(String instrument) { this.instrument = instrument; }

    public String getVocal() { return vocal; }
    public void setVocal(String vocal) { this.vocal = vocal; }

    public Long getCharacterId() { return characterId; }
    public void setCharacterId(Long characterId) { this.characterId = characterId; }

    public Boolean getIsInstrumental() { return isInstrumental; }
    public void setIsInstrumental(Boolean isInstrumental) { this.isInstrumental = isInstrumental; }

    public Boolean getHasDialogue() { return hasDialogue; }
    public void setHasDialogue(Boolean hasDialogue) { this.hasDialogue = hasDialogue; }

    public Boolean getIsReprise() { return isReprise; }
    public void setIsReprise(Boolean isReprise) { this.isReprise = isReprise; }

    public Integer getMinDuration() { return minDuration; }
    public void setMinDuration(Integer minDuration) { this.minDuration = minDuration; }

    public Integer getMaxDuration() { return maxDuration; }
    public void setMaxDuration(Integer maxDuration) { this.maxDuration = maxDuration; }

    public String getSearch() { return search; }
    public void setSearch(String search) { this.search = search; }
}
