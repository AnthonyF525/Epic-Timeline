import { epicRequest } from './apiClient';
import { Song, SongFilter, NarrativeImportance } from '../types';
import { ArrayOperation, ArrayUpdatePayload, BatchArrayUpdate, EpicArrayHelpers } from '../utils/arrayUpdates';

export class SongService {
  
  // ✅ BASIC SONG OPERATIONS
  static async getAllSongs(): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>('/songs');
    return response.data;
  }

  static async getSongById(id: number): Promise<Song> {
    const response = await epicRequest.get<Song>(`/songs/${id}`);
    return response.data;
  }

  static async createSong(song: Omit<Song, 'id' | 'createdAt'>): Promise<Song> {
    const response = await epicRequest.post<Song>('/songs', song);
    return response.data;
  }

  static async updateSong(id: number, song: Partial<Song>): Promise<Song> {
    const response = await epicRequest.put<Song>(`/songs/${id}`, song);
    return response.data;
  }

  static async deleteSong(id: number): Promise<void> {
    await epicRequest.delete(`/songs/${id}`);
  }

  // ✅ SAGA-BASED SONG RETRIEVAL
  static async getSongsBySaga(sagaId: number): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/saga/${sagaId}`);
    return response.data;
  }

  static async getTroySagaSongs(): Promise<Song[]> {
    return this.getSongsBySaga(1); // Troy Saga songs
  }

  static async getCyclopsSagaSongs(): Promise<Song[]> {
    return this.getSongsBySaga(2); // Cyclops Saga songs
  }

  // ... other saga songs

  // ✅ CHARACTER-FOCUSED SONGS
  static async getSongsByCharacter(characterName: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/character/${encodeURIComponent(characterName)}`);
    return response.data;
  }

  static async getOdysseussSongs(): Promise<Song[]> {
    return this.getSongsByCharacter('Odysseus');
  }

  static async getAthenasSongs(): Promise<Song[]> {
    return this.getSongsByCharacter('Athena');
  }

  // ✅ NARRATIVE IMPORTANCE FILTERING
  static async getSongsByImportance(importance: NarrativeImportance): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/importance/${importance}`);
    return response.data;
  }

  static async getCriticalSongs(): Promise<Song[]> {
    return this.getSongsByImportance(NarrativeImportance.CRITICAL);
  }

  // ✅ MUSICAL STYLE FILTERING
  static async getSongsByMusicalStyle(style: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/musical-style/${encodeURIComponent(style)}`);
    return response.data;
  }

  static async getSongsByVocalStyle(style: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/vocal-style/${encodeURIComponent(style)}`);
    return response.data;
  }

  // ✅ THEME-BASED FILTERING
  static async getSongsByTheme(theme: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/theme/${encodeURIComponent(theme)}`);
    return response.data;
  }

  static async getSongsByEmotionalTone(tone: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/emotional-tone/${encodeURIComponent(tone)}`);
    return response.data;
  }

  // ✅ NARRATIVE FUNCTION
  static async getSongsByNarrativeFunction(func: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/narrative-function/${encodeURIComponent(func)}`);
    return response.data;
  }

  // ✅ DURATION AND TRACK FILTERING
  static async getSongsByDurationRange(minDuration: number, maxDuration: number): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/duration?min=${minDuration}&max=${maxDuration}`);
    return response.data;
  }

  static async getSongsByTrackNumber(trackNumber: number): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/track/${trackNumber}`);
    return response.data;
  }

  // ✅ INSTRUMENTAL ELEMENTS
  static async getSongsByInstrumentalElement(element: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/instrumental/${encodeURIComponent(element)}`);
    return response.data;
  }

  // ✅ SONG SEARCH AND DISCOVERY
  static async searchSongs(query: string): Promise<Song[]> {
    const response = await epicRequest.get<Song[]>(`/songs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // ✅ SONG STATISTICS
  static async getSongStats(): Promise<any> {
    const response = await epicRequest.get('/songs/stats');
    return response.data;
  }

  static async getTotalDuration(): Promise<number> {
    const response = await epicRequest.get<number>('/songs/total-duration');
    return response.data;
  }

  // ✅ COMPLEX FILTERING
  static async filterSongs(filter: SongFilter): Promise<Song[]> {
    const params = new URLSearchParams();
    
    if (filter.sagaIds) filter.sagaIds.forEach(id => params.append('sagaId', id.toString()));
    if (filter.characterFocus) filter.characterFocus.forEach(char => params.append('character', char));
    if (filter.themes) filter.themes.forEach(theme => params.append('theme', theme));
    if (filter.musicalStyles) filter.musicalStyles.forEach(style => params.append('musicalStyle', style));
    if (filter.narrativeImportance) params.append('narrativeImportance', filter.narrativeImportance);
    if (filter.minDuration) params.append('minDuration', filter.minDuration.toString());
    if (filter.maxDuration) params.append('maxDuration', filter.maxDuration.toString());

    const response = await epicRequest.get<Song[]>(`/songs/filter?${params.toString()}`);
    return response.data;
  }

  // ✅ THEMES UPDATES
  static async updateSongThemes(songId: number, operation: ArrayOperation, themes: string[]): Promise<Song> {
    const updatedThemes = EpicArrayHelpers.updateSongThemes([], operation, themes);
    
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'themes',
      items: operation === ArrayOperation.REPLACE ? themes : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? themes : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? themes : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/themes`, payload);
    return response.data;
  }

  // ✅ CHARACTER FOCUS UPDATES
  static async updateSongCharacterFocus(songId: number, operation: ArrayOperation, characters: string[]): Promise<Song> {
    const updatedFocus = EpicArrayHelpers.updateCharacterFocus([], operation, characters);
    
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'characterFocus',
      items: operation === ArrayOperation.REPLACE ? characters : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? characters : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? characters : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/character-focus`, payload);
    return response.data;
  }

  // ✅ EMOTIONAL TONE UPDATES
  static async updateSongEmotionalTone(songId: number, operation: ArrayOperation, tones: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'emotionalTone',
      items: operation === ArrayOperation.REPLACE ? tones : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? tones : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? tones : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/emotional-tone`, payload);
    return response.data;
  }

  // ✅ INSTRUMENTAL ELEMENTS UPDATES
  static async updateSongInstrumentalElements(songId: number, operation: ArrayOperation, elements: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'instrumentalElements',
      items: operation === ArrayOperation.REPLACE ? elements : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? elements : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? elements : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/instrumental-elements`, payload);
    return response.data;
  }

  // ✅ LEARNING OBJECTIVES UPDATES
  static async updateSongLearningObjectives(songId: number, operation: ArrayOperation, objectives: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'learningObjectives',
      items: operation === ArrayOperation.REPLACE ? objectives : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? objectives : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? objectives : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/learning-objectives`, payload);
    return response.data;
  }

  // ✅ HISTORICAL CONTEXT UPDATES
  static async updateSongHistoricalContext(songId: number, operation: ArrayOperation, context: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'historicalContext',
      items: operation === ArrayOperation.REPLACE ? context : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? context : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? context : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/historical-context`, payload);
    return response.data;
  }

  // ✅ LITERARY DEVICES UPDATES
  static async updateSongLiteraryDevices(songId: number, operation: ArrayOperation, devices: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'literaryDevices',
      items: operation === ArrayOperation.REPLACE ? devices : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? devices : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? devices : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/literary-devices`, payload);
    return response.data;
  }

  // ✅ EPIC CHANGES UPDATES (Homer Comparison)
  static async updateSongEpicChanges(songId: number, operation: ArrayOperation, changes: string[]): Promise<Song> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'epicChanges',
      items: operation === ArrayOperation.REPLACE ? changes : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? changes : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? changes : undefined
    };

    const response = await epicRequest.patch(`/songs/${songId}/epic-changes`, payload);
    return response.data;
  }

  // ✅ BATCH ARRAY UPDATES
  static async batchUpdateSongArrays(songId: number, updates: ArrayUpdatePayload[]): Promise<Song> {
    const batchPayload: BatchArrayUpdate = {
      entityType: 'song',
      entityId: songId,
      updates,
      validateBeforeUpdate: true
    };

    const response = await epicRequest.patch(`/songs/${songId}/batch-arrays`, batchPayload);
    return response.data;
  }

  // ✅ EPIC TIMELINE HELPERS
  static async addThemeToTroySagaSongs(theme: string): Promise<Song[]> {
    const troySongs = await this.getTroySagaSongs();
    const updatedSongs: Song[] = [];
    
    for (const song of troySongs) {
      const updatedSong = await this.updateSongThemes(song.id, ArrayOperation.ADD, [theme]);
      updatedSongs.push(updatedSong);
    }
    
    return updatedSongs;
  }

  static async updateOdysseussSongCharacterFocus(operation: ArrayOperation, characters: string[]): Promise<Song[]> {
    const odysseusSongs = await this.getOdysseussSongs();
    const updatedSongs: Song[] = [];
    
    for (const song of odysseusSongs) {
      const updatedSong = await this.updateSongCharacterFocus(song.id, operation, characters);
      updatedSongs.push(updatedSong);
    }
    
    return updatedSongs;
  }
}

export default SongService;