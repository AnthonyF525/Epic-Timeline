/**
 * RealSpotifyService - Actual Spotify Web API Integration
 * Provides real 30-second previews using Spotify's Web API
 * Handles authentication and track search for EPIC: The Musical
 */

export interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  duration_ms: number;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

class RealSpotifyService {
  private static instance: RealSpotifyService;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  
  // Configuration - these should be set by the user
  private clientId: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || '61ac86d247e9448ea2a9c5e7bd188055'; // Your real Client ID
  private redirectUri: string = process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8081';

  private constructor() {
    // Defer credential loading to avoid async constructor
    setTimeout(() => this.loadStoredCredentials(), 0);
      
    // Debug logging
    console.log('Spotify Config Debug:', {
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      configured: this.isConfigured()
    });

    // Check if we're on a callback URL and handle it
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      if (currentUrl.includes('#access_token=')) {
        console.log('Detected Spotify callback URL, processing...');
        setTimeout(() => this.handleAuthCallback(), 100);
      }
    }

    // Add global test functions for easier debugging
    if (typeof window !== 'undefined') {
      (window as any).testSpotify = {
        service: this,
        authenticate: () => this.authenticate(),
        manualAuth: () => this.manualAuthenticate(),
        getAuthUrl: () => this.getAuthUrl(),
        getStatus: () => this.getAuthStatus(),
        isConfigured: () => this.isConfigured(),
        isAuthenticated: () => this.isAuthenticated()
      };
      console.log('Debug tools available: window.testSpotify');
    }
  }

  /**
   * Load stored credentials (works in both web and React Native)
   */
  private async loadStoredCredentials() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Web environment
        const token = localStorage.getItem('spotify_access_token');
        const expiry = localStorage.getItem('spotify_token_expiry');
        
        if (token && expiry && parseInt(expiry) > Date.now()) {
          this.accessToken = token;
          this.tokenExpiry = parseInt(expiry);
        }
      } else {
        // React Native environment - use AsyncStorage if available
        try {
          const AsyncStorage = require('@react-native-async-storage/async-storage').default;
          const token = await AsyncStorage.getItem('spotify_access_token');
          const expiry = await AsyncStorage.getItem('spotify_token_expiry');
          
          if (token && expiry && parseInt(expiry) > Date.now()) {
            this.accessToken = token;
            this.tokenExpiry = parseInt(expiry);
          }
        } catch (asyncError) {
          // AsyncStorage not available, use memory storage
          console.log('AsyncStorage not available, using memory storage');
        }
      }
    } catch (error) {
      console.log('Could not load stored credentials:', error);
    }
  }

  public static getInstance(): RealSpotifyService {
    if (!RealSpotifyService.instance) {
      RealSpotifyService.instance = new RealSpotifyService();
    }
    return RealSpotifyService.instance;
  }

  /**
   * Initialize the service (load stored credentials)
   */
  public async initialize(): Promise<void> {
    await this.loadStoredCredentials();
    console.log('Spotify service initialized, authenticated:', this.isAuthenticated());
  }

  /**
   * Check if Spotify is properly configured
   */
  isConfigured(): boolean {
    return this.clientId !== '' && this.clientId !== 'your_spotify_client_id';
  }

  /**
   * Check if user is authenticated with valid token
   */
  isAuthenticated(): boolean {
    return this.accessToken !== null && 
           this.tokenExpiry !== null && 
           this.tokenExpiry > Date.now();
  }

  /**
   * Get Spotify authorization URL
   */
  getAuthUrl(): string {
    const scopes = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state'
    ];

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'token',
      redirect_uri: this.redirectUri,
      scope: scopes.join(' '),
      show_dialog: 'true'
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  /**
   * Store token safely (works in both web and React Native)
   */
  private async storeToken(token: string, expiresIn: string) {
    console.log('Storing token...');
    this.accessToken = token;
    this.tokenExpiry = Date.now() + (parseInt(expiresIn) * 1000);
    
    console.log('Token stored in memory:', {
      tokenPreview: token.substring(0, 20) + '...',
      expiresAt: new Date(this.tokenExpiry).toLocaleString()
    });
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Web environment
        localStorage.setItem('spotify_access_token', token);
        localStorage.setItem('spotify_token_expiry', this.tokenExpiry.toString());
        console.log('Token stored in localStorage');
      } else {
        // React Native environment
        try {
          const AsyncStorage = require('@react-native-async-storage/async-storage').default;
          await AsyncStorage.setItem('spotify_access_token', token);
          await AsyncStorage.setItem('spotify_token_expiry', this.tokenExpiry.toString());
          console.log('Token stored in AsyncStorage');
        } catch (asyncError) {
        console.log('AsyncStorage not available for token storage');
        }
      }
    } catch (error) {
      console.warn('Could not store token:', error);
    }
  }

  /**
   * Handle authentication callback from Spotify
   */
  async handleAuthCallback(): Promise<boolean> {
    console.log('handleAuthCallback called');
    
    if (typeof window === 'undefined') {
      console.log('No window object available');
      return false;
    }

    const hash = window.location.hash.substring(1);
    console.log('URL hash:', hash ? hash.substring(0, 50) + '...' : 'empty');
    
    if (!hash) {
      console.log('No hash in URL');
      return false;
    }
    
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in');
    const error = params.get('error');
    
    console.log('Parsed params:', {
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      expiresIn,
      error
    });
    
    if (error) {
      console.log('Spotify auth error:', error);
      return false;
    }
    
    if (token && expiresIn) {
      console.log('Valid token received, storing...');
      await this.storeToken(token, expiresIn);
      
      // Clear hash from URL
      try {
        window.history.replaceState(null, '', window.location.pathname);
        console.log('URL hash cleared');
      } catch (e) {
        console.log('Could not clear URL hash:', e);
      }
      
      console.log('Spotify authentication successful');
      return true;
    }
    
    console.log('Missing token or expires_in');
    return false;
  }

  /**
   * Search for EPIC: The Musical tracks on Spotify
   */
  async searchTrack(songTitle: string): Promise<SpotifyTrack | null> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated with Spotify');
    }

    try {
      // Search specifically for EPIC: The Musical by Jorge Rivera-Herrans
      const queries = [
        `"${songTitle}" "EPIC The Musical" Jorge Rivera-Herrans`,
        `"${songTitle}" "EPIC" Jorge`,
        `"${songTitle}" "Jorge Rivera-Herrans"`,
        songTitle
      ];

      for (const query of queries) {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            this.clearAuth();
            throw new Error('Spotify authentication expired');
          }
          continue;
        }

        const data: SpotifySearchResponse = await response.json();
        
        // Look for best match
        const bestMatch = data.tracks.items.find(track => {
          const hasEpic = track.album.name.toLowerCase().includes('epic') ||
                         track.name.toLowerCase().includes('epic');
          const hasJorge = track.artists.some(artist => 
            artist.name.toLowerCase().includes('jorge') ||
            artist.name.toLowerCase().includes('rivera-herrans')
          );
          const titleMatch = track.name.toLowerCase().includes(songTitle.toLowerCase());
          
          return (hasEpic || hasJorge) && titleMatch;
        });

        if (bestMatch) {
          return bestMatch;
        }

        // Fallback to first result if no perfect match
        if (data.tracks.items.length > 0) {
          return data.tracks.items[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Spotify search error:', error);
      throw error;
    }
  }

  /**
   * Play a 30-second preview - Returns preview URL for React Native Audio
   */
  async getPreviewUrl(songTitle: string): Promise<{ success: boolean; message: string; previewUrl?: string; trackInfo?: any }> {
    try {
      if (!this.isConfigured()) {
        return {
          success: false,
          message: 'Spotify client ID not configured. Please set EXPO_PUBLIC_SPOTIFY_CLIENT_ID.'
        };
      }

      if (!this.isAuthenticated()) {
        return {
          success: false,
          message: 'Please authenticate with Spotify first.'
        };
      }

      const track = await this.searchTrack(songTitle);
      
      if (!track) {
        return {
          success: false,
          message: `Track "${songTitle}" not found on Spotify.`
        };
      }

      if (track.preview_url) {
        return {
          success: true,
          message: `Found preview: "${track.name}" by ${track.artists[0]?.name || 'Unknown Artist'}`,
          previewUrl: track.preview_url,
          trackInfo: {
            name: track.name,
            artist: track.artists[0]?.name,
            album: track.album.name,
            duration: track.duration_ms,
            spotifyUrl: track.external_urls.spotify
          }
        };
      } else {
        return {
          success: false,
          message: `"${track.name}" has no preview available on Spotify`,
          trackInfo: {
            name: track.name,
            artist: track.artists[0]?.name,
            spotifyUrl: track.external_urls.spotify
          }
        };
      }

    } catch (error) {
      console.error('Get preview URL error:', error);
      return {
        success: false,
        message: `Error searching track: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Legacy method for backward compatibility - uses getPreviewUrl internally
   */
  async playTrack(songTitle: string): Promise<{ success: boolean; message: string; audioElement?: HTMLAudioElement }> {
    const result = await this.getPreviewUrl(songTitle);
    return {
      success: result.success,
      message: result.message,
      audioElement: undefined // Not used in React Native
    };
  }

  /**
   * Authenticate with Spotify
   */
  authenticate(): void {
    if (!this.isConfigured()) {
      throw new Error('Spotify client ID not configured');
    }

    const authUrl = this.getAuthUrl();
    
    // Open in popup window
    const popup = window.open(
      authUrl, 
      'spotify-auth', 
      'width=500,height=700,scrollbars=yes,resizable=yes'
    );

    // Monitor popup for completion
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        // Check if authentication was successful
        this.handleAuthCallback();
      }
    }, 1000);
  }

  /**
   * Manual authentication for debugging - opens auth URL directly
   */
  manualAuthenticate(): void {
    console.log('Manual authentication triggered');
    if (!this.isConfigured()) {
      console.log('Not configured');
      throw new Error('Spotify client ID not configured');
    }

    const authUrl = this.getAuthUrl();
    console.log('Manual auth URL:', authUrl);
    
    if (typeof window !== 'undefined') {
      window.open(authUrl, '_blank');
    }
  }

  /**
   * Clear authentication
   */
  async clearAuth(): Promise<void> {
    this.accessToken = null;
    this.tokenExpiry = null;
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Web environment
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_expiry');
      } else {
        // React Native environment
        try {
          const AsyncStorage = require('@react-native-async-storage/async-storage').default;
          await AsyncStorage.removeItem('spotify_access_token');
          await AsyncStorage.removeItem('spotify_token_expiry');
        } catch (asyncError) {
          console.log('AsyncStorage not available for clearing auth');
        }
      }
    } catch (error) {
      console.warn('Could not clear stored auth:', error);
    }
  }

  /**
   * Get authentication status
   */
  getAuthStatus() {
    return {
      configured: this.isConfigured(),
      authenticated: this.isAuthenticated(),
      tokenExpiry: this.tokenExpiry,
      clientId: this.clientId ? this.clientId.substring(0, 8) + '...' : 'Not set'
    };
  }

  /**
   * Set Spotify credentials (for development)
   */
  setCredentials(clientId: string, redirectUri?: string) {
    this.clientId = clientId;
    if (redirectUri) {
      this.redirectUri = redirectUri;
    }
  }
}

// Singleton instance
export const realSpotifyService = RealSpotifyService.getInstance();
export default realSpotifyService;

// Debug function for browser console
if (typeof window !== 'undefined') {
  (window as any).testSpotify = {
    service: realSpotifyService,
    checkAuth: () => {
      console.log('Spotify Auth Status:', realSpotifyService.getAuthStatus());
      return realSpotifyService.getAuthStatus();
    },
    authenticate: () => {
      console.log('Starting Spotify authentication...');
      const authUrl = realSpotifyService.getAuthUrl();
      console.log('Auth URL:', authUrl);
      window.open(authUrl, 'spotify-auth', 'width=600,height=700');
    },
    openAuthTab: () => {
      console.log('Opening Spotify auth in new tab...');
      const authUrl = realSpotifyService.getAuthUrl();
      console.log('Auth URL:', authUrl);
      window.open(authUrl, '_blank');
    },
    testSimple: () => {
      console.log('Simple test...');
      console.log('Configured:', realSpotifyService.isConfigured());
      console.log('Authenticated:', realSpotifyService.isAuthenticated());
      const authUrl = realSpotifyService.getAuthUrl();
      console.log('Auth URL:', authUrl);
      console.log('All basic functions working. Try: window.testSpotify.openAuthTab()');
    },
    testSearch: async (query = 'The Horse and the Infant EPIC') => {
      console.log('Testing search for:', query);
      try {
        const result = await realSpotifyService.getPreviewUrl(query);
        console.log('Search result:', result);
        return result;
      } catch (error) {
        console.error('Search failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, message: errorMessage };
      }
    }
  };
  
  console.log('Spotify debug tools loaded!');
  console.log('Try these commands:');
  console.log('  window.testSpotify.testSimple() - Basic test');
  console.log('  window.testSpotify.checkAuth() - Check status');
  console.log('  window.testSpotify.openAuthTab() - Open auth in new tab');
}
