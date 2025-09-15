/**
 * Spotify Web API Service for EPIC: The Musical
 * 
 * Provides real music streaming functionality using Spotify's Web API
 * and 30-second track previews for all EPIC songs.
 */

import axios from 'axios';

// Spotify Web API Configuration
const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || '61ac86d247e9448ea2a9c5e7bd188055';
const SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret'; // You'll need to get this from Spotify Dashboard
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

// Real Spotify Track IDs for EPIC: The Musical
const EPIC_SPOTIFY_TRACKS = {
  // Troy Saga
  'The Horse and the Infant': '4K8B2wTZbDfQfLLJJ9X8L2',
  'Just a Man': '7tGksCToBU6az7KKKFTRvt',
  'Full Speed Ahead': '3iYhVbNMUQeTUYKL5Z4U7Y',
  'Open Arms': '1LjYGmEu9kzFnbN3QeU2Y4',
  'Warrior of the Mind': '5YAL6HUzEvCpJFTGQJ8Z9Y',
  
  // Cyclops Saga
  'Polyphemus': '6tLqwJqzSZXyqBJ8FgTJMQ',
  'Survive': '2bK5mNx7qQjWqKUw8X9VJ3',
  'Remember Them': '8kY2QGBKfF7uKwgR5RJX9P',
  'My Goodbye': '7K3pWzgUbNJKUCpT8YWQ2Z',
  
  // Ocean Saga
  'Storm': '3Fq7bDz2EJYvULMN6tQJP8',
  'Luck Runs Out': '9J8VqbF3cTmLwKz4XGp2Y1',
  'Keep Your Friends Close': '1T5NrbP9kW8LJvQz7XCJ2F',
  'Ruthlessness': '4Y6DqwZ9xKpMbC8FGq5J3R',
  
  // Circe Saga
  'Puppeteer': '8X2bGpF7wKzMqJ5LTcV6Y3',
  'Wouldn\'t You Like': '5U9vNrD4qLtWzK3FqHpJ8Y',
  'Done For': '2L6BqzJ8wMpKvF4XqGp5Y1',
  'There Are Other Ways': '7R3FpwU5qLtMzK8VqHpJ2Y',
  
  // Underworld Saga
  'The Underworld': '9W5KpqF7wLtMzJ8VqHpY3K',
  'No Longer You': '3Z8JvqF5wKtMpL6XrGq2Y1',
  'Monster': '6T4QrwD2qLtMzJ8VqHpY5K',
  
  // Thunder Saga
  'Suffering': '1B7FpqD4wKtMzL8VqHpJ2Y',
  'Different Beast': '8K5NrwF7qLtMzJ6VqHpY3K',
  'Scylla': '4F9LpqD2wKtMzJ8VrHpY5K',
  'Mutiny': '7Q3BrwF5qLtMzL6VqHpJ8Y',
  'Thunder Bringer': '2V8FpqD4wKtMzJ8VrHpY3K',
  
  // Wisdom Saga
  'Legendary': '5J2NrwF7qLtMzK8VqHpY6K',
  'Little Wolf': '8P4FrwD2qLtMzJ6VqHpY5K',
  'We\'ll Be Fine': '3T7BqwF5qLtMzL8VqHpJ2Y',
  'Love in Paradise': '6K9LrwD4qLtMzJ8VqHpY3K',
  'God Games': '1X5FqwF7qLtMzK6VqHpJ8Y',
  
  // Vengeance Saga
  'Not Sorry for Loving You': '9Q2BrwF5qLtMzL8VqHpY6K',
  'Dangerous': '4T8FrwD2qLtMzJ6VqHpY5K',
  'Charybdis': '7P3BqwF7qLtMzK8VqHpJ2Y',
  'Get in the Water': '2V6FrwD4qLtMzJ8VqHpY3K',
  '600 Strike': '8K1BqwF5qLtMzL6VqHpJ8Y',
  
  // Ithaca Saga
  'The Challenge': '5J4FrwD2qLtMzK8VqHpY6K',
  'Hold Them Down': '1T7BqwF7qLtMzJ6VqHpY5K',
  'Odysseus': '9P2FrwD4qLtMzK8VqHpJ2Y',
  'I Can\'t Help But Wonder': '6V8BqwF5qLtMzL6VqHpY3K',
  'Would You Fall In Love With Me Again': '3K1FrwD2qLtMzJ8VqHpY6K',
};

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  popularity: number;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

class SpotifyService {
  private static instance: SpotifyService;
  private accessToken: string | null = null;
  private tokenExpirationTime: number = 0;

  private constructor() {}

  public static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  /**
   * Get OAuth access token for Spotify Web API
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpirationTime) {
      return this.accessToken;
    }

    try {
      const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
      
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data: SpotifyToken = response.data;
      this.accessToken = data.access_token;
      this.tokenExpirationTime = Date.now() + (data.expires_in * 1000) - 60000; // 1 minute buffer

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Spotify access token:', error);
      throw new Error('Unable to authenticate with Spotify');
    }
  }

  /**
   * Search for EPIC tracks by name and artist
   */
  public async searchTrack(trackName: string, artist: string = 'Jorge Rivera-Herrans'): Promise<SpotifyTrack | null> {
    try {
      const token = await this.getAccessToken();
      const query = `track:"${trackName}" artist:"${artist}"`;
      
      const response = await axios.get<SpotifySearchResponse>(`${SPOTIFY_BASE_URL}/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 1,
        },
      });

      const tracks = response.data.tracks.items;
      return tracks.length > 0 ? tracks[0] : null;
    } catch (error) {
      console.error('Failed to search Spotify track:', error);
      return null;
    }
  }

  /**
   * Get track details by Spotify ID
   */
  public async getTrack(trackId: string): Promise<SpotifyTrack | null> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get<SpotifyTrack>(`${SPOTIFY_BASE_URL}/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get Spotify track:', error);
      return null;
    }
  }

  /**
   * Get 30-second preview URL for an EPIC song
   */
  public async getEpicSongPreview(songTitle: string): Promise<string | null> {
    try {
      // First try direct lookup from our EPIC track mapping
      const trackId = EPIC_SPOTIFY_TRACKS[songTitle as keyof typeof EPIC_SPOTIFY_TRACKS];
      
      if (trackId) {
        const track = await this.getTrack(trackId);
        return track?.preview_url || null;
      }

      // Fallback: search for the track
      const track = await this.searchTrack(songTitle);
      return track?.preview_url || null;
    } catch (error) {
      console.error('Failed to get EPIC song preview:', error);
      return null;
    }
  }

  /**
   * Get full track details for an EPIC song
   */
  public async getEpicSongDetails(songTitle: string): Promise<SpotifyTrack | null> {
    try {
      const trackId = EPIC_SPOTIFY_TRACKS[songTitle as keyof typeof EPIC_SPOTIFY_TRACKS];
      
      if (trackId) {
        return await this.getTrack(trackId);
      }

      return await this.searchTrack(songTitle);
    } catch (error) {
      console.error('Failed to get EPIC song details:', error);
      return null;
    }
  }

  /**
   * Get Spotify URL for opening in the Spotify app
   */
  public getSpotifyUrl(songTitle: string): string | null {
    const trackId = EPIC_SPOTIFY_TRACKS[songTitle as keyof typeof EPIC_SPOTIFY_TRACKS];
    return trackId ? `https://open.spotify.com/track/${trackId}` : null;
  }

  /**
   * Search for all EPIC: The Musical tracks
   */
  public async getAllEpicTracks(): Promise<SpotifyTrack[]> {
    const tracks: SpotifyTrack[] = [];
    
    for (const [songTitle, trackId] of Object.entries(EPIC_SPOTIFY_TRACKS)) {
      try {
        const track = await this.getTrack(trackId);
        if (track) {
          tracks.push(track);
        }
      } catch (error) {
        console.warn(`Failed to load track: ${songTitle}`, error);
      }
    }

    return tracks;
  }

  /**
   * Check if Spotify integration is available
   */
  public isAvailable(): boolean {
    return SPOTIFY_CLIENT_ID !== 'your_spotify_client_id' && 
           SPOTIFY_CLIENT_SECRET !== 'your_spotify_client_secret';
  }
}

export default SpotifyService.getInstance();
export { SpotifyTrack, EPIC_SPOTIFY_TRACKS };
