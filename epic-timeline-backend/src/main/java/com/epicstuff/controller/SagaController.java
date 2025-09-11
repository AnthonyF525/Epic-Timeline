package com.epicstuff.controller;

import com.epicstuff.model.Saga;
import com.epicstuff.service.SagaService;
import com.epicstuff.dto.SagaCreateRequest;
import com.epicstuff.dto.SagaUpdateRequest;
import com.epicstuff.dto.SagaFilterRequest;
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
@RequestMapping("/api/sagas")
@CrossOrigin(origins = "*")
public class SagaController {

    @Autowired
    private SagaService sagaService;

    @GetMapping
    public ResponseEntity<Page<Saga>> getAllSagas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) String inspiration,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer minSongCount,
            @RequestParam(required = false) Integer maxSongCount,
            @RequestParam(required = false) String releasedAfter,
            @RequestParam(required = false) String releasedBefore
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : 
            Sort.by(sortBy).ascending();
        
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        
        SagaFilterRequest filter = SagaFilterRequest.builder()
            .genre(genre)
            .theme(theme)
            .inspiration(inspiration)
            .search(search)
            .minSongCount(minSongCount)
            .maxSongCount(maxSongCount)
            .releasedAfter(releasedAfter)
            .releasedBefore(releasedBefore)
            .build();
        
        Page<Saga> sagas = sagaService.findAllWithFilter(filter, pageRequest);
        return ResponseEntity.ok(sagas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Saga> getSagaById(@PathVariable Long id) {
        Optional<Saga> saga = sagaService.findByIdWithRelations(id);
        return saga.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Saga> createSaga(@Valid @RequestBody SagaCreateRequest request) {
        try {
            Saga createdSaga = sagaService.createSaga(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSaga);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Saga> updateSaga(
            @PathVariable Long id, 
            @Valid @RequestBody SagaUpdateRequest request
    ) {
        try {
            Optional<Saga> updatedSaga = sagaService.updateSaga(id, request);
            return updatedSaga.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSaga(@PathVariable Long id) {
        boolean deleted = sagaService.deleteSaga(id);
        return deleted ? ResponseEntity.noContent().build() : 
                        ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<SagaStatsResponse> getSagaStats(@PathVariable Long id) {
        Optional<SagaStatsResponse> stats = sagaService.getSagaStats(id);
        return stats.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/characters")
    public ResponseEntity<List<Character>> getSagaCharacters(@PathVariable Long id) {
        List<Character> characters = sagaService.getSagaCharacters(id);
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/{id}/songs")
    public ResponseEntity<List<Song>> getSagaSongs(@PathVariable Long id) {
        List<Song> songs = sagaService.getSagaSongs(id);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<Event>> getSagaEvents(@PathVariable Long id) {
        List<Event> events = sagaService.getSagaEvents(id);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}/locations")
    public ResponseEntity<List<Location>> getSagaLocations(@PathVariable Long id) {
        List<Location> locations = sagaService.getSagaLocations(id);
        return ResponseEntity.ok(locations);
    }
}
