package com.epicstuff.service;

import com.epicstuff.model.Location;
import com.epicstuff.model.Saga;
import com.epicstuff.model.Song;
import com.epicstuff.repository.LocationRepository;
import com.epicstuff.repository.SagaRepository;
import com.epicstuff.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import java.util.Arrays;

@Service
public class DataSeedService implements CommandLineRunner {

    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private SagaRepository sagaRepository;
    
    @Autowired
    private SongRepository songRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed Troy location data for EPIC: The Musical
        if (locationRepository.count() == 0) {
            seedTroyLocationData();
        }
        
        // Seed Epic: The Musical saga data
        if (sagaRepository.count() == 0) {
            seedEpicSagaData();
        }
        
        // Seed Troy Saga songs
        if (songRepository.count() == 0) {
            seedTroySagaSongs();
        }
    }

    private void seedTroyLocationData() {
        // Create Troy - the main location from EPIC: The Musical
        Location troy = new Location();
        troy.setName("Troy");
        troy.setDescription("Ancient fortified city in northwestern Anatolia, site of the legendary Trojan War from Homer's Iliad and the setting for EPIC: The Musical");
        troy.setModernName("Hisarlik, Turkey");
        troy.setIsRealPlace(true);
        troy.setIsMythological(true);
        troy.setLatitude(39.957);
        troy.setLongitude(26.239);
        troy.setCulturalSignificance(new Location.CulturalSignificance("PRIMARY"));
        locationRepository.save(troy);

        // Create Ithaca - Odysseus's home
        Location ithaca = new Location();
        ithaca.setName("Ithaca");
        ithaca.setDescription("Island kingdom of Odysseus, his destination throughout EPIC: The Musical's journey home");
        ithaca.setModernName("Ithaki, Greece");
        ithaca.setIsRealPlace(true);
        ithaca.setIsMythological(true);
        ithaca.setLatitude(38.4);
        ithaca.setLongitude(20.7);
        ithaca.setCulturalSignificance(new Location.CulturalSignificance("PRIMARY"));
        locationRepository.save(ithaca);

        // Create the Underworld - mythological location from the musical
        Location underworld = new Location();
        underworld.setName("The Underworld");
        underworld.setDescription("Realm of the dead ruled by Hades, visited by Odysseus in EPIC: The Musical to seek guidance");
        underworld.setModernName("Mythological Realm");
        underworld.setIsRealPlace(false);
        underworld.setIsMythological(true);
        underworld.setLatitude(null);
        underworld.setLongitude(null);
        underworld.setCulturalSignificance(new Location.CulturalSignificance("SECONDARY"));
        locationRepository.save(underworld);

        System.out.println("// [DONE] Seeded EPIC: The Musical location data - Troy, Ithaca, and The Underworld");
    }
    
    private void seedEpicSagaData() {
        // Create The Troy Saga - first saga in EPIC: The Musical
        Saga troySaga = Saga.builder()
            .title("The Troy Saga")
            .description("The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.")
            .releaseDate("2022-12-25")
            .episodeCount(5)
            .genres(Arrays.asList("Musical Theatre", "Epic Rock", "Orchestral"))
            .themes(Arrays.asList("War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"))
            .inspirations(Arrays.asList("Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"))
            .albumArtUrl("https://example.com/troy-saga-art.jpg")
            .youtubePlaylistUrl("https://youtube.com/playlist?list=troy-saga")
            .totalDurationSeconds(1263) // Approximately 21 minutes
            .build();
        
        sagaRepository.save(troySaga);
        
        // Create The Cyclops Saga
        Saga cyclopsSaga = Saga.builder()
            .title("The Cyclops Saga")
            .description("Odysseus encounters Polyphemus and learns harsh lessons about pride and consequences.")
            .releaseDate("2023-01-15")
            .episodeCount(4)
            .genres(Arrays.asList("Musical Theatre", "Heavy Rock", "Intense Orchestral"))
            .themes(Arrays.asList("Pride", "Hubris", "Divine Retribution", "Loss", "Consequences"))
            .inspirations(Arrays.asList("Homer's Odyssey", "Greek Mythology", "Rock Opera"))
            .albumArtUrl("https://example.com/cyclops-saga-art.jpg")
            .youtubePlaylistUrl("https://youtube.com/playlist?list=cyclops-saga")
            .totalDurationSeconds(1032) // Approximately 17 minutes
            .build();
        
        sagaRepository.save(cyclopsSaga);
        
        // Create The Ocean Saga
        Saga oceanSaga = Saga.builder()
            .title("The Ocean Saga")
            .description("Odysseus faces Poseidon's wrath and the challenge of the wind bag.")
            .releaseDate("2023-02-14")
            .episodeCount(4)
            .genres(Arrays.asList("Musical Theatre", "Oceanic Orchestral", "Divine Power"))
            .themes(Arrays.asList("Divine Punishment", "Trust", "Leadership", "Ruthlessness"))
            .inspirations(Arrays.asList("Homer's Odyssey", "Ocean Mythology", "Divine Intervention"))
            .albumArtUrl("https://example.com/ocean-saga-art.jpg")
            .youtubePlaylistUrl("https://youtube.com/playlist?list=ocean-saga")
            .totalDurationSeconds(1081) // Approximately 18 minutes
            .build();
        
        sagaRepository.save(oceanSaga);
        
        // Create The Circe Saga
        Saga circeSaga = Saga.builder()
            .title("The Circe Saga")
            .description("Odysseus encounters the sorceress Circe and faces tests of wit and will.")
            .releaseDate("2023-03-15")
            .episodeCount(4)
            .genres(Arrays.asList("Musical Theatre", "Magical Orchestral", "Mystical"))
            .themes(Arrays.asList("Magic", "Temptation", "Sacrifice", "Transformation", "Wisdom"))
            .inspirations(Arrays.asList("Homer's Odyssey", "Magic and Sorcery", "Ancient Mysticism"))
            .albumArtUrl("https://example.com/circe-saga-art.jpg")
            .youtubePlaylistUrl("https://youtube.com/playlist?list=circe-saga")
            .totalDurationSeconds(962) // Approximately 16 minutes
            .build();
        
        sagaRepository.save(circeSaga);
        
        System.out.println("// [DONE] Seeded EPIC: The Musical saga data - Troy, Cyclops, Ocean, and Circe Sagas");
    }
    
    private void seedTroySagaSongs() {
        // Get the Troy Saga (should be the first one)
        Saga troySaga = sagaRepository.findById(1L).orElse(null);
        if (troySaga == null) {
            System.out.println("[ICON] Troy Saga not found, skipping song seeding");
            return;
        }
        
        // 1. The Horse and the Infant
        Song song1 = new Song();
        song1.setTitle("The Horse and the Infant");
        song1.setTrackNumber(1);
        song1.setDurationSeconds(264);
        song1.setDescription("The Greek warriors celebrate their victory in Troy, but Odysseus faces a difficult decision about the infant prince Astyanax.");
        song1.setThemes(Arrays.asList("War", "Moral Dilemma", "Prophecy", "Divine Guidance"));
        song1.setSaga(troySaga);
        songRepository.save(song1);

        // 2. Just a Man
        Song song2 = new Song();
        song2.setTitle("Just a Man");
        song2.setTrackNumber(2);
        song2.setDurationSeconds(237);
        song2.setDescription("Odysseus grapples with his humanity and the weight of his choices as a leader and father.");
        song2.setThemes(Arrays.asList("Humanity", "Vulnerability", "Family", "Sacrifice"));
        song2.setSaga(troySaga);
        songRepository.save(song2);

        // 3. Full Speed Ahead
        Song song3 = new Song();
        song3.setTitle("Full Speed Ahead");
        song3.setTrackNumber(3);
        song3.setDurationSeconds(201);
        song3.setDescription("The crew sets sail from Troy, eager to return home. Polites encourages optimism while Odysseus remains cautious.");
        song3.setThemes(Arrays.asList("Optimism", "Leadership", "Friendship", "Hope"));
        song3.setSaga(troySaga);
        songRepository.save(song3);

        // 4. Open Arms
        Song song4 = new Song();
        song4.setTitle("Open Arms");
        song4.setTrackNumber(4);
        song4.setDurationSeconds(324);
        song4.setDescription("Polites encourages kindness and openness, contrasting with Odysseus's caution.");
        song4.setThemes(Arrays.asList("Kindness", "Philosophy", "Trust", "Worldview"));
        song4.setSaga(troySaga);
        songRepository.save(song4);

        // 5. Warrior of the Mind
        Song song5 = new Song();
        song5.setTitle("Warrior of the Mind");
        song5.setTrackNumber(5);
        song5.setDurationSeconds(251);
        song5.setDescription("Athena appears and challenges Odysseus to be the warrior she trained.");
        song5.setThemes(Arrays.asList("Divine Intervention", "Training", "Warrior Spirit", "Mentorship"));
        song5.setSaga(troySaga);
        songRepository.save(song5);
        
        System.out.println("// [DONE] Seeded 5 Troy Saga songs");
    }
}
