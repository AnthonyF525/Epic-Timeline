package com.epicstuff.dto;

public class LocationFilterRequest {
    // ✅ Boolean flag filters
    private Boolean isRealPlace;
    private Boolean isMythological;
    private Boolean isModernLocation;
    private Boolean isAccessibleToday;
    private Boolean isTouristDestination;
    private Boolean hasCoordinates;
    private String regionType;
    private String culturalImportance;
    
    // ✅ Relationship filters
    private Long characterId;
    private Long sagaId;
    
    // ✅ Search and geographic filters
    private String search;
    private Double centerLat;
    private Double centerLng;
    private Double radiusKm;
    
    // ✅ Array content filters
    private String alternativeName;
    private String feature;
    private String historicalPeriod;
    private String culturalTag;

    // Constructors
    public LocationFilterRequest() {}

    // Getters and Setters
    public Boolean getIsRealPlace() {
        return isRealPlace;
    }

    public void setIsRealPlace(Boolean isRealPlace) {
        this.isRealPlace = isRealPlace;
    }

    public Boolean getIsMythological() {
        return isMythological;
    }

    public void setIsMythological(Boolean isMythological) {
        this.isMythological = isMythological;
    }

    public Boolean getIsModernLocation() {
        return isModernLocation;
    }

    public void setIsModernLocation(Boolean isModernLocation) {
        this.isModernLocation = isModernLocation;
    }

    public Boolean getIsAccessibleToday() {
        return isAccessibleToday;
    }

    public void setIsAccessibleToday(Boolean isAccessibleToday) {
        this.isAccessibleToday = isAccessibleToday;
    }

    public Boolean getIsTouristDestination() {
        return isTouristDestination;
    }

    public void setIsTouristDestination(Boolean isTouristDestination) {
        this.isTouristDestination = isTouristDestination;
    }

    public Boolean getHasCoordinates() {
        return hasCoordinates;
    }

    public void setHasCoordinates(Boolean hasCoordinates) {
        this.hasCoordinates = hasCoordinates;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public String getCulturalImportance() {
        return culturalImportance;
    }

    public void setCulturalImportance(String culturalImportance) {
        this.culturalImportance = culturalImportance;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public Long getSagaId() {
        return sagaId;
    }

    public void setSagaId(Long sagaId) {
        this.sagaId = sagaId;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Double getCenterLat() {
        return centerLat;
    }

    public void setCenterLat(Double centerLat) {
        this.centerLat = centerLat;
    }

    public Double getCenterLng() {
        return centerLng;
    }

    public void setCenterLng(Double centerLng) {
        this.centerLng = centerLng;
    }

    public Double getRadiusKm() {
        return radiusKm;
    }

    public void setRadiusKm(Double radiusKm) {
        this.radiusKm = radiusKm;
    }

    public String getAlternativeName() {
        return alternativeName;
    }

    public void setAlternativeName(String alternativeName) {
        this.alternativeName = alternativeName;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    public String getHistoricalPeriod() {
        return historicalPeriod;
    }

    public void setHistoricalPeriod(String historicalPeriod) {
        this.historicalPeriod = historicalPeriod;
    }

    public String getCulturalTag() {
        return culturalTag;
    }

    public void setCulturalTag(String culturalTag) {
        this.culturalTag = culturalTag;
    }

    // Builder pattern
    public static class LocationFilterRequestBuilder {
        private LocationFilterRequest request = new LocationFilterRequest();

        public LocationFilterRequestBuilder isRealPlace(Boolean isRealPlace) {
            request.setIsRealPlace(isRealPlace);
            return this;
        }

        public LocationFilterRequestBuilder isMythological(Boolean isMythological) {
            request.setIsMythological(isMythological);
            return this;
        }

        public LocationFilterRequestBuilder isModernLocation(Boolean isModernLocation) {
            request.setIsModernLocation(isModernLocation);
            return this;
        }

        public LocationFilterRequestBuilder isAccessibleToday(Boolean isAccessibleToday) {
            request.setIsAccessibleToday(isAccessibleToday);
            return this;
        }

        public LocationFilterRequestBuilder isTouristDestination(Boolean isTouristDestination) {
            request.setIsTouristDestination(isTouristDestination);
            return this;
        }

        public LocationFilterRequestBuilder hasCoordinates(Boolean hasCoordinates) {
            request.setHasCoordinates(hasCoordinates);
            return this;
        }

        public LocationFilterRequestBuilder regionType(String regionType) {
            request.setRegionType(regionType);
            return this;
        }

        public LocationFilterRequestBuilder culturalImportance(String culturalImportance) {
            request.setCulturalImportance(culturalImportance);
            return this;
        }

        public LocationFilterRequestBuilder characterId(Long characterId) {
            request.setCharacterId(characterId);
            return this;
        }

        public LocationFilterRequestBuilder sagaId(Long sagaId) {
            request.setSagaId(sagaId);
            return this;
        }

        public LocationFilterRequestBuilder search(String search) {
            request.setSearch(search);
            return this;
        }

        public LocationFilterRequestBuilder centerLat(Double centerLat) {
            request.setCenterLat(centerLat);
            return this;
        }

        public LocationFilterRequestBuilder centerLng(Double centerLng) {
            request.setCenterLng(centerLng);
            return this;
        }

        public LocationFilterRequestBuilder radiusKm(Double radiusKm) {
            request.setRadiusKm(radiusKm);
            return this;
        }

        public LocationFilterRequestBuilder alternativeName(String alternativeName) {
            request.setAlternativeName(alternativeName);
            return this;
        }

        public LocationFilterRequestBuilder feature(String feature) {
            request.setFeature(feature);
            return this;
        }

        public LocationFilterRequestBuilder historicalPeriod(String historicalPeriod) {
            request.setHistoricalPeriod(historicalPeriod);
            return this;
        }

        public LocationFilterRequestBuilder culturalTag(String culturalTag) {
            request.setCulturalTag(culturalTag);
            return this;
        }

        public LocationFilterRequest build() {
            return request;
        }
    }

    public static LocationFilterRequestBuilder builder() {
        return new LocationFilterRequestBuilder();
    }
}