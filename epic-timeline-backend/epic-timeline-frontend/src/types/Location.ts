


export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;        
  accuracy?: number;        
  timestamp?: string;       
}


export interface GeographicRegion {
  name: string;             
  type: 'sea' | 'land' | 'island' | 'city' | 'region' | 'country';
  parentRegion?: string;    
}


export interface Location {
  id: number;
  name: string;
  description: string;
  
  
  coordinates?: Coordinates;
  
  
  isRealPlace: boolean;        
  isMythological: boolean;     
  isModernLocation: boolean;    
  isAccessibleToday: boolean;  
  isUnderwater: boolean;        
  isArchaeological: boolean;    
  isTouristDestination: boolean; 
  hasModernName: boolean;       
  
  modernName?: string;
  ancientName?: string;
  region: GeographicRegion;
  
  
  alternativeNames: string[];   
  notableFeatures: string[];   
  historicalPeriods: string[]; 
  mythologicalEvents: string[]; 
  modernLandmarks: string[];   
  
  
  characterIds: number[];      
  eventIds: number[];             
  sagaIds: number[];               
  
  
  travelInfo?: {
    nearestAirport?: string;
    accessMethods: string[];   
    bestTimeToVisit?: string;
    estimatedVisitDuration?: string;
  };
  
  
  culturalSignificance: {
    importance: 'low' | 'medium' | 'high' | 'legendary';
    culturalTags: string[];    
    literaryReferences: string[]; 
  };
}


export type LocationWithCoordinates = Location & {
  coordinates: Coordinates; 
};


export type LocationForCreation = Omit<Location, 'id'> & { 
  characterIds: number[];
  eventIds: number[];
  sagaIds: number[];
  alternativeNames: string[];
  notableFeatures: string[];
  historicalPeriods: string[];
  mythologicalEvents: string[];
  modernLandmarks: string[];
};


export type LocationFilter = {
  isRealPlace?: boolean;
  isMythological?: boolean;
  isModernLocation?: boolean;
  isAccessibleToday?: boolean;
  isTouristDestination?: boolean;
  regionType?: GeographicRegion['type'];
  hasCoordinates?: boolean;
  culturalImportance?: Location['culturalSignificance']['importance'];
  hasCharacter?: boolean;
  characterId?: number;
  sagaId?: number;
  searchTerm?: string;
  withinRadius?: {
    center: Coordinates;
    radiusKm: number;
  };
};


export type LocationStats = {
  totalLocations: number;
  realPlaces: number;
  mythologicalPlaces: number;
  modernLocations: number;
  accessibleLocations: number;
  locationsWithCoordinates: number;
  touristDestinations: number;
  archaeologicalSites: number;
  mostFeaturedLocations: Location[];
  locationsByRegion: Record<string, number>;
  locationsByCulturalImportance: Record<string, number>;
};


export type LocationProximity = {
  location1: Location;
  location2: Location;
  distanceKm?: number;        
  travelTime?: string;        
  relationshipType: 'adjacent' | 'nearby' | 'same_region' | 'distant';
};

export interface LocationVisit {
  locationId: number;
  characterId: number;
  eventId?: number;
  visitOrder: number;         
  visitPurpose: string[];     
  durationDescription?: string; 
  significance: 'high' | 'medium' | 'low';
}


export type { GeographicRegion, Coordinates };