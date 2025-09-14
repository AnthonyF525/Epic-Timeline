/**
 * Song Service for Epic Timeline
 * Provides song data and integration with saga system
 */

import { Song } from '../components/Audio/SongList';

// Define saga templates
const TROY_SAGA = {
  id: 1,
  title: 'The Troy Saga',
  description: 'The epic tale of the fall of Troy and its aftermath',
  episodeCount: 5,
  genres: ['Epic', 'Drama', 'Musical Theatre'],
  themes: ['War', 'Honor', 'Sacrifice', 'Leadership'],
  inspirations: ['Homer\'s Iliad', 'Greek Mythology'],
  totalDurationSeconds: 1350,
};

const CYCLOPS_SAGA = {
  id: 2,
  title: 'The Cyclops Saga',
  description: 'Odysseus encounters the dangerous cyclops Polyphemus',
  episodeCount: 4,
  genres: ['Adventure', 'Mythology', 'Musical Theatre'],
  themes: ['Pride', 'Wisdom', 'Survival', 'Consequences'],
  inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
  totalDurationSeconds: 1200,
};

const OCEAN_SAGA = {
  id: 3,
  title: 'The Ocean Saga',
  description: 'The perilous journey across the seas',
  episodeCount: 4,
  genres: ['Adventure', 'Mythology', 'Musical Theatre'],
  themes: ['Journey', 'Trust', 'Betrayal', 'Divine Wrath'],
  inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
  totalDurationSeconds: 1100,
};

const CIRCE_SAGA = {
  id: 4,
  title: 'The Circe Saga',
  description: 'Encounters with the sorceress Circe',
  episodeCount: 4,
  genres: ['Magic', 'Mythology', 'Musical Theatre'],
  themes: ['Magic', 'Transformation', 'Guidance', 'Sacrifice'],
  inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
  totalDurationSeconds: 1050,
};

export class SongService {
  /**
   * Get all available songs with proper typing
   */
  static getAllSongs(): Song[] {
    const allSongs: Song[] = [
      // Troy Saga
      {
        id: 1,
        title: 'The Horse and the Infant',
        trackNumber: 1,
        description: 'The story begins as the Trojan Horse brings victory to the Greeks, but Odysseus faces a terrible choice.',
        durationSeconds: 240,
        saga: TROY_SAGA,
        audioUrl: 'https://cdn1.suno.ai/42aae500-c9c0-4bb3-bf19-5bb8f9bb4c7b.mp3',
        perspective: 'Odysseus',
        narrativeContext: 'Trojan War conclusion, moral dilemma with Astyanax',
        characters: [
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 2, name: 'Astyanax', characterType: 'Child' },
          { id: 3, name: 'Greek Soldiers', characterType: 'Chorus' }
        ],
        themes: ['War', 'Honor', 'Difficult Choices', 'Leadership'],
        isReleased: true,
      },
      {
        id: 2,
        title: 'Just a Man',
        trackNumber: 2,
        description: 'Odysseus grapples with the weight of his decisions and what it means to be human in the face of war.',
        durationSeconds: 285,
        saga: TROY_SAGA,
        audioUrl: 'https://cdn1.suno.ai/f97dc5a8-8c36-4c12-a6c8-b744c93b83e7.mp3',
        perspective: 'Odysseus',
        narrativeContext: 'Introspective moment, questioning humanity and duty',
        characters: [
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Humanity', 'Moral Conflict', 'Self-Reflection', 'Responsibility'],
        isReleased: true,
      },
      {
        id: 3,
        title: 'Full Speed Ahead',
        trackNumber: 3,
        description: 'The crew sets sail from Troy, ready to return home with optimism and caution.',
        durationSeconds: 195,
        saga: TROY_SAGA,
        audioUrl: 'https://cdn1.suno.ai/68ac8f1c-8f81-45b6-9f6e-9c7e8d5e1a2b.mp3',
        perspective: 'Odysseus & Crew',
        narrativeContext: 'Departure from Troy, setting sail for home',
        characters: [
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 4, name: 'Polites', characterType: 'Friend' },
          { id: 5, name: 'Eurylochus', characterType: 'Lieutenant' }
        ],
        themes: ['Adventure', 'Optimism', 'Brotherhood', 'Journey'],
        isReleased: true,
      },
      {
        id: 4,
        title: 'Open Arms',
        trackNumber: 4,
        description: 'Polites advocates for kindness and open-heartedness in their approach to new lands.',
        durationSeconds: 210,
        saga: TROY_SAGA,
        audioUrl: 'https://cdn1.suno.ai/7c9d8e2f-3g4h-5i6j-7k8l-9m0n1o2p3q4r.mp3',
        perspective: 'Polites',
        narrativeContext: 'Philosophy of kindness vs caution',
        characters: [
          { id: 4, name: 'Polites', characterType: 'Friend', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Kindness', 'Trust', 'Philosophy', 'Friendship'],
        isReleased: true,
      },
      {
        id: 5,
        title: 'Warrior of the Mind',
        trackNumber: 5,
        description: 'Athena appears to guide Odysseus, testing his wisdom and resolve.',
        durationSeconds: 285,
        saga: TROY_SAGA,
        audioUrl: 'https://cdn1.suno.ai/8d0e9f3g-4h5i-6j7k-8l9m-0n1o2p3q4r5s.mp3',
        perspective: 'Athena',
        narrativeContext: 'Divine guidance and wisdom',
        characters: [
          { id: 6, name: 'Athena', characterType: 'Goddess', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Wisdom', 'Divine Guidance', 'Strategy', 'Mentorship'],
        isReleased: true,
      },

      // Cyclops Saga
      {
        id: 6,
        title: 'Polyphemus',
        trackNumber: 1,
        description: 'The crew encounters the dangerous cyclops and must survive his wrath.',
        durationSeconds: 320,
        saga: CYCLOPS_SAGA,
        audioUrl: 'https://cdn1.suno.ai/9e1f0g4h-5i6j-7k8l-9m0n-1o2p3q4r5s6t.mp3',
        perspective: 'Polyphemus',
        narrativeContext: 'First encounter with the cyclops',
        characters: [
          { id: 7, name: 'Polyphemus', characterType: 'Monster', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 8, name: 'Crew', characterType: 'Chorus' }
        ],
        themes: ['Danger', 'Survival', 'Monster', 'Fear'],
        isReleased: true,
      },
      {
        id: 7,
        title: 'Survive',
        trackNumber: 2,
        description: 'Odysseus and his crew must use their wits to escape the cyclops cave.',
        durationSeconds: 255,
        saga: CYCLOPS_SAGA,
        audioUrl: 'https://cdn1.suno.ai/0f2g1h5i-6j7k-8l9m-0n1o-2p3q4r5s6t7u.mp3',
        perspective: 'Odysseus & Crew',
        narrativeContext: 'Escape plan from cyclops cave',
        characters: [
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 4, name: 'Polites', characterType: 'Friend' },
          { id: 5, name: 'Eurylochus', characterType: 'Lieutenant' }
        ],
        themes: ['Strategy', 'Teamwork', 'Survival', 'Cleverness'],
        isReleased: true,
      },
      {
        id: 8,
        title: 'Remember Them',
        trackNumber: 3,
        description: 'A solemn moment remembering the fallen comrades.',
        durationSeconds: 275,
        saga: CYCLOPS_SAGA,
        audioUrl: 'https://cdn1.suno.ai/1g3h2i6j-7k8l-9m0n-1o2p-3q4r5s6t7u8v.mp3',
        perspective: 'Odysseus',
        narrativeContext: 'Mourning fallen crew members',
        characters: [
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 7, name: 'Polyphemus', characterType: 'Monster', isProtagonist: false },
          { id: 4, name: 'Polites', characterType: 'Friend' }
        ],
        themes: ['Loss', 'Memory', 'Sacrifice', 'Honor'],
        isReleased: true,
      },
      {
        id: 9,
        title: 'My Goodbye',
        trackNumber: 4,
        description: 'Athena withdraws her support after Odysseus makes a critical error.',
        durationSeconds: 350,
        saga: CYCLOPS_SAGA,
        audioUrl: 'https://cdn1.suno.ai/2h4i3j7k-8l9m-0n1o-2p3q-4r5s6t7u8v9w.mp3',
        perspective: 'Athena',
        narrativeContext: 'Divine disappointment and departure',
        characters: [
          { id: 6, name: 'Athena', characterType: 'Goddess', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Disappointment', 'Consequences', 'Pride', 'Divine Wrath'],
        isReleased: true,
      },

      // Ocean Saga
      {
        id: 10,
        title: 'Storm',
        trackNumber: 1,
        description: 'Poseidon\'s wrath manifests as a terrible storm.',
        durationSeconds: 290,
        saga: OCEAN_SAGA,
        audioUrl: 'https://cdn1.suno.ai/3i5j4k8l-9m0n-1o2p-3q4r-5s6t7u8v9w0x.mp3',
        perspective: 'Poseidon',
        narrativeContext: 'Divine punishment through storm',
        characters: [
          { id: 9, name: 'Poseidon', characterType: 'God', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 8, name: 'Crew', characterType: 'Chorus' }
        ],
        themes: ['Divine Wrath', 'Nature', 'Power', 'Punishment'],
        isReleased: true,
      },
      {
        id: 11,
        title: 'Luck Runs Out',
        trackNumber: 2,
        description: 'Eurylochus questions Odysseus\' leadership as their situation worsens.',
        durationSeconds: 265,
        saga: OCEAN_SAGA,
        audioUrl: 'https://cdn1.suno.ai/4j6k5l9m-0n1o-2p3q-4r5s-6t7u8v9w0x1y.mp3',
        perspective: 'Eurylochus',
        narrativeContext: 'Leadership crisis and doubt',
        characters: [
          { id: 5, name: 'Eurylochus', characterType: 'Lieutenant', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Leadership', 'Doubt', 'Tension', 'Conflict'],
        isReleased: true,
      },
      {
        id: 12,
        title: 'Keep Your Friends Close',
        trackNumber: 3,
        description: 'Aeolus provides the bag of winds, but trust issues arise.',
        durationSeconds: 315,
        saga: OCEAN_SAGA,
        audioUrl: 'https://cdn1.suno.ai/5k7l6m0n-1o2p-3q4r-5s6t-7u8v9w0x1y2z.mp3',
        perspective: 'Aeolus',
        narrativeContext: 'Gift of winds and trust',
        characters: [
          { id: 10, name: 'Aeolus', characterType: 'Wind God', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true },
          { id: 5, name: 'Eurylochus', characterType: 'Lieutenant' }
        ],
        themes: ['Trust', 'Temptation', 'Betrayal', 'Divine Help'],
        isReleased: true,
      },
      {
        id: 13,
        title: 'Ruthlessness',
        trackNumber: 4,
        description: 'Poseidon teaches a harsh lesson about mercy and ruthlessness.',
        durationSeconds: 330,
        saga: OCEAN_SAGA,
        audioUrl: 'https://cdn1.suno.ai/6l8m7n1o-2p3q-4r5s-6t7u-8v9w0x1y2z3a.mp3',
        perspective: 'Poseidon',
        narrativeContext: 'Divine lesson in ruthlessness',
        characters: [
          { id: 9, name: 'Poseidon', characterType: 'God', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Ruthlessness', 'Divine Justice', 'Mercy', 'Power'],
        isReleased: true,
      },

      // Circe Saga
      {
        id: 14,
        title: 'Puppeer',
        trackNumber: 1,
        description: 'The crew encounters Circe\'s magic and transformations.',
        durationSeconds: 280,
        saga: CIRCE_SAGA,
        audioUrl: 'https://cdn1.suno.ai/7m9n8o2p-3q4r-5s6t-7u8v-9w0x1y2z3a4b.mp3',
        perspective: 'Circe',
        narrativeContext: 'Magical transformation of the crew',
        characters: [
          { id: 11, name: 'Circe', characterType: 'Sorceress', isProtagonist: false },
          { id: 5, name: 'Eurylochus', characterType: 'Lieutenant' },
          { id: 8, name: 'Crew', characterType: 'Chorus' }
        ],
        themes: ['Magic', 'Transformation', 'Power', 'Control'],
        isReleased: true,
      },
      {
        id: 15,
        title: 'Wouldn\'t You Like',
        trackNumber: 2,
        description: 'Hermes offers his guidance and magical assistance.',
        durationSeconds: 245,
        saga: CIRCE_SAGA,
        audioUrl: 'https://cdn1.suno.ai/8n0o9p3q-4r5s-6t7u-8v9w-0x1y2z3a4b5c.mp3',
        perspective: 'Hermes',
        narrativeContext: 'Divine assistance and trickery',
        characters: [
          { id: 12, name: 'Hermes', characterType: 'God', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Trickery', 'Divine Help', 'Magic', 'Guidance'],
        isReleased: true,
      },
      {
        id: 16,
        title: 'Done For',
        trackNumber: 3,
        description: 'Circe is impressed by Odysseus\' resistance to her magic.',
        durationSeconds: 260,
        saga: CIRCE_SAGA,
        audioUrl: 'https://cdn1.suno.ai/9o1p0q4r-5s6t-7u8v-9w0x-1y2z3a4b5c6d.mp3',
        perspective: 'Circe',
        narrativeContext: 'Recognition of Odysseus\' strength',
        characters: [
          { id: 11, name: 'Circe', characterType: 'Sorceress', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Recognition', 'Respect', 'Power', 'Magic'],
        isReleased: true,
      },
      {
        id: 17,
        title: 'There Are Other Ways',
        trackNumber: 4,
        description: 'Circe offers alternative solutions and deeper wisdom.',
        durationSeconds: 295,
        saga: CIRCE_SAGA,
        audioUrl: 'https://cdn1.suno.ai/0p2q1r5s-6t7u-8v9w-0x1y-2z3a4b5c6d7e.mp3',
        perspective: 'Circe',
        narrativeContext: 'Wisdom and alternative paths',
        characters: [
          { id: 11, name: 'Circe', characterType: 'Sorceress', isProtagonist: false },
          { id: 1, name: 'Odysseus', characterType: 'Hero', isProtagonist: true }
        ],
        themes: ['Wisdom', 'Alternatives', 'Choice', 'Guidance'],
        isReleased: true,
      },
    ];

    return allSongs;
  }

  /**
   * Get songs by saga name
   */
  static getSongsBySaga(sagaName: string): Song[] {
    const allSongs = this.getAllSongs();
    return allSongs.filter(song => song.saga.title === sagaName);
  }

  /**
   * Get song by ID
   */
  static getSongById(songId: number): Song | null {
    const allSongs = this.getAllSongs();
    return allSongs.find(song => song.id === songId) || null;
  }

  /**
   * Get available character perspectives for filtering
   */
  static getAvailablePerspectives(): string[] {
    const allSongs = this.getAllSongs();
    const perspectives = new Set<string>();
    
    allSongs.forEach(song => {
      if (song.perspective) {
        perspectives.add(song.perspective);
      }
    });
    
    return Array.from(perspectives).sort();
  }

  /**
   * Search songs by query (title, saga, character, theme)
   */
  static searchSongs(query: string): Song[] {
    if (!query.trim()) {
      return this.getAllSongs();
    }
    
    const allSongs = this.getAllSongs();
    const lowercaseQuery = query.toLowerCase();
    
    return allSongs.filter(song => 
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.saga.title.toLowerCase().includes(lowercaseQuery) ||
      song.characters?.some(char => char.name.toLowerCase().includes(lowercaseQuery)) ||
      song.themes?.some(theme => theme.toLowerCase().includes(lowercaseQuery)) ||
      song.perspective?.toLowerCase().includes(lowercaseQuery) ||
      song.narrativeContext?.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Filter songs by character perspective
   */
  static filterByPerspective(songs: Song[], perspective: string): Song[] {
    if (!perspective) {
      return songs;
    }
    
    return songs.filter(song => song.perspective === perspective);
  }

  /**
   * Get saga statistics
   */
  static getSagaStats(saga: string) {
    const songs = this.getSongsBySaga(saga);
    if (songs.length === 0) {
      return null;
    }
    
    const duration = this.getSagaTotalDuration(saga);
    
    return {
      name: saga,
      songCount: songs.length,
      totalDuration: duration,
      releasedCount: songs.filter(s => s.isReleased).length,
      upcomingCount: songs.filter(s => !s.isReleased).length,
    };
  }

  /**
   * Get total duration for a saga
   */
  static getSagaTotalDuration(sagaName: string): number {
    const songs = this.getSongsBySaga(sagaName);
    return songs.reduce((total, song) => total + song.durationSeconds, 0);
  }

  /**
   * Format song data for demo purposes
   */
  static formatSongForDemo(song: Song) {
    return {
      title: song.title,
      duration: this.formatDuration(song.durationSeconds),
      status: song.isReleased ? 'Released' : 'Upcoming',
      saga: song.saga.title,
    };
  }

  /**
   * Format duration from seconds to MM:SS
   */
  static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Get enriched song data with additional computed fields
   */
  static getEnrichedSongData(): Song[] {
    return this.getAllSongs().map(song => ({
      ...song,
      // Add any computed fields here if needed
    }));
  }
}
