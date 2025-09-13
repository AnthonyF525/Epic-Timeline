package com.epicstuff.service;

import com.epicstuff.model.Event;
import com.epicstuff.model.Character;
import com.epicstuff.model.Location;
import com.epicstuff.model.Song;
import com.epicstuff.repository.EventRepository;
import com.epicstuff.repository.CharacterRepository;
import com.epicstuff.repository.LocationRepository;
import com.epicstuff.repository.SongRepository;
import com.epicstuff.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private SongRepository songRepository;

    // ✅ Get all events with filtering
    public Page<Event> findAllWithFilter(EventFilterRequest filter, Pageable pageable) {
        return eventRepository.findAllWithFilter(filter, pageable);
    }

    // ✅ Get event by ID with populated relationships
    public Optional<Event> findByIdWithRelations(Long id) {
        return eventRepository.findByIdWithCharactersAndLocationsAndSongs(id);
    }

    // ✅ Create new event with relationship array validation
    public Event createEvent(EventCreateRequest request) {
        // ✅ Custom validation beyond annotations
        validateEventRequest(request);
        
        Event event = Event.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .eventDate(request.getEventDate())
            
            // ✅ Boolean flags (all required)
            .isHistorical(request.getIsHistorical())
            .isMythological(request.getIsMythological())
            .hasWitnesses(request.getHasWitnesses())
            .hasMultipleVersions(request.getHasMultipleVersions())
            .isPivotal(request.getIsPivotal())
            
            // ✅ Event context (required)
            .eventContext(mapEventContext(request.getEventContext()))
            
            // ✅ Relationship arrays (with validation)
            .characterIds(new ArrayList<>(request.getCharacterIds()))
            .locationIds(new ArrayList<>(request.getLocationIds()))
            .sagaIds(request.getSagaIds() != null ? new ArrayList<>(request.getSagaIds()) : new ArrayList<>())
            .songIds(request.getSongIds() != null ? new ArrayList<>(request.getSongIds()) : new ArrayList<>())
            
            // ✅ Content arrays with validation and cleaning
            .keyDetails(validateAndCleanStringList(request.getKeyDetails()))
            .witnesses(validateAndCleanStringList(request.getWitnesses()))
            .consequences(validateAndCleanStringList(request.getConsequences()))
            .alternativeAccounts(validateAndCleanStringList(request.getAlternativeAccounts()))
            .culturalImpacts(validateAndCleanStringList(request.getCulturalImpacts()))
            .historicalSources(validateAndCleanStringList(request.getHistoricalSources()))
            .relatedArtifacts(validateAndCleanStringList(request.getRelatedArtifacts()))
            
            // ✅ Optional nested objects
            .weatherConditions(mapWeatherConditions(request.getWeatherConditions()))
            .politicalContext(mapPoliticalContext(request.getPoliticalContext()))
            
            .build();
        
        // ✅ Validate all relationship entities exist
        validateAllEntityRelationships(request);
        
        return eventRepository.save(event);
    }

    // ✅ Update existing event
    public Optional<Event> updateEvent(Long id, EventUpdateRequest request) {
        return eventRepository.findById(id).map(existingEvent -> {
            // ✅ Update basic fields if provided
            if (request.getTitle() != null) {
                existingEvent.setTitle(request.getTitle());
            }
            if (request.getDescription() != null) {
                existingEvent.setDescription(request.getDescription());
            }
            if (request.getEventDate() != null) {
                validateDateFormat(request.getEventDate());
                existingEvent.setEventDate(request.getEventDate());
            }
            
            // ✅ Update boolean flags if provided
            if (request.getIsHistorical() != null) {
                existingEvent.setIsHistorical(request.getIsHistorical());
            }
            if (request.getIsMythological() != null) {
                existingEvent.setIsMythological(request.getIsMythological());
            }
            if (request.getHasWitnesses() != null) {
                existingEvent.setHasWitnesses(request.getHasWitnesses());
            }
            if (request.getHasMultipleVersions() != null) {
                existingEvent.setHasMultipleVersions(request.getHasMultipleVersions());
            }
            if (request.getIsPivotal() != null) {
                existingEvent.setIsPivotal(request.getIsPivotal());
            }
            
            // ✅ Update event context if provided
            if (request.getEventContext() != null) {
                existingEvent.setEventContext(mapEventContext(request.getEventContext()));
            }
            
            // ✅ Update relationship arrays if provided (with validation)
            if (request.getCharacterIds() != null) {
                validateCharacterIds(request.getCharacterIds());
                existingEvent.setCharacterIds(new ArrayList<>(request.getCharacterIds()));
            }
            if (request.getLocationIds() != null) {
                validateLocationIds(request.getLocationIds());
                existingEvent.setLocationIds(new ArrayList<>(request.getLocationIds()));
            }
            if (request.getSagaIds() != null) {
                validateSagaIds(request.getSagaIds());
                existingEvent.setSagaIds(new ArrayList<>(request.getSagaIds()));
            }
            if (request.getSongIds() != null) {
                validateSongIds(request.getSongIds());
                existingEvent.setSongIds(new ArrayList<>(request.getSongIds()));
            }
            
            // ✅ Update content arrays if provided
            if (request.getKeyDetails() != null) {
                existingEvent.setKeyDetails(validateAndCleanStringList(request.getKeyDetails()));
            }
            if (request.getWitnesses() != null) {
                existingEvent.setWitnesses(validateAndCleanStringList(request.getWitnesses()));
            }
            if (request.getConsequences() != null) {
                existingEvent.setConsequences(validateAndCleanStringList(request.getConsequences()));
            }
            if (request.getAlternativeAccounts() != null) {
                existingEvent.setAlternativeAccounts(validateAndCleanStringList(request.getAlternativeAccounts()));
            }
            if (request.getCulturalImpacts() != null) {
                existingEvent.setCulturalImpacts(validateAndCleanStringList(request.getCulturalImpacts()));
            }
            if (request.getHistoricalSources() != null) {
                existingEvent.setHistoricalSources(validateAndCleanStringList(request.getHistoricalSources()));
            }
            if (request.getRelatedArtifacts() != null) {
                existingEvent.setRelatedArtifacts(validateAndCleanStringList(request.getRelatedArtifacts()));
            }
            
            // ✅ Update nested objects if provided
            if (request.getWeatherConditions() != null) {
                existingEvent.setWeatherConditions(mapWeatherConditions(request.getWeatherConditions()));
            }
            if (request.getPoliticalContext() != null) {
                existingEvent.setPoliticalContext(mapPoliticalContext(request.getPoliticalContext()));
            }
            
            return eventRepository.save(existingEvent);
        });
    }

    // ✅ Delete event
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Get event characters
    public List<Character> getEventCharacters(Long id) {
        return eventRepository.findById(id)
            .map(event -> characterRepository.findAllById(event.getCharacterIds()))
            .orElse(new ArrayList<>());
    }

    // ✅ Add character to event
    public Optional<Event> addCharacterToEvent(Long eventId, Long characterId) {
        if (!characterRepository.existsById(characterId)) {
            throw new IllegalArgumentException("Character not found: " + characterId);
        }
        
        return eventRepository.findById(eventId).map(event -> {
            if (!event.getCharacterIds().contains(characterId)) {
                event.getCharacterIds().add(characterId);
                return eventRepository.save(event);
            }
            return event;
        });
    }

    // ✅ Remove character from event
    public Optional<Event> removeCharacterFromEvent(Long eventId, Long characterId) {
        return eventRepository.findById(eventId).map(event -> {
            event.getCharacterIds().remove(characterId);
            return eventRepository.save(event);
        });
    }

    // ✅ Get event locations
    public List<Location> getEventLocations(Long id) {
        return eventRepository.findById(id)
            .map(event -> locationRepository.findAllById(event.getLocationIds()))
            .orElse(new ArrayList<>());
    }

    // ✅ Add location to event
    public Optional<Event> addLocationToEvent(Long eventId, Long locationId) {
        if (!locationRepository.existsById(locationId)) {
            throw new IllegalArgumentException("Location not found: " + locationId);
        }
        
        return eventRepository.findById(eventId).map(event -> {
            if (!event.getLocationIds().contains(locationId)) {
                event.getLocationIds().add(locationId);
                return eventRepository.save(event);
            }
            return event;
        });
    }

    // ✅ Remove location from event
    public Optional<Event> removeLocationFromEvent(Long eventId, Long locationId) {
        return eventRepository.findById(eventId).map(event -> {
            event.getLocationIds().remove(locationId);
            return eventRepository.save(event);
        });
    }

    // ✅ Get event songs
    public List<Song> getEventSongs(Long id) {
        return eventRepository.findById(id)
            .map(event -> songRepository.findAllById(event.getSongIds()))
            .orElse(new ArrayList<>());
    }

    // ✅ Find events by character
    public List<Event> findEventsByCharacter(Long characterId) {
        return eventRepository.findByCharacterIdsContaining(characterId);
    }

    // ✅ Find events by location
    public List<Event> findEventsByLocation(Long locationId) {
        return eventRepository.findByLocationIdsContaining(locationId);
    }

    // ✅ Find events by saga
    public List<Event> findEventsBySaga(Long sagaId) {
        return eventRepository.findBySagaIdsContaining(sagaId);
    }

    // ✅ Find historical events
    public List<Event> findHistoricalEvents() {
        return eventRepository.findByIsHistoricalTrue();
    }

    // ✅ Find mythological events
    public List<Event> findMythologicalEvents() {
        return eventRepository.findByIsMythologicalTrue();
    }

    // ✅ Find pivotal events
    public List<Event> findPivotalEvents() {
        return eventRepository.findByIsPivotalTrue();
    }

    // ✅ Find events in chronological order
    public List<Event> findEventsInChronologicalOrder(Long sagaId) {
        if (sagaId != null) {
            return eventRepository.findBySagaIdsContainingOrderByEventDate(sagaId);
        }
        return eventRepository.findAllByOrderByEventDate();
    }

    // ✅ Add consequence to event
    public Optional<Event> addConsequence(Long eventId, EventConsequenceRequest request) {
        validateConsequenceRequest(request);
        
        return eventRepository.findById(eventId).map(event -> {
            String consequence = String.format("[%s|%s] %s", 
                request.getConsequenceType(), 
                request.getImpactLevel(), 
                request.getDescription());
            
            event.getConsequences().add(consequence);
            return eventRepository.save(event);
        });
    }

    // ✅ Get event statistics
    public Optional<EventStatsResponse> getEventStats(Long id) {
        return eventRepository.findByIdWithRelations(id).map(event -> {
            return EventStatsResponse.builder()
                .eventId(event.getId())
                .eventTitle(event.getTitle())
                .eventDate(event.getEventDate())
                
                // Event metadata
                .eventType(event.getEventContext().getEventType())
                .importance(event.getEventContext().getImportance())
                .outcome(event.getEventContext().getOutcome())
                .durationMinutes(event.getEventContext().getDurationMinutes())
                
                // Boolean flags
                .isHistorical(event.getIsHistorical())
                .isMythological(event.getIsMythological())
                .hasWitnesses(event.getHasWitnesses())
                .hasMultipleVersions(event.getHasMultipleVersions())
                .isPivotal(event.getIsPivotal())
                
                // Relationship counts
                .characterCount(event.getCharacterIds().size())
                .locationCount(event.getLocationIds().size())
                .sagaCount(event.getSagaIds().size())
                .songCount(event.getSongIds().size())
                
                // Content statistics
                .keyDetailCount(event.getKeyDetails().size())
                .witnessCount(event.getWitnesses().size())
                .consequenceCount(event.getConsequences().size())
                .alternativeAccountCount(event.getAlternativeAccounts().size())
                .culturalImpactCount(event.getCulturalImpacts().size())
                .historicalSourceCount(event.getHistoricalSources().size())
                .relatedArtifactCount(event.getRelatedArtifacts().size())
                
                // Array content
                .themes(event.getEventContext().getThemes())
                .tags(event.getEventContext().getTags())
                .themeFrequency(countStringOccurrences(event.getEventContext().getThemes()))
                
                // Weather data
                .weather(event.getWeatherConditions() != null ? event.getWeatherConditions().getWeather() : null)
                .season(event.getWeatherConditions() != null ? event.getWeatherConditions().getSeason() : null)
                .timeOfDay(event.getWeatherConditions() != null ? event.getWeatherConditions().getTimeOfDay() : null)
                .temperatureCelsius(event.getWeatherConditions() != null ? event.getWeatherConditions().getTemperatureCelsius() : null)
                .wasStormy(event.getWeatherConditions() != null ? event.getWeatherConditions().getWasStormy() : null)
                .hadNaturalPhenomena(event.getWeatherConditions() != null ? event.getWeatherConditions().getHadNaturalPhenomena() : null)
                
                // Political context
                .rulingPowerCount(event.getPoliticalContext() != null ? event.getPoliticalContext().getRulingPowers().size() : 0)
                .allianceCount(event.getPoliticalContext() != null ? event.getPoliticalContext().getAlliances().size() : 0)
                .conflictCount(event.getPoliticalContext() != null ? event.getPoliticalContext().getOngoingConflicts().size() : 0)
                .treatyCount(event.getPoliticalContext() != null ? event.getPoliticalContext().getActiveTreaties().size() : 0)
                .rulingPowers(event.getPoliticalContext() != null ? event.getPoliticalContext().getRulingPowers() : null)
                .alliances(event.getPoliticalContext() != null ? event.getPoliticalContext().getAlliances() : null)
                
                // Related entities
                .characterNames(getCharacterNames(event.getCharacterIds()))
                .locationNames(getLocationNames(event.getLocationIds()))
                .sagaTitles(getSagaTitles(event.getSagaIds()))
                .songTitles(getSongTitles(event.getSongIds()))
                .characterTypeCount(getCharacterTypeCount(event.getCharacterIds()))
                .locationTypeCount(getLocationTypeCount(event.getLocationIds()))
                
                // Timeline context
                .previousEventTitle(getPreviousEventTitle(event))
                .nextEventTitle(getNextEventTitle(event))
                .daysSincePreviousEvent(getDaysSincePreviousEvent(event))
                .daysUntilNextEvent(getDaysUntilNextEvent(event))
                
                .build();
        });
    }

    // ✅ Private validation methods
    private void validateEventRequest(EventCreateRequest request) {
        // ✅ Validate date format
        validateDateFormat(request.getEventDate());
        
        // ✅ Validate boolean flag logic
        validateBooleanFlagLogic(request);
        
        // ✅ Validate event context
        validateEventContext(request.getEventContext());
        
        // ✅ Validate arrays don't have duplicates
        if (hasDuplicates(request.getCharacterIds())) {
            throw new IllegalArgumentException("Character IDs cannot contain duplicates");
        }
        if (hasDuplicates(request.getLocationIds())) {
            throw new IllegalArgumentException("Location IDs cannot contain duplicates");
        }
        if (hasDuplicates(request.getKeyDetails())) {
            throw new IllegalArgumentException("Key details cannot contain duplicates");
        }
    }

    private void validateDateFormat(String dateString) {
        try {
            LocalDateTime.parse(dateString, DateTimeFormatter.ISO_INSTANT);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date format. Use ISO format: yyyy-MM-ddTHH:mm:ssZ");
        }
    }

    private void validateBooleanFlagLogic(EventCreateRequest request) {
        // ✅ Epic Timeline specific business logic validation
        
        // Events cannot be both historical and mythological
        if (Boolean.TRUE.equals(request.getIsHistorical()) && Boolean.TRUE.equals(request.getIsMythological())) {
            throw new IllegalArgumentException("Event cannot be both historical and mythological");
        }
        
        // Historical events typically have witnesses
        if (Boolean.TRUE.equals(request.getIsHistorical()) && !Boolean.TRUE.equals(request.getHasWitnesses())) {
            // This is a warning, not an error
        }
        
        // Multiple versions typically means there are witnesses
        if (Boolean.TRUE.equals(request.getHasMultipleVersions()) && !Boolean.TRUE.equals(request.getHasWitnesses())) {
            // This is unusual but allowed
        }
        
        // Pivotal events are typically significant or higher importance
        if (Boolean.TRUE.equals(request.getIsPivotal())) {
            String importance = request.getEventContext().getImportance();
            if (!Arrays.asList("significant", "major", "pivotal", "legendary").contains(importance)) {
                throw new IllegalArgumentException("Pivotal events must have significance level of 'significant' or higher");
            }
        }
    }

    private void validateEventContext(EventContextRequest context) {
        // ✅ Validate themes and tags don't have duplicates
        if (hasDuplicates(context.getThemes())) {
            throw new IllegalArgumentException("Event themes cannot contain duplicates");
        }
        if (hasDuplicates(context.getTags())) {
            throw new IllegalArgumentException("Event tags cannot contain duplicates");
        }
        
        // ✅ Validate predefined lists
        validateAgainstAllowedValues(context.getThemes(), getAllowedEventThemes(), "event theme");
        validateAgainstAllowedValues(context.getTags(), getAllowedEventTags(), "event tag");
    }

    private void validateConsequenceRequest(EventConsequenceRequest request) {
        if (request.getAffectedCharacterIds() != null) {
            validateCharacterIds(request.getAffectedCharacterIds());
        }
        if (request.getAffectedLocationIds() != null) {
            validateLocationIds(request.getAffectedLocationIds());
        }
    }

    private void validateAllEntityRelationships(EventCreateRequest request) {
        validateCharacterIds(request.getCharacterIds());
        validateLocationIds(request.getLocationIds());
        if (request.getSagaIds() != null && !request.getSagaIds().isEmpty()) {
            validateSagaIds(request.getSagaIds());
        }
        if (request.getSongIds() != null && !request.getSongIds().isEmpty()) {
            validateSongIds(request.getSongIds());
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

    private void validateLocationIds(List<Long> locationIds) {
        List<Long> existingIds = locationRepository.findAllById(locationIds)
            .stream()
            .map(Location::getId)
            .collect(Collectors.toList());
        
        List<Long> invalidIds = locationIds.stream()
            .filter(id -> !existingIds.contains(id))
            .collect(Collectors.toList());
        
        if (!invalidIds.isEmpty()) {
            throw new IllegalArgumentException("Invalid location IDs: " + invalidIds);
        }
    }

    private void validateSongIds(List<Long> songIds) {
        List<Long> existingIds = songRepository.findAllById(songIds)
            .stream()
            .map(Song::getId)
            .collect(Collectors.toList());
        
        List<Long> invalidIds = songIds.stream()
            .filter(id -> !existingIds.contains(id))
            .collect(Collectors.toList());
        
        if (!invalidIds.isEmpty()) {
            throw new IllegalArgumentException("Invalid song IDs: " + invalidIds);
        }
    }

    private void validateSagaIds(List<Long> sagaIds) {
        // Saga validation implementation depends on Saga repository
    }

    private void validateAgainstAllowedValues(List<String> values, Set<String> allowedValues, String fieldName) {
        if (values == null || allowedValues == null) return;
        
        List<String> invalid = values.stream()
            .filter(value -> !allowedValues.contains(value.toLowerCase().trim()))
            .collect(Collectors.toList());
        
        if (!invalid.isEmpty()) {
            throw new IllegalArgumentException(
                String.format("Invalid %s values: %s. Allowed values: %s", 
                    fieldName, invalid, allowedValues)
            );
        }
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

    private boolean hasDuplicates(List<?> list) {
        if (list == null) return false;
        Set<Object> seen = new HashSet<>();
        return list.stream().anyMatch(item -> !seen.add(item));
    }

    // ✅ Mapping methods for nested objects
    private EventContext mapEventContext(EventContextRequest request) {
        return EventContext.builder()
            .eventType(request.getEventType())
            .importance(request.getImportance())
            .outcome(request.getOutcome())
            .themes(validateAndCleanStringList(request.getThemes()))
            .tags(validateAndCleanStringList(request.getTags()))
            .durationMinutes(request.getDurationMinutes())
            .build();
    }

    private WeatherConditions mapWeatherConditions(WeatherConditionsRequest request) {
        if (request == null) return null;
        
        return WeatherConditions.builder()
            .weather(request.getWeather())
            .season(request.getSeason())
            .timeOfDay(request.getTimeOfDay())
            .temperatureCelsius(request.getTemperatureCelsius())
            .wasStormy(request.getWasStormy())
            .hadNaturalPhenomena(request.getHadNaturalPhenomena())
            .build();
    }

    private PoliticalContext mapPoliticalContext(PoliticalContextRequest request) {
        if (request == null) return null;
        
        return PoliticalContext.builder()
            .rulingPowers(validateAndCleanStringList(request.getRulingPowers()))
            .alliances(validateAndCleanStringList(request.getAlliances()))
            .ongoingConflicts(validateAndCleanStringList(request.getOngoingConflicts()))
            .activeTreaties(validateAndCleanStringList(request.getActiveTreaties()))
            .diplomaticStatus(validateAndCleanStringList(request.getDiplomaticStatus()))
            .build();
    }

    // ✅ Epic Timeline specific allowed values
    private Set<String> getAllowedEventThemes() {
        return Set.of(
            "heroism", "sacrifice", "journey", "betrayal", "redemption", "war", "peace",
            "love", "family", "divine intervention", "transformation", "destiny", "honor",
            "wisdom", "courage", "perseverance", "loyalty", "justice", "revenge", "forgiveness"
        );
    }

    private Set<String> getAllowedEventTags() {
        return Set.of(
            "epic", "tragic", "triumphant", "mysterious", "legendary", "pivotal", "dramatic",
            "emotional", "action", "political", "spiritual", "romantic", "family", "military",
            "diplomatic", "magical", "supernatural", "historical", "cultural", "ceremonial"
        );
    }

    // ✅ Helper methods for statistics
    private Map<String, Long> countStringOccurrences(List<String> strings) {
        return strings.stream()
            .collect(Collectors.groupingBy(
                String::toLowerCase, 
                Collectors.counting()
            ));
    }

    private List<String> getCharacterNames(List<Long> characterIds) {
        return characterRepository.findAllById(characterIds)
            .stream()
            .map(Character::getName)
            .collect(Collectors.toList());
    }

    private List<String> getLocationNames(List<Long> locationIds) {
        return locationRepository.findAllById(locationIds)
            .stream()
            .map(Location::getName)
            .collect(Collectors.toList());
    }

    private List<String> getSongTitles(List<Long> songIds) {
        return songRepository.findAllById(songIds)
            .stream()
            .map(Song::getTitle)
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

    private Map<String, Integer> getLocationTypeCount(List<Long> locationIds) {
        return locationRepository.findAllById(locationIds)
            .stream()
            .collect(Collectors.groupingBy(
                location -> location.getRegion().getType(),
                Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)
            ));
    }

    // ✅ Timeline context methods
    private String getPreviousEventTitle(Event event) {
        return eventRepository.findFirstByEventDateBeforeOrderByEventDateDesc(event.getEventDate())
            .map(Event::getTitle)
            .orElse(null);
    }

    private String getNextEventTitle(Event event) {
        return eventRepository.findFirstByEventDateAfterOrderByEventDateAsc(event.getEventDate())
            .map(Event::getTitle)
            .orElse(null);
    }

    private Long getDaysSincePreviousEvent(Event event) {
        return eventRepository.findFirstByEventDateBeforeOrderByEventDateDesc(event.getEventDate())
            .map(prevEvent -> {
                // Calculate days between dates
                // Implementation depends on date handling requirements
                return 0L; // Placeholder
            })
            .orElse(null);
    }

    private Long getDaysUntilNextEvent(Event event) {
        return eventRepository.findFirstByEventDateAfterOrderByEventDateAsc(event.getEventDate())
            .map(nextEvent -> {
                // Calculate days between dates
                // Implementation depends on date handling requirements
                return 0L; // Placeholder
            })
            .orElse(null);
    }
}