package com.epicstuff.dto;

import java.util.List;
import java.util.Map;

public class LocationStatsResponse {
    private Long locationId;
    private String locationName;
    
    // // [DONE] Boolean flag statistics
    private Boolean isRealPlace;
    private Boolean isMythological;
    private Boolean isModernLocation;
    private Boolean isAccessibleToday;
    private Boolean isUnderwater;
    private Boolean isArchaeological;
    private Boolean isTouristDestination;
    private Boolean hasModernName;
    private Boolean hasCoordinates;
    
    // // [DONE] Relationship counts
    private Integer characterCount;
    private Integer eventCount;
    private Integer sagaCount;
    
    // // [DONE] Array statistics
    private Integer alternativeNameCount;
    private Integer notableFeatureCount;
    private Integer historicalPeriodCount;
    private Integer mythologicalEventCount;
    private Integer modernLandmarkCount;
    
    // // [DONE] Geographic data
    private String regionType;
    private String regionName;
    private String parentRegion;
    private Double latitude;
    private Double longitude;
    private Double altitude;
    
    // // [DONE] Cultural significance
    private String culturalImportance;
    private List<String> culturalTags;
    private Integer literaryReferenceCount;
    
    // // [DONE] Tourism data
    private Boolean hasTravelInfo;
    private String nearestAirport;
    private List<String> accessMethods;
    private String bestTimeToVisit;
    
    // // [DONE] Related entities
    private List<String> characterNames;
    private List<String> eventTitles;
    private List<String> sagaTitles;
    private Map<String, Integer> characterTypeCount;

    // Constructors
    public LocationStatsResponse() {}

    // Getters and Setters
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

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

    public Boolean getIsUnderwater() {
        return isUnderwater;
    }

    public void setIsUnderwater(Boolean isUnderwater) {
        this.isUnderwater = isUnderwater;
    }

    public Boolean getIsArchaeological() {
        return isArchaeological;
    }

    public void setIsArchaeological(Boolean isArchaeological) {
        this.isArchaeological = isArchaeological;
    }

    public Boolean getIsTouristDestination() {
        return isTouristDestination;
    }

    public void setIsTouristDestination(Boolean isTouristDestination) {
        this.isTouristDestination = isTouristDestination;
    }

    public Boolean getHasModernName() {
        return hasModernName;
    }

    public void setHasModernName(Boolean hasModernName) {
        this.hasModernName = hasModernName;
    }

    public Boolean getHasCoordinates() {
        return hasCoordinates;
    }

    public void setHasCoordinates(Boolean hasCoordinates) {
        this.hasCoordinates = hasCoordinates;
    }

    public Integer getCharacterCount() {
        return characterCount;
    }

    public void setCharacterCount(Integer characterCount) {
        this.characterCount = characterCount;
    }

    public Integer getEventCount() {
        return eventCount;
    }

    public void setEventCount(Integer eventCount) {
        this.eventCount = eventCount;
    }

    public Integer getSagaCount() {
        return sagaCount;
    }

    public void setSagaCount(Integer sagaCount) {
        this.sagaCount = sagaCount;
    }

    public Integer getAlternativeNameCount() {
        return alternativeNameCount;
    }

    public void setAlternativeNameCount(Integer alternativeNameCount) {
        this.alternativeNameCount = alternativeNameCount;
    }

    public Integer getNotableFeatureCount() {
        return notableFeatureCount;
    }

    public void setNotableFeatureCount(Integer notableFeatureCount) {
        this.notableFeatureCount = notableFeatureCount;
    }

    public Integer getHistoricalPeriodCount() {
        return historicalPeriodCount;
    }

    public void setHistoricalPeriodCount(Integer historicalPeriodCount) {
        this.historicalPeriodCount = historicalPeriodCount;
    }

    public Integer getMythologicalEventCount() {
        return mythologicalEventCount;
    }

    public void setMythologicalEventCount(Integer mythologicalEventCount) {
        this.mythologicalEventCount = mythologicalEventCount;
    }

    public Integer getModernLandmarkCount() {
        return modernLandmarkCount;
    }

    public void setModernLandmarkCount(Integer modernLandmarkCount) {
        this.modernLandmarkCount = modernLandmarkCount;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getParentRegion() {
        return parentRegion;
    }

    public void setParentRegion(String parentRegion) {
        this.parentRegion = parentRegion;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getAltitude() {
        return altitude;
    }

    public void setAltitude(Double altitude) {
        this.altitude = altitude;
    }

    public String getCulturalImportance() {
        return culturalImportance;
    }

    public void setCulturalImportance(String culturalImportance) {
        this.culturalImportance = culturalImportance;
    }

    public List<String> getCulturalTags() {
        return culturalTags;
    }

    public void setCulturalTags(List<String> culturalTags) {
        this.culturalTags = culturalTags;
    }

    public Integer getLiteraryReferenceCount() {
        return literaryReferenceCount;
    }

    public void setLiteraryReferenceCount(Integer literaryReferenceCount) {
        this.literaryReferenceCount = literaryReferenceCount;
    }

    public String getBestTimeToVisit() {
        return bestTimeToVisit;
    }

    public void setBestTimeToVisit(String bestTimeToVisit) {
        this.bestTimeToVisit = bestTimeToVisit;
    }

    public List<String> getCharacterNames() {
        return characterNames;
    }

    public void setCharacterNames(List<String> characterNames) {
        this.characterNames = characterNames;
    }

    public List<String> getEventTitles() {
        return eventTitles;
    }

    public void setEventTitles(List<String> eventTitles) {
        this.eventTitles = eventTitles;
    }

    public List<String> getSagaTitles() {
        return sagaTitles;
    }

    public void setSagaTitles(List<String> sagaTitles) {
        this.sagaTitles = sagaTitles;
    }

    public Map<String, Integer> getCharacterTypeCount() {
        return characterTypeCount;
    }

    public void setCharacterTypeCount(Map<String, Integer> characterTypeCount) {
        this.characterTypeCount = characterTypeCount;
    }

    // Builder pattern
    public static class LocationStatsResponseBuilder {
        private LocationStatsResponse response = new LocationStatsResponse();

        public LocationStatsResponseBuilder locationId(Long locationId) {
            response.setLocationId(locationId);
            return this;
        }

        public LocationStatsResponseBuilder locationName(String locationName) {
            response.setLocationName(locationName);
            return this;
        }

        public LocationStatsResponseBuilder isRealPlace(Boolean isRealPlace) {
            response.setIsRealPlace(isRealPlace);
            return this;
        }

        public LocationStatsResponseBuilder isMythological(Boolean isMythological) {
            response.setIsMythological(isMythological);
            return this;
        }

        public LocationStatsResponseBuilder isModernLocation(Boolean isModernLocation) {
            response.setIsModernLocation(isModernLocation);
            return this;
        }

        public LocationStatsResponseBuilder isAccessibleToday(Boolean isAccessibleToday) {
            response.setIsAccessibleToday(isAccessibleToday);
            return this;
        }

        public LocationStatsResponseBuilder isUnderwater(Boolean isUnderwater) {
            response.setIsUnderwater(isUnderwater);
            return this;
        }

        public LocationStatsResponseBuilder isArchaeological(Boolean isArchaeological) {
            response.setIsArchaeological(isArchaeological);
            return this;
        }

        public LocationStatsResponseBuilder isTouristDestination(Boolean isTouristDestination) {
            response.setIsTouristDestination(isTouristDestination);
            return this;
        }

        public LocationStatsResponseBuilder hasModernName(Boolean hasModernName) {
            response.setHasModernName(hasModernName);
            return this;
        }

        public LocationStatsResponseBuilder hasCoordinates(Boolean hasCoordinates) {
            response.setHasCoordinates(hasCoordinates);
            return this;
        }

        public LocationStatsResponseBuilder characterCount(Integer characterCount) {
            response.setCharacterCount(characterCount);
            return this;
        }

        public LocationStatsResponseBuilder eventCount(Integer eventCount) {
            response.setEventCount(eventCount);
            return this;
        }

        public LocationStatsResponseBuilder sagaCount(Integer sagaCount) {
            response.setSagaCount(sagaCount);
            return this;
        }

        public LocationStatsResponseBuilder alternativeNameCount(Integer alternativeNameCount) {
            response.setAlternativeNameCount(alternativeNameCount);
            return this;
        }

        public LocationStatsResponseBuilder notableFeatureCount(Integer notableFeatureCount) {
            response.setNotableFeatureCount(notableFeatureCount);
            return this;
        }

        public LocationStatsResponseBuilder historicalPeriodCount(Integer historicalPeriodCount) {
            response.setHistoricalPeriodCount(historicalPeriodCount);
            return this;
        }

        public LocationStatsResponseBuilder mythologicalEventCount(Integer mythologicalEventCount) {
            response.setMythologicalEventCount(mythologicalEventCount);
            return this;
        }

        public LocationStatsResponseBuilder modernLandmarkCount(Integer modernLandmarkCount) {
            response.setModernLandmarkCount(modernLandmarkCount);
            return this;
        }

        public LocationStatsResponseBuilder regionType(String regionType) {
            response.setRegionType(regionType);
            return this;
        }

        public LocationStatsResponseBuilder regionName(String regionName) {
            response.setRegionName(regionName);
            return this;
        }

        public LocationStatsResponseBuilder parentRegion(String parentRegion) {
            response.setParentRegion(parentRegion);
            return this;
        }

        public LocationStatsResponseBuilder latitude(Double latitude) {
            response.setLatitude(latitude);
            return this;
        }

        public LocationStatsResponseBuilder longitude(Double longitude) {
            response.setLongitude(longitude);
            return this;
        }

        public LocationStatsResponseBuilder altitude(Double altitude) {
            response.setAltitude(altitude);
            return this;
        }

        public LocationStatsResponseBuilder culturalImportance(String culturalImportance) {
            response.setCulturalImportance(culturalImportance);
            return this;
        }

        public LocationStatsResponseBuilder culturalTags(List<String> culturalTags) {
            response.setCulturalTags(culturalTags);
            return this;
        }

        public LocationStatsResponseBuilder literaryReferenceCount(Integer literaryReferenceCount) {
            response.setLiteraryReferenceCount(literaryReferenceCount);
            return this;
        }

        public LocationStatsResponseBuilder bestTimeToVisit(String bestTimeToVisit) {
            response.setBestTimeToVisit(bestTimeToVisit);
            return this;
        }

        public LocationStatsResponseBuilder characterNames(List<String> characterNames) {
            response.setCharacterNames(characterNames);
            return this;
        }

        public LocationStatsResponseBuilder eventTitles(List<String> eventTitles) {
            response.setEventTitles(eventTitles);
            return this;
        }

        public LocationStatsResponseBuilder sagaTitles(List<String> sagaTitles) {
            response.setSagaTitles(sagaTitles);
            return this;
        }

        public LocationStatsResponseBuilder characterTypeCount(Map<String, Integer> characterTypeCount) {
            response.setCharacterTypeCount(characterTypeCount);
            return this;
        }

        public LocationStatsResponse build() {
            return response;
        }
    }

    public static LocationStatsResponseBuilder builder() {
        return new LocationStatsResponseBuilder();
    }
}