package com.epicstuff.model;

import com.epicstuff.model.enums.ComparisonType;
import jakarta.persistence.*;

@Entity
@Table(name = "comparisons")
public class Comparison {

    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "comparison_type")
    private ComparisonType comparisonType;

    @Column(name = "external_source")
    private String externalSource;

    @Column(name = "external_url")
    private String externalUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
    private Character character;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;

    public Comparison() {}

    public Comparison(String title, String description, ComparisonType comparisonType) {
        this.title = title;
        this.description = description;
        this.comparisonType = comparisonType;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ComparisonType getComparisonType() { return comparisonType; }
    public void setComparisonType(ComparisonType comparisonType) { this.comparisonType = comparisonType; }

    public String getExternalSource() { return externalSource; }
    public void setExternalSource(String externalSource) { this.externalSource = externalSource; }

    public String getExternalUrl() { return externalUrl; }
    public void setExternalUrl(String externalUrl) { this.externalUrl = externalUrl; }

    public Song getSong() { return song; }
    public void setSong(Song song) { this.song = song; }

    public Character getCharacter() { return character; }
    public void setCharacter(Character character) { this.character = character;}

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }
    
}
