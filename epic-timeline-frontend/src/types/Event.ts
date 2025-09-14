
export interface Event {
  id: number;
  title: string;
  description: string;
  sequenceOrder?: number;
  eventTimestamp?: string; 
  
  locationId?: number;
  sagaId?: number;
  
  
  characterIds: number[];        
  protagonistIds: number[];      
  antagonistIds: number[];       
  supportingCharacterIds: number[]; 
  
  
  songIds: number[];             
  primarySongId?: number;        
  referencedInSongIds: number[]; 
  
  
  eventTypes: string[];         
  themes: string[];              
  emotions: string[];           
  consequences: string[];       
  
  
  plotElements: string[];        
  literaryDevices: string[];     
  mythologicalReferences: string[]; 
  
  
  eventContext: {
    importance: 'minor' | 'significant' | 'major' | 'pivotal' | 'legendary';
    eventCategory: 'battle' | 'dialogue' | 'divine_intervention' | 'character_development' | 'revelation' | 'transformation';
    narrativeFunction: 'setup' | 'rising_action' | 'climax' | 'falling_action' | 'resolution';
    emotionalImpact: 'low' | 'medium' | 'high' | 'devastating' | 'euphoric';
  };
  
  
  timeline: {
    storyTimeStart?: string;    
    storyTimeEnd?: string;       
    duration?: string;           
    timeOfDay?: string;          
    season?: string;             
  };
  
  
  environmentalFactors: string[]; 
  weatherConditions: string[];   
  
  
  characterActions: {
    characterId: number;
    actions: string[];           
    dialogue?: string[];         
    characterState: 'entering' | 'present' | 'leaving' | 'transformed';
  }[];
  
  
  outcomes: {
    characterChanges: string[];   
    plotAdvancement: string[];   
    powerDynamics: string[];     
    knowledgeGained: string[];   
  };
  
  
  culturalConnections: {
    historicalParallels: string[];  
    mythologicalSources: string[]; 
    literaryInfluence: string[];   
    modernAdaptations: string[];  
  };
  
  
  visualElements?: {
    keyImagery: string[];        
    symbolism: string[];         
    colors: string[];            
  };
  
  audioElements?: {
    soundEffects: string[];      
    musicalMotifs: string[];     
    vocalStyles: string[];       
  };
  
  
  eventImageUrl?: string;
  musicalArrangementNotes?: string;
  directorNotes?: string;
  alternativeVersions?: string[]; 
}

export interface EventWithRelations extends Event {
  location?: any;
  saga?: any;
  characters: any[];       
  songs: any[];                
  protagonists: any[];    
  antagonists: any[];     
  supportingCharacters: any[]; 
}

export type EventForCreation = Omit<Event, 'id'> & {
  characterIds: number[];
  protagonistIds: number[];
  antagonistIds: number[];
  supportingCharacterIds: number[];
  songIds: number[];
  referencedInSongIds: number[];
  eventTypes: string[];
  themes: string[];
  emotions: string[];
  consequences: string[];
  plotElements: string[];
  literaryDevices: string[];
  mythologicalReferences: string[];
  environmentalFactors: string[];
  weatherConditions: string[];
  characterActions: Event['characterActions'];
};


export type EventFilter = {
  sagaId?: number;
  locationId?: number;
  characterId?: number;
  songId?: number;
  eventType?: string;
  theme?: string;
  importance?: Event['eventContext']['importance'];
  eventCategory?: Event['eventContext']['eventCategory'];
  narrativeFunction?: Event['eventContext']['narrativeFunction'];
  emotionalImpact?: Event['eventContext']['emotionalImpact'];
  hasLocation?: boolean;
  hasCharacters?: boolean;
  hasSongs?: boolean;
  timeOfDay?: string;
  searchTerm?: string;
  sequenceRange?: {
    min: number;
    max: number;
  };
};


export type EventStats = {
  totalEvents: number;
  byImportance: Record<Event['eventContext']['importance'], number>;
  byCategory: Record<Event['eventContext']['eventCategory'], number>;
  byNarrativeFunction: Record<Event['eventContext']['narrativeFunction'], number>;
  byEmotionalImpact: Record<Event['eventContext']['emotionalImpact'], number>;
  eventsWithLocation: number;
  eventsWithSongs: number;
  averageCharactersPerEvent: number;
  mostFeaturedCharacters: { characterId: number; eventCount: number }[];
  eventsByTheme: Record<string, number>;
  timelineDistribution: Record<string, number>;
};


export interface EventTimeline {
  sagaId: number;
  events: Event[];
  totalDuration?: string;
  keyMilestones: {
    eventId: number;
    milestone: string;
    significance: 'major' | 'minor';
  }[];
}


export interface CharacterEventParticipation {
  characterId: number;
  eventId: number;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'witness' | 'mentioned';
  significance: 'central' | 'important' | 'moderate' | 'minor';
  actions: string[];
  outcomes: string[];
  characterGrowth?: string[];
}


export interface SongEventConnection {
  songId: number;
  eventId: number;
  connectionType: 'depicts' | 'references' | 'foreshadows' | 'reflects_on' | 'celebrates';
  significance: 'primary_focus' | 'major_element' | 'minor_reference' | 'brief_mention';
  lyricReferences?: string[];
  musicalMotifs?: string[];
}


export type Character = any; 
export type Song = any;      
export type Location = any;  
export type Saga = any;      