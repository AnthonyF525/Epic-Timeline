/**
 * Song Data Service for Epic Timeline
 * Handles transformation of backend API data to frontend Song interface
 * Adds perspective and narrative context data for P2 requirements
 */

import { Song } from '../components/Audio/SongList';

export interface BackendSong {
  id: number;
  title: string;
  trackNumber: number;
  description?: string;
  durationSeconds: number;
  themes?: string[];
  saga: {
    id: number;
    title: string;
    description: string;
    releaseDate?: string;
    episodeCount: number;
    genres: string[];
    themes: string[];
    inspirations: string[];
    albumArtUrl?: string;
    amazonMusicUrl?: string;
    youtubePlaylistUrl?: string;
    totalDurationSeconds: number;
  };
  characters: Array<{
    id: number;
    name: string;
    characterType?: string;
    description?: string;
    isProtagonist?: boolean;
    aliases?: string[];
    powers?: string[];
  }>;
}

/**
 * Perspective and narrative context data based on EPIC: The Musical
 * This enriches the basic song data with storytelling perspective information
 */
const SONG_PERSPECTIVE_DATA: Record<string, { 
  perspective: string; 
  narrativeContext: string;
  isReleased?: boolean;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}> = {
  "The Horse and the Infant": {
    perspective: "Odysseus (moral conflict)",
    narrativeContext: "Facing the prophecy that Hector's son will burn Troy to the ground",
    isReleased: true,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Working demo URL
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    spotifyUrl: "https://open.spotify.com/track/example1"
  },
  "Just a Man": {
    perspective: "Odysseus (vulnerable father)",
    narrativeContext: "Internal struggle between duty as king and love as father",
    isReleased: true,
    audioUrl: "https://invalid-domain.com/nonexistent-file.mp3", // Will fail to test error handling
    youtubeUrl: "https://www.youtube.com/watch?v=example2"
  },
  "Full Speed Ahead": {
    perspective: "Odysseus & Crew (optimistic departure)",
    narrativeContext: "Setting sail from Troy, eager to return home after 10 years of war",
    isReleased: true,
    audioUrl: "https://www.soundjay.com/misc/sounds/button-3.wav", // Working demo URL
    youtubeUrl: "https://www.youtube.com/watch?v=example3"
  },
  "Open Arms": {
    perspective: "Polites (philosophical optimist)",
    narrativeContext: "Advocating for kindness and trust versus Odysseus's caution",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example4"
  },
  "Warrior of the Mind": {
    perspective: "Athena (divine mentor)",
    narrativeContext: "Goddess challenging her pupil to embrace his strategic warrior nature",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example5"
  },
  "Polyphemus": {
    perspective: "Polyphemus (enraged cyclops)",
    narrativeContext: "The cyclops's fury as his sheep are stolen and his cave invaded",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example6"
  },
  "Survive": {
    perspective: "Odysseus & Crew (desperate survivors)",
    narrativeContext: "Fighting for their lives against the cyclops Polyphemus",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example7"
  },
  "My Goodbye": {
    perspective: "Athena (disappointed goddess)",
    narrativeContext: "Athena's heartbroken farewell as she abandons her stubborn student",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example8"
  },
  "Storm": {
    perspective: "Poseidon (vengeful sea god)",
    narrativeContext: "The sea god's wrath unleashed upon Odysseus for blinding his son",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example9"
  },
  "Luck Runs Out": {
    perspective: "Eurylochus (concerned friend)",
    narrativeContext: "Second-in-command questioning Odysseus's dangerous decisions",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example10"
  },
  "Keep Your Friends Close": {
    perspective: "Aeolus (whimsical wind god)",
    narrativeContext: "The playful god of winds offering aid with hidden consequences",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example11"
  },
  "Ruthlessness": {
    perspective: "Poseidon (merciless god)",
    narrativeContext: "Teaching Odysseus the price of mercy through devastating loss",
    isReleased: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example12"
  }
};

/**
 * Transform backend song data to frontend format with perspective information
 */
export function transformSongData(backendSong: BackendSong): Song {
  const perspectiveData = SONG_PERSPECTIVE_DATA[backendSong.title] || {
    perspective: "Unknown perspective",
    narrativeContext: "Story context not yet defined",
    isReleased: false
  };

  return {
    ...backendSong,
    perspective: perspectiveData.perspective,
    narrativeContext: perspectiveData.narrativeContext,
    isReleased: perspectiveData.isReleased ?? false,
    audioUrl: perspectiveData.audioUrl,
    youtubeUrl: perspectiveData.youtubeUrl,
    spotifyUrl: perspectiveData.spotifyUrl,
  };
}

/**
 * Transform an array of backend songs to frontend format
 */
export function transformSongsData(backendSongs: BackendSong[]): Song[] {
  return backendSongs.map(transformSongData);
}

/**
 * Fetch songs from backend API and transform them
 */
export async function fetchSongs(sagaId?: number): Promise<Song[]> {
  try {
    // For now, always use mock data until backend is fixed
    console.log('Using mock song data for P2 demonstration');
    return getMockSongs();
    
    /* Backend API call (commented out until backend compilation is fixed)
    const apiUrl = sagaId 
      ? `http://localhost:8080/api/songs?sagaId=${sagaId}`
      : 'http://localhost:8080/api/songs';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendSongs: BackendSong[] = await response.json();
    return transformSongsData(backendSongs);
    */
  } catch (error) {
    console.error('Error fetching songs:', error);
    
    // Return mock data for development/testing
    return getMockSongs();
  }
}

/**
 * Mock song data for development/testing when backend is not available
 */
export function getMockSongs(): Song[] {
  const mockBackendSongs: BackendSong[] = [
    {
      id: 1,
      title: "The Horse and the Infant",
      trackNumber: 1,
      description: "The Greek warriors celebrate their victory in Troy, but Odysseus faces a difficult decision about the infant prince Astyanax.",
      durationSeconds: 264,
      themes: ["War", "Moral Dilemma", "Prophecy", "Divine Guidance"],
      saga: {
        id: 1,
        title: "The Troy Saga",
        description: "The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.",
        releaseDate: "2022-12-25",
        episodeCount: 5,
        genres: ["Musical Theatre", "Epic Rock", "Orchestral"],
        themes: ["War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"],
        albumArtUrl: "https://example.com/troy-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=troy-saga",
        totalDurationSeconds: 1263
      },
      characters: [
        {
          id: 1,
          name: "Odysseus",
          characterType: "MORTAL",
          description: "King of Ithaca, clever strategist and warrior",
          isProtagonist: true,
          aliases: ["Man of Many Ways", "Sacker of Cities"],
          powers: ["Strategic Mind", "Divine Favor of Athena"]
        }
      ]
    },
    {
      id: 2,
      title: "Just a Man",
      trackNumber: 2,
      description: "Odysseus grapples with his humanity and the weight of his choices as a leader and father.",
      durationSeconds: 237,
      themes: ["Humanity", "Vulnerability", "Family", "Sacrifice"],
      saga: {
        id: 1,
        title: "The Troy Saga",
        description: "The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.",
        releaseDate: "2022-12-25",
        episodeCount: 5,
        genres: ["Musical Theatre", "Epic Rock", "Orchestral"],
        themes: ["War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"],
        albumArtUrl: "https://example.com/troy-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=troy-saga",
        totalDurationSeconds: 1263
      },
      characters: [
        {
          id: 1,
          name: "Odysseus",
          characterType: "MORTAL",
          description: "King of Ithaca, clever strategist and warrior",
          isProtagonist: true,
        }
      ]
    },
    {
      id: 3,
      title: "Full Speed Ahead",
      trackNumber: 3,
      description: "The crew sets sail from Troy, eager to return home after 10 years of war.",
      durationSeconds: 198,
      themes: ["Journey", "Hope", "Camaraderie", "Adventure"],
      saga: {
        id: 1,
        title: "The Troy Saga",
        description: "The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.",
        releaseDate: "2022-12-25",
        episodeCount: 5,
        genres: ["Musical Theatre", "Epic Rock", "Orchestral"],
        themes: ["War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"],
        albumArtUrl: "https://example.com/troy-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=troy-saga",
        totalDurationSeconds: 1263
      },
      characters: [
        {
          id: 1,
          name: "Odysseus",
          characterType: "MORTAL",
          description: "King of Ithaca, clever strategist and warrior",
          isProtagonist: true,
        },
        {
          id: 2,
          name: "Eurylochus",
          characterType: "MORTAL",
          description: "Odysseus's second-in-command and brother-in-law",
          isProtagonist: false,
        }
      ]
    },
    {
      id: 4,
      title: "Open Arms",
      trackNumber: 4,
      description: "Polites advocates for kindness and trust when encountering strangers on the island of the Lotus Eaters.",
      durationSeconds: 225,
      themes: ["Kindness", "Trust", "Philosophy", "Friendship"],
      saga: {
        id: 1,
        title: "The Troy Saga",
        description: "The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.",
        releaseDate: "2022-12-25",
        episodeCount: 5,
        genres: ["Musical Theatre", "Epic Rock", "Orchestral"],
        themes: ["War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"],
        albumArtUrl: "https://example.com/troy-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=troy-saga",
        totalDurationSeconds: 1263
      },
      characters: [
        {
          id: 3,
          name: "Polites",
          characterType: "MORTAL",
          description: "Odysseus's best friend and voice of optimism",
          isProtagonist: false,
        },
        {
          id: 1,
          name: "Odysseus",
          characterType: "MORTAL",
          description: "King of Ithaca, clever strategist and warrior",
          isProtagonist: true,
        }
      ]
    },
    {
      id: 5,
      title: "Warrior of the Mind",
      trackNumber: 5,
      description: "Athena appears to challenge Odysseus to embrace his strategic nature and warrior instincts.",
      durationSeconds: 276,
      themes: ["Divine Guidance", "Strategy", "Mentorship", "Inner Conflict", "Wisdom", "Power"],
      saga: {
        id: 1,
        title: "The Troy Saga",
        description: "The beginning of Odysseus's epic journey, starting with the fall of Troy and his first moral challenges.",
        releaseDate: "2022-12-25",
        episodeCount: 5,
        genres: ["Musical Theatre", "Epic Rock", "Orchestral"],
        themes: ["War", "Strategy", "Moral Complexity", "Heroism", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology", "Ancient Greek Theatre"],
        albumArtUrl: "https://example.com/troy-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=troy-saga",
        totalDurationSeconds: 1263
      },
      characters: [
        {
          id: 4,
          name: "Athena",
          characterType: "DIVINE",
          description: "Goddess of wisdom and warfare, Odysseus's divine mentor",
          isProtagonist: false,
          powers: ["Divine Wisdom", "Strategic Warfare", "Shape-shifting"]
        },
        {
          id: 1,
          name: "Odysseus",
          characterType: "MORTAL",
          description: "King of Ithaca, clever strategist and warrior",
          isProtagonist: true,
        }
      ]
    },
    // P2: Additional songs with different character perspectives for filtering demo
    {
      id: 6,
      title: "Polyphemus",
      trackNumber: 6,
      description: "The cyclops Polyphemus discovers intruders in his cave and becomes enraged.",
      durationSeconds: 198,
      themes: ["Rage", "Territory", "Monster", "Divine Heritage"],
      saga: {
        id: 2,
        title: "The Cyclops Saga",
        description: "Odysseus and his men encounter the cyclops Polyphemus on their journey home.",
        releaseDate: "2023-01-15",
        episodeCount: 4,
        genres: ["Musical Theatre", "Heavy Rock", "Mythological"],
        themes: ["Monsters", "Survival", "Consequences", "Hubris"],
        inspirations: ["Homer's Odyssey", "Greek Mythology"],
        albumArtUrl: "https://example.com/cyclops-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=cyclops-saga",
        totalDurationSeconds: 892
      },
      characters: [
        {
          id: 5,
          name: "Polyphemus",
          characterType: "MONSTER",
          description: "Cyclops son of Poseidon, guardian of his island",
          isProtagonist: false,
          powers: ["Superhuman Strength", "Divine Heritage"]
        }
      ]
    },
    {
      id: 7,
      title: "Storm", 
      trackNumber: 7,
      description: "Poseidon unleashes his divine wrath upon Odysseus and his fleet.",
      durationSeconds: 212,
      themes: ["Divine Wrath", "Storms", "Vengeance", "Power"],
      saga: {
        id: 3,
        title: "The Ocean Saga",
        description: "The crew faces the wrath of Poseidon after angering the sea god.",
        releaseDate: "2023-02-14",
        episodeCount: 4,
        genres: ["Musical Theatre", "Orchestral", "Divine Epic"],
        themes: ["Divine Retribution", "Ocean", "Family", "Sacrifice"],
        inspirations: ["Homer's Odyssey", "Greek Mythology"],
        albumArtUrl: "https://example.com/ocean-saga-art.jpg",
        youtubePlaylistUrl: "https://youtube.com/playlist?list=ocean-saga",
        totalDurationSeconds: 1024
      },
      characters: [
        {
          id: 6,
          name: "Poseidon",
          characterType: "DIVINE",
          description: "God of the sea, earthquakes, and father of Polyphemus",
          isProtagonist: false,
          powers: ["Control over Seas", "Earthquakes", "Divine Authority"]
        }
      ]
    }
  ];

  return transformSongsData(mockBackendSongs);
}

export default {
  transformSongData,
  transformSongsData,
  fetchSongs,
  getMockSongs
};
