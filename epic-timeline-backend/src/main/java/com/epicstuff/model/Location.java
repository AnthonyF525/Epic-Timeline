package com.epicstuff.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "is_real_place")
    private Boolean isRealPlace = false;

    @Column(name = "is_mythological")
    private Boolean isMythological = false;

    @Column(name = "modern_name")
    private String modernName;

    @ElementCollection
    @CollectionTable(name = "location_names", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "alternative_name")
    private List<String> alternativeNames = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "location_features", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "feature")
    private List<String> notableFeatures = new ArrayList<>();

    @OneToMany(mappedBy = "location")
    private List<Event> events = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saga_id")
    private Saga saga;
    
    // For now, create a simple cultural significance structure
    @Embedded
    private CulturalSignificance culturalSignificance;
    
    @Embeddable
    public static class CulturalSignificance {
        private String importance; // legendary, high, medium, low

        public CulturalSignificance() {}

        public CulturalSignificance(String importance) {
            this.importance = importance;
        }

        public String getImportance() { return importance; }
        public void setImportance(String importance) { this.importance = importance; }
    }

    public Location() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Boolean getIsRealPlace() { return isRealPlace; }
    public void setIsRealPlace(Boolean isRealPlace) { this.isRealPlace = isRealPlace; }

    public Boolean getIsMythological() { return isMythological; }
    public void setIsMythological(Boolean isMythological) { this.isMythological = isMythological; }

    public String getModernName() { return modernName; }
    public void setModernName(String modernName) { this.modernName = modernName; }

    public List<String> getAlternativeNames() { return alternativeNames; }
    public void setAlternativeNames(List<String> alternativeNames) { this.alternativeNames = alternativeNames; }

    public List<String> getNotableFeatures() { return notableFeatures; }
    public void setNotableFeatures(List<String> notableFeatures) { this.notableFeatures = notableFeatures; }

    public List<Event> getEvents() { return events; }
    public void setEvents(List<Event> events) { this.events = events; }

    public Saga getSaga() { return saga; }
    public void setSaga(Saga saga) { this.saga = saga; }

    public CulturalSignificance getCulturalSignificance() { return culturalSignificance; }
    public void setCulturalSignificance(CulturalSignificance culturalSignificance) { this.culturalSignificance = culturalSignificance; }
}
