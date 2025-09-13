package com.epicstuff.repository;

import com.epicstuff.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    // Find by track number range
    List<Song> findByTrackNumberBetween(Integer minTrack, Integer maxTrack);

    // Search by title
    List<Song> findByTitleContainingIgnoreCase(String title);

    // Find by duration range
    @Query("SELECT s FROM Song s WHERE s.durationSeconds BETWEEN :minDuration AND :maxDuration")
    List<Song> findByDurationBetween(@Param("minDuration") Integer minDuration, @Param("maxDuration") Integer maxDuration);

    // Find songs by themes (array contains)
    @Query("SELECT s FROM Song s WHERE :theme MEMBER OF s.themes")
    List<Song> findByThemesContaining(@Param("theme") String theme);

    // Find songs by saga
    List<Song> findBySagaId(Long sagaId);

    // Find songs by character (through many-to-many relationship)
    @Query("SELECT s FROM Song s JOIN s.characters c WHERE c.id = :characterId")
    List<Song> findByCharacterId(@Param("characterId") Long characterId);

    // Pageable queries for filtering and sorting
    @Query("SELECT s FROM Song s WHERE " +
           "(:title IS NULL OR LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:minDuration IS NULL OR s.durationSeconds >= :minDuration) AND " +
           "(:maxDuration IS NULL OR s.durationSeconds <= :maxDuration) AND " +
           "(:trackNumber IS NULL OR s.trackNumber = :trackNumber)")
    Page<Song> findFilteredSongs(
            @Param("title") String title,
            @Param("minDuration") Integer minDuration,
            @Param("maxDuration") Integer maxDuration,
            @Param("trackNumber") Integer trackNumber,
            Pageable pageable);

    // Statistical queries
    @Query("SELECT COUNT(s) FROM Song s")
    Long countAllSongs();

    @Query("SELECT AVG(s.durationSeconds) FROM Song s")
    Double getAverageDuration();

    @Query("SELECT s.trackNumber, COUNT(s) FROM Song s GROUP BY s.trackNumber")
    List<Object[]> countByTrackNumber();
}
