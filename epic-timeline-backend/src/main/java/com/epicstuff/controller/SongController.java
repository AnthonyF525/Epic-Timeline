package com.epicstuff.controller;

import com.epicstuff.model.Song;
import com.epicstuff.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/songs")
@CrossOrigin(origins = "*")
public class SongController {

    @Autowired
    private SongService songService;

    // // [DONE] GET /api/songs - List all songs with basic filtering
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(
            @RequestParam(required = false) Long sagaId
    ) {
        List<Song> songs;
        if (sagaId != null) {
            songs = songService.findSongsBySaga(sagaId);
        } else {
            songs = songService.findAll();
        }
        return ResponseEntity.ok(songs);
    }

    // // [DONE] GET /api/songs/{id} - Get single song with populated relationships
    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        Optional<Song> song = songService.findByIdWithRelations(id);
        return song.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    // // [DONE] POST /api/songs - Create new song (simplified)
    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song) {
        try {
            Song createdSong = songService.save(song);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // // [DONE] PUT /api/songs/{id} - Update existing song (simplified)
    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(
            @PathVariable Long id, 
            @RequestBody Song updatedSong
    ) {
        try {
            Optional<Song> existingSong = songService.findByIdWithRelations(id);
            if (existingSong.isPresent()) {
                Song song = existingSong.get();
                if (updatedSong.getTitle() != null) song.setTitle(updatedSong.getTitle());
                if (updatedSong.getDescription() != null) song.setDescription(updatedSong.getDescription());
                if (updatedSong.getDurationSeconds() != null) song.setDurationSeconds(updatedSong.getDurationSeconds());
                if (updatedSong.getTrackNumber() != null) song.setTrackNumber(updatedSong.getTrackNumber());
                Song savedSong = songService.save(song);
                return ResponseEntity.ok(savedSong);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // // [DONE] DELETE /api/songs/{id} - Delete song
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        boolean deleted = songService.deleteSong(id);
        return deleted ? ResponseEntity.noContent().build() : 
                        ResponseEntity.notFound().build();
    }

    // // [DONE] GET /api/songs/{id}/characters - Get all characters in song
    @GetMapping("/{id}/characters")
    public ResponseEntity<List<com.epicstuff.model.Character>> getSongCharacters(@PathVariable Long id) {
        List<com.epicstuff.model.Character> characters = songService.getSongCharacters(id);
        return ResponseEntity.ok(characters);
    }

    // // [DONE] POST /api/songs/{id}/characters/{characterId} - Add character to song
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

    // // [DONE] DELETE /api/songs/{id}/characters/{characterId} - Remove character from song
    @DeleteMapping("/{id}/characters/{characterId}")
    public ResponseEntity<Song> removeCharacterFromSong(
            @PathVariable Long id, 
            @PathVariable Long characterId
    ) {
        Optional<Song> updatedSong = songService.removeCharacterFromSong(id, characterId);
        return updatedSong.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    // // [DONE] GET /api/songs/by-character/{characterId} - Get all songs for a character
    @GetMapping("/by-character/{characterId}")
    public ResponseEntity<List<Song>> getSongsByCharacter(@PathVariable Long characterId) {
        List<Song> songs = songService.findSongsByCharacter(characterId);
        return ResponseEntity.ok(songs);
    }

    // // [DONE] GET /api/songs/by-saga/{sagaId} - Get all songs in a saga
    @GetMapping("/by-saga/{sagaId}")
    public ResponseEntity<List<Song>> getSongsBySaga(@PathVariable Long sagaId) {
        List<Song> songs = songService.findSongsBySaga(sagaId);
        return ResponseEntity.ok(songs);
    }

    // // [DONE] GET /api/songs/{id}/stats - Get song statistics (simplified)
    @GetMapping("/{id}/stats")
    public ResponseEntity<String> getSongStats(@PathVariable Long id) {
        String stats = songService.getSongStats(id);
        return ResponseEntity.ok(stats);
    }
}
