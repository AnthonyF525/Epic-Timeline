package com.epicstuff.model;

import com.epicstuff.model.enums.CharacterType;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "characters")
public class Character {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "character_type")
    private CharacterType characterType;

    @Column(name = "is_protagonist")
    private Boolean isProtagonist = false;

    @ElementCollection
    @CollectionTable(name = "character_aliases", joinColumns = @JoinColumn(name = "character_id"))
    @Column(name = "alias")
    private List<String> aliases = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "character_powers", joinColumns = @JoinColumn(name = "character_id"))
    @Column(name = "power")
    private List<String> powers = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saga_id")
    @JsonIgnore
    private Saga saga;

    @ManyToMany(mappedBy = "characters")
    @JsonIgnore
    private List<Song> songs = new ArrayList<>();

    @ManyToMany(mappedBy = "characters")
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    public Character() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CharacterType getCharacterType() { return characterType; }
    public void setCharacterType(CharacterType characterType) { this.characterType = characterType; }

    public Boolean getIsProtagonist() { return isProtagonist; }
    public void setIsProtagonist(Boolean isProtagonist) { this.isProtagonist = isProtagonist; }

    public List<String> getAliases() { return aliases; }
    public void setAliases(List<String> aliases) { this.aliases = aliases; }

    public List<String> getPowers() { return powers; }
    public void setPowers(List<String> powers) { this.powers = powers; }

    public Saga getSaga() { return saga; }
    public void setSaga(Saga saga) { this.saga = saga; }

    public List<Song> getSongs() { return songs; }
    public void setSongs(List<Song> songs) { this.songs = songs; }

    public List<Event> getEvents() { return events; }
    public void setEvents(List<Event> events) { this.events = events; }
}
