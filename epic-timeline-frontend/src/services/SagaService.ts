import { epicRequest } from './apiClient';
import { Saga, SagaFilter, SagaStats, NarrativeImportance, CulturalSignificance } from '../types';
import { ArrayOperation, ArrayUpdatePayload, BatchArrayUpdate, EpicArrayHelpers } from '../utils/arrayUpdates';

export class SagaService {
  
  
  static async getAllSagas(): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>('/sagas');
    return response.data;
  }

  static async getSagaById(id: number): Promise<Saga> {
    const response = await epicRequest.get<Saga>(`/sagas/${id}`);
    return response.data;
  }

  static async createSaga(saga: Omit<Saga, 'id' | 'createdAt'>): Promise<Saga> {
    const response = await epicRequest.post<Saga>('/sagas', saga);
    return response.data;
  }

  static async updateSaga(id: number, saga: Partial<Saga>): Promise<Saga> {
    const response = await epicRequest.put<Saga>(`/sagas/${id}`, saga);
    return response.data;
  }

  static async deleteSaga(id: number): Promise<void> {
    await epicRequest.delete(`/sagas/${id}`);
  }

  // ✅ EPIC TIMELINE SPECIFIC SAGAS
  static async getTroySaga(): Promise<Saga> {
    return this.getSagaById(1); // Troy Saga
  }

  static async getCyclopsSaga(): Promise<Saga> {
    return this.getSagaById(2); // Cyclops Saga
  }

  static async getOceanSaga(): Promise<Saga> {
    return this.getSagaById(3); // Ocean Saga
  }

  static async getCirceSaga(): Promise<Saga> {
    return this.getSagaById(4); // Circe Saga
  }

  static async getUnderworldSaga(): Promise<Saga> {
    return this.getSagaById(5); // Underworld Saga
  }

  static async getThunderSaga(): Promise<Saga> {
    return this.getSagaById(6); // Thunder Saga
  }

  static async getWisdomSaga(): Promise<Saga> {
    return this.getSagaById(7); // Wisdom Saga
  }

  static async getVengeanceSaga(): Promise<Saga> {
    return this.getSagaById(8); // Vengeance Saga
  }

  static async getIthacaSaga(): Promise<Saga> {
    return this.getSagaById(9); // Ithaca Saga
  }

  // ✅ ENUM-BASED FILTERING
  static async getSagasByImportance(importance: NarrativeImportance): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/importance/${importance}`);
    return response.data;
  }

  static async getCriticalSagas(): Promise<Saga[]> {
    return this.getSagasByImportance(NarrativeImportance.CRITICAL);
  }

  static async getHighImportanceSagas(): Promise<Saga[]> {
    return this.getSagasByImportance(NarrativeImportance.HIGH);
  }

  static async getSagasByCulturalSignificance(significance: CulturalSignificance): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/cultural-significance/${significance}`);
    return response.data;
  }

  static async getLegendarySagas(): Promise<Saga[]> {
    return this.getSagasByCulturalSignificance(CulturalSignificance.LEGENDARY);
  }

  // ✅ THEME-BASED OPERATIONS
  static async getSagasByTheme(theme: string): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/theme/${encodeURIComponent(theme)}`);
    return response.data;
  }

  static async getSagasByThemes(themes: string[]): Promise<Saga[]> {
    const params = new URLSearchParams();
    themes.forEach(theme => params.append('theme', theme));
    const response = await epicRequest.get<Saga[]>(`/sagas/themes?${params.toString()}`);
    return response.data;
  }

  // ✅ MUSICAL STYLE FILTERING
  static async getSagasByMusicalStyle(style: string): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/musical-style/${encodeURIComponent(style)}`);
    return response.data;
  }

  // ✅ COMPLETION STATUS
  static async getCompletedSagas(): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>('/sagas/completed');
    return response.data;
  }

  static async getCanonicalSagas(): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>('/sagas/canonical');
    return response.data;
  }

  // ✅ SAGA STATISTICS
  static async getSagaStats(): Promise<SagaStats> {
    const response = await epicRequest.get<SagaStats>('/sagas/stats');
    return response.data;
  }

  static async getSagaCompletion(): Promise<{ completed: number; total: number; percentage: number }> {
    const response = await epicRequest.get('/sagas/completion');
    return response.data;
  }

  // ✅ SEARCH AND DISCOVERY
  static async searchSagas(query: string): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  static async getRecommendedSagas(basedOnSagaId: number): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>(`/sagas/${basedOnSagaId}/recommendations`);
    return response.data;
  }

  // ✅ SAGA RELATIONSHIPS
  static async getSagaSequence(): Promise<Saga[]> {
    const response = await epicRequest.get<Saga[]>('/sagas/sequence');
    return response.data;
  }

  static async getNextSaga(currentSagaId: number): Promise<Saga | null> {
    const response = await epicRequest.get<Saga>(`/sagas/${currentSagaId}/next`);
    return response.data;
  }

  static async getPreviousSaga(currentSagaId: number): Promise<Saga | null> {
    const response = await epicRequest.get<Saga>(`/sagas/${currentSagaId}/previous`);
    return response.data;
  }

  // ✅ HOMER COMPARISON INTEGRATION
  static async getSagaWithHomerComparison(sagaId: number): Promise<Saga & { homerComparison?: any }> {
    const response = await epicRequest.get(`/sagas/${sagaId}/with-homer-comparison`);
    return response.data;
  }

  // ✅ SAGA FILTERING WITH MULTIPLE CRITERIA
  static async filterSagas(filter: SagaFilter): Promise<Saga[]> {
    const params = new URLSearchParams();
    
    if (filter.themes) filter.themes.forEach(theme => params.append('theme', theme));
    if (filter.musicalStyles) filter.musicalStyles.forEach(style => params.append('musicalStyle', style));
    if (filter.narrativeImportance) params.append('narrativeImportance', filter.narrativeImportance);
    if (filter.culturalSignificance) params.append('culturalSignificance', filter.culturalSignificance);
    if (filter.isComplete !== undefined) params.append('isComplete', filter.isComplete.toString());
    if (filter.isCanon !== undefined) params.append('isCanon', filter.isCanon.toString());
    if (filter.minRating) params.append('minRating', filter.minRating.toString());
    if (filter.maxRating) params.append('maxRating', filter.maxRating.toString());

    const response = await epicRequest.get<Saga[]>(`/sagas/filter?${params.toString()}`);
    return response.data;
  }

  // ✅ ARRAY FIELD UPDATES
  static async updateSagaThemes(sagaId: number, operation: ArrayOperation, themes: string[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'themes',
      items: operation === ArrayOperation.REPLACE ? themes : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? themes : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? themes : undefined
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/themes`, payload);
    return response.data;
  }

  static async addSagaThemes(sagaId: number, themes: string[]): Promise<Saga> {
    return this.updateSagaThemes(sagaId, ArrayOperation.ADD, themes);
  }

  static async removeSagaThemes(sagaId: number, themes: string[]): Promise<Saga> {
    return this.updateSagaThemes(sagaId, ArrayOperation.REMOVE, themes);
  }

  static async replaceSagaThemes(sagaId: number, themes: string[]): Promise<Saga> {
    return this.updateSagaThemes(sagaId, ArrayOperation.REPLACE, themes);
  }

  // ✅ MUSICAL STYLES UPDATES
  static async updateSagaMusicalStyles(sagaId: number, operation: ArrayOperation, styles: string[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'musicalStyles',
      items: operation === ArrayOperation.REPLACE ? styles : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? styles : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? styles : undefined
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/musical-styles`, payload);
    return response.data;
  }

  // ✅ KEY EVENTS UPDATES
  static async updateSagaKeyEvents(sagaId: number, operation: ArrayOperation, events: string[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'keyEvents',
      items: operation === ArrayOperation.REPLACE ? events : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? events : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? events : undefined
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/key-events`, payload);
    return response.data;
  }

  static async reorderSagaKeyEvents(sagaId: number, newOrder: number[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation: ArrayOperation.REORDER,
      field: 'keyEvents',
      newOrder
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/key-events`, payload);
    return response.data;
  }

  // ✅ EDUCATIONAL TOPICS UPDATES
  static async updateSagaEducationalTopics(sagaId: number, operation: ArrayOperation, topics: string[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'educationalTopics',
      items: operation === ArrayOperation.REPLACE ? topics : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? topics : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? topics : undefined
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/educational-topics`, payload);
    return response.data;
  }

  // ✅ HOMER REFERENCES UPDATES
  static async updateSagaHomerReferences(sagaId: number, operation: ArrayOperation, references: string[]): Promise<Saga> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'homerReferences',
      items: operation === ArrayOperation.REPLACE ? references : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? references : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? references : undefined
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/homer-references`, payload);
    return response.data;
  }

  // ✅ BATCH ARRAY UPDATES
  static async batchUpdateSagaArrays(sagaId: number, updates: ArrayUpdatePayload[]): Promise<Saga> {
    const batchPayload: BatchArrayUpdate = {
      entityType: 'saga',
      entityId: sagaId,
      updates,
      validateBeforeUpdate: true
    };

    const response = await epicRequest.patch(`/sagas/${sagaId}/batch-arrays`, batchPayload);
    return response.data;
  }

  // ✅ HELPER: UPDATE TROY SAGA THEMES
  static async updateTroySagaThemes(operation: ArrayOperation, themes: string[]): Promise<Saga> {
    return this.updateSagaThemes(1, operation, themes); // Troy Saga ID: 1
  }
}

export default SagaService;