package com.epicstuff.dto;

import java.util.List;

public class SagaUpdateRequest {
    private String title;
    private String description;
    private String genre;
    private String releaseDate;
    private Integer episodeCount;
    private List<String> genres;
    private List<String> themes;
    private List<String> inspirations;
    private String albumArtUrl;
    private String amazonMusicUrl;
    private String youtubePlaylistUrl;
    private Integer totalDurationSeconds;

    public SagaUpdateRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }

    public Integer getEpisodeCount() { return episodeCount; }
    public void setEpisodeCount(Integer episodeCount) { this.episodeCount = episodeCount; }

    public List<String> getGenres() { return genres; }
    public void setGenres(List<String> genres) { this.genres = genres; }

    public List<String> getThemes() { return themes; }
    public void setThemes(List<String> themes) { this.themes = themes; }

    public List<String> getInspirations() { return inspirations; }
    public void setInspirations(List<String> inspirations) { this.inspirations = inspirations; }

    public String getAlbumArtUrl() { return albumArtUrl; }
    public void setAlbumArtUrl(String albumArtUrl) { this.albumArtUrl = albumArtUrl; }

    public String getAmazonMusicUrl() { return amazonMusicUrl; }
    public void setAmazonMusicUrl(String amazonMusicUrl) { this.amazonMusicUrl = amazonMusicUrl; }

    public String getYoutubePlaylistUrl() { return youtubePlaylistUrl; }
    public void setYoutubePlaylistUrl(String youtubePlaylistUrl) { this.youtubePlaylistUrl = youtubePlaylistUrl; }

    public Integer getTotalDurationSeconds() { return totalDurationSeconds; }
    public void setTotalDurationSeconds(Integer totalDurationSeconds) { this.totalDurationSeconds = totalDurationSeconds; }
}
