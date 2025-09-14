import { Character, Location, Event, Song, CharacterType } from './EntityInterfaceType';

// Enhanced Saga interface with array fields
export interface Saga {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    episodeCount?: number;

    //Array fields - relationships
    songs: Song[];
    characters: Character[];
    locations: Location[];
    events: Event[];

    //Array fields 
    genres: string[];
    themes: string[];
    inspirations: string[];

    // Optional metadata
    albumArtUrl?: string;
    amazonMusicUrl?: string;
    youtubePlaylistUrl?: string;
    totalDurationSeconds?: number;
}

//Utility types for Saga
export type SagaWithStats = Saga & {
    totalSongs: number;
    totalCharacters: number;
    totalLocations: number;
    totalEvents: number;
    averageSongDuration: number;
};

export type SagaForCreation = Omit<Saga, 'id' | 'songs' | 'characters' | 'locations' | 'events'> & {
    genres: string[];
    themes: string[];
    inspirations: string[];
};