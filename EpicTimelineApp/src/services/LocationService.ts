/**
 * LocationService - Handles communication with the Epic Timeline backend API
 */

import ApiRetryService, { ApiErrorBoundary, RetryConfig } from '../utils/apiRetry';

const API_BASE_URL = 'http://localhost:8080';

export interface ApiLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  modernName?: string;
  culturalSignificance?: {
    importance: 'PRIMARY' | 'SECONDARY' | 'LEGENDARY';
  };
  isRealPlace?: boolean;
  songs?: string[];
}

export class LocationService {
  /**
   * Fetch all locations from the backend API with retry logic
   */
  static async getAllLocations(): Promise<ApiLocation[]> {
    const endpoint = `${API_BASE_URL}/api/locations`;
    
    try {
      console.log('• Fetching locations from API with retry logic:', endpoint);
      
      // Check endpoint health before attempting
      if (!ApiErrorBoundary.isEndpointHealthy(endpoint)) {
        console.warn('◦  Endpoint unhealthy, using fallback data immediately');
        return LocationService.getFallbackLocations();
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

          const data: ApiLocation[] = await response.json();
          return data;
        },
        retryConfig,
        'getAllLocations'
      );
      
      // Reset error count on success
      ApiErrorBoundary.resetErrors(endpoint);
      console.log('✓ Successfully fetched locations from API:', result.data.length);
      
      return result.data;
      
    } catch (error) {
      console.error('✗ Error fetching locations after retries:', error);
      
      // Record error for endpoint health tracking
      ApiErrorBoundary.recordError(endpoint);
      
      console.log('• Using fallback data due to API error');
      
      // Return fallback data if API is unavailable
      return LocationService.getFallbackLocations();
    }
  }

  /**
   * Get a specific location by ID
   */
  static async getLocationById(id: string): Promise<ApiLocation | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/${id}`);
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('✗ Error fetching location by ID:', error);
      return null;
    }
  }

  /**
   * Fallback data when backend is unavailable
   */
  private static getFallbackLocations(): ApiLocation[] {
    return [
      {
        id: 1,
        name: 'Troy',
        latitude: 39.957,
        longitude: 26.239,
        description: 'Ancient fortified city in northwestern Anatolia, site of the legendary Trojan War.',
        saga: 'The Troy Saga',
        significance: 'The starting point of Odysseus\'s epic journey. Here, the clever king helped end a decade-long war.',
        modernName: 'Hisarlik, Turkey',
        culturalSignificance: { importance: 'LEGENDARY' },
        isRealPlace: true,
        songs: ['Horse and the Infant', 'Just a Man', 'Full Speed Ahead']
      },
      {
        id: 2,
        name: 'Ithaca',
        latitude: 38.367,
        longitude: 20.650,
        description: 'The island kingdom of Odysseus, his ultimate destination and home.',
        saga: 'The Ithaca Saga',
        significance: 'Odysseus\'s beloved homeland, where Penelope waits for his return.',
        modernName: 'Ithaki, Greece',
        culturalSignificance: { importance: 'PRIMARY' },
        isRealPlace: true,
        songs: ['The Challenge', 'Hold Them Down', 'Odysseus']
      },
      {
        id: 3,
        name: 'The Underworld',
        latitude: 0,
        longitude: 0,
        description: 'The realm of the dead, where Odysseus seeks wisdom from the prophet Tiresias.',
        saga: 'The Underworld Saga',
        significance: 'A pivotal moment where Odysseus confronts his past and learns about his future.',
        modernName: 'Mythological Realm',
        culturalSignificance: { importance: 'LEGENDARY' },
        isRealPlace: false,
        songs: ['The Underworld', 'No Longer You', 'Monster']
      }
    ];
  }

  /**
   * Health check for the backend API
   */
  static async checkApiHealth(): Promise<boolean> {
    try {
      console.log('• Checking API health...');
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        timeout: 5000,
      } as any);
      
      const isHealthy = response.ok;
      console.log(`${isHealthy ? '•' : '•'} API health check: ${isHealthy ? 'OK' : 'Failed'} (${response.status})`);
      return isHealthy;
    } catch (error) {
      console.log('• Backend API health check failed:', error);
      return false;
    }
  }
}
