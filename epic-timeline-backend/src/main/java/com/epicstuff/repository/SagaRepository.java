package com.epicstuff.repository;

import com.epicstuff.model.Saga;
import com.epicstuff.dto.SagaFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SagaRepository extends JpaRepository<Saga, Long> {
    
    @Query("SELECT s FROM Saga s LEFT JOIN FETCH s.songs LEFT JOIN FETCH s.characters LEFT JOIN FETCH s.locations LEFT JOIN FETCH s.events WHERE s.id = :id")
    Optional<Saga> findByIdWithCharactersAndSongsAndLocationsAndEvents(@Param("id") Long id);
    
    @Query("SELECT s FROM Saga s LEFT JOIN FETCH s.songs LEFT JOIN FETCH s.characters LEFT JOIN FETCH s.locations LEFT JOIN FETCH s.events WHERE s.id = :id")
    Optional<Saga> findByIdWithRelations(@Param("id") Long id);
    
    // For now, implement a basic filter method - you can enhance this later
    default Page<Saga> findAllWithFilter(SagaFilterRequest filter, Pageable pageable) {
        // Basic implementation - you can add custom query logic later
        return findAll(pageable);
    }
}