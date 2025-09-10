import { Character, Location, Event, Song, CharacterType } from './EntityInterfaceType.ts';

// Enhanced Saga interface with array fields
export interface Saga {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    episodeCount?: number;

    //Array fields - relationships
    songs: song[];
    characters: Character[];
    locations: Location[];
    events: Event[];

    //Array fields 
    genres: string[];
    themes: string[];
    inspirations: string[];

    // Optional metadata
    albumArlUrl?: string;
    amazonMusicUrl?: string;
    youtubePlaylistUrl?
}