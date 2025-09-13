package com.epicstuff.service;

import com.epicstuff.model.Song;
import com.epicstuff.model.Character;
import com.epicstuff.repository.SongRepository;
import com.epicstuff.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class SongService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private CharacterRepository characterRepository;

    // ✅ Get all songs with filtering (simplified)
    public Page<Song> findAllWithFilter(Long sagaId, Pageable pageable) {
        // For now, implement basic filtering by sagaId
        if (sagaId != null) {
            List<Song> songs = songRepository.findBySagaId(sagaId);
            return new PageImpl<>(songs, pageable, songs.size());
        }
        
        // If no specific filters, return all songs
        return songRepository.findAll(pageable);
    }

    // ✅ Get all songs
    public List<Song> findAll() {
        return songRepository.findAll();
    }

    // ✅ Get song by ID with populated relationships
    public Optional<Song> findByIdWithRelations(Long id) {
        return songRepository.findById(id);
    }

    // ✅ Create new song with validation (removed for now)
    // TODO: Implement createSong with proper DTO handling

    // ✅ Update existing song (removed for now)
    // TODO: Implement updateSong with proper DTO handling

    // ✅ Delete song
    public boolean deleteSong(Long id) {
        if (songRepository.existsById(id)) {
            songRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Get all characters in song
    public List<Character> getSongCharacters(Long id) {
        Optional<Song> song = songRepository.findById(id);
        return song.map(Song::getCharacters).orElse(new ArrayList<>());
    }

    // ✅ Add character to song
    public Optional<Song> addCharacterToSong(Long songId, Long characterId) {
        Optional<Song> songOpt = songRepository.findById(songId);
        Optional<Character> characterOpt = characterRepository.findById(characterId);
        
        if (songOpt.isPresent() && characterOpt.isPresent()) {
            Song song = songOpt.get();
            Character character = characterOpt.get();
            
            if (!song.getCharacters().contains(character)) {
                song.getCharacters().add(character);
                return Optional.of(songRepository.save(song));
            }
        }
        
        return Optional.empty();
    }

    // ✅ Remove character from song
    public Optional<Song> removeCharacterFromSong(Long songId, Long characterId) {
        Optional<Song> songOpt = songRepository.findById(songId);
        Optional<Character> characterOpt = characterRepository.findById(characterId);
        
        if (songOpt.isPresent() && characterOpt.isPresent()) {
            Song song = songOpt.get();
            Character character = characterOpt.get();
            
            if (song.getCharacters().remove(character)) {
                return Optional.of(songRepository.save(song));
            }
        }
        
        return Optional.empty();
    }

    // ✅ Get all songs for a character
    public List<Song> findSongsByCharacter(Long characterId) {
        return songRepository.findByCharacterId(characterId);
    }

    // ✅ Get all songs in a saga
    public List<Song> findSongsBySaga(Long sagaId) {
        return songRepository.findBySagaId(sagaId);
    }

    // ✅ Get song statistics - simplified
    public String getSongStats(Long id) {
        Optional<Song> song = songRepository.findById(id);
        if (song.isPresent()) {
            Song s = song.get();
            return String.format("Song: %s, Duration: %d seconds, Characters: %d", 
                s.getTitle(), 
                s.getDurationSeconds() != null ? s.getDurationSeconds() : 0,
                s.getCharacters().size());
        }
        return "Song not found";
    }

    // Basic save method
    public Song save(Song song) {
        return songRepository.save(song);
    }
}
