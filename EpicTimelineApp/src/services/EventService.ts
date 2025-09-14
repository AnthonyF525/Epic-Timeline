/**
 * EventService - Handles communication with the Epic Timeline backend API for event data
 * P2 Integration: Fetch Troy-specific events from /api/events?locationId=troy endpoint
 * P2 Caching: Intelligent caching system to reduce API calls for Troy data
 */

import ApiRetryService, { ApiErrorBoundary, RetryConfig } from '../utils/apiRetry';
import CacheService from './CacheService';

const API_BASE_URL = 'http://localhost:8080';

// Enhanced Character interface for character detail modals
export interface Character {
  id: number;
  name: string;
  description?: string;
  characterType?: string; // 'Hero', 'God', 'Goddess', 'Monster', etc.
  isProtagonist?: boolean;
  aliases?: string[];
  powers?: string[];
  relationships?: Array<{
    characterId: number;
    characterName: string;
    relationshipType: string; // 'ally', 'enemy', 'family', 'lover', etc.
    description?: string;
  }>;
}

export interface ApiEvent {
  id: number;
  title: string;
  description: string;
  sequenceOrder: number;
  eventTimestamp: string;
  location: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    saga: string;
    significance: string;
  };
  saga: {
    id: number;
    title: string;
    description: string;
  };
  characters: Character[];
  songs: Array<{
    id: number;
    title: string;
    trackNumber: number;
    durationSeconds: number;
  }>;
  eventContext: {
    importance: string; // pivotal, legendary, major, minor
  };
}

export interface EventFilterParams {
  locationId?: string;
  sagaId?: number;
  characterId?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  importance?: string;
  search?: string;
}

export interface ApiEventPage {
  content: ApiEvent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export class EventService {
  /**
   * Fetch events with optional filtering (including Troy-specific events)
   * P2 Task: /api/events?locationId=troy with intelligent caching
   */
  static async getEvents(params: EventFilterParams = {}): Promise<ApiEvent[]> {
    // Check cache first
    const cachedEvents = CacheService.getCachedEvents(params);
    if (cachedEvents) {
      console.log('🎯 Using cached events data');
      return cachedEvents;
    }

    const queryParams = new URLSearchParams();
    
    // Add parameters
    if (params.locationId) queryParams.append('locationId', params.locationId);
    if (params.sagaId) queryParams.append('sagaId', params.sagaId.toString());
    if (params.characterId) queryParams.append('characterId', params.characterId.toString());
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDir) queryParams.append('sortDir', params.sortDir);
    if (params.importance) queryParams.append('importance', params.importance);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = `${API_BASE_URL}/api/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    try {
      console.log('🏛️ Fetching events from API:', endpoint);
      
      // Check endpoint health before attempting
      if (!ApiErrorBoundary.isEndpointHealthy(endpoint)) {
        console.warn('⚠️ Endpoint unhealthy, using fallback data immediately');
        return EventService.getFallbackEvents(params);
      }
      
      const retryConfig: Partial<RetryConfig> = {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 8000,
        retryOnStatusCodes: [408, 429, 500, 502, 503, 504],
        retryOnNetworkError: true,
        jitter: true
      };
      
      const result = await ApiRetryService.executeWithRetry(
        async () => {
          const response = await ApiRetryService.fetchWithTimeout(
            endpoint,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
            10000 // 10 second timeout
          );

          if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as any;
            error.status = response.status;
            error.statusText = response.statusText;
            throw error;
          }

          const data: ApiEventPage = await response.json();
          return data.content; // Return the events array from the paginated response
        },
        retryConfig,
        'getEvents'
      );
      
      // Reset error count on success
      ApiErrorBoundary.resetErrors(endpoint);
      console.log('✅ Successfully fetched events from API:', result.data.length);
      
      // Cache the successful result
      CacheService.cacheEvents(params, result.data);
      console.log('📦 Events cached successfully');
      
      return result.data;
      
    } catch (error) {
      console.error('❌ Error fetching events after retries:', error);
      
      // Record error for endpoint health tracking
      ApiErrorBoundary.recordError(endpoint);
      
      console.log('🔄 Using fallback data due to API error');
      
      // Return fallback data if API is unavailable
      return EventService.getFallbackEvents(params);
    }
  }

  /**
   * P2 Task: Fetch Troy-specific events with intelligent caching
   * Convenience method for Troy location events
   */
  static async getTroyEvents(): Promise<ApiEvent[]> {
    console.log('🏛️ Fetching Troy-specific events...');
    
    // Check for cached Troy events first
    const cachedTroyEvents = CacheService.getCachedTroyEvents();
    if (cachedTroyEvents) {
      console.log('🎯 Using cached Troy events');
      return cachedTroyEvents;
    }
    
    // Fetch from API and cache
    const troyEvents = await EventService.getEvents({ 
      locationId: 'troy',
      sortBy: 'sequenceOrder',
      sortDir: 'asc'
    });
    
    // Additional Troy-specific caching (longer TTL)
    if (troyEvents.length > 0) {
      CacheService.cacheTroyEvents(troyEvents);
    }
    
    return troyEvents;
  }

  /**
   * Get a specific event by ID
   */
  static async getEventById(id: number): Promise<ApiEvent | null> {
    const endpoint = `${API_BASE_URL}/api/events/${id}`;
    
    try {
      console.log('🎯 Fetching event by ID:', endpoint);
      
      const retryConfig: Partial<RetryConfig> = {
        maxRetries: 2,
        baseDelay: 500,
        maxDelay: 4000,
        retryOnStatusCodes: [408, 429, 500, 502, 503, 504],
        retryOnNetworkError: true,
        jitter: true
      };
      
      const result = await ApiRetryService.executeWithRetry(
        async () => {
          const response = await ApiRetryService.fetchWithTimeout(
            endpoint,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
            8000 // 8 second timeout
          );

          if (!response.ok) {
            if (response.status === 404) {
              return null; // Event not found
            }
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as any;
            error.status = response.status;
            error.statusText = response.statusText;
            throw error;
          }

          const data: ApiEvent = await response.json();
          return data;
        },
        retryConfig,
        'getEventById'
      );
      
      console.log('✅ Successfully fetched event by ID');
      return result.data;
      
    } catch (error) {
      console.error('❌ Error fetching event by ID:', error);
      
      // Try to find in fallback data
      const fallbackEvents = EventService.getFallbackEvents({});
      return fallbackEvents.find(event => event.id === id) || null;
    }
  }

  /**
   * Fallback data for when API is unavailable
   * Includes Troy-specific events for P2 testing
   */
  static getFallbackEvents(params: EventFilterParams = {}): ApiEvent[] {
    console.log('📦 Using fallback event data');
    
    const allFallbackEvents: ApiEvent[] = [
      // Troy Saga Events
      {
        id: 1,
        title: "The Trojan Horse Strategy",
        description: "Odysseus devises the brilliant and deceptive plan to infiltrate Troy using a massive wooden horse, ending the 10-year siege.",
        sequenceOrder: 1,
        eventTimestamp: "1184-04-23T06:00:00",
        location: {
          id: 1,
          name: "Troy",
          latitude: 39.9570,
          longitude: 26.2380,
          description: "The legendary city of Troy, site of the famous siege",
          saga: "Troy Saga",
          significance: "The site where the greatest war in mythology took place"
        },
        saga: {
          id: 1,
          title: "The Troy Saga",
          description: "The beginning of Odysseus's epic journey, starting with the fall of Troy"
        },
        characters: [
          { 
            id: 1, 
            name: "Odysseus", 
            description: "The cunning king of Ithaca, hero of the Trojan War known for his intelligence and tactical genius. Master of strategy and deception, he devised the plan for the Trojan Horse that ended the 10-year siege.",
            characterType: "Hero",
            isProtagonist: true,
            aliases: ["King of Ithaca", "Son of Laertes", "The Cunning One"],
            powers: ["Strategic Genius", "Master of Disguise", "Divine Favor (Athena)", "Exceptional Archery"]
          },
          { 
            id: 2, 
            name: "Athena", 
            description: "Goddess of wisdom, warfare, and strategic combat. Patron deity of heroes and defender of justice. She is Odysseus's divine mentor and protector throughout his journey.",
            characterType: "Goddess",
            isProtagonist: false,
            aliases: ["Pallas Athena", "Grey-Eyed Athena", "Goddess of Wisdom"],
            powers: ["Divine Wisdom", "Strategic Warfare", "Shape-shifting", "Divine Protection", "Prophecy"]
          }
        ],
        songs: [
          { id: 1, title: "The Horse and the Infant", trackNumber: 1, durationSeconds: 252 }
        ],
        eventContext: {
          importance: "pivotal"
        }
      },
      {
        id: 2,
        title: "The Infant's Fate",
        description: "Odysseus faces the moral dilemma of whether to kill Hector's infant son Astyanax to prevent future revenge against the Greeks.",
        sequenceOrder: 2,
        eventTimestamp: "1184-04-24T02:00:00",
        location: {
          id: 1,
          name: "Troy",
          latitude: 39.9570,
          longitude: 26.2380,
          description: "The legendary city of Troy, site of the famous siege",
          saga: "Troy Saga",
          significance: "The site where the greatest war in mythology took place"
        },
        saga: {
          id: 1,
          title: "The Troy Saga",
          description: "The beginning of Odysseus's epic journey, starting with the fall of Troy"
        },
        characters: [
          { 
            id: 1, 
            name: "Odysseus", 
            description: "The cunning king of Ithaca, hero of the Trojan War known for his intelligence and tactical genius. Master of strategy and deception, he devised the plan for the Trojan Horse that ended the 10-year siege.",
            characterType: "Hero",
            isProtagonist: true,
            aliases: ["King of Ithaca", "Son of Laertes", "The Cunning One"],
            powers: ["Strategic Genius", "Master of Disguise", "Divine Favor (Athena)", "Exceptional Archery"]
          },
          { 
            id: 15, 
            name: "Zeus", 
            description: "King of the gods, ruler of Mount Olympus and the sky. The most powerful deity in the Greek pantheon, known for his thunderbolts and divine justice. Father of many gods and heroes.",
            characterType: "God",
            isProtagonist: false,
            aliases: ["King of the Gods", "Thunder Bearer", "Sky Father", "Lord of Olympus"],
            powers: ["Thunder and Lightning", "Divine Authority", "Shape-shifting", "Prophecy", "Weather Control"]
          }
        ],
        songs: [
          { id: 2, title: "Just a Man", trackNumber: 2, durationSeconds: 195 }
        ],
        eventContext: {
          importance: "legendary"
        }
      },
      {
        id: 3,
        title: "Departure from Troy",
        description: "The Greek fleet departs from Troy with their spoils of war, optimistic about their journey home, unaware of the trials ahead.",
        sequenceOrder: 3,
        eventTimestamp: "1184-04-25T08:00:00",
        location: {
          id: 1,
          name: "Troy",
          latitude: 39.9570,
          longitude: 26.2380,
          description: "The legendary city of Troy, site of the famous siege",
          saga: "Troy Saga",
          significance: "The site where the greatest war in mythology took place"
        },
        saga: {
          id: 1,
          title: "The Troy Saga",
          description: "The beginning of Odysseus's epic journey, starting with the fall of Troy"
        },
        characters: [
          { 
            id: 1, 
            name: "Odysseus", 
            description: "The cunning king of Ithaca, hero of the Trojan War known for his intelligence and tactical genius. Master of strategy and deception, he devised the plan for the Trojan Horse that ended the 10-year siege.",
            characterType: "Hero",
            isProtagonist: true,
            aliases: ["King of Ithaca", "Son of Laertes", "The Cunning One"],
            powers: ["Strategic Genius", "Master of Disguise", "Divine Favor (Athena)", "Exceptional Archery"]
          },
          { 
            id: 3, 
            name: "Polites", 
            description: "Odysseus's most loyal friend and the voice of optimism among the crew. A brave warrior with an infectious positive spirit who believes in greeting the world with open arms and trust.",
            characterType: "Friend",
            isProtagonist: false,
            aliases: ["The Optimist", "Odysseus's Best Friend"],
            powers: ["Inspiring Leadership", "Combat Skills", "Unwavering Loyalty", "Positive Influence"]
          },
          { 
            id: 4, 
            name: "Eurylochus", 
            description: "Odysseus's brother-in-law and second-in-command. A pragmatic and cautious warrior who often questions Odysseus's decisions, prioritizing the crew's immediate safety over long-term strategy.",
            characterType: "Lieutenant",
            isProtagonist: false,
            aliases: ["Second-in-Command", "Brother-in-law of Odysseus"],
            powers: ["Military Tactics", "Leadership", "Combat Expertise", "Crew Management"]
          }
        ],
        songs: [
          { id: 5, title: "Full Speed Ahead", trackNumber: 5, durationSeconds: 178 }
        ],
        eventContext: {
          importance: "major"
        }
      },
      {
        id: 4,
        title: "Athena's Guidance",
        description: "Athena appears to Odysseus and his crew, offering divine wisdom and warning about the challenges ahead in their journey home.",
        sequenceOrder: 4,
        eventTimestamp: "1184-04-25T20:00:00",
        location: {
          id: 1,
          name: "Troy",
          latitude: 39.9570,
          longitude: 26.2380,
          description: "The legendary city of Troy, site of the famous siege",
          saga: "Troy Saga",
          significance: "The site where the greatest war in mythology took place"
        },
        saga: {
          id: 1,
          title: "The Troy Saga",
          description: "The beginning of Odysseus's epic journey, starting with the fall of Troy"
        },
        characters: [
          { 
            id: 1, 
            name: "Odysseus", 
            description: "The cunning king of Ithaca, hero of the Trojan War known for his intelligence and tactical genius. Master of strategy and deception, he devised the plan for the Trojan Horse that ended the 10-year siege.",
            characterType: "Hero",
            isProtagonist: true,
            aliases: ["King of Ithaca", "Son of Laertes", "The Cunning One"],
            powers: ["Strategic Genius", "Master of Disguise", "Divine Favor (Athena)", "Exceptional Archery"]
          },
          { 
            id: 2, 
            name: "Athena", 
            description: "Goddess of wisdom, warfare, and strategic combat. Patron deity of heroes and defender of justice. She is Odysseus's divine mentor and protector throughout his journey.",
            characterType: "Goddess",
            isProtagonist: false,
            aliases: ["Pallas Athena", "Grey-Eyed Athena", "Goddess of Wisdom"],
            powers: ["Divine Wisdom", "Strategic Warfare", "Shape-shifting", "Divine Protection", "Prophecy"]
          },
          { 
            id: 3, 
            name: "Polites", 
            description: "Odysseus's most loyal friend and the voice of optimism among the crew. A brave warrior with an infectious positive spirit who believes in greeting the world with open arms and trust.",
            characterType: "Friend",
            isProtagonist: false,
            aliases: ["The Optimist", "Odysseus's Best Friend"],
            powers: ["Inspiring Leadership", "Combat Skills", "Unwavering Loyalty", "Positive Influence"]
          }
        ],
        songs: [
          { id: 3, title: "Open Arms", trackNumber: 3, durationSeconds: 189 },
          { id: 4, title: "Warrior of the Mind", trackNumber: 4, durationSeconds: 267 }
        ],
        eventContext: {
          importance: "legendary"
        }
      },
      // Non-Troy events for filtering demonstration
      {
        id: 5,
        title: "The Lotus Eaters Encounter",
        description: "Odysseus and his crew encounter the Lotus Eaters and nearly lose themselves to the enchanting lotus fruit.",
        sequenceOrder: 10,
        eventTimestamp: "1184-05-15T14:00:00",
        location: {
          id: 5,
          name: "Lotus Island",
          latitude: 35.2048,
          longitude: 33.3671,
          description: "The mysterious island of the Lotus Eaters",
          saga: "The Cyclops Saga",
          significance: "Where travelers lose their desire to return home"
        },
        saga: {
          id: 2,
          title: "The Cyclops Saga",
          description: "Odysseus's encounter with Polyphemus and its consequences"
        },
        characters: [
          { id: 1, name: "Odysseus", description: "The cunning king of Ithaca" },
          { id: 3, name: "Polites", description: "Odysseus's best friend and voice of optimism" }
        ],
        songs: [
          { id: 6, title: "Lotus Eaters", trackNumber: 6, durationSeconds: 156 }
        ],
        eventContext: {
          importance: "major"
        }
      }
    ];

    // Filter events based on parameters
    let filteredEvents = allFallbackEvents;

    if (params.locationId) {
      // Handle Troy-specific filtering (P2 requirement)
      if (params.locationId.toLowerCase() === 'troy') {
        filteredEvents = filteredEvents.filter(event => 
          event.location.name.toLowerCase().includes('troy')
        );
        console.log(`🏛️ Filtered for Troy events: ${filteredEvents.length} events found`);
      } else {
        // Filter by location ID or name
        filteredEvents = filteredEvents.filter(event => 
          event.location.id.toString() === params.locationId ||
          event.location.name.toLowerCase().includes(params.locationId?.toLowerCase() || '')
        );
      }
    }

    if (params.sagaId) {
      filteredEvents = filteredEvents.filter(event => event.saga.id === params.sagaId);
    }

    if (params.characterId) {
      filteredEvents = filteredEvents.filter(event => 
        event.characters.some(char => char.id === params.characterId)
      );
    }

    if (params.importance) {
      filteredEvents = filteredEvents.filter(event => 
        event.eventContext.importance === params.importance
      );
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.characters.some(char => char.name.toLowerCase().includes(searchLower))
      );
    }

    // Sort events
    const sortBy = params.sortBy || 'sequenceOrder';
    const sortDir = params.sortDir || 'asc';
    
    filteredEvents.sort((a, b) => {
      let aVal: any = a[sortBy as keyof ApiEvent];
      let bVal: any = b[sortBy as keyof ApiEvent];
      
      if (sortBy === 'eventTimestamp') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (sortDir === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    return filteredEvents;
  }

  /**
   * Get detailed character information by ID with caching
   * P2 Feature: Support character detail modal functionality with intelligent caching
   */
  static async getCharacterDetails(characterId: number): Promise<Character | null> {
    // Check cache first
    const cachedCharacter = CacheService.getCachedCharacterDetails(characterId);
    if (cachedCharacter) {
      return cachedCharacter;
    }

    try {
      // Try to fetch from API first
      const result = await ApiRetryService.executeWithRetry(
        async () => {
          const response = await fetch(`${API_BASE_URL}/api/characters/${characterId}`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        },
        { maxRetries: 2, baseDelay: 1000 },
        `Character Details (${characterId})`
      );

      if (result.data) {
        // Cache the successful API result
        CacheService.cacheCharacterDetails(characterId, result.data);
        return result.data;
      }
    } catch (error) {
      console.warn('🔍 Character API unavailable, using fallback data:', error);
    }

    // Fallback to static character data if API is unavailable
    const character = this.getFallbackCharacterData().find(c => c.id === characterId);
    
    // Cache fallback data too (with shorter TTL)
    if (character) {
      CacheService.cacheCharacterDetails(characterId, character);
    }
    
    return character || null;
  }

  /**
   * Get fallback character data for offline/development mode
   * Updated with EPIC: The Musical characters
   */
  private static getFallbackCharacterData(): Character[] {
    return [
      {
        id: 1,
        name: 'Odysseus',
        description: 'King of Ithaca and the protagonist of EPIC. A clever strategist cursed to wander the seas for 20 years after the Trojan War. Known for his wit, determination, and the lengths he\'ll go to protect his family.',
        characterType: 'King',
        isProtagonist: true,
        aliases: ['The King of Ithaca', 'Captain', 'Nobody'],
        powers: ['Strategic Genius', 'Silver Tongue', 'Archery Master', 'Naval Command'],
        relationships: [
          { characterId: 2, characterName: 'Penelope', relationshipType: 'spouse', description: 'Beloved wife, Queen of Ithaca' },
          { characterId: 3, characterName: 'Telemachus', relationshipType: 'family', description: 'Son, Prince of Ithaca' },
          { characterId: 4, characterName: 'Athena', relationshipType: 'patron', description: 'Divine mentor and guide' },
          { characterId: 5, characterName: 'Poseidon', relationshipType: 'enemy', description: 'God who curses his journey home' }
        ]
      },
      {
        id: 2,
        name: 'Penelope',
        description: 'Queen of Ithaca and Odysseus\' faithful wife. Renowned for her loyalty, cleverness, and strength while waiting 20 years for her husband\'s return, fending off suitors.',
        characterType: 'Queen',
        isProtagonist: true,
        aliases: ['Queen of Ithaca', 'Faithful Penelope'],
        powers: ['Tactical Weaving', 'Political Cunning', 'Unwavering Loyalty'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'spouse', description: 'Beloved husband, King of Ithaca' },
          { characterId: 3, characterName: 'Telemachus', relationshipType: 'family', description: 'Son, whom she raised alone' }
        ]
      },
      {
        id: 3,
        name: 'Telemachus',
        description: 'Prince of Ithaca and son of Odysseus and Penelope. Young and eager to prove himself, growing up without his father during the 20-year journey.',
        characterType: 'Prince',
        isProtagonist: false,
        aliases: ['Prince of Ithaca', 'Young Prince'],
        powers: ['Royal Heritage', 'Growing Wisdom', 'Archery Potential'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'family', description: 'Father, the legendary king' },
          { characterId: 2, characterName: 'Penelope', relationshipType: 'family', description: 'Mother, Queen of Ithaca' },
          { characterId: 4, characterName: 'Athena', relationshipType: 'mentor', description: 'Divine guide helping him mature' }
        ]
      },
      {
        id: 4,
        name: 'Athena',
        description: 'Goddess of wisdom and warfare, divine patron of Odysseus. She guides and protects him throughout his journey, believing in his potential for growth and change.',
        characterType: 'Goddess',
        isProtagonist: false,
        aliases: ['Pallas Athena', 'Goddess of Wisdom', 'Warrior of the Mind'],
        powers: ['Divine Wisdom', 'Strategic Warfare', 'Shape-shifting', 'Prophetic Sight'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'patron', description: 'Her chosen champion' },
          { characterId: 3, characterName: 'Telemachus', relationshipType: 'mentor', description: 'Guides the young prince' }
        ]
      },
      {
        id: 5,
        name: 'Poseidon',
        description: 'God of the seas and earthquakes. Odysseus\' greatest divine enemy who curses his journey home after the blinding of his son Polyphemus.',
        characterType: 'God',
        isProtagonist: false,
        aliases: ['Earth-Shaker', 'Lord of the Seas', 'God of Earthquakes'],
        powers: ['Ocean Control', 'Storm Creation', 'Earthquake Generation', 'Divine Wrath'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'enemy', description: 'Curses him for blinding Polyphemus' },
          { characterId: 6, characterName: 'Polyphemus', relationshipType: 'family', description: 'Father of the cyclops' }
        ]
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'The cyclops son of Poseidon. A massive, one-eyed giant who traps Odysseus and his crew in his cave, leading to the curse that extends their journey.',
        characterType: 'Cyclops',
        isProtagonist: false,
        aliases: ['The Cyclops', 'Son of Poseidon', 'One-Eye'],
        powers: ['Immense Strength', 'Stone Throwing', 'Shepherd Skills'],
        relationships: [
          { characterId: 5, characterName: 'Poseidon', relationshipType: 'family', description: 'Divine father' },
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'enemy', description: 'The man who blinded him' }
        ]
      },
      {
        id: 7,
        name: 'Circe',
        description: 'The enchantress of Aeaea, a powerful witch who initially threatens Odysseus\' crew but becomes an ally, helping them on their journey.',
        characterType: 'Sorceress',
        isProtagonist: false,
        aliases: ['Witch of Aeaea', 'The Enchantress'],
        powers: ['Transformation Magic', 'Potion Brewing', 'Prophecy', 'Divine Knowledge'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'ally', description: 'Helps him on his journey' }
        ]
      },
      {
        id: 8,
        name: 'Eurylochus',
        description: 'Odysseus\' second-in-command and brother-in-law. A loyal but sometimes questioning voice among the crew who challenges difficult decisions.',
        characterType: 'Sailor',
        isProtagonist: false,
        aliases: ['Second-in-Command', 'Brother-in-Law'],
        powers: ['Military Leadership', 'Crew Loyalty', 'Combat Skills'],
        relationships: [
          { characterId: 1, characterName: 'Odysseus', relationshipType: 'crew', description: 'Loyal second-in-command and family' }
        ]
      }
    ];
  }

  /**
   * P2 Cache Management Methods
   */

  /**
   * Get cache statistics for monitoring
   */
  static getCacheStats() {
    return CacheService.getStats();
  }

  /**
   * Get human-readable cache status
   */
  static getCacheStatus(): string {
    return CacheService.getStatusSummary();
  }

  /**
   * Clear all cached data
   */
  static clearCache(): void {
    CacheService.clear();
    console.log('🧹 All EventService cache cleared');
  }

  /**
   * Refresh Troy data cache
   */
  static async refreshTroyCache(): Promise<void> {
    await CacheService.refreshTroyData();
    console.log('🔄 Troy cache refreshed');
  }

  /**
   * Preload Troy data for better performance
   */
  static async preloadTroyData(): Promise<void> {
    try {
      console.log('⏳ Preloading Troy data...');
      const troyEvents = await this.getTroyEvents();
      console.log(`✅ Preloaded ${troyEvents.length} Troy events`);
      
      // Preload key Troy characters
      const troyCharacterIds = [1, 4, 5, 6]; // Odysseus, Athena, Poseidon, Polyphemus
      for (const characterId of troyCharacterIds) {
        await this.getCharacterDetails(characterId);
      }
      
      console.log('✅ Troy data preloading complete');
    } catch (error) {
      console.error('❌ Error preloading Troy data:', error);
    }
  }

  /**
   * Check if Troy data should be refreshed
   */
  static shouldRefreshTroyData(): boolean {
    return CacheService.shouldRefreshTroyData();
  }
}

export default EventService;
