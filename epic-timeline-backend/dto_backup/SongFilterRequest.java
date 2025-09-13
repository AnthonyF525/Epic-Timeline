package com.epicstuff.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
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
    private String tag;
    private String lyricist;
    private String composer;
    private String producer;
    private String recordingDateAfter;
    private String recordingDateBefore;
}
