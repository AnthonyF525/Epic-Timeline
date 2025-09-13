package com.epicstuff.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "sagas")
public class Saga {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(name = "release_date")
    private String releaseDate;
    
    @Column(name = "episode_count")
    private Integer episodeCount;
    
    @ElementCollection
    @CollectionTable(name = "saga_genres", joinColumns = @JoinColumn(name = "saga_id"))
    @Column(name = "genre")
    private List<String> genres = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "saga_themes", joinColumns = @JoinColumn(name = "saga_id"))
    @Column(name = "theme")
    private List<String> themes = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "saga_inspirations", joinColumns = @JoinColumn(name = "saga_id"))
    @Column(name = "inspiration")
    private List<String> inspirations = new ArrayList<>();
    
    @Column(name = "album_art_url")
    private String albumArtUrl;
    
    @Column(name = "amazon_music_url")
    private String amazonMusicUrl;
    
    @Column(name = "youtube_playlist_url")
    private String youtubePlaylistUrl;
    
    @Column(name = "total_duration_seconds")
    private Integer totalDurationSeconds;
    
    @OneToMany(mappedBy = "saga", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Song> songs = new ArrayList<>();
    
    @OneToMany(mappedBy = "saga", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Character> characters = new ArrayList<>();
    
    @OneToMany(mappedBy = "saga", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Location> locations = new ArrayList<>();
    
    @OneToMany(mappedBy = "saga", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    public Saga() {}

    public static SagaBuilder builder() {
        return new SagaBuilder();
    }

    public static class SagaBuilder {
        private Saga saga = new Saga();

        public SagaBuilder title(String title) { saga.title = title; return this; }
        public SagaBuilder description(String description) { saga.description = description; return this; }
        public SagaBuilder releaseDate(String releaseDate) { saga.releaseDate = releaseDate; return this; }
        public SagaBuilder episodeCount(Integer episodeCount) { saga.episodeCount = episodeCount; return this; }
        public SagaBuilder genres(List<String> genres) { saga.genres = genres; return this; }
        public SagaBuilder themes(List<String> themes) { saga.themes = themes; return this; }
        public SagaBuilder inspirations(List<String> inspirations) { saga.inspirations = inspirations; return this; }
        public SagaBuilder albumArtUrl(String albumArtUrl) { saga.albumArtUrl = albumArtUrl; return this; }
        public SagaBuilder amazonMusicUrl(String amazonMusicUrl) { saga.amazonMusicUrl = amazonMusicUrl; return this; }
        public SagaBuilder youtubePlaylistUrl(String youtubePlaylistUrl) { saga.youtubePlaylistUrl = youtubePlaylistUrl; return this; }
        public SagaBuilder totalDurationSeconds(Integer totalDurationSeconds) { saga.totalDurationSeconds = totalDurationSeconds; return this; }
        public SagaBuilder songs(List<Song> songs) { saga.songs = songs; return this; }
        public SagaBuilder characters(List<Character> characters) { saga.characters = characters; return this; }
        public SagaBuilder locations(List<Location> locations) { saga.locations = locations; return this; }
        public SagaBuilder events(List<Event> events) { saga.events = events; return this; }

        public Saga build() { return saga; }
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

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

    public List<Song> getSongs() { return songs; }
    public void setSongs(List<Song> songs) { this.songs = songs; }

    public List<Character> getCharacters() { return characters; }
    public void setCharacters(List<Character> characters) { this.characters = characters; }

    public List<Location> getLocations() { return locations; }
    public void setLocations(List<Location> locations) { this.locations = locations; }

    public List<Event> getEvents() { return events; }
    public void setEvents(List<Event> events) { this.events = events; }
}
