package com.epicstuff.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SagaFilterRequest {
    private String genre;
    private String theme;
    private String inspiration;
    private String search;
    private Integer minSongCount;
    private Integer maxSongCount;
    private String releasedAfter;
    private String releasedBefore;
}
