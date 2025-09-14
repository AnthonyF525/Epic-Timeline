import { CharacterType } from './EnumsIndex';


export interface Character {
  id: number;
  name: string;
  description: string;
  characterType: CharacterType;
  isProtagonist: boolean;
  

  sagaIds: number[];         
  
  
  aliases: string[];          
  powers: string[];            
  titles: string[];            
  epithets: string[];          
  

  origin: {
    birthplace?: string;      
    parentage: string[];       
    dynasty?: string;         
    culturalBackground: string; 
  };
  

  physicalTraits: string[];    
  personalityTraits: string[]; 
  skills: string[];            
  weaknesses: string[];       
  
  
  allyIds: number[];               
  enemyIds: number[];          
  familyIds: number[];         
  
  
  storyRole: {
    primaryRole: 'protagonist' | 'antagonist' | 'supporting' | 'minor' | 'divine_intervention';
    importance: 'legendary' | 'major' | 'significant' | 'minor';
    characterArc: string[];    
    moralAlignment: 'heroic' | 'neutral' | 'villainous' | 'complex';
  };
  
  
  mythologyInfo?: {
    divineParentage?: string[];  
    domains?: string[];         
    symbols: string[];           
    sacredPlaces: string[];     
    mythologicalEvents: string[]; 
  };
  
  
  characterDevelopment: {
    firstAppearance?: string;   
    lastAppearance?: string;    
    keyMoments: string[];        
    characterGrowth: string[];   
  };
  
  
  culturalConnections: {
    historicalInspiration?: string[]; 
    literaryInfluence: string[];       
    modernAdaptations: string[];     
    artisticDepictions: string[];      
  };
  
  
  voiceActor?: string;         
  musicalThemes?: string[];    
  keyQuotes: string[];         
  characterImageUrl?: string;
  characterMotifUrl?: string;  
}


export type CharactersByType = {
  mortals: Character[];
  gods: Character[];
  monsters: Character[];
};


export type CharacterForCreation = Omit<Character, 'id'> & {
  sagaIds: number[];
  aliases: string[];
  powers: string[];
  titles: string[];
  epithets: string[];
  physicalTraits: string[];
  personalityTraits: string[];
  skills: string[];
  weaknesses: string[];
  allyIds: number[];
  enemyIds: number[];
  familyIds: number[];
};


export type CharacterFilter = {
  characterType?: CharacterType;
  sagaId?: number;
  isProtagonist?: boolean;
  primaryRole?: Character['storyRole']['primaryRole'];
  importance?: Character['storyRole']['importance'];
  moralAlignment?: Character['storyRole']['moralAlignment'];
  hasAllies?: boolean;
  hasEnemies?: boolean;
  hasPowers?: boolean;
  culturalBackground?: string;
  searchTerm?: string;
  appearsWithCharacter?: number; 
};


export type CharacterStats = {
  totalCharacters: number;
  byType: Record<CharacterType, number>;
  protagonists: number;
  byRole: Record<Character['storyRole']['primaryRole'], number>;
  byImportance: Record<Character['storyRole']['importance'], number>;
  mostConnectedCharacters: Character[];
  charactersWithDivinePowers: number;
  charactersWithMultipleSagas: number;
  averageConnectionsPerCharacter: number;
};


export interface CharacterRelationship {
  character1Id: number;
  character2Id: number;
  relationshipType: 'family' | 'ally' | 'enemy' | 'mentor' | 'divine_patron' | 'rival' | 'neutral';
  description: string;
  sagaContext?: number;        
  relationshipStrength: 'weak' | 'moderate' | 'strong' | 'central';
}


export interface CharacterSagaAppearance {
  characterId: number;
  sagaId: number;
  role: 'main' | 'supporting' | 'minor' | 'cameo';
  firstSongAppearance?: string;
  lastSongAppearance?: string;
  songCount: number;
  significantMoments: string[];
}


export type { CharacterType };