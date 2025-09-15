import { apiClient } from './apiClient';
import { Location, CulturalSignificance, LocationType } from '../types';

// Backend API response interface
interface BackendLocation {
  id: number;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  isRealPlace?: boolean;
  isMythological?: boolean;
  modernName?: string;
  alternativeNames?: string[];
  notableFeatures?: string[];
  events?: any[];
  saga?: any;
  culturalSignificance?: {
    importance: string;
  };
}

export class LocationService {
  private static readonly BASE_PATH = '/locations';

  /**
   * Fetch all locations from the backend API
   */
  static async getAllLocations(): Promise<Location[]> {
    try {
      console.log('•• Fetching all Epic Timeline locations...');
      const response = await apiClient.get<BackendLocation[]>(this.BASE_PATH);
      console.log(`✓ Retrieved ${response.data.length} Epic Timeline locations`);
      return response.data.map(this.transformToMapLocation);
    } catch (error) {
      console.error('ERROR Error fetching Epic Timeline locations:', error);
      throw new Error('Failed to fetch Epic Timeline locations');
    }
  }

  /**
   * Fetch a specific location by ID
   */
  static async getLocationById(id: number): Promise<Location> {
    try {
      console.log(`•• Fetching Epic Timeline location with ID: ${id}...`);
      const response = await apiClient.get<BackendLocation>(`${this.BASE_PATH}/${id}`);
      console.log(`✓ Retrieved Epic Timeline location: ${response.data.name}`);
      return this.transformToMapLocation(response.data);
    } catch (error) {
      console.error(`ERROR Error fetching Epic Timeline location ${id}:`, error);
      throw new Error(`Failed to fetch Epic Timeline location with ID: ${id}`);
    }
  }

  /**
   * Search locations by name
   */
  static async searchLocations(searchTerm: string): Promise<Location[]> {
    try {
      console.log(`SEARCH Searching Epic Timeline locations for: "${searchTerm}"...`);
      const response = await apiClient.get<BackendLocation[]>(`${this.BASE_PATH}/search`, {
        params: { q: searchTerm }
      });
      console.log(`✓ Found ${response.data.length} Epic Timeline locations matching "${searchTerm}"`);
      return response.data.map(this.transformToMapLocation);
    } catch (error) {
      console.error(`ERROR Error searching Epic Timeline locations for "${searchTerm}":`, error);
      throw new Error(`Failed to search Epic Timeline locations for: ${searchTerm}`);
    }
  }

  /**
   * Get real places (historically verified locations)
   */
  static async getRealPlaces(): Promise<Location[]> {
    try {
      console.log('•• Fetching real Epic Timeline places...');
      const response = await apiClient.get<BackendLocation[]>(`${this.BASE_PATH}/real`);
      console.log(`✓ Retrieved ${response.data.length} real Epic Timeline places`);
      return response.data.map(this.transformToMapLocation);
    } catch (error) {
      console.error('ERROR Error fetching real Epic Timeline places:', error);
      throw new Error('Failed to fetch real Epic Timeline places');
    }
  }

  /**
   * Get mythological places (legendary/fictional locations)
   */
  static async getMythologicalPlaces(): Promise<Location[]> {
    try {
      console.log('MYTH Fetching mythological Epic Timeline places...');
      const response = await apiClient.get<BackendLocation[]>(`${this.BASE_PATH}/mythological`);
      console.log(`✓ Retrieved ${response.data.length} mythological Epic Timeline places`);
      return response.data.map(this.transformToMapLocation);
    } catch (error) {
      console.error('ERROR Error fetching mythological Epic Timeline places:', error);
      throw new Error('Failed to fetch mythological Epic Timeline places');
    }
  }

  /**
   * Get Troy location specifically (our main hotspot)
   */
  static async getTroyLocation(): Promise<Location | null> {
    try {
      console.log('LOCATION Fetching Troy location for Epic Timeline...');
      const locations = await this.searchLocations('Troy');
      const troy = locations.find(loc => loc.name.toLowerCase().includes('troy'));
      
      if (troy) {
        console.log(`✓ Found Troy at coordinates: ${troy.coordinates?.x}, ${troy.coordinates?.y}`);
        return troy;
      } else {
        console.warn('⚠• Troy location not found in Epic Timeline data');
        return null;
      }
    } catch (error) {
      console.error('ERROR Error fetching Troy location:', error);
      throw new Error('Failed to fetch Troy location');
    }
  }

  /**
   * Transform backend location data to frontend map format
   */
  static transformToMapLocation(backendLocation: BackendLocation): Location {
    return {
      id: backendLocation.id,
      name: backendLocation.name,
      description: backendLocation.description,
      
      // Use current timestamp for BaseEntity fields
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // Epic Timeline specific fields
      locationType: LocationType.CITY, // Default to CITY, could be refined per location
      isEpicLocation: true,
      
      // Transform coordinates (latitude/longitude to x/y)
      coordinates: backendLocation.latitude && backendLocation.longitude ? {
        x: backendLocation.latitude,
        y: backendLocation.longitude,
      } : undefined,
      
      // Region 
      region: 'Ancient Mediterranean',
      
      // Cultural significance
      mythologicalImportance: this.mapCulturalSignificance(
        backendLocation.culturalSignificance?.importance || 'high'
      ),
      
      // Cultural context based on backend data
      culturalContext: this.buildCulturalContext(backendLocation),
      
      // Optional fields
      historicalSignificance: this.buildHistoricalSignificance(backendLocation),
      visualDescription: backendLocation.description,
      
      // Arrays
      atmosphere: this.buildAtmosphere(backendLocation),
      symbolism: this.buildSymbolism(backendLocation),
      epicAdaptations: ['Epic: The Musical'],
      
      // Relations (empty for now, could be populated from backend if available)
      sagas: [],
      characters: [],
      songs: [],
      events: []
    };
  }
  
  /**
   * Map backend importance to frontend CulturalSignificance
   */
  private static mapCulturalSignificance(importance: string): CulturalSignificance {
    switch (importance.toLowerCase()) {
      case 'primary': return CulturalSignificance.LEGENDARY;
      case 'secondary': return CulturalSignificance.CLASSICAL;
      case 'low': return CulturalSignificance.REGIONAL;
      default: return CulturalSignificance.CLASSICAL;
    }
  }
  
  /**
   * Build cultural context array
   */
  private static buildCulturalContext(location: BackendLocation): string[] {
    const context = ['Epic: The Musical', 'Greek Mythology'];
    
    if (location.isRealPlace) {
      context.push('Historical Location');
    }
    if (location.isMythological) {
      context.push('Mythological Significance');
    }
    if (location.modernName) {
      context.push('Modern Tourism');
    }
    
    return context;
  }
  
  /**
   * Build historical significance description
   */
  private static buildHistoricalSignificance(location: BackendLocation): string {
    if (location.name.toLowerCase().includes('troy')) {
      return 'Site of the legendary Trojan War, immortalized in Homer\'s Iliad and Epic: The Musical';
    }
    if (location.name.toLowerCase().includes('ithaca')) {
      return 'Home of Odysseus, the ultimate destination in his epic journey';
    }
    if (location.name.toLowerCase().includes('underworld')) {
      return 'Mythological realm where Odysseus seeks guidance from the dead';
    }
    
    return `Significant location from Epic: The Musical and Greek mythology`;
  }
  
  /**
   * Build atmosphere descriptors
   */
  private static buildAtmosphere(location: BackendLocation): string[] {
    if (location.name.toLowerCase().includes('troy')) {
      return ['Ancient', 'Fortified', 'Legendary', 'War-torn'];
    }
    if (location.name.toLowerCase().includes('ithaca')) {
      return ['Peaceful', 'Island Paradise', 'Home', 'Nostalgic'];
    }
    if (location.name.toLowerCase().includes('underworld')) {
      return ['Dark', 'Mysterious', 'Supernatural', 'Otherworldly'];
    }
    
    return ['Ancient', 'Mythical', 'Epic'];
  }
  
  /**
   * Build symbolism array
   */
  private static buildSymbolism(location: BackendLocation): string[] {
    if (location.name.toLowerCase().includes('troy')) {
      return ['Conflict', 'Pride', 'Fall of Empires', 'Heroism'];
    }
    if (location.name.toLowerCase().includes('ithaca')) {
      return ['Home', 'Journey\'s End', 'Peace', 'Reunion'];
    }
    if (location.name.toLowerCase().includes('underworld')) {
      return ['Death', 'Knowledge', 'Trials', 'Transformation'];
    }
    
    return ['Adventure', 'Epic Journey', 'Ancient Wisdom'];
  }
}

export default LocationService;
