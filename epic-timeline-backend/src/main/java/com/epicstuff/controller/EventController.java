package com.epicstuff.controller;

import com.epicstuff.model.Event;
import com.epicstuff.model.Character;
import com.epicstuff.model.Location;
import com.epicstuff.model.Song;
import com.epicstuff.service.EventService;
import com.epicstuff.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // ✅ GET /api/events - List all events with filtering and pagination
    @GetMapping
    public ResponseEntity<Page<Event>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "eventDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String importance,
            @RequestParam(required = false) String outcome,
            @RequestParam(required = false) Boolean isHistorical,
            @RequestParam(required = false) Boolean isMythological,
            @RequestParam(required = false) Boolean hasWitnesses,
            @RequestParam(required = false) Boolean hasMultipleVersions,
            @RequestParam(required = false) Boolean isPivotal,
            @RequestParam(required = false) Long characterId,
            @RequestParam(required = false) Long locationId,
            @RequestParam(required = false) Long sagaId,
            @RequestParam(required = false) String dateAfter,
            @RequestParam(required = false) String dateBefore,
            @RequestParam(required = false) String search
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : 
            Sort.by(sortBy).ascending();
        
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        
        EventFilterRequest filter = EventFilterRequest.builder()
            .eventType(eventType)
            .importance(importance)
            .outcome(outcome)
            .isHistorical(isHistorical)
            .isMythological(isMythological)
            .hasWitnesses(hasWitnesses)
            .hasMultipleVersions(hasMultipleVersions)
            .isPivotal(isPivotal)
            .characterId(characterId)
            .locationId(locationId)
            .sagaId(sagaId)
            .dateAfter(dateAfter)
            .dateBefore(dateBefore)
            .search(search)
            .build();
        
        Page<Event> events = eventService.findAllWithFilter(filter, pageRequest);
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/{id} - Get single event with populated relationships
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.findByIdWithRelations(id);
        return event.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // ✅ POST /api/events - Create new event
    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventCreateRequest request) {
        try {
            Event createdEvent = eventService.createEvent(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ PUT /api/events/{id} - Update existing event
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long id, 
            @Valid @RequestBody EventUpdateRequest request
    ) {
        try {
            Optional<Event> updatedEvent = eventService.updateEvent(id, request);
            return updatedEvent.map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ DELETE /api/events/{id} - Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEvent(id);
        return deleted ? ResponseEntity.noContent().build() : 
                        ResponseEntity.notFound().build();
    }

    // ✅ GET /api/events/{id}/characters - Get all characters involved in event
    @GetMapping("/{id}/characters")
    public ResponseEntity<List<Character>> getEventCharacters(@PathVariable Long id) {
        List<Character> characters = eventService.getEventCharacters(id);
        return ResponseEntity.ok(characters);
    }

    // ✅ POST /api/events/{id}/characters/{characterId} - Add character to event
    @PostMapping("/{id}/characters/{characterId}")
    public ResponseEntity<Event> addCharacterToEvent(
            @PathVariable Long id, 
            @PathVariable Long characterId
    ) {
        try {
            Optional<Event> updatedEvent = eventService.addCharacterToEvent(id, characterId);
            return updatedEvent.map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ DELETE /api/events/{id}/characters/{characterId} - Remove character from event
    @DeleteMapping("/{id}/characters/{characterId}")
    public ResponseEntity<Event> removeCharacterFromEvent(
            @PathVariable Long id, 
            @PathVariable Long characterId
    ) {
        Optional<Event> updatedEvent = eventService.removeCharacterFromEvent(id, characterId);
        return updatedEvent.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    // ✅ GET /api/events/{id}/locations - Get all locations for event
    @GetMapping("/{id}/locations")
    public ResponseEntity<List<Location>> getEventLocations(@PathVariable Long id) {
        List<Location> locations = eventService.getEventLocations(id);
        return ResponseEntity.ok(locations);
    }

    // ✅ POST /api/events/{id}/locations/{locationId} - Add location to event
    @PostMapping("/{id}/locations/{locationId}")
    public ResponseEntity<Event> addLocationToEvent(
            @PathVariable Long id, 
            @PathVariable Long locationId
    ) {
        try {
            Optional<Event> updatedEvent = eventService.addLocationToEvent(id, locationId);
            return updatedEvent.map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ DELETE /api/events/{id}/locations/{locationId} - Remove location from event
    @DeleteMapping("/{id}/locations/{locationId}")
    public ResponseEntity<Event> removeLocationFromEvent(
            @PathVariable Long id, 
            @PathVariable Long locationId
    ) {
        Optional<Event> updatedEvent = eventService.removeLocationFromEvent(id, locationId);
        return updatedEvent.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    // ✅ GET /api/events/{id}/songs - Get all songs related to event
    @GetMapping("/{id}/songs")
    public ResponseEntity<List<Song>> getEventSongs(@PathVariable Long id) {
        List<Song> songs = eventService.getEventSongs(id);
        return ResponseEntity.ok(songs);
    }

    // ✅ GET /api/events/by-character/{characterId} - Get all events for character
    @GetMapping("/by-character/{characterId}")
    public ResponseEntity<List<Event>> getEventsByCharacter(@PathVariable Long characterId) {
        List<Event> events = eventService.findEventsByCharacter(characterId);
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/by-location/{locationId} - Get all events at location
    @GetMapping("/by-location/{locationId}")
    public ResponseEntity<List<Event>> getEventsByLocation(@PathVariable Long locationId) {
        List<Event> events = eventService.findEventsByLocation(locationId);
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/by-saga/{sagaId} - Get all events in saga
    @GetMapping("/by-saga/{sagaId}")
    public ResponseEntity<List<Event>> getEventsBySaga(@PathVariable Long sagaId) {
        List<Event> events = eventService.findEventsBySaga(sagaId);
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/historical - Get all historical events
    @GetMapping("/historical")
    public ResponseEntity<List<Event>> getHistoricalEvents() {
        List<Event> events = eventService.findHistoricalEvents();
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/mythological - Get all mythological events
    @GetMapping("/mythological")
    public ResponseEntity<List<Event>> getMythologicalEvents() {
        List<Event> events = eventService.findMythologicalEvents();
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/pivotal - Get all pivotal events
    @GetMapping("/pivotal")
    public ResponseEntity<List<Event>> getPivotalEvents() {
        List<Event> events = eventService.findPivotalEvents();
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/timeline - Get events in chronological order
    @GetMapping("/timeline")
    public ResponseEntity<List<Event>> getEventsTimeline(
            @RequestParam(required = false) Long sagaId
    ) {
        List<Event> events = eventService.findEventsInChronologicalOrder(sagaId);
        return ResponseEntity.ok(events);
    }

    // ✅ GET /api/events/{id}/stats - Get event statistics
    @GetMapping("/{id}/stats")
    public ResponseEntity<EventStatsResponse> getEventStats(@PathVariable Long id) {
        Optional<EventStatsResponse> stats = eventService.getEventStats(id);
        return stats.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // ✅ POST /api/events/{id}/consequence - Add consequence to event
    @PostMapping("/{id}/consequence")
    public ResponseEntity<Event> addEventConsequence(
            @PathVariable Long id,
            @Valid @RequestBody EventConsequenceRequest request
    ) {
        try {
            Optional<Event> updatedEvent = eventService.addConsequence(id, request);
            return updatedEvent.map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}