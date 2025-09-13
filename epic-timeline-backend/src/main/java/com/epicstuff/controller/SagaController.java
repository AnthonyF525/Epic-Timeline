package com.epicstuff.controller;

import com.epicstuff.model.Saga;
import com.epicstuff.repository.SagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.*;

@RestController
@RequestMapping("/sagas")
@CrossOrigin(origins = "*")
public class SagaController {

    @Autowired
    private SagaRepository sagaRepository;

    @GetMapping
    public ResponseEntity<Page<Saga>> getAllSagas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : 
            Sort.by(sortBy).ascending();
        
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<Saga> sagas = sagaRepository.findAll(pageRequest);
        return ResponseEntity.ok(sagas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Saga> getSagaById(@PathVariable Long id) {
        Optional<Saga> saga = sagaRepository.findById(id);
        return saga.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<Map<String, Object>> getSagaStats(@PathVariable Long id) {
        Optional<Saga> saga = sagaRepository.findById(id);
        if (saga.isPresent()) {
            Map<String, Object> stats = new HashMap<>();
            stats.put("sagaId", saga.get().getId());
            stats.put("sagaTitle", saga.get().getTitle());
            stats.put("totalSongs", 0);
            stats.put("totalCharacters", 0);
            stats.put("totalLocations", 0);
            stats.put("totalEvents", 0);
            return ResponseEntity.ok(stats);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/characters")
    public ResponseEntity<List<Object>> getSagaCharacters(@PathVariable Long id) {
        // Return empty list for now
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/{id}/songs")
    public ResponseEntity<List<Object>> getSagaSongs(@PathVariable Long id) {
        // Return empty list for now
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<Object>> getSagaEvents(@PathVariable Long id) {
        // Return empty list for now
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/{id}/locations")
    public ResponseEntity<List<Object>> getSagaLocations(@PathVariable Long id) {
        // Return empty list for now
        return ResponseEntity.ok(new ArrayList<>());
    }
}
