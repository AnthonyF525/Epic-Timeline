package com.epicstuff.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class SongStatsResponse {
    private Long songId;
    private String songTitle;
    private Integer durationSeconds;
    private Integer characterCount;

    // // [DONE] Array statistics
    private List<String> allThemes;
    private List<String> allGenres;
    private List<String> allInstruments;
    private List<String> allVocals;
    private List<String> allMoods;
    private List<String> allTags;
    private Map<String, Integer> themeCount;
    private Map<String, Integer> genreCount;
    private Map<String, Integer> moodCount;

    // // [DONE] Character statistics
    private List<String> characterNames;
    private Map<String, Integer> characterTypeCount;

    // // [DONE] Song structure statistics
    private Integer sectionCount;
    private Integer lyricHighlightCount;
    private Integer externalLinkCount;
    private Integer inspirationSourceCount;

    // // [DONE] Musical metadata
    private Boolean isInstrumental;
    private Boolean hasDialogue;
    private Boolean isReprise;
    private String originalSongTitle; // If reprise
}
