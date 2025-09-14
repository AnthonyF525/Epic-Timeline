/**
 * SagaService - Handles communication with the Epic Timeline backend API for saga data
 */

import ApiRetryService, { ApiErrorBoundary, RetryConfig } from '../utils/apiRetry';

const API_BASE_URL = 'http://localhost:8080';

export { API_BASE_URL };

export interface ApiSaga {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  episodeCount: number;
  genres: string[];
  themes: string[];
  inspirations: string[];
  albumArtUrl?: string;
  amazonMusicUrl?: string;
  youtubePlaylistUrl?: string;
  totalDurationSeconds: number;
  songs: any[]; // Will be expanded when song data is available
  characters: any[]; // Will be expanded when character data is available
  locations: any[]; // Will be expanded when location data is available
  events: any[]; // Will be expanded when event data is available
}

export interface SagaDisplayInfo {
  name: string;
  description: string;
  releaseStatus: 'released' | 'upcoming' | 'in-production' | 'unknown';
  releaseDate: string;
  episodeCount: number;
  duration: string;
  themes: string[];
  genres: string[];
}

export interface ApiSagaPage {
  content: ApiSaga[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export class SagaService {
  /**
   * Determine the release status of a saga based on its release date
   */
  static determineReleaseStatus(releaseDate: string): 'released' | 'upcoming' | 'in-production' | 'unknown' {
    try {
      const release = new Date(releaseDate);
      const now = new Date();
      
      // Check if release date is valid
      if (isNaN(release.getTime())) {
        return 'unknown';
      }
      
      // Released if date is in the past
      if (release <= now) {
        return 'released';
      }
      
      // Upcoming if date is in the future
      const monthsUntilRelease = (release.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      // If more than 6 months away, likely in production
      if (monthsUntilRelease > 6) {
        return 'in-production';
      }
      
      // Otherwise upcoming
      return 'upcoming';
      
    } catch (error) {
      console.warn('Error determining release status for date:', releaseDate, error);
      return 'unknown';
    }
  }

  /**
   * Format saga data for display with name, description, and release status
   */
  static formatSagaDisplayInfo(saga: ApiSaga): SagaDisplayInfo {
    const releaseStatus = SagaService.determineReleaseStatus(saga.releaseDate);
    const durationMinutes = Math.round(saga.totalDurationSeconds / 60);
    
    return {
      name: saga.title,
      description: saga.description,
      releaseStatus,
      releaseDate: saga.releaseDate,
      episodeCount: saga.episodeCount,
      duration: `${durationMinutes} minutes`,
      themes: saga.themes,
      genres: saga.genres
    };
  }

  /**
   * Get release status display text with emoji
   */
  static getReleaseStatusDisplay(status: 'released' | 'upcoming' | 'in-production' | 'unknown'): string {
    switch (status) {
      case 'released':
        return '✅ Released';
      case 'upcoming':
        return '🔜 Coming Soon';
      case 'in-production':
        return '🎬 In Production';
      case 'unknown':
        return '❓ Status Unknown';
      default:
        return '❓ Status Unknown';
    }
  }

  /**
   * Get release status color
   */
  static getReleaseStatusColor(status: 'released' | 'upcoming' | 'in-production' | 'unknown'): string {
    switch (status) {
      case 'released':
        return '#4CAF50'; // Green
      case 'upcoming':
        return '#FF9800'; // Orange
      case 'in-production':
        return '#2196F3'; // Blue
      case 'unknown':
        return '#9E9E9E'; // Gray
      default:
        return '#9E9E9E';
    }
  }

  /**
   * Generate theme-based colors for sagas based on genres and themes
   */
  static generateSagaThemeColor(saga: ApiSaga): string {
    // Primary color mapping based on themes and genres
    const themeColorMap: { [key: string]: string } = {
      // War and battle themes
      'war': '#B22222',
      'battle': '#8B0000',
      'strategy': '#FF4500',
      'heroism': '#DAA520',
      
      // Emotional themes
      'sacrifice': '#8B0000',
      'loss': '#696969',
      'hubris': '#DC143C',
      'pride': '#B8860B',
      
      // Divine and supernatural
      'divine': '#8A2BE2',
      'magic': '#9932CC',
      'punishment': '#8B0000',
      'retribution': '#CD5C5C',
      
      // Ocean and water
      'ocean': '#1E90FF',
      'sea': '#4682B4',
      'storm': '#4B0082',
      'water': '#00CED1',
      
      // Death and underworld
      'death': '#2F4F4F',
      'underworld': '#301934',
      'prophecy': '#483D8B',
      
      // Wisdom and guidance
      'wisdom': '#00CED1',
      'guidance': '#20B2AA',
      'strategic': '#4169E1',
      
      // Thunder and divine power
      'thunder': '#FFD700',
      'lightning': '#F0E68C',
      'justice': '#B8860B',
      
      // Vengeance and conflict
      'vengeance': '#8B0000',
      'revenge': '#A0522D',
      'conflict': '#CD853F',
      
      // Home and family
      'homecoming': '#DC143C',
      'family': '#CD5C5C',
      'reunion': '#FF69B4',
      'restoration': '#98FB98'
    };

    // Check themes first
    for (const theme of saga.themes) {
      const normalizedTheme = theme.toLowerCase();
      for (const [key, color] of Object.entries(themeColorMap)) {
        if (normalizedTheme.includes(key)) {
          return color;
        }
      }
    }

    // Check genres as fallback
    const genreColorMap: { [key: string]: string } = {
      'epic': '#FF4500',
      'rock': '#8B0000',
      'orchestral': '#4A90E2',
      'mystical': '#9932CC',
      'oceanic': '#1E90FF',
      'divine': '#FFD700',
      'haunting': '#2F4F4F',
      'aggressive': '#8B0000',
      'majestic': '#DC143C'
    };

    for (const genre of saga.genres) {
      const normalizedGenre = genre.toLowerCase();
      for (const [key, color] of Object.entries(genreColorMap)) {
        if (normalizedGenre.includes(key)) {
          return color;
        }
      }
    }

    // Default color if no matches
    return '#4A90E2';
  }

  /**
   * Get dynamic saga color based on API data or fallback to static mapping
   */
  static getSagaColor(saga: ApiSaga): string {
    // Static color mapping for known sagas (for consistency)
    const staticColorMap: { [key: string]: string } = {
      'The Troy Saga': '#FF4500',
      'The Cyclops Saga': '#8B0000',
      'The Ocean Saga': '#1E90FF',
      'The Circe Saga': '#9932CC',
      'The Underworld Saga': '#2F4F4F',
      'The Thunder Saga': '#FFD700',
      'The Wisdom Saga': '#00CED1',
      'The Vengeance Saga': '#008B8B',
      'The Ithaca Saga': '#DC143C'
    };

    // Use static mapping if available for consistency
    if (staticColorMap[saga.title]) {
      return staticColorMap[saga.title];
    }

    // Otherwise generate based on themes/genres
    return SagaService.generateSagaThemeColor(saga);
  }

  /**
   * Get complementary colors for saga theming
   */
  static getSagaThemeColors(saga: ApiSaga): {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  } {
    const primaryColor = SagaService.getSagaColor(saga);
    
    // Generate complementary colors based on primary
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgb = hexToRgb(primaryColor);
    if (!rgb) {
      return {
        primary: primaryColor,
        secondary: '#4A90E2',
        accent: '#FFD700',
        background: 'rgba(74, 144, 226, 0.1)'
      };
    }

    // Calculate secondary color (darker version)
    const secondary = rgbToHex(
      Math.max(0, rgb.r - 40),
      Math.max(0, rgb.g - 40),
      Math.max(0, rgb.b - 40)
    );

    // Calculate accent color (lighter/more vibrant version)
    const accent = rgbToHex(
      Math.min(255, rgb.r + 60),
      Math.min(255, rgb.g + 60),
      Math.min(255, rgb.b + 60)
    );

    return {
      primary: primaryColor,
      secondary: secondary,
      accent: accent,
      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`
    };
  }
  /**
   * Fetch all sagas from the backend API with retry logic
   */
  static async getAllSagas(page: number = 0, size: number = 10): Promise<ApiSaga[]> {
    const endpoint = `${API_BASE_URL}/api/sagas`;
    
    try {
      console.log('🌐 Fetching sagas from API with retry logic:', endpoint);
      
      // Check endpoint health before attempting
      if (!ApiErrorBoundary.isEndpointHealthy(endpoint)) {
        console.warn('⚠️ Endpoint unhealthy, using fallback data immediately');
        return SagaService.getFallbackSagas();
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
            `${endpoint}?page=${page}&size=${size}&sortBy=id&sortDir=asc`,
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

          const data: ApiSagaPage = await response.json();
          return data.content;
        },
        retryConfig,
        'getAllSagas'
      );
      
      // Reset error count on success
      ApiErrorBoundary.resetErrors(endpoint);
      console.log('✅ Successfully fetched sagas from API:', result.data.length);
      
      return result.data;
      
    } catch (error) {
      console.error('❌ Error fetching sagas after retries:', error);
      
      // Record error for endpoint health tracking
      ApiErrorBoundary.recordError(endpoint);
      
      console.log('🔄 Using fallback saga data due to API error');
      
      // Return fallback data if API is unavailable
      return SagaService.getFallbackSagas();
    }
  }

  /**
   * Get a specific saga by ID with retry logic
   */
  static async getSagaById(id: string | number): Promise<ApiSaga | null> {
    const endpoint = `${API_BASE_URL}/api/sagas/${id}`;
    
    try {
      console.log(`🎭 Fetching saga by ID with retry logic: ${id}`);
      
      // Check endpoint health before attempting
      if (!ApiErrorBoundary.isEndpointHealthy(endpoint)) {
        console.warn('⚠️ Endpoint unhealthy, using fallback data immediately');
        const fallbackSagas = SagaService.getFallbackSagas();
        return fallbackSagas.find(saga => saga.id === Number(id)) || null;
      }
      
      const retryConfig: Partial<RetryConfig> = {
        maxRetries: 2, // Fewer retries for individual saga requests
        baseDelay: 500,
        maxDelay: 4000,
        retryOnStatusCodes: [408, 429, 500, 502, 503, 504], // Don't retry 404s
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
              console.log(`⚠️ Saga with ID ${id} not found`);
              return null;
            }
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as any;
            error.status = response.status;
            error.statusText = response.statusText;
            throw error;
          }
          
          const saga: ApiSaga = await response.json();
          return saga;
        },
        retryConfig,
        `getSagaById(${id})`
      );
      
      // Reset error count on success
      ApiErrorBoundary.resetErrors(endpoint);
      
      if (result.data) {
        console.log('✅ Successfully fetched saga:', result.data.title);
      }
      
      return result.data;
      
    } catch (error) {
      console.error('❌ Error fetching saga by ID after retries:', error);
      
      // Record error for endpoint health tracking
      ApiErrorBoundary.recordError(endpoint);
      
      // Try to find in fallback data
      const fallbackSagas = SagaService.getFallbackSagas();
      const fallbackSaga = fallbackSagas.find(saga => saga.id === Number(id));
      
      if (fallbackSaga) {
        console.log('🔄 Using fallback saga data for ID:', id);
        return fallbackSaga;
      }
      
      return null;
    }
  }

  /**
   * Get saga by title (useful for mapping from frontend saga names)
   */
  static async getSagaByTitle(title: string): Promise<ApiSaga | null> {
    try {
      const allSagas = await SagaService.getAllSagas();
      const saga = allSagas.find(s => s.title === title || s.title.toLowerCase() === title.toLowerCase());
      
      if (saga) {
        console.log('✅ Found saga by title:', title);
        return saga;
      }
      
      console.log(`⚠️ Saga with title "${title}" not found`);
      return null;
    } catch (error) {
      console.error('❌ Error fetching saga by title:', error);
      return null;
    }
  }

  /**
   * Get Troy Saga specifically (for the current requirement)
   */
  static async getTroySaga(): Promise<ApiSaga | null> {
    try {
      // Try to get Troy Saga by ID 1 (assuming it's the first saga)
      const troySaga = await SagaService.getSagaById(1);
      
      if (troySaga && troySaga.title.includes('Troy')) {
        return troySaga;
      }
      
      // Fallback: search by title
      return await SagaService.getSagaByTitle('The Troy Saga');
    } catch (error) {
      console.error('❌ Error fetching Troy Saga:', error);
      return SagaService.getFallbackTroySaga();
    }
  }

  /**
   * Fallback saga data when backend is unavailable
   */
  private static getFallbackSagas(): ApiSaga[] {
    return [
      SagaService.getFallbackTroySaga(),
      {
        id: 2,
        title: 'The Cyclops Saga',
        description: 'Odysseus encounters Polyphemus and learns harsh lessons about pride and consequences.',
        releaseDate: '2023-01-15',
        episodeCount: 4,
        genres: ['Musical Theatre', 'Heavy Rock', 'Intense Orchestral'],
        themes: ['Pride', 'Hubris', 'Divine Retribution', 'Loss', 'Consequences'],
        inspirations: ['Homer\'s Odyssey', 'Greek Mythology', 'Rock Opera'],
        albumArtUrl: 'https://example.com/cyclops-saga-art.jpg',
        youtubePlaylistUrl: 'https://youtube.com/playlist?list=cyclops-saga',
        totalDurationSeconds: 1032,
        songs: [],
        characters: [],
        locations: [],
        events: []
      },
      {
        id: 3,
        title: 'The Ocean Saga',
        description: 'Odysseus faces Poseidon\'s wrath and the challenge of the wind bag.',
        releaseDate: '2023-02-14',
        episodeCount: 4,
        genres: ['Musical Theatre', 'Oceanic Orchestral', 'Divine Power'],
        themes: ['Divine Punishment', 'Trust', 'Leadership', 'Ruthlessness'],
        inspirations: ['Homer\'s Odyssey', 'Ocean Mythology', 'Divine Intervention'],
        albumArtUrl: 'https://example.com/ocean-saga-art.jpg',
        youtubePlaylistUrl: 'https://youtube.com/playlist?list=ocean-saga',
        totalDurationSeconds: 1081,
        songs: [],
        characters: [],
        locations: [],
        events: []
      },
      {
        id: 4,
        title: 'The Circe Saga',
        description: 'Odysseus encounters the sorceress Circe and faces tests of wit and will.',
        releaseDate: '2023-03-15',
        episodeCount: 4,
        genres: ['Musical Theatre', 'Magical Orchestral', 'Mystical'],
        themes: ['Magic', 'Temptation', 'Sacrifice', 'Transformation', 'Wisdom'],
        inspirations: ['Homer\'s Odyssey', 'Magic and Sorcery', 'Ancient Mysticism'],
        albumArtUrl: 'https://example.com/circe-saga-art.jpg',
        youtubePlaylistUrl: 'https://youtube.com/playlist?list=circe-saga',
        totalDurationSeconds: 962,
        songs: [],
        characters: [],
        locations: [],
        events: []
      }
    ];
  }

  /**
   * Get Troy Saga fallback data
   */
  private static getFallbackTroySaga(): ApiSaga {
    return {
      id: 1,
      title: 'The Troy Saga',
      description: 'The beginning of Odysseus\'s epic journey, starting with the fall of Troy and his first moral challenges.',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Musical Theatre', 'Epic Rock', 'Orchestral'],
      themes: ['War', 'Strategy', 'Moral Complexity', 'Heroism', 'Sacrifice'],
      inspirations: ['Homer\'s Odyssey', 'Greek Mythology', 'Ancient Greek Theatre'],
      albumArtUrl: 'https://example.com/troy-saga-art.jpg',
      youtubePlaylistUrl: 'https://youtube.com/playlist?list=troy-saga',
      totalDurationSeconds: 1263,
      songs: [],
      characters: [],
      locations: [],
      events: []
    };
  }

  /**
   * Health check for the backend saga API
   */
  static async checkSagaApiHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sagas?page=0&size=1`, {
        method: 'GET',
        timeout: 5000,
      } as any);
      
      return response.ok;
    } catch (error) {
      console.log('🔴 Backend Saga API health check failed:', error);
      return false;
    }
  }

  /**
   * Convert ApiSaga to SagaInfo format for SagaInfoPanel compatibility
   */
  static convertApiSagaToSagaInfo(apiSaga: ApiSaga): any {
    // Map epic saga titles to frontend IDs
    const sagaIdMap: { [key: string]: string } = {
      'The Troy Saga': 'troy',
      'The Cyclops Saga': 'cyclops',
      'The Ocean Saga': 'ocean',
      'The Circe Saga': 'circe',
      'The Underworld Saga': 'underworld',
      'The Thunder Saga': 'thunder',
      'The Wisdom Saga': 'wisdom',
      'The Vengeance Saga': 'vengeance',
      'The Ithaca Saga': 'ithaca'
    };

    // Get dynamic color based on API data
    const dynamicColor = SagaService.getSagaColor(apiSaga);
    const themeColors = SagaService.getSagaThemeColors(apiSaga);

    return {
      id: sagaIdMap[apiSaga.title] || apiSaga.title.toLowerCase().replace(/\s+/g, '-'),
      name: apiSaga.title,
      color: dynamicColor,
      description: apiSaga.description,
      theme: apiSaga.themes.join(', '),
      keyCharacters: [], // Will be populated when character data is available
      songs: [], // Will be populated when song data is available  
      locations: [], // Will be populated when location data is available
      emotionalTone: 'Epic and engaging', // Default for now
      musicalStyle: apiSaga.genres.join(', '),
      keyMoments: [], // Will be populated when event data is available
      symbolism: `Represents the themes of ${apiSaga.themes.join(', ').toLowerCase()}`,
      order: apiSaga.id,
      // Additional backend data
      backendData: {
        releaseDate: apiSaga.releaseDate,
        episodeCount: apiSaga.episodeCount,
        inspirations: apiSaga.inspirations,
        albumArtUrl: apiSaga.albumArtUrl,
        youtubePlaylistUrl: apiSaga.youtubePlaylistUrl,
        totalDurationSeconds: apiSaga.totalDurationSeconds
      },
      // Enhanced theming from API data
      themeColors: themeColors
    };
  }

  // Legacy method for backwards compatibility
  static async getSongsBySaga(sagaName: string): Promise<any[]> {
    try {
      const response = await fetch(`http://localhost:8080/api/songs?saga=${encodeURIComponent(sagaName)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch songs for saga:', sagaName, error);
      return [];
    }
  }
}console.log('🐛 Debug: SagaService loaded');
