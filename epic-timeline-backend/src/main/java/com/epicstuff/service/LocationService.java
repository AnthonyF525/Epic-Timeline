package com.epicstuff.service;

import com.epicstuff.model.Location;
import com.epicstuff.model.Character;
import com.epicstuff.model.Event;
import com.epicstuff.repository.LocationRepository;
import com.epicstuff.repository.CharacterRepository;
import com.epicstuff.repository.EventRepository;
import com.epicstuff.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @Autowired
    private EventRepository eventRepository;

    // ✅ Get all locations with filtering
    public Page<Location> findAllWithFilter(LocationFilterRequest filter, Pageable pageable) {
        return locationRepository.findAllWithFilter(filter, pageable);
    }

    // ✅ Get location by ID with populated relationships
    public Optional<Location> findByIdWithRelations(Long id) {
        return locationRepository.findByIdWithCharactersAndEvents(id);
    }

    // ✅ Create new location with coordinate and boolean validation
    public Location createLocation(LocationCreateRequest request) {
        // ✅ Custom validation beyond annotations
        validateLocationRequest(request);
        
        Location location = Location.builder()
            .name(request.getName())
            .description(request.getDescription())
            
            // ✅ Coordinate validation and mapping
            .coordinates(mapCoordinates(request.getCoordinates()))
            
            // ✅ Boolean flags (all required)
            .isRealPlace(request.getIsRealPlace())
            .isMythological(request.getIsMythological())
            .isModernLocation(request.getIsModernLocation())
            .isAccessibleToday(request.getIsAccessibleToday())
            .isUnderwater(request.getIsUnderwater())
            .isArchaeological(request.getIsArchaeological())
            .isTouristDestination(request.getIsTouristDestination())
            .hasModernName(request.getHasModernName())
            
            // ✅ Names
            .modernName(request.getModernName())
            .ancientName(request.getAncientName())
            
            // ✅ Region mapping
            .region(mapGeographicRegion(request.getRegion()))
            
            // ✅ Array fields with validation and cleaning
            .alternativeNames(validateAndCleanStringList(request.getAlternativeNames()))
            .notableFeatures(validateAndCleanStringList(request.getNotableFeatures()))
            .historicalPeriods(validateAndCleanStringList(request.getHistoricalPeriods()))
            .mythologicalEvents(validateAndCleanStringList(request.getMythologicalEvents()))
            .modernLandmarks(validateAndCleanStringList(request.getModernLandmarks()))
            
            // ✅ Entity relationships
            .characterIds(request.getCharacterIds() != null ? new ArrayList<>(request.getCharacterIds()) : new ArrayList<>())
            .eventIds(request.getEventIds() != null ? new ArrayList<>(request.getEventIds()) : new ArrayList<>())
            .sagaIds(request.getSagaIds() != null ? new ArrayList<>(request.getSagaIds()) : new ArrayList<>())
            
            // ✅ Travel info and cultural significance
            .travelInfo(mapTravelInfo(request.getTravelInfo()))
            .culturalSignificance(mapCulturalSignificance(request.getCulturalSignificance()))
            
            .build();
        
        // ✅ Validate entity relationships exist
        validateEntityRelationships(request.getCharacterIds(), request.getEventIds(), request.getSagaIds());
        
        return locationRepository.save(location);
    }

    // ✅ Update existing location
    public Optional<Location> updateLocation(Long id, LocationUpdateRequest request) {
        return locationRepository.findById(id).map(existingLocation -> {
            // ✅ Update basic fields if provided
            if (request.getName() != null) {
                existingLocation.setName(request.getName());
            }
            if (request.getDescription() != null) {
                existingLocation.setDescription(request.getDescription());
            }
            
            // ✅ Update coordinates if provided
            if (request.getCoordinates() != null) {
                validateCoordinates(request.getCoordinates());
                existingLocation.setCoordinates(mapCoordinates(request.getCoordinates()));
            }
            
            // ✅ Update boolean flags if provided
            if (request.getIsRealPlace() != null) {
                existingLocation.setIsRealPlace(request.getIsRealPlace());
            }
            if (request.getIsMythological() != null) {
                existingLocation.setIsMythological(request.getIsMythological());
            }
            if (request.getIsModernLocation() != null) {
                existingLocation.setIsModernLocation(request.getIsModernLocation());
            }
            if (request.getIsAccessibleToday() != null) {
                existingLocation.setIsAccessibleToday(request.getIsAccessibleToday());
            }
            if (request.getIsUnderwater() != null) {
                existingLocation.setIsUnderwater(request.getIsUnderwater());
            }
            if (request.getIsArchaeological() != null) {
                existingLocation.setIsArchaeological(request.getIsArchaeological());
            }
            if (request.getIsTouristDestination() != null) {
                existingLocation.setIsTouristDestination(request.getIsTouristDestination());
            }
            if (request.getHasModernName() != null) {
                existingLocation.setHasModernName(request.getHasModernName());
            }
            
            // ✅ Update names if provided
            if (request.getModernName() != null) {
                existingLocation.setModernName(request.getModernName());
            }
            if (request.getAncientName() != null) {
                existingLocation.setAncientName(request.getAncientName());
            }
            
            // ✅ Update region if provided
            if (request.getRegion() != null) {
                existingLocation.setRegion(mapGeographicRegion(request.getRegion()));
            }
            
            // ✅ Update arrays if provided (with validation)
            if (request.getAlternativeNames() != null) {
                existingLocation.setAlternativeNames(validateAndCleanStringList(request.getAlternativeNames()));
            }
            if (request.getNotableFeatures() != null) {
                existingLocation.setNotableFeatures(validateAndCleanStringList(request.getNotableFeatures()));
            }
            if (request.getHistoricalPeriods() != null) {
                existingLocation.setHistoricalPeriods(validateAndCleanStringList(request.getHistoricalPeriods()));
            }
            if (request.getMythologicalEvents() != null) {
                existingLocation.setMythologicalEvents(validateAndCleanStringList(request.getMythologicalEvents()));
            }
            if (request.getModernLandmarks() != null) {
                existingLocation.setModernLandmarks(validateAndCleanStringList(request.getModernLandmarks()));
            }
            
            // ✅ Update entity relationships if provided
            if (request.getCharacterIds() != null) {
                validateCharacterIds(request.getCharacterIds());
                existingLocation.setCharacterIds(new ArrayList<>(request.getCharacterIds()));
            }
            if (request.getEventIds() != null) {
                validateEventIds(request.getEventIds());
                existingLocation.setEventIds(new ArrayList<>(request.getEventIds()));
            }
            if (request.getSagaIds() != null) {
                validateSagaIds(request.getSagaIds());
                existingLocation.setSagaIds(new ArrayList<>(request.getSagaIds()));
            }
            
            // ✅ Update travel info and cultural significance if provided
            if (request.getTravelInfo() != null) {
                existingLocation.setTravelInfo(mapTravelInfo(request.getTravelInfo()));
            }
            if (request.getCulturalSignificance() != null) {
                existingLocation.setCulturalSignificance(mapCulturalSignificance(request.getCulturalSignificance()));
            }
            
            return locationRepository.save(existingLocation);
        });
    }

    // ✅ Delete location
    public boolean deleteLocation(Long id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Find nearby locations using coordinate calculation
    public List<Location> findNearbyLocations(Double latitude, Double longitude, Double radiusKm) {
        validateCoordinateValues(latitude, longitude);
        return locationRepository.findNearbyLocations(latitude, longitude, radiusKm);
    }

    // ✅ Find real locations
    public List<Location> findRealLocations() {
        return locationRepository.findByIsRealPlaceTrue();
    }

    // ✅ Find mythological locations
    public List<Location> findMythologicalLocations() {
        return locationRepository.findByIsMythologicalTrue();
    }

    // ✅ Find tourist destinations
    public List<Location> findTouristDestinations() {
        return locationRepository.findByIsTouristDestinationTrue();
    }

    // ✅ Get location characters
    public List<Character> getLocationCharacters(Long id) {
        return locationRepository.findById(id)
            .map(location -> characterRepository.findAllById(location.getCharacterIds()))
            .orElse(new ArrayList<>());
    }

    // ✅ Get location events
    public List<Event> getLocationEvents(Long id) {
        return locationRepository.findById(id)
            .map(location -> eventRepository.findAllById(location.getEventIds()))
            .orElse(new ArrayList<>());
    }

    // ✅ Update coordinates specifically
    public Optional<Location> updateCoordinates(Long id, CoordinatesUpdateRequest request) {
        validateCoordinateValues(request.getLatitude(), request.getLongitude());
        
        return locationRepository.findById(id).map(location -> {
            Coordinates coordinates = Coordinates.builder()
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .altitude(request.getAltitude())
                .accuracy(request.getAccuracy())
                .timestamp(java.time.Instant.now().toString())
                .build();
            
            location.setCoordinates(coordinates);
            return locationRepository.save(location);
        });
    }

    // ✅ Get location statistics
    public Optional<LocationStatsResponse> getLocationStats(Long id) {
        return locationRepository.findByIdWithRelations(id).map(location -> {
            return LocationStatsResponse.builder()
                .locationId(location.getId())
                .locationName(location.getName())
                
                // Boolean flag statistics
                .isRealPlace(location.getIsRealPlace())
                .isMythological(location.getIsMythological())
                .isModernLocation(location.getIsModernLocation())
                .isAccessibleToday(location.getIsAccessibleToday())
                .isUnderwater(location.getIsUnderwater())
                .isArchaeological(location.getIsArchaeological())
                .isTouristDestination(location.getIsTouristDestination())
                .hasModernName(location.getHasModernName())
                .hasCoordinates(location.getCoordinates() != null)
                
                // Relationship counts
                .characterCount(location.getCharacterIds().size())
                .eventCount(location.getEventIds().size())
                .sagaCount(location.getSagaIds().size())
                
                // Array statistics
                .alternativeNameCount(location.getAlternativeNames().size())
                .notableFeatureCount(location.getNotableFeatures().size())
                .historicalPeriodCount(location.getHistoricalPeriods().size())
                .mythologicalEventCount(location.getMythologicalEvents().size())
                .modernLandmarkCount(location.getModernLandmarks().size())
                
                // Geographic data
                .regionType(location.getRegion().getType())
                .regionName(location.getRegion().getName())
                .parentRegion(location.getRegion().getParentRegion())
                .latitude(location.getCoordinates() != null ? location.getCoordinates().getLatitude() : null)
                .longitude(location.getCoordinates() != null ? location.getCoordinates().getLongitude() : null)
                .altitude(location.getCoordinates() != null ? location.getCoordinates().getAltitude() : null)
                
                // Cultural significance
                .culturalImportance(location.getCulturalSignificance().getImportance())
                .culturalTags(location.getCulturalSignificance().getCulturalTags())
                .literaryReferenceCount(location.getCulturalSignificance().getLiteraryReferences().size())
                
                // Tourism data
                .hasTravelInfo(location.getTravelInfo() != null)
                .nearestAirport(location.getTravelInfo() != null ? location.getTravelInfo().getNearestAirport() : null)
                .accessMethods(location.getTravelInfo() != null ? location.getTravelInfo().getAccessMethods() : null)
                .bestTimeToVisit(location.getTravelInfo() != null ? location.getTravelInfo().getBestTimeToVisit() : null)
                
                // Related entities
                .characterNames(getCharacterNames(location.getCharacterIds()))
                .eventTitles(getEventTitles(location.getEventIds()))
                .sagaTitles(getSagaTitles(location.getSagaIds()))
                .characterTypeCount(getCharacterTypeCount(location.getCharacterIds()))
                
                .build();
        });
    }

    // ✅ Private validation methods
    private void validateLocationRequest(LocationCreateRequest request) {
        // ✅ Validate coordinate constraints
        if (request.getCoordinates() != null) {
            validateCoordinates(request.getCoordinates());
        }
        
        // ✅ Validate boolean flag logic
        validateBooleanFlagLogic(request);
        
        // ✅ Validate region type
        validateRegionType(request.getRegion().getType());
        
        // ✅ Validate cultural importance
        validateCulturalImportance(request.getCulturalSignificance().getImportance());
        
        // ✅ Validate arrays don't have duplicates
        if (hasDuplicates(request.getAlternativeNames())) {
            throw new IllegalArgumentException("Alternative names cannot contain duplicates");
        }
        if (hasDuplicates(request.getNotableFeatures())) {
            throw new IllegalArgumentException("Notable features cannot contain duplicates");
        }
    }

    private void validateCoordinates(CoordinatesRequest coordinates) {
        if (coordinates == null) return;
        
        validateCoordinateValues(coordinates.getLatitude(), coordinates.getLongitude());
        
        // ✅ Additional coordinate validation
        if (coordinates.getAltitude() != null) {
            if (coordinates.getAltitude() < -500 || coordinates.getAltitude() > 10000) {
                throw new IllegalArgumentException("Altitude must be between -500 and 10000 meters");
            }
        }
        
        if (coordinates.getAccuracy() != null) {
            if (coordinates.getAccuracy() < 0 || coordinates.getAccuracy() > 10000) {
                throw new IllegalArgumentException("Accuracy must be between 0 and 10000 meters");
            }
        }
    }

    private void validateCoordinateValues(Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            throw new IllegalArgumentException("Latitude and longitude are required");
        }
        
        if (latitude < -90 || latitude > 90) {
            throw new IllegalArgumentException("Latitude must be between -90 and 90 degrees");
        }
        
        if (longitude < -180 || longitude > 180) {
            throw new IllegalArgumentException("Longitude must be between -180 and 180 degrees");
        }
    }

    private void validateBooleanFlagLogic(LocationCreateRequest request) {
        // ✅ Epic Timeline specific business logic validation
        
        // Real places cannot be mythological
        if (Boolean.TRUE.equals(request.getIsRealPlace()) && Boolean.TRUE.equals(request.getIsMythological())) {
            throw new IllegalArgumentException("Location cannot be both real and mythological");
        }
        
        // Underwater locations cannot be tourist destinations (usually)
        if (Boolean.TRUE.equals(request.getIsUnderwater()) && Boolean.TRUE.equals(request.getIsTouristDestination())) {
            // This is a warning rather than error - some underwater sites are tourist destinations
        }
        
        // Mythological locations typically not accessible today
        if (Boolean.TRUE.equals(request.getIsMythological()) && Boolean.TRUE.equals(request.getIsAccessibleToday())) {
            // This is allowed but unusual - some mythological places have real counterparts
        }
        
        // Modern name validation
        if (Boolean.TRUE.equals(request.getHasModernName()) && 
            (request.getModernName() == null || request.getModernName().trim().isEmpty())) {
            throw new IllegalArgumentException("Modern name is required when hasModernName is true");
        }
    }

    private void validateRegionType(String regionType) {
        Set<String> allowedTypes = Set.of("sea", "land", "island", "city", "region", "country");
        if (!allowedTypes.contains(regionType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid region type: " + regionType + 
                ". Allowed values: " + allowedTypes);
        }
    }

    private void validateCulturalImportance(String importance) {
        Set<String> allowedValues = Set.of("low", "medium", "high", "legendary");
        if (!allowedValues.contains(importance.toLowerCase())) {
            throw new IllegalArgumentException("Invalid cultural importance: " + importance + 
                ". Allowed values: " + allowedValues);
        }
    }

    private void validateEntityRelationships(List<Long> characterIds, List<Long> eventIds, List<Long> sagaIds) {
        if (characterIds != null && !characterIds.isEmpty()) {
            validateCharacterIds(characterIds);
        }
        if (eventIds != null && !eventIds.isEmpty()) {
            validateEventIds(eventIds);
        }
        if (sagaIds != null && !sagaIds.isEmpty()) {
            validateSagaIds(sagaIds);
        }
    }

    private void validateCharacterIds(List<Long> characterIds) {
        List<Long> existingIds = characterRepository.findAllById(characterIds)
            .stream()
            .map(Character::getId)
            .collect(Collectors.toList());
        
        List<Long> invalidIds = characterIds.stream()
            .filter(id -> !existingIds.contains(id))
            .collect(Collectors.toList());
        
        if (!invalidIds.isEmpty()) {
            throw new IllegalArgumentException("Invalid character IDs: " + invalidIds);
        }
    }

    private void validateEventIds(List<Long> eventIds) {
        List<Long> existingIds = eventRepository.findAllById(eventIds)
            .stream()
            .map(Event::getId)
            .collect(Collectors.toList());
        
        List<Long> invalidIds = eventIds.stream()
            .filter(id -> !existingIds.contains(id))
            .collect(Collectors.toList());
        
        if (!invalidIds.isEmpty()) {
            throw new IllegalArgumentException("Invalid event IDs: " + invalidIds);
        }
    }

    private void validateSagaIds(List<Long> sagaIds) {
        // Implementation depends on Saga repository
        // Similar pattern to character/event validation
    }

    private List<String> validateAndCleanStringList(List<String> strings) {
        if (strings == null) return new ArrayList<>();
        
        return strings.stream()
            .filter(Objects::nonNull)
            .map(String::trim)
            .filter(s -> !s.isEmpty())
            .distinct() // Remove duplicates
            .collect(Collectors.toList());
    }

    private boolean hasDuplicates(List<String> list) {
        if (list == null) return false;
        Set<String> seen = new HashSet<>();
        return list.stream().anyMatch(item -> !seen.add(item.toLowerCase().trim()));
    }

    // ✅ Mapping methods for nested objects
    private Coordinates mapCoordinates(CoordinatesRequest request) {
        if (request == null) return null;
        
        return Coordinates.builder()
            .latitude(request.getLatitude())
            .longitude(request.getLongitude())
            .altitude(request.getAltitude())
            .accuracy(request.getAccuracy())
            .timestamp(request.getTimestamp() != null ? request.getTimestamp() : 
                      java.time.Instant.now().toString())
            .build();
    }

    private GeographicRegion mapGeographicRegion(GeographicRegionRequest request) {
        return GeographicRegion.builder()
            .name(request.getName())
            .type(request.getType())
            .parentRegion(request.getParentRegion())
            .build();
    }

    private TravelInfo mapTravelInfo(TravelInfoRequest request) {
        if (request == null) return null;
        
        return TravelInfo.builder()
            .nearestAirport(request.getNearestAirport())
            .accessMethods(validateAndCleanStringList(request.getAccessMethods()))
            .bestTimeToVisit(request.getBestTimeToVisit())
            .estimatedVisitDuration(request.getEstimatedVisitDuration())
            .build();
    }

    private CulturalSignificance mapCulturalSignificance(CulturalSignificanceRequest request) {
        return CulturalSignificance.builder()
            .importance(request.getImportance())
            .culturalTags(validateAndCleanStringList(request.getCulturalTags()))
            .literaryReferences(validateAndCleanStringList(request.getLiteraryReferences()))
            .build();
    }

    // ✅ Helper methods for statistics
    private List<String> getCharacterNames(List<Long> characterIds) {
        return characterRepository.findAllById(characterIds)
            .stream()
            .map(Character::getName)
            .collect(Collectors.toList());
    }

    private List<String> getEventTitles(List<Long> eventIds) {
        return eventRepository.findAllById(eventIds)
            .stream()
            .map(Event::getTitle)
            .collect(Collectors.toList());
    }

    private List<String> getSagaTitles(List<Long> sagaIds) {
        // Implementation depends on Saga repository
        return new ArrayList<>();
    }

    private Map<String, Integer> getCharacterTypeCount(List<Long> characterIds) {
        return characterRepository.findAllById(characterIds)
            .stream()
            .collect(Collectors.groupingBy(
                character -> character.getCharacterType().toString(),
                Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)
            ));
    }
}