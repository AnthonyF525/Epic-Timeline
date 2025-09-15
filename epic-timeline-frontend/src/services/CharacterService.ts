import { epicRequest } from './apiClient';
import { Character, CharacterRelationship } from '../types';
import { ArrayOperation, ArrayUpdatePayload, BatchArrayUpdate, EpicArrayHelpers } from '../utils/arrayUpdates';

export class CharacterService {
  
  // ✓ BASIC CHARACTER OPERATIONS
  static async getAllCharacters(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters');
    return response.data;
  }

  static async getCharacterById(id: number): Promise<Character> {
    const response = await epicRequest.get<Character>(`/characters/${id}`);
    return response.data;
  }

  static async createCharacter(character: Omit<Character, 'id' | 'createdAt'>): Promise<Character> {
    const response = await epicRequest.post<Character>('/characters', character);
    return response.data;
  }

  static async updateCharacter(id: number, character: Partial<Character>): Promise<Character> {
    const response = await epicRequest.put<Character>(`/characters/${id}`, character);
    return response.data;
  }

  static async deleteCharacter(id: number): Promise<void> {
    await epicRequest.delete(`/characters/${id}`);
  }

  // ✓ ENUM-BASED CHARACTER TYPE FILTERING
  static async getCharactersByType(type: CharacterType): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/type/${type}`);
    return response.data;
  }

  static async getMortalCharacters(): Promise<Character[]> {
    return this.getCharactersByType(CharacterType.MORTAL);
  }

  static async getGodCharacters(): Promise<Character[]> {
    return this.getCharactersByType(CharacterType.GOD);
  }

  static async getMonsterCharacters(): Promise<Character[]> {
    return this.getCharactersByType(CharacterType.MONSTER);
  }

  static async getSpiritCharacters(): Promise<Character[]> {
    return this.getCharactersByType(CharacterType.SPIRIT);
  }

  // ✓ EPIC TIMELINE MAIN CHARACTERS
  static async getOdysseus(): Promise<Character> {
    const characters = await this.getMortalCharacters();
    return characters.find(c => c.name === 'Odysseus')!;
  }

  static async getAthena(): Promise<Character> {
    const characters = await this.getGodCharacters();
    return characters.find(c => c.name === 'Athena')!;
  }

  static async getPoseidon(): Promise<Character> {
    const characters = await this.getGodCharacters();
    return characters.find(c => c.name === 'Poseidon')!;
  }

  static async getPolites(): Promise<Character> {
    const characters = await this.getMortalCharacters();
    return characters.find(c => c.name === 'Polites')!;
  }

  static async getEurylochus(): Promise<Character> {
    const characters = await this.getMortalCharacters();
    return characters.find(c => c.name === 'Eurylochus')!;
  }

  static async getPenelope(): Promise<Character> {
    const characters = await this.getMortalCharacters();
    return characters.find(c => c.name === 'Penelope')!;
  }

  static async getTelemachus(): Promise<Character> {
    const characters = await this.getMortalCharacters();
    return characters.find(c => c.name === 'Telemachus')!;
  }

  // ✓ CHARACTER ROLE FILTERING
  static async getProtagonists(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters/protagonists');
    return response.data;
  }

  static async getAntagonists(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters/antagonists');
    return response.data;
  }

  static async getTitleCharacters(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters/title-characters');
    return response.data;
  }

  static async getImmortalCharacters(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters/immortal');
    return response.data;
  }

  static async getCharactersWithSpokenLines(): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>('/characters/with-spoken-lines');
    return response.data;
  }

  // ✓ SAGA APPEARANCE TRACKING
  static async getCharactersBySaga(sagaTitle: string): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/saga/${encodeURIComponent(sagaTitle)}`);
    return response.data;
  }

  static async getCharacterAppearances(characterId: number): Promise<string[]> {
    const response = await epicRequest.get<string[]>(`/characters/${characterId}/appearances`);
    return response.data;
  }

  // ✓ CULTURAL SIGNIFICANCE
  static async getCharactersByCulturalSignificance(significance: CulturalSignificance): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/cultural-significance/${significance}`);
    return response.data;
  }

  static async getLegendaryCharacters(): Promise<Character[]> {
    return this.getCharactersByCulturalSignificance(CulturalSignificance.LEGENDARY);
  }

  // ✓ TRAIT AND ABILITY FILTERING
  static async getCharactersByTrait(trait: string): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/trait/${encodeURIComponent(trait)}`);
    return response.data;
  }

  static async getCharactersByAbility(ability: string): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/ability/${encodeURIComponent(ability)}`);
    return response.data;
  }

  static async getCharactersByRole(role: string): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/role/${encodeURIComponent(role)}`);
    return response.data;
  }

  // ✓ SEARCH AND DISCOVERY
  static async searchCharacters(query: string): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  static async getRelatedCharacters(characterId: number): Promise<Character[]> {
    const response = await epicRequest.get<Character[]>(`/characters/${characterId}/related`);
    return response.data;
  }

  // ✓ CHARACTER STATISTICS
  static async getCharacterStats(): Promise<any> {
    const response = await epicRequest.get('/characters/stats');
    return response.data;
  }

  // ✓ COMPLEX FILTERING
  static async filterCharacters(filter: CharacterFilter): Promise<Character[]> {
    const params = new URLSearchParams();
    
    if (filter.characterTypes) filter.characterTypes.forEach(type => params.append('type', type));
    if (filter.isImmortal !== undefined) params.append('isImmortal', filter.isImmortal.toString());
    if (filter.isProtagonist !== undefined) params.append('isProtagonist', filter.isProtagonist.toString());
    if (filter.hasSpokenLines !== undefined) params.append('hasSpokenLines', filter.hasSpokenLines.toString());
    if (filter.culturalSignificance) params.append('culturalSignificance', filter.culturalSignificance);
    if (filter.appearanceInSagas) filter.appearanceInSagas.forEach(saga => params.append('saga', saga));
    if (filter.traits) filter.traits.forEach(trait => params.append('trait', trait));
    if (filter.roles) filter.roles.forEach(role => params.append('role', role));

    const response = await epicRequest.get<Character[]>(`/characters/filter?${params.toString()}`);
    return response.data;
  }

  // ✓ APPEARANCE IN SAGAS UPDATES
  static async updateCharacterSagaAppearances(characterId: number, operation: ArrayOperation, sagas: string[]): Promise<Character> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'appearanceInSagas',
      items: operation === ArrayOperation.REPLACE ? sagas : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? sagas : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? sagas : undefined
    };

    const response = await epicRequest.patch(`/characters/${characterId}/saga-appearances`, payload);
    return response.data;
  }

  static async addCharacterToSagas(characterId: number, sagas: string[]): Promise<Character> {
    return this.updateCharacterSagaAppearances(characterId, ArrayOperation.ADD, sagas);
  }

  static async removeCharacterFromSagas(characterId: number, sagas: string[]): Promise<Character> {
    return this.updateCharacterSagaAppearances(characterId, ArrayOperation.REMOVE, sagas);
  }

  // ✓ PERSONALITY TRAITS UPDATES
  static async updateCharacterTraits(characterId: number, operation: ArrayOperation, traits: string[]): Promise<Character> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'personalityTraits',
      items: operation === ArrayOperation.REPLACE ? traits : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? traits : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? traits : undefined
    };

    const response = await epicRequest.patch(`/characters/${characterId}/traits`, payload);
    return response.data;
  }

  // ✓ ABILITIES UPDATES
  static async updateCharacterAbilities(characterId: number, operation: ArrayOperation, abilities: string[]): Promise<Character> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'abilities',
      items: operation === ArrayOperation.REPLACE ? abilities : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? abilities : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? abilities : undefined
    };

    const response = await epicRequest.patch(`/characters/${characterId}/abilities`, payload);
    return response.data;
  }

  // ✓ RELATIONSHIPS UPDATES (Complex Objects)
  static async updateCharacterRelationships(characterId: number, operation: ArrayOperation, relationships: CharacterRelationship[]): Promise<Character> {
    const payload: ArrayUpdatePayload<CharacterRelationship> = {
      operation,
      field: 'relationships',
      items: operation === ArrayOperation.REPLACE ? relationships : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? relationships : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? relationships : undefined,
      mergeKey: 'relatedCharacterId' // Use character ID for deduplication
    };

    const response = await epicRequest.patch(`/characters/${characterId}/relationships`, payload);
    return response.data;
  }

  static async addCharacterRelationships(characterId: number, relationships: CharacterRelationship[]): Promise<Character> {
    return this.updateCharacterRelationships(characterId, ArrayOperation.ADD, relationships);
  }

  static async removeCharacterRelationships(characterId: number, relationshipIds: number[]): Promise<Character> {
    const relationshipsToRemove = relationshipIds.map(id => ({ relatedCharacterId: id } as CharacterRelationship));
    return this.updateCharacterRelationships(characterId, ArrayOperation.REMOVE, relationshipsToRemove);
  }

  // ✓ ROLES UPDATES
  static async updateCharacterRoles(characterId: number, operation: ArrayOperation, roles: string[]): Promise<Character> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'roles',
      items: operation === ArrayOperation.REPLACE ? roles : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? roles : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? roles : undefined
    };

    const response = await epicRequest.patch(`/characters/${characterId}/roles`, payload);
    return response.data;
  }

  // ✓ SYMBOLISM UPDATES
  static async updateCharacterSymbolism(characterId: number, operation: ArrayOperation, symbolism: string[]): Promise<Character> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'symbolism',
      items: operation === ArrayOperation.REPLACE ? symbolism : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? symbolism : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? symbolism : undefined
    };

    const response = await epicRequest.patch(`/characters/${characterId}/symbolism`, payload);
    return response.data;
  }

  // ✓ EPIC TIMELINE HELPERS
  static async addOdysseusToSagas(sagas: string[]): Promise<Character> {
    const odysseus = await this.getOdysseus();
    return this.addCharacterToSagas(odysseus.id, sagas);
  }

  static async updateAthenaTraits(operation: ArrayOperation, traits: string[]): Promise<Character> {
    const athena = await this.getAthena();
    return this.updateCharacterTraits(athena.id, operation, traits);
  }

  // ✓ BATCH ARRAY UPDATES
  static async batchUpdateCharacterArrays(characterId: number, updates: ArrayUpdatePayload[]): Promise<Character> {
    const batchPayload: BatchArrayUpdate = {
      entityType: 'character',
      entityId: characterId,
      updates,
      validateBeforeUpdate: true
    };

    const response = await epicRequest.patch(`/characters/${characterId}/batch-arrays`, batchPayload);
    return response.data;
  }
}

export default CharacterService;