package com.epicstuff.service;

import com.epicstuff.model.Saga;
import com.epicstuff.repository.SagaRepository;
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
public class SagaService {

    @Autowired
    private SagaRepository sagaRepository;

    // ✅ Get all sagas with filtering
    public Page<Saga> findAllWithFilter(SagaFilterRequest filter, Pageable pageable) {
        // Custom query logic based on filter criteria
        return sagaRepository.findAllWithFilter(filter, pageable);
    }

    // ✅ Get saga by ID with populated relationships
    public Optional<Saga> findByIdWithRelations(Long id) {
        return sagaRepository.findByIdWithCharactersAndSongsAndLocationsAndEvents(id);
    }

    // ✅ Create new saga with validation
    public Saga createSaga(SagaCreateRequest request) {
        // ✅ Custom validation beyond annotations
        validateSagaRequest(request);
        
        Saga saga = Saga.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .releaseDate(request.getReleaseDate())
            .episodeCount(request.getEpisodeCount())
            .genres(validateAndCleanStringList(request.getGenres()))
            .themes(validateAndCleanStringList(request.getThemes()))
            .inspirations(validateAndCleanStringList(request.getInspirations()))
            .albumArtUrl(request.getAlbumArtUrl())
            .amazonMusicUrl(request.getAmazonMusicUrl())
            .youtubePlaylistUrl(request.getYoutubePlaylistUrl())
            .totalDurationSeconds(request.getTotalDurationSeconds())
            .songs(new ArrayList<>()) // Start with empty arrays
            .characters(new ArrayList<>())
            .locations(new ArrayList<>())
            .events(new ArrayList<>())
            .build();
        
        return sagaRepository.save(saga);
    }

    // ✅ Update existing saga
    public Optional<Saga> updateSaga(Long id, SagaUpdateRequest request) {
        return sagaRepository.findById(id).map(existingSaga -> {
            // ✅ Only update fields that are provided
            if (request.getTitle() != null) {
                existingSaga.setTitle(request.getTitle());
            }
            if (request.getDescription() != null) {
                existingSaga.setDescription(request.getDescription());
            }
            if (request.getReleaseDate() != null) {
                validateDateFormat(request.getReleaseDate());
                existingSaga.setReleaseDate(request.getReleaseDate());
            }
            if (request.getEpisodeCount() != null) {
                existingSaga.setEpisodeCount(request.getEpisodeCount());
            }
            
            // ✅ Update arrays if provided
            if (request.getGenres() != null) {
                existingSaga.setGenres(validateAndCleanStringList(request.getGenres()));
            }
            if (request.getThemes() != null) {
                existingSaga.setThemes(validateAndCleanStringList(request.getThemes()));
            }
            if (request.getInspirations() != null) {
                existingSaga.setInspirations(validateAndCleanStringList(request.getInspirations()));
            }
            
            // ✅ Update URLs if provided
            if (request.getAlbumArtUrl() != null) {
                existingSaga.setAlbumArtUrl(request.getAlbumArtUrl());
            }
            if (request.getAmazonMusicUrl() != null) {
                existingSaga.setAmazonMusicUrl(request.getAmazonMusicUrl());
            }
            if (request.getYoutubePlaylistUrl() != null) {
                existingSaga.setYoutubePlaylistUrl(request.getYoutubePlaylistUrl());
            }
            if (request.getTotalDurationSeconds() != null) {
                existingSaga.setTotalDurationSeconds(request.getTotalDurationSeconds());
            }
            
            return sagaRepository.save(existingSaga);
        });
    }

    // ✅ Delete saga
    public boolean deleteSaga(Long id) {
        if (sagaRepository.existsById(id)) {
            sagaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Get saga statistics
    public Optional<SagaStatsResponse> getSagaStats(Long id) {
        return sagaRepository.findByIdWithRelations(id).map(saga -> {
            return SagaStatsResponse.builder()
                .sagaId(saga.getId())
                .sagaTitle(saga.getTitle())
                .totalSongs((long) saga.getSongs().size())
                .totalCharacters((long) saga.getCharacters().size())
                .totalLocations((long) saga.getLocations().size())
                .totalEvents((long) saga.getEvents().size())
                .averageSongDuration(calculateAverageSongDuration(saga))
                .totalDurationSeconds(saga.getTotalDurationSeconds())
                .allGenres(saga.getGenres())
                .allThemes(saga.getThemes())
                .allInspirations(saga.getInspirations())
                .genreCount(countStringOccurrences(saga.getGenres()))
                .themeCount(countStringOccurrences(saga.getThemes()))
                .characterTypeCount(calculateCharacterTypeCount(saga))
                .mostFeaturedCharacters(getMostFeaturedCharacters(saga))
                .keyLocations(getKeyLocations(saga))
                .pivotalEvents(getPivotalEvents(saga))
                .build();
        });
    }

    // ✅ Private validation methods
    private void validateSagaRequest(SagaCreateRequest request) {
        // ✅ Validate date format
        validateDateFormat(request.getReleaseDate());
        
        // ✅ Validate genres aren't duplicates
        if (hasDuplicates(request.getGenres())) {
            throw new IllegalArgumentException("Genres cannot contain duplicates");
        }
        
        // ✅ Validate themes aren't duplicates
        if (hasDuplicates(request.getThemes())) {
            throw new IllegalArgumentException("Themes cannot contain duplicates");
        }
        
        // ✅ Validate predefined genre list (optional)
        validateAgainstAllowedValues(request.getGenres(), getAllowedGenres(), "genre");
        
        // ✅ Validate predefined theme list (optional)
        validateAgainstAllowedValues(request.getThemes(), getAllowedThemes(), "theme");
    }

    private void validateDateFormat(String dateString) {
        try {
            LocalDateTime.parse(dateString, DateTimeFormatter.ISO_INSTANT);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date format. Use ISO format: yyyy-MM-ddTHH:mm:ssZ");
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

    private boolean hasDuplicates(List<String> list) {
        if (list == null) return false;
        Set<String> seen = new HashSet<>();
        return list.stream().anyMatch(item -> !seen.add(item.toLowerCase().trim()));
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

    private Set<String> getAllowedGenres() {
        return Set.of(
            "rock opera", "progressive metal", "musical theater", "epic", 
            "folk", "classical", "electronic", "orchestral", "ballad", "dramatic"
        );
    }

    private Set<String> getAllowedThemes() {
        return Set.of(
            "heroism", "journey", "family", "perseverance", "redemption", "war", 
            "homecoming", "wisdom", "sacrifice", "divine intervention", "love", 
            "betrayal", "transformation", "destiny", "honor"
        );
    }

    // ✅ Helper methods for statistics
    private Double calculateAverageSongDuration(Saga saga) {
        return saga.getSongs().stream()
            .mapToInt(song -> song.getDurationSeconds() != null ? song.getDurationSeconds() : 0)
            .average()
            .orElse(0.0);
    }

    private Map<String, Long> countStringOccurrences(List<String> strings) {
        return strings.stream()
            .collect(Collectors.groupingBy(
                String::toLowerCase, 
                Collectors.counting()
            ));
    }

    private Map<String, Long> calculateCharacterTypeCount(Saga saga) {
        return saga.getCharacters().stream()
            .collect(Collectors.groupingBy(
                character -> character.getCharacterType().toString(),
                Collectors.counting()
            ));
    }

    private List<String> getMostFeaturedCharacters(Saga saga) {
        return saga.getCharacters().stream()
            .sorted((c1, c2) -> Integer.compare(c2.getSongs().size(), c1.getSongs().size()))
            .limit(5)
            .map(character -> character.getName())
            .collect(Collectors.toList());
    }

    private List<String> getKeyLocations(Saga saga) {
        return saga.getLocations().stream()
            .filter(location -> location.getCulturalSignificance().getImportance().equals("legendary") ||
                               location.getCulturalSignificance().getImportance().equals("high"))
            .map(location -> location.getName())
            .collect(Collectors.toList());
    }

    private List<String> getPivotalEvents(Saga saga) {
        return saga.getEvents().stream()
            .filter(event -> event.getEventContext().getImportance().equals("pivotal") ||
                           event.getEventContext().getImportance().equals("legendary"))
            .map(event -> event.getTitle())
            .collect(Collectors.toList());
    }

    // Just basic methods for now
    public Saga save(Saga saga) {
        return sagaRepository.save(saga);
    }
}
