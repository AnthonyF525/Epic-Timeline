/**
 * SeedDataService - P3 Implementation
 * Service for managing and serving comprehensive seed data for all sagas
 * 
 * This service provides a centralized way to access seed data for development,
 * testing, and fallback scenarios when the API is unavailable.
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';
import { TROY_SAGA_SEED_DATA, TroyLocation } from './TroySagaSeedData';
import { CYCLOPS_SAGA_SEED_DATA, CyclopsLocation } from './CyclopsSagaSeedData';
import { OCEAN_SAGA_SEED_DATA, OceanLocation } from './OceanSagaSeedData';
import { CIRCE_SAGA_SEED_DATA, CirceLocation } from './CirceSagaSeedData';
import { UNDERWORLD_SAGA_SEED_DATA, UnderworldLocation } from './UnderworldSagaSeedData';
import { THUNDER_SAGA_SEED_DATA, ThunderLocation } from './ThunderSagaSeedData';
import { WISDOM_SAGA_SEED_DATA, WisdomLocation } from './WisdomSagaSeedData';
import { VENGEANCE_SAGA_SEED_DATA, VengeanceLocation } from './VengeanceSagaSeedData';
import { ITHACA_SAGA_SEED_DATA, IthacaLocation } from './IthacaSagaSeedData';

export interface SeedDataInfo {
  sagaId: string;
  sagaName: string;
  totalSongs: number;
  totalEvents: number;
  totalCharacters: number;
  totalLocations: number;
  releaseDate: string;
  significance: string;
}

export interface SagaLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: string;
  features: string[];
}

export interface SagaSeedData {
  characters: Character[];
  locations: SagaLocation[];
  songs: Song[];
  events: ApiEvent[];
  metadata: SeedDataInfo;
}

class SeedDataService {
  private seedData: Map<string, SagaSeedData> = new Map();
  private isInitialized = false;

  /**
   * Convert specific location types to unified SagaLocation format
   */
  private convertLocations(locations: any[], sagaId: string): SagaLocation[] {
    return locations.map(location => {
      // Base properties that all locations should have
      const baseLocation: SagaLocation = {
        id: location.id,
        name: location.name,
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        description: location.description,
        saga: sagaId,
        significance: location.significance,
        type: location.type,
        features: location.features || []
      };

      return baseLocation;
    });
  }

  /**
   * Initialize the seed data service with all available saga data
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('📊 SeedDataService already initialized');
      return;
    }

    console.log('🌱 Initializing SeedDataService with comprehensive saga data...');

    try {
      // Load Troy Saga seed data
      this.seedData.set('troy', {
        ...TROY_SAGA_SEED_DATA,
        locations: this.convertLocations(TROY_SAGA_SEED_DATA.locations, 'troy')
      });
      
      // Load Cyclops Saga seed data
      this.seedData.set('cyclops', {
        ...CYCLOPS_SAGA_SEED_DATA,
        locations: this.convertLocations(CYCLOPS_SAGA_SEED_DATA.locations, 'cyclops')
      });
      
      // Load Ocean Saga seed data
      this.seedData.set('ocean', {
        ...OCEAN_SAGA_SEED_DATA,
        locations: this.convertLocations(OCEAN_SAGA_SEED_DATA.locations, 'ocean')
      });
      
      // Load Circe Saga seed data
      this.seedData.set('circe', {
        ...CIRCE_SAGA_SEED_DATA,
        locations: this.convertLocations(CIRCE_SAGA_SEED_DATA.locations, 'circe')
      });
      
      // Load Underworld Saga seed data
      this.seedData.set('underworld', {
        ...UNDERWORLD_SAGA_SEED_DATA,
        locations: this.convertLocations(UNDERWORLD_SAGA_SEED_DATA.locations, 'underworld')
      });
      
      // Load Thunder Saga seed data
      this.seedData.set('thunder', {
        ...THUNDER_SAGA_SEED_DATA,
        locations: this.convertLocations(THUNDER_SAGA_SEED_DATA.locations, 'thunder')
      });

      // Load Wisdom Saga seed data
      this.seedData.set('wisdom', {
        ...WISDOM_SAGA_SEED_DATA,
        locations: this.convertLocations(WISDOM_SAGA_SEED_DATA.locations, 'wisdom')
      });

      // Load Vengeance Saga seed data
      this.seedData.set('vengeance', {
        ...VENGEANCE_SAGA_SEED_DATA,
        locations: this.convertLocations(VENGEANCE_SAGA_SEED_DATA.locations, 'vengeance')
      });

      // Load Ithaca Saga seed data
      this.seedData.set('ithaca', {
        ...ITHACA_SAGA_SEED_DATA,
        locations: this.convertLocations(ITHACA_SAGA_SEED_DATA.locations, 'ithaca')
      });

      this.isInitialized = true;
      console.log('✅ SeedDataService initialized successfully');
      console.log(`📊 Loaded seed data for ${this.seedData.size} sagas`);
      
      this.logSeedDataSummary();

    } catch (error) {
      console.error('❌ Failed to initialize SeedDataService:', error);
    }
  }

  /**
   * Get all available seed data sagas
   */
  public getAvailableSagas(): string[] {
    return Array.from(this.seedData.keys());
  }

  /**
   * Get complete seed data for a specific saga
   */
  public getSagaSeedData(sagaId: string): SagaSeedData | null {
    const data = this.seedData.get(sagaId);
    if (data) {
      console.log(`🌱 Retrieved seed data for ${sagaId} saga`);
      return data;
    }
    console.warn(`⚠️ No seed data available for saga: ${sagaId}`);
    return null;
  }

  /**
   * Get songs for a specific saga
   */
  public getSagaSongs(sagaId: string): Song[] {
    const sagaData = this.getSagaSeedData(sagaId);
    return sagaData?.songs || [];
  }

  /**
   * Get events for a specific saga
   */
  public getSagaEvents(sagaId: string): ApiEvent[] {
    const sagaData = this.getSagaSeedData(sagaId);
    return sagaData?.events || [];
  }

  /**
   * Get characters for a specific saga
   */
  public getSagaCharacters(sagaId: string): Character[] {
    const sagaData = this.getSagaSeedData(sagaId);
    return sagaData?.characters || [];
  }

  /**
   * Get locations for a specific saga
   */
  public getSagaLocations(sagaId: string): SagaLocation[] {
    const sagaData = this.getSagaSeedData(sagaId);
    return sagaData?.locations || [];
  }

  /**
   * Get a specific character by ID across all sagas
   */
  public getCharacterById(characterId: number): Character | null {
    for (const sagaData of this.seedData.values()) {
      const character = sagaData.characters.find(c => c.id === characterId);
      if (character) {
        console.log(`👤 Found character ${character.name} in seed data`);
        return character;
      }
    }
    console.warn(`⚠️ Character with ID ${characterId} not found in seed data`);
    return null;
  }

  /**
   * Get a specific song by ID across all sagas
   */
  public getSongById(songId: number): Song | null {
    for (const sagaData of this.seedData.values()) {
      const song = sagaData.songs.find(s => s.id === songId);
      if (song) {
        console.log(`🎵 Found song "${song.title}" in seed data`);
        return song;
      }
    }
    console.warn(`⚠️ Song with ID ${songId} not found in seed data`);
    return null;
  }

  /**
   * Get a specific event by ID across all sagas
   */
  public getEventById(eventId: number): ApiEvent | null {
    for (const sagaData of this.seedData.values()) {
      const event = sagaData.events.find(e => e.id === eventId);
      if (event) {
        console.log(`📅 Found event "${event.title}" in seed data`);
        return event;
      }
    }
    console.warn(`⚠️ Event with ID ${eventId} not found in seed data`);
    return null;
  }

  /**
   * Search songs across all sagas
   */
  public searchSongs(query: string): Song[] {
    const lowercaseQuery = query.toLowerCase();
    const results: Song[] = [];

    for (const sagaData of this.seedData.values()) {
      const matchingSongs = sagaData.songs.filter(song =>
        song.title.toLowerCase().includes(lowercaseQuery) ||
        song.description?.toLowerCase().includes(lowercaseQuery) ||
        song.perspective?.toLowerCase().includes(lowercaseQuery) ||
        song.characters.some(char => char.name.toLowerCase().includes(lowercaseQuery))
      );
      results.push(...matchingSongs);
    }

    console.log(`🔍 Found ${results.length} songs matching "${query}"`);
    return results;
  }

  /**
   * Search characters across all sagas
   */
  public searchCharacters(query: string): Character[] {
    const lowercaseQuery = query.toLowerCase();
    const results: Character[] = [];

    for (const sagaData of this.seedData.values()) {
      const matchingCharacters = sagaData.characters.filter(character =>
        character.name.toLowerCase().includes(lowercaseQuery) ||
        character.description?.toLowerCase().includes(lowercaseQuery) ||
        character.characterType?.toLowerCase().includes(lowercaseQuery) ||
        character.aliases?.some(alias => alias.toLowerCase().includes(lowercaseQuery))
      );
      results.push(...matchingCharacters);
    }

    console.log(`🔍 Found ${results.length} characters matching "${query}"`);
    return results;
  }

  /**
   * Get events by location ID
   */
  public getEventsByLocationId(locationId: string): ApiEvent[] {
    const results: ApiEvent[] = [];

    for (const sagaData of this.seedData.values()) {
      const matchingEvents = sagaData.events.filter(event =>
        event.location.id.toString() === locationId ||
        event.location.name.toLowerCase().includes(locationId.toLowerCase())
      );
      results.push(...matchingEvents);
    }

    console.log(`📍 Found ${results.length} events for location "${locationId}"`);
    return results;
  }

  /**
   * Get comprehensive statistics about all seed data
   */
  public getStatistics(): {
    totalSagas: number;
    totalSongs: number;
    totalEvents: number;
    totalCharacters: number;
    totalLocations: number;
    sagaBreakdown: Array<{
      sagaId: string;
      sagaName: string;
      songs: number;
      events: number;
      characters: number;
      locations: number;
    }>;
  } {
    const sagaBreakdown = Array.from(this.seedData.entries()).map(([sagaId, data]) => ({
      sagaId,
      sagaName: data.metadata.sagaName,
      songs: data.songs.length,
      events: data.events.length,
      characters: data.characters.length,
      locations: data.locations.length,
    }));

    return {
      totalSagas: this.seedData.size,
      totalSongs: sagaBreakdown.reduce((sum, saga) => sum + saga.songs, 0),
      totalEvents: sagaBreakdown.reduce((sum, saga) => sum + saga.events, 0),
      totalCharacters: sagaBreakdown.reduce((sum, saga) => sum + saga.characters, 0),
      totalLocations: sagaBreakdown.reduce((sum, saga) => sum + saga.locations, 0),
      sagaBreakdown,
    };
  }

  /**
   * Export all seed data for backup or external use
   */
  public exportAllSeedData(): { [sagaId: string]: SagaSeedData } {
    const exportData: { [sagaId: string]: SagaSeedData } = {};
    
    for (const [sagaId, data] of this.seedData.entries()) {
      exportData[sagaId] = data;
    }

    console.log('📤 Exported all seed data');
    return exportData;
  }

  /**
   * Validate seed data integrity
   */
  public validateSeedData(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const [sagaId, data] of this.seedData.entries()) {
      // Check for required metadata
      if (!data.metadata) {
        errors.push(`${sagaId}: Missing metadata`);
        continue;
      }

      // Check song integrity
      data.songs.forEach(song => {
        if (!song.title || !song.id) {
          errors.push(`${sagaId}: Song missing title or ID`);
        }
        if (song.durationSeconds <= 0) {
          warnings.push(`${sagaId}: Song "${song.title}" has invalid duration`);
        }
      });

      // Check character integrity
      data.characters.forEach(character => {
        if (!character.name || !character.id) {
          errors.push(`${sagaId}: Character missing name or ID`);
        }
        if (!character.description) {
          warnings.push(`${sagaId}: Character "${character.name}" missing description`);
        }
      });

      // Check event integrity
      data.events.forEach(event => {
        if (!event.title || !event.id) {
          errors.push(`${sagaId}: Event missing title or ID`);
        }
        if (!event.location) {
          errors.push(`${sagaId}: Event "${event.title}" missing location`);
        }
      });
    }

    const isValid = errors.length === 0;
    console.log(`🔍 Seed data validation: ${isValid ? 'PASSED' : 'FAILED'}`);
    
    if (errors.length > 0) {
      console.error('❌ Validation errors:', errors);
    }
    
    if (warnings.length > 0) {
      console.warn('⚠️ Validation warnings:', warnings);
    }

    return { isValid, errors, warnings };
  }

  /**
   * Log a summary of all available seed data
   */
  private logSeedDataSummary(): void {
    const stats = this.getStatistics();
    
    console.log('📊 Seed Data Summary:');
    console.log(`   Total Sagas: ${stats.totalSagas}`);
    console.log(`   Total Songs: ${stats.totalSongs}`);
    console.log(`   Total Events: ${stats.totalEvents}`);
    console.log(`   Total Characters: ${stats.totalCharacters}`);
    console.log(`   Total Locations: ${stats.totalLocations}`);
    
    stats.sagaBreakdown.forEach(saga => {
      console.log(`   ${saga.sagaName}:`);
      console.log(`     🎵 Songs: ${saga.songs}`);
      console.log(`     📅 Events: ${saga.events}`);
      console.log(`     👤 Characters: ${saga.characters}`);
      console.log(`     📍 Locations: ${saga.locations}`);
    });
  }

  /**
   * Check if the service is initialized
   */
  public isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Get seed data health status
   */
  public getHealthStatus(): {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    details: any;
  } {
    if (!this.isInitialized) {
      return {
        status: 'error',
        message: 'SeedDataService not initialized',
        details: { initialized: false }
      };
    }

    const validation = this.validateSeedData();
    const stats = this.getStatistics();

    if (!validation.isValid) {
      return {
        status: 'error',
        message: 'Seed data validation failed',
        details: { errors: validation.errors, warnings: validation.warnings }
      };
    }

    if (validation.warnings.length > 0) {
      return {
        status: 'warning',
        message: 'Seed data has warnings',
        details: { warnings: validation.warnings, stats }
      };
    }

    return {
      status: 'healthy',
      message: 'All seed data is valid and healthy',
      details: { stats, validation }
    };
  }
}

// Export singleton instance
export default new SeedDataService();
