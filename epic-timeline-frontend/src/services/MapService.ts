import { LocationService } from './LocationService';
import { Location } from '../types';

export interface EpicMapLocation {
  id: number;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  markerColor?: string;
  markerIcon?: string;
  culturalSignificance?: string;
}

export class MapService {
  /**
   * Get Epic Timeline locations from the backend API
   */
  static async getEpicLocations(): Promise<EpicMapLocation[]> {
    try {
      console.log('🗺️ Loading Epic Timeline locations from API...');
      const locations = await LocationService.getAllLocations();
      return locations.map(this.transformLocationToMapLocation);
    } catch (error) {
      console.error('🚨 Error loading Epic Timeline locations:', error);
      // Fallback to static data if API fails
      return this.getFallbackLocations();
    }
  }

  /**
   * Get Odysseus's journey route for Epic Timeline
   */
  static async getOdysseusJourney(): Promise<EpicMapLocation[]> {
    try {
      console.log('🛥️ Loading Odysseus journey route...');
      const allLocations = await LocationService.getAllLocations();
      
      // Filter and order locations for Odysseus's journey
      const journeyOrder = ['Troy', 'Ithaca', 'The Underworld'];
      const journeyLocations: EpicMapLocation[] = [];
      
      journeyOrder.forEach(locationName => {
        const location = allLocations.find(loc => 
          loc.name.toLowerCase().includes(locationName.toLowerCase())
        );
        if (location) {
          journeyLocations.push(this.transformLocationToMapLocation(location));
        }
      });
      
      return journeyLocations;
    } catch (error) {
      console.error('🚨 Error loading Odysseus journey:', error);
      return this.getFallbackJourney();
    }
  }

  /**
   * Get locations for a specific saga
   */
  static async getSagaRoute(sagaName: string): Promise<EpicMapLocation[]> {
    try {
      console.log(`🎭 Loading locations for saga: ${sagaName}...`);
      const allLocations = await this.getEpicLocations();
      
      // For now, return all locations as Epic is one continuous story
      return allLocations;
    } catch (error) {
      console.error(`🚨 Error loading saga locations for ${sagaName}:`, error);
      return this.getFallbackLocations();
    }
  }

  /**
   * Get the initial map region for Epic Timeline
   */
  static getEpicMapRegion() {
    return {
      latitude: 39.0, // Centered around Troy and the Mediterranean
      longitude: 25.0,
      latitudeDelta: 15.0, // Wide enough to show Mediterranean
      longitudeDelta: 20.0,
    };
  }

  /**
   * Transform frontend Location to EpicMapLocation for map display
   */
  private static transformLocationToMapLocation(location: Location): EpicMapLocation {
    return {
      id: location.id,
      name: location.name,
      description: location.description,
      coordinates: {
        latitude: location.coordinates?.x || 0,
        longitude: location.coordinates?.y || 0,
      },
      markerColor: this.getMarkerColor(location),
      markerIcon: this.getMarkerIcon(location),
      culturalSignificance: location.mythologicalImportance
    };
  }

  /**
   * Get marker color based on location significance
   */
  private static getMarkerColor(location: Location): string {
    switch (location.mythologicalImportance) {
      case 'LEGENDARY': return '#FFD700'; // Gold for legendary locations
      case 'CLASSICAL': return '#FF6B6B'; // Red for classical importance
      case 'NATIONAL': return '#4ECDC4'; // Teal for national importance
      case 'REGIONAL': return '#95A5A6'; // Gray for regional importance
      default: return '#3498DB'; // Blue default
    }
  }

  /**
   * Get marker icon based on location type
   */
  private static getMarkerIcon(location: Location): string {
    const name = location.name.toLowerCase();
    
    if (name.includes('troy')) return 'castle';
    if (name.includes('ithaca')) return 'home';
    if (name.includes('underworld')) return 'skull';
    if (name.includes('circe')) return 'magic-wand';
    if (name.includes('cyclop')) return 'eye';
    
    return 'default';
  }

  /**
   * Fallback locations if API is unavailable
   */
  private static getFallbackLocations(): EpicMapLocation[] {
    return [
      {
        id: 1,
        name: 'Troy',
        description: 'Ancient fortified city, site of the legendary Trojan War',
        coordinates: { latitude: 39.957, longitude: 26.239 },
        markerColor: '#FFD700',
        markerIcon: 'castle',
        culturalSignificance: 'legendary'
      },
      {
        id: 2,
        name: 'Ithaca',
        description: 'Island kingdom of Odysseus, his journey\'s destination',
        coordinates: { latitude: 38.4, longitude: 20.7 },
        markerColor: '#FF6B6B',
        markerIcon: 'home',
        culturalSignificance: 'legendary'
      },
      {
        id: 3,
        name: 'The Underworld',
        description: 'Realm of the dead where Odysseus seeks guidance',
        coordinates: { latitude: 37.0, longitude: 23.0 }, // Approximate mythological location
        markerColor: '#9B59B6',
        markerIcon: 'skull',
        culturalSignificance: 'high'
      }
    ];
  }

  /**
   * Fallback journey route if API is unavailable
   */
  private static getFallbackJourney(): EpicMapLocation[] {
    const fallbackLocations = this.getFallbackLocations();
    // Return journey in order: Troy -> Underworld -> Ithaca
    return [
      fallbackLocations[0], // Troy
      fallbackLocations[2], // Underworld
      fallbackLocations[1]  // Ithaca
    ];
  }

  /**
   * Get Troy location specifically (for hotspot positioning)
   */
  static async getTroyHotspot(): Promise<EpicMapLocation | null> {
    try {
      console.log('🏰 Loading Troy hotspot location...');
      const troyLocation = await LocationService.getTroyLocation();
      
      if (troyLocation) {
        return this.transformLocationToMapLocation(troyLocation);
      } else {
        console.warn('⚠️ Troy not found in API, using fallback coordinates');
        return this.getFallbackLocations()[0]; // Fallback Troy
      }
    } catch (error) {
      console.error('🚨 Error loading Troy hotspot:', error);
      return this.getFallbackLocations()[0]; // Fallback Troy
    }
  }
}

export default MapService;
