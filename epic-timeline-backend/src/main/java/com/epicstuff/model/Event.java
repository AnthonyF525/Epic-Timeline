package com.epicstuff.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import com.epicstuff.model.Location;
import com.epicstuff.model.Song;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(name = "sequence_order")
    private Integer sequenceOrder;

    @Column(name = "event_timestamp")
    private LocalDateTime eventTimestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saga_id")
    private Saga saga;

    @ManyToMany
    @JoinTable(
        name = "event_characters",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "character_id")
    )
    private List<Character> characters = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "event_songs",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private List<Song> songs = new ArrayList<>();

    @Embedded
    private EventContext eventContext;

    @Embeddable
    public static class EventContext {
        private String importance; // pivotal, legendary, major, minor

        public EventContext() {}

        public EventContext(String importance) {
            this.importance = importance;
        }

        public String getImportance() { return importance; }
        public void setImportance(String importance) { this.importance = importance; }
    }

    public Event() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSequenceOrder() { return sequenceOrder; }
    public void setSequenceOrder(Integer sequenceOrder) { this.sequenceOrder = sequenceOrder; }

    public LocalDateTime getEventTimestamp() { return eventTimestamp; }
    public void setEventTimestamp(LocalDateTime eventTimestamp) { this.eventTimestamp = eventTimestamp; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public Saga getSaga() { return saga; }
    public void setSaga(Saga saga) { this.saga = saga; }

    public List<Character> getCharacters() { return characters; }
    public void setCharacters(List<Character> characters) { this.characters = characters; }

    public List<Song> getSongs() { return songs; }
    public void setSongs(List<Song> songs) { this.songs = songs; }

    public EventContext getEventContext() { return eventContext; }
    public void setEventContext(EventContext eventContext) { this.eventContext = eventContext; }
}
