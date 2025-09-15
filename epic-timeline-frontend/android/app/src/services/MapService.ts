import { Location } from '../types';

export interface EpicMapLocation extends Location {
  coordinates: {
    latitude: number;
    longitude: number;
    x: number;
    y: number;
  };
  markerColor?: string;
  markerIcon?: string;
  visitedInSaga?: string[];
}

export class MapService {
  
  // ✓ EPIC TIMELINE LOCATIONS WITH REAL COORDINATES
  static getEpicLocations(): EpicMapLocation[] {
    return [
      {
        id: 1,
        name: 'Troy',
        description: 'The legendary city where the Trojan War took place',
        locationType: 'CITY',
        isEpicLocation: true,
        coordinates: {
          latitude: 39.9570,
          longitude: 26.2380,
          x: 350,
          y: 80
        },
        markerColor: '#FF6B6B',
        markerIcon: 'castle',
        visitedInSaga: ['Troy Saga'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Ithaca',
        description: "Odysseus's home island kingdom",
        locationType: 'ISLAND',
        isEpicLocation: true,
        coordinates: {
          latitude: 38.4462,
          longitude: 20.7347,
          x: 100,
          y: 200
        },
        markerColor: '#4ECDC4',
        markerIcon: 'home',
        visitedInSaga: ['Ithaca Saga'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Cyclops Island',
        description: "Polyphemus's island where Odysseus encounters the cyclops",
        locationType: 'ISLAND',
        isEpicLocation: true,
        coordinates: {
          latitude: 37.7749,
          longitude: 14.9553, // Sicily approximation
          x: 250,
          y: 350
        },
        markerColor: '#FFE66D',
        markerIcon: 'eye',
        visitedInSaga: ['Cyclops Saga'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Circe Island (Aeaea)',
        description: "The sorceress Circe's magical island",
        locationType: 'ISLAND',
        isEpicLocation: true,
        coordinates: {
          latitude: 41.8902,
          longitude: 12.4922, // Near Italy
          x: 200,
          y: 300
        },
        markerColor: '#9B59B6',
        markerIcon: 'magic-wand',
        visitedInSaga: ['Circe Saga'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Underworld Entrance',
        description: 'Where Odysseus descends to speak with the dead',
        locationType: 'UNDERWORLD',
        isEpicLocation: true,
        coordinates: {
          latitude: 40.8518,
          longitude: 14.2681, // Bay of Naples
          x: 180,
          y: 400
        },
        markerColor: '#34495E',
        markerIcon: 'skull',
        visitedInSaga: ['Underworld Saga'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // ✓ GET SAGA ROUTE
  static getSagaRoute(sagaTitle: string): EpicMapLocation[] {
    const allLocations = this.getEpicLocations();
    
    switch (sagaTitle) {
      case 'Troy Saga':
        return allLocations.filter(loc => loc.visitedInSaga?.includes('Troy Saga'));
      case 'Cyclops Saga':
        return allLocations.filter(loc => loc.visitedInSaga?.includes('Cyclops Saga'));
      case 'Ocean Saga':
        return allLocations.slice(1, 4); // Journey through islands
      case 'Circe Saga':
        return allLocations.filter(loc => loc.visitedInSaga?.includes('Circe Saga'));
      case 'Underworld Saga':
        return allLocations.filter(loc => loc.visitedInSaga?.includes('Underworld Saga'));
      case 'Ithaca Saga':
        return allLocations.filter(loc => loc.visitedInSaga?.includes('Ithaca Saga'));
      default:
        return allLocations;
    }
  }

  // ✓ GET ODYSSEUS'S COMPLETE JOURNEY
  static getOdysseusJourney(): EpicMapLocation[] {
    return this.getEpicLocations().sort((a, b) => {
      const order = ['Troy', 'Cyclops Island', 'Circe Island (Aeaea)', 'Underworld Entrance', 'Ithaca'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });
  }

  // ✓ CALCULATE DISTANCE BETWEEN LOCATIONS
  static calculateDistance(loc1: EpicMapLocation, loc2: EpicMapLocation): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(loc2.coordinates.latitude - loc1.coordinates.latitude);
    const dLon = this.toRad(loc2.coordinates.longitude - loc1.coordinates.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(loc1.coordinates.latitude)) * 
              Math.cos(this.toRad(loc2.coordinates.latitude)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // ✓ GET MAP REGION FOR EPIC TIMELINE
  static getEpicMapRegion() {
    return {
      latitude: 39.0,
      longitude: 22.0,
      latitudeDelta: 8.0,
      longitudeDelta: 10.0,
    };
  }
}