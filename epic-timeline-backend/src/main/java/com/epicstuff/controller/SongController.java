package com.epicstuff.controller;

import com.epicstuff.model.Song;
import com.epicstuff.service.SongService;
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
@RequestMapping("/api/songs")
@CrossOrigin(origins = "*")
public class SongController {

    @Autowired
    private SongService songService;

    // ✅ GET /api/songs - List all songs with filtering and pagination
    @GetMapping
    public ResponseEntity<Page<Song>> getAllSongs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "trackNumber") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) Long sagaId,
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String mood,
            @RequestParam(required = false) String instrument,
            @RequestParam(required = false) String vocal,
            @RequestParam(required = false) Long characterId,
            @RequestParam(required = false) Boolean isInstrumental,
            @RequestParam(required = false) Boolean hasDialogue,
            @RequestParam(required = false) Boolean isReprise,
            @RequestParam(required = false) Integer minDuration,
            @RequestParam(required = false) Integer maxDuration,
            @RequestParam(required = false) String search
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : 
            Sort.by(sortBy).ascending();
        
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        
        SongFilterRequest filter = SongFilterRequest.builder()
            .sagaId(sagaId)
            .theme(theme)
            .genre(genre)
            .mood(mood)
            .instrument(instrument)
            .vocal(vocal)
            .characterId(characterId)
            .isInstrumental(isInstrumental)
            .hasDialogue(hasDialogue)
            .isReprise(isReprise)
            .minDuration(minDuration)
            .maxDuration(maxDuration)
            .search(search)
            .build();
        
        Page<Song> songs = songService.findAllWithFilter(filter, pageRequest);
        return ResponseEntity.ok(songs);
    }

    // ✅ GET /api/songs/{id} - Get single song with populated relationships
    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        Optional<Song> song = songService.findByIdWithRelations(id);
        return song.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    // ✅ POST /api/songs - Create new song
    @PostMapping
    public ResponseEntity<Song> createSong(@Valid @RequestBody SongCreateRequest request) {
        try {
            Song createdSong = songService.createSong(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSong);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ PUT /api/songs/{id} - Update existing song
    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(
            @PathVariable Long id, 
            @Valid @RequestBody SongUpdateRequest request
    ) {
        try {
            Optional<Song> updatedSong = songService.updateSong(id, request);
            return updatedSong.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ DELETE /api/songs/{id} - Delete song
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        boolean deleted = songService.deleteSong(id);
        return deleted ? ResponseEntity.noContent().build() : 
                        ResponseEntity.notFound().build();
    }

    // ✅ GET /api/songs/{id}/characters - Get all characters in song
    @GetMapping("/{id}/characters")
    public ResponseEntity<List<Character>> getSongCharacters(@PathVariable Long id) {
        List<Character> characters = songService.getSongCharacters(id);
        return ResponseEntity.ok(characters);
    }

    // ✅ POST /api/songs/{id}/characters/{characterId} - Add character to song
    @PostMapping("/{id}/characters/{characterId}")
    public ResponseEntity<Song> addCharacterToSong(
            @PathVariable Long id, 
            @PathVariable Long characterId
    ) {
        try {
            Optional<Song> updatedSong = songService.addCharacterToSong(id, characterId);
            return updatedSong.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ DELETE /api/songs/{id}/characters/{characterId} - Remove character from song
    @DeleteMapping("/{id}/characters/{characterId}")
    public ResponseEntity<Song> removeCharacterFromSong(
            @PathVariable Long id, 
            @PathVariable Long characterId
    ) {
        Optional<Song> updatedSong = songService.removeCharacterFromSong(id, characterId);
        return updatedSong.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    // ✅ GET /api/songs/by-character/{characterId} - Get all songs for a character
    @GetMapping("/by-character/{characterId}")
    public ResponseEntity<List<Song>> getSongsByCharacter(@PathVariable Long characterId) {
        List<Song> songs = songService.findSongsByCharacter(characterId);
        return ResponseEntity.ok(songs);
    }

    // ✅ GET /api/songs/by-saga/{sagaId} - Get all songs in a saga
    @GetMapping("/by-saga/{sagaId}")
    public ResponseEntity<List<Song>> getSongsBySaga(@PathVariable Long sagaId) {
        List<Song> songs = songService.findSongsBySaga(sagaId);
        return ResponseEntity.ok(songs);
    }

    // ✅ GET /api/songs/{id}/stats - Get song statistics
    @GetMapping("/{id}/stats")
    public ResponseEntity<SongStatsResponse> getSongStats(@PathVariable Long id) {
        Optional<SongStatsResponse> stats = songService.getSongStats(id);
        return stats.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}
