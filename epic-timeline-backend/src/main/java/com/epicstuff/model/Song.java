package com.epicstuff.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;

    @Column(name = "track_number")
    private Integer trackNumber;

    @Column(length = 2000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "song_themes", joinColumns = @JoinColumn(name = "song_id"))
    @Column(name = "theme")
    private List<String> themes;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saga_id")
    private Saga saga;

    @ManyToMany
    @JoinTable(
        name = "song_characters",
        joinColumns = @JoinColumn(name = "song_id"),
        inverseJoinColumns = @JoinColumn(name = "character_id")
    )
    private List<Character> characters;

    public Song() {}

    public Song(String title, Integer trackNumber, String description) {
        this.title = title;
        this.trackNumber = trackNumber;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getTrackNumber() { return trackNumber; }
    public void setTrackNumber(Integer trackNumber) { this.trackNumber = trackNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getThemes() { return themes; }
    public void setThemes(List<String> themes) { this.themes = themes; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds;}

    public Saga getSaga() { return saga; }
    public void setSaga(Saga saga) { this.saga = saga; }

    public List<Character> getCharacters() { return characters; }
    public void setCharacters(List<Character> characters) { this.characters= characters; }
}
