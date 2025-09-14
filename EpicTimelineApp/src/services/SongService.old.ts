/**
 * Song Service for Epic Timeline
 * Provides song data and integration with saga system
 */

import { Song } from '../components/Audio/SongList';

export class SongService {
  /**
   * Get sample songs for Epic: The Musical sagas
   */
  static getSampleSongs(): Song[] {
    return [
      // Troy Saga
      {
        id: 'troy-1',
        title: 'The Horse and the Infant',
        description: 'The Greek warriors celebrate their victory in Troy, but Odysseus faces a difficult decision about the infant prince Astyanax.',
        duration: '4:12',
        durationSeconds: 252,
        saga: 'The Troy Saga',
        order: 1,
        themes: ['War', 'Moral Dilemma', 'Fatherhood'],
        characters: ['Odysseus', 'Astyanax', 'Greek Soldiers'],
        isReleased: true,
        releaseDate: '2022-12-25',
        youtubeUrl: 'https://youtube.com/watch?v=example1',
        spotifyUrl: 'https://open.spotify.com/track/example1',
      },
      {
        id: 'troy-2',
        title: 'Just a Man',
        description: 'Odysseus grapples with his humanity and the weight of his choices as a leader and father.',
        duration: '4:35',
        durationSeconds: 275,
        saga: 'The Troy Saga',
        order: 2,
        themes: ['Humanity', 'Leadership', 'Inner Conflict'],
        characters: ['Odysseus'],
        isReleased: true,
        releaseDate: '2022-12-25',
        youtubeUrl: 'https://youtube.com/watch?v=example2',
        spotifyUrl: 'https://open.spotify.com/track/example2',
      },
      {
        id: 'troy-3',
        title: 'Full Speed Ahead',
        description: 'The crew sets sail from Troy, eager to return home. Polites encourages optimism while Odysseus remains cautious.',
        duration: '2:42',
        durationSeconds: 162,
        saga: 'The Troy Saga',
        order: 3,
        themes: ['Journey', 'Optimism vs Caution', 'Friendship'],
        characters: ['Odysseus', 'Polites', 'Eurylochus'],
        isReleased: true,
        releaseDate: '2022-12-25',
        youtubeUrl: 'https://youtube.com/watch?v=example3',
        spotifyUrl: 'https://open.spotify.com/track/example3',
      },
      {
        id: 'troy-4',
        title: 'Open Arms',
        description: 'Polites encourages kindness and openness, contrasting with Odysseus\'s caution.',
        duration: '3:21',
        durationSeconds: 201,
        saga: 'The Troy Saga',
        order: 4,
        themes: ['Kindness', 'Trust', 'Philosophy'],
        characters: ['Polites', 'Odysseus'],
        isReleased: true,
        releaseDate: '2022-12-25',
        youtubeUrl: 'https://youtube.com/watch?v=example4',
        spotifyUrl: 'https://open.spotify.com/track/example4',
      },
      {
        id: 'troy-5',
        title: 'Warrior of the Mind',
        description: 'Athena appears and challenges Odysseus to be the warrior she trained.',
        duration: '4:07',
        durationSeconds: 247,
        saga: 'The Troy Saga',
        order: 5,
        themes: ['Divine Intervention', 'Training', 'Warrior Spirit'],
        characters: ['Athena', 'Odysseus'],
        isReleased: true,
        releaseDate: '2022-12-25',
        youtubeUrl: 'https://youtube.com/watch?v=example5',
        spotifyUrl: 'https://open.spotify.com/track/example5',
      },

      // Cyclops Saga
      {
        id: 'cyclops-1',
        title: 'Polyphemus',
        description: 'The crew encounters the terrifying cyclops in his cave.',
        duration: '5:23',
        durationSeconds: 323,
        saga: 'The Cyclops Saga',
        order: 1,
        themes: ['Monster', 'Danger', 'Survival'],
        characters: ['Polyphemus', 'Odysseus', 'Crew'],
        isReleased: true,
        releaseDate: '2023-01-15',
        youtubeUrl: 'https://youtube.com/watch?v=cyclops1',
        spotifyUrl: 'https://open.spotify.com/track/cyclops1',
      },
      {
        id: 'cyclops-2',
        title: 'Survive',
        description: 'Odysseus devises a plan to escape the cyclops\' cave.',
        duration: '3:45',
        durationSeconds: 225,
        saga: 'The Cyclops Saga',
        order: 2,
        themes: ['Strategy', 'Survival', 'Leadership'],
        characters: ['Odysseus', 'Polites', 'Eurylochus'],
        isReleased: true,
        releaseDate: '2023-01-15',
        youtubeUrl: 'https://youtube.com/watch?v=cyclops2',
        spotifyUrl: 'https://open.spotify.com/track/cyclops2',
      },
      {
        id: 'cyclops-3',
        title: 'Remember Them',
        description: 'Odysseus reveals his name, leading to devastating consequences.',
        duration: '4:28',
        durationSeconds: 268,
        saga: 'The Cyclops Saga',
        order: 3,
        themes: ['Pride', 'Consequence', 'Loss'],
        characters: ['Odysseus', 'Polyphemus', 'Polites'],
        isReleased: true,
        releaseDate: '2023-01-15',
        youtubeUrl: 'https://youtube.com/watch?v=cyclops3',
        spotifyUrl: 'https://open.spotify.com/track/cyclops3',
      },
      {
        id: 'cyclops-4',
        title: 'My Goodbye',
        description: 'Athena abandons Odysseus due to his prideful actions.',
        duration: '6:15',
        durationSeconds: 375,
        saga: 'The Cyclops Saga',
        order: 4,
        themes: ['Abandonment', 'Divine Wrath', 'Isolation'],
        characters: ['Athena', 'Odysseus'],
        isReleased: true,
        releaseDate: '2023-01-15',
        youtubeUrl: 'https://youtube.com/watch?v=cyclops4',
        spotifyUrl: 'https://open.spotify.com/track/cyclops4',
      },

      // Ocean Saga
      {
        id: 'ocean-1',
        title: 'Storm',
        description: 'Poseidon unleashes his wrath upon Odysseus and his crew.',
        duration: '2:18',
        durationSeconds: 138,
        saga: 'The Ocean Saga',
        order: 1,
        themes: ['Divine Wrath', 'Storm', 'Punishment'],
        characters: ['Poseidon', 'Odysseus', 'Crew'],
        isReleased: true,
        releaseDate: '2023-12-15',
        youtubeUrl: 'https://youtube.com/watch?v=ocean1',
        spotifyUrl: 'https://open.spotify.com/track/ocean1',
      },
      {
        id: 'ocean-2',
        title: 'Luck Runs Out',
        description: 'Eurylochus confronts Odysseus about his leadership decisions.',
        duration: '4:33',
        durationSeconds: 273,
        saga: 'The Ocean Saga',
        order: 2,
        themes: ['Leadership', 'Trust', 'Doubt'],
        characters: ['Eurylochus', 'Odysseus'],
        isReleased: true,
        releaseDate: '2023-12-15',
        youtubeUrl: 'https://youtube.com/watch?v=ocean2',
        spotifyUrl: 'https://open.spotify.com/track/ocean2',
      },
      {
        id: 'ocean-3',
        title: 'Keep Your Friends Close',
        description: 'Aeolus gives Odysseus the bag of winds, but warns about trust.',
        duration: '5:45',
        durationSeconds: 345,
        saga: 'The Ocean Saga',
        order: 3,
        themes: ['Trust', 'Betrayal', 'Divine Gift'],
        characters: ['Aeolus', 'Odysseus', 'Eurylochus'],
        isReleased: true,
        releaseDate: '2023-12-15',
        youtubeUrl: 'https://youtube.com/watch?v=ocean3',
        spotifyUrl: 'https://open.spotify.com/track/ocean3',
      },
      {
        id: 'ocean-4',
        title: 'Ruthlessness',
        description: 'Poseidon demonstrates the cost of mercy and the power of ruthlessness.',
        duration: '6:42',
        durationSeconds: 402,
        saga: 'The Ocean Saga',
        order: 4,
        themes: ['Ruthlessness', 'Power', 'Divine Lesson'],
        characters: ['Poseidon', 'Odysseus'],
        isReleased: true,
        releaseDate: '2023-12-15',
        youtubeUrl: 'https://youtube.com/watch?v=ocean4',
        spotifyUrl: 'https://open.spotify.com/track/ocean4',
      },

      // Circe Saga
      {
        id: 'circe-1',
        title: 'Puppeteer',
        description: 'Circe demonstrates her magical powers and transforms men into pigs.',
        duration: '3:28',
        durationSeconds: 208,
        saga: 'The Circe Saga',
        order: 1,
        themes: ['Magic', 'Transformation', 'Power'],
        characters: ['Circe', 'Eurylochus', 'Crew'],
        isReleased: false,
        releaseDate: '2024-04-15',
        youtubeUrl: 'https://youtube.com/watch?v=circe1',
        spotifyUrl: 'https://open.spotify.com/track/circe1',
      },
      {
        id: 'circe-2',
        title: 'Wouldn\'t You Like',
        description: 'Hermes offers Odysseus magical protection against Circe.',
        duration: '2:55',
        durationSeconds: 175,
        saga: 'The Circe Saga',
        order: 2,
        themes: ['Divine Aid', 'Magic', 'Trickery'],
        characters: ['Hermes', 'Odysseus'],
        isReleased: false,
        releaseDate: '2024-04-15',
        youtubeUrl: 'https://youtube.com/watch?v=circe2',
        spotifyUrl: 'https://open.spotify.com/track/circe2',
      },
      {
        id: 'circe-3',
        title: 'Done For',
        description: 'Odysseus confronts Circe with Hermes\' magical protection.',
        duration: '4:12',
        durationSeconds: 252,
        saga: 'The Circe Saga',
        order: 3,
        themes: ['Confrontation', 'Magic Duel', 'Resolve'],
        characters: ['Circe', 'Odysseus'],
        isReleased: false,
        releaseDate: '2024-04-15',
        youtubeUrl: 'https://youtube.com/watch?v=circe3',
        spotifyUrl: 'https://open.spotify.com/track/circe3',
      },
      {
        id: 'circe-4',
        title: 'There Are Other Ways',
        description: 'Circe reveals alternative paths and deeper truths about the journey.',
        duration: '5:37',
        durationSeconds: 337,
        saga: 'The Circe Saga',
        order: 4,
        themes: ['Wisdom', 'Alternative Paths', 'Truth'],
        characters: ['Circe', 'Odysseus'],
        isReleased: false,
        releaseDate: '2024-04-15',
        youtubeUrl: 'https://youtube.com/watch?v=circe4',
        spotifyUrl: 'https://open.spotify.com/track/circe4',
      },
    ];
  }

  /**
   * Get songs by saga name
   */
  static getSongsBySaga(sagaName: string): Song[] {
    const allSongs = this.getSampleSongs();
    return allSongs.filter(song => song.saga === sagaName);
  }

  /**
   * Get a specific song by ID
   */
  static getSongById(songId: string): Song | null {
    const allSongs = this.getSampleSongs();
    return allSongs.find(song => song.id === songId) || null;
  }

  /**
   * Get songs by release status
   */
  static getSongsByReleaseStatus(isReleased: boolean): Song[] {
    const allSongs = this.getSampleSongs();
    return allSongs.filter(song => song.isReleased === isReleased);
  }

  /**
   * Search songs by query
   */
  static searchSongs(query: string): Song[] {
    const allSongs = this.getSampleSongs();
    const lowercaseQuery = query.toLowerCase();
    
    return allSongs.filter(song =>
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.description?.toLowerCase().includes(lowercaseQuery) ||
      song.saga.toLowerCase().includes(lowercaseQuery) ||
      song.characters?.some(char => char.toLowerCase().includes(lowercaseQuery)) ||
      song.themes?.some(theme => theme.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get total duration for a saga
   */
  static getSagaTotalDuration(sagaName: string): { formatted: string; seconds: number } {
    const songs = this.getSongsBySaga(sagaName);
    const totalSeconds = songs.reduce((total, song) => total + song.durationSeconds, 0);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    let formatted = '';
    if (hours > 0) {
      formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return { formatted, seconds: totalSeconds };
  }

  /**
   * Get saga statistics
   */
  static getSagaStats() {
    const allSongs = this.getSampleSongs();
    const sagas = [...new Set(allSongs.map(song => song.saga))];
    
    return sagas.map(saga => {
      const songs = this.getSongsBySaga(saga);
      const releasedSongs = songs.filter(song => song.isReleased);
      const duration = this.getSagaTotalDuration(saga);
      
      return {
        name: saga,
        totalSongs: songs.length,
        releasedSongs: releasedSongs.length,
        totalDuration: duration,
        themes: [...new Set(songs.flatMap(song => song.themes || []))],
        characters: [...new Set(songs.flatMap(song => song.characters || []))],
      };
    });
  }

  /**
   * Convert song to simplified format for display
   */
  static formatSongForDisplay(song: Song): {
    title: string;
    duration: string;
    status: string;
    saga: string;
  } {
    return {
      title: song.title,
      duration: song.duration,
      status: song.isReleased ? 'Released' : 'Upcoming',
      saga: song.saga,
    };
  }
}

export default SongService;
