import { LocationService } from './LocationService';

export interface Location {
  id: string;
  name: string;
  coordinates: { x: number; y: number; z?: number };
  description: string;
  saga?: string;
  significance?: string;
  modernLocation?: string;
  mythologyFacts?: string[];
  songs?: string[];
  culturalSignificance?: 'PRIMARY' | 'SECONDARY' | 'LEGENDARY';
  isRealPlace?: boolean;
  isMythological?: boolean;
}

export class MapService {
  static async getAllLocations(): Promise<Location[]> {
    try {
      const apiLocations = await LocationService.getAllLocations();
      
      return apiLocations.map(apiLoc => ({
        id: apiLoc.id.toString(),
        name: apiLoc.name,
        coordinates: { x: apiLoc.latitude, y: apiLoc.longitude },
        description: apiLoc.description,
        modernLocation: apiLoc.modernName,
        culturalSignificance: apiLoc.culturalSignificance?.importance as 'PRIMARY' | 'SECONDARY' | 'LEGENDARY',
        isRealPlace: apiLoc.isRealPlace,
        isMythological: apiLoc.isMythological,
      }));
    } catch (error) {
      console.error('Failed to load locations from API:', error);
      return [];
    }
  }

  static async getTroyLocation(): Promise<Location> {
    try {
      const apiData = await LocationService.getTroyLocation();
      
      if (apiData) {
        return {
          id: apiData.id.toString(),
          name: apiData.name,
          coordinates: { x: apiData.latitude, y: apiData.longitude },
          description: apiData.description,
          saga: 'The Troy Saga',
          significance: 'Starting point of Odysseus\' journey home from the Trojan War',
          modernLocation: apiData.modernName,
          mythologyFacts: [
            'Site of the legendary Trojan Horse stratagem',
            'Ten-year siege by the Greek coalition forces',
            'Home to Prince Hector and King Priam',
            'The war began over Helen of Troy',
            'Destroyed by the Greeks using Odysseus\' wooden horse plan'
          ],
          songs: [
            'The Horse and the Infant',
            'Just a Man',
            'Full Speed Ahead',
            'Open Arms',
            'Warrior of the Mind'
          ],
          culturalSignificance: apiData.culturalSignificance?.importance as 'PRIMARY' | 'SECONDARY' | 'LEGENDARY',
          isRealPlace: apiData.isRealPlace,
          isMythological: apiData.isMythological,
        };
      }
    } catch (error) {
      console.warn('Using fallback Troy data:', error);
    }

    // Enhanced fallback with song data
    return {
      id: 'troy-fallback',
      name: 'Troy',
      coordinates: { x: 39.9576, y: 26.2385 },
      description: 'Ancient fortified city in northwestern Anatolia, site of the legendary Trojan War from Homer\'s Iliad and the setting for EPIC: The Musical',
      saga: 'The Troy Saga',
      significance: 'Starting point of Odysseus\' journey home from the Trojan War',
      modernLocation: 'Hisarlik, Turkey',
      mythologyFacts: [
        'Site of the legendary Trojan Horse stratagem',
        'Ten-year siege by the Greek coalition forces',
        'Home to Prince Hector and King Priam',
        'The war began over Helen of Troy',
        'Destroyed by the Greeks using Odysseus\' wooden horse plan'
      ],
      songs: [
        'The Horse and the Infant',
        'Just a Man',
        'Full Speed Ahead',
        'Open Arms',
        'Warrior of the Mind'
      ],
      culturalSignificance: 'PRIMARY',
      isRealPlace: true,
      isMythological: true,
    };
  }
}