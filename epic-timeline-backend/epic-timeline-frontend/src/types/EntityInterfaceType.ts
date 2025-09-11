import { CharacterType, ComparisonType } from './EnumsIndex';

export interface Song {
  id: number;
  title: string;
  trackNumber?: number;
  description: string;
  themes: string[];
  durationSeconds?: number;
  sagaId: number;
  characterIds: number[];
}

