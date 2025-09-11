import { Character, CharacterType } from './EntityInterfaceType'

export interface Song {
  id: number;
  title: string;
  trackNumber?: number;
  description: string;
  durationSeconds?: number;
  sagaId: number;

  themes: string[];
  genres: string[];
  instruments: string[];
  vocals: string[];
  moods: string[];
  tags: string[];

  characterIds: number[];
  characters: Character[];

  songSections: string[];
  lyricHighlights: string[];

  amazonMusicIds: string[];
  youtubeIds: string[];
  inspirationSources: string[];

  lyricist?: string;
  composer?: string;
  producer?: string;
  recordingDate?: string;
  albumArtUrl?: string;
  isInstrumental?: boolean;
  hasDialogue?: boolean;
  isReprise?: boolean;
  originalSongId?: number;
}

export type SongsByCharacter = {
  character: Character;
  songs: Song[];
  totalSongs: number;
  primarySongs: Song[];       
  featuredSongs: Song[];      
};

export type SongForCreation = Omit<Song, 'id' | 'characters'> & {
  characterIds: number[];     
  themes: string[];
  genres: string[];
  instruments: string[];
  vocals: string[];
  moods: string[];
  tags: string[];
  songSections: string[];
  lyricHighlights: string[];
  amazonMusicIds: string[];
  youtubeIds: string[];
  inspirationSources: string[];
};

export type SongFilter = {
  sagaId?: number;
  characterId?: number;
  characterType?: CharacterType;
  theme?: string;
  genre?: string;
  mood?: string;
  instrument?: string;
  hasCharacter?: boolean;
  isInstrumental?: boolean;
  hasDialogue?: boolean;
  minDuration?: number;
  maxDuration?: number;
  searchTerm?: string;
};

export type SongStats = {
  totalSongs: number;
  averageDuration: number;
  mostCommonThemes: string[];
  mostCommonGenres: string[];
  mostFeaturedCharacters: Character[];
  songsByMood: Record<string, number>;
  instrumentalCount: number;
  dialogueCount: number;
  repriseCount: number;
};

export interface CharacterSongAppearance {
  characterId: number;
  character: Character;
  songId: number;
  song: Song;
  appearanceType: 'lead' | 'featured' | 'background' | 'mentioned';
  lyricLines?: string[];     
  significance: 'high' | 'medium' | 'low';
}

export type { Character, CharacterType };