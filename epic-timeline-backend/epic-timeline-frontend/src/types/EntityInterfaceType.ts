import { CharacterType, ComparisonType } from './enums';

export interface Character {
  id: number;
  name: string;
  description: string;
  characterType: CharacterType;
  isProtagonist: boolean;
  aliases: string[];
  powers: string[];
}

export interface Location {
  id: number;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  isRealPlace: boolean;
  isMythological: boolean;
  modernName?: string;
  alternativeNames: string[];
  notableFeatures: string[];
}

export interface Song {
  id: number;
  title: string;
  trackNumber?: number;
  description: string;
  themes: string[];
  durationSeconds?: number;
  sagaId: number;
  characters: Character[];
}

export interface Saga {
  id: number;
  title: string;
  description: string;
  releaseDate: string; 
  episodeCount?: number;
  songs: Song[];
  locations: Location[];
  characters: Character[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  sequenceOrder?: number;
  eventTimestamp?: string; 
  locationId?: number;
  sagaId?: number;
  characters: Character[];
  songs: Song[];
}

export interface Comparison {
  id: number;
  title: string;
  description: string;
  comparisonType: ComparisonType;
  externalSource?: string;
  externalUrl?: string;
  songId?: number;
  characterId?: number;
  eventId?: number;
}

