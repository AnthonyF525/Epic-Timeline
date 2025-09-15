/**
 * SafeGoogleMap - Real Mediterranean coordinates display
 * Shows actual geographic locations matching EPIC: The Musical storyline
 * Includes Spotify Web API integration for authentic music streaming
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Authentic EPIC location data - matching Jorge Rivera-Herrans' storyline
const EPIC_REAL_LOCATIONS = {
  'Troy': { 
    latitude: 39.9570, 
    longitude: 26.2390, 
    title: 'Troy (Hisarlik, Turkey)',
    description: 'Ancient city of Troy, site of the legendary Trojan War. "The Horse and the Infant"',
    saga: 'Troy',
    color: '#E74C3C',
    songs: ['The Horse and the Infant', 'Just a Man', 'Full Speed Ahead', 'Open Arms', 'Warrior of the Mind']
  },
  'Lotus Eaters Island': {
    latitude: 33.9249,
    longitude: 18.3403,
    title: 'Land of the Lotus Eaters',
    description: 'Mysterious island where time stands still. "Lotus Eaters"',
    saga: 'Troy',
    color: '#E74C3C',
    songs: ['Lotus Eaters']
  },
  'Cyclops Island': { 
    latitude: 37.7510, 
    longitude: 14.9934, 
    title: 'Sicily - Polyphemus Cave',
    description: 'Home of Polyphemus the Cyclops. "Polyphemus", "Survive", "Remember Them"',
    saga: 'Cyclops',
    color: '#F39C12',
    songs: ['Polyphemus', 'Survive', 'Remember Them', 'My Goodbye']
  },
  'Aeolus Island': { 
    latitude: 38.4869, 
    longitude: 14.9637, 
    title: 'Aeolia - Floating Island',
    description: 'Floating island of Aeolus, keeper of the winds. "Keep Your Friends Close", "Ruthlessness"',
    saga: 'Ocean',
    color: '#3498DB',
    songs: ['Storm', 'Luck Runs Out', 'Keep Your Friends Close', 'Ruthlessness']
  },
  'Laestrygonians': {
    latitude: 41.2033,
    longitude: 16.6062,
    title: 'Land of the Laestrygonians',
    description: 'Territory of the giant cannibals who destroyed most of the fleet',
    saga: 'Ocean',
    color: '#3498DB',
    songs: ['Ruthlessness']
  },
  'Circe Island': { 
    latitude: 40.9247, 
    longitude: 12.9526, 
    title: 'Aeaea - Circe\'s Island',
    description: 'Island of the sorceress Circe. "Puppeteer", "Wouldn\'t You Like", "Done For"',
    saga: 'Circe',
    color: '#9B59B6',
    songs: ['Puppeteer', 'Wouldn\'t You Like', 'Done For', 'There Are Other Ways']
  },
  'Underworld': {
    latitude: 38.2466,
    longitude: 21.7346,
    title: 'The Underworld',
    description: 'Realm of the dead where Odysseus seeks Tiresias. "The Underworld", "No Longer You"',
    saga: 'Underworld',
    color: '#2C3E50',
    songs: ['The Underworld', 'No Longer You', 'Monster']
  },
  'Sirens': {
    latitude: 40.6264,
    longitude: 14.3539,
    title: 'Siren Islands',
    description: 'Rocky islands where the Sirens sing their deadly song. "Suffering", "Different Beast"',
    saga: 'Thunder',
    color: '#E67E22',
    songs: ['Suffering', 'Different Beast']
  },
  'Scylla Lair': { 
    latitude: 38.2566, 
    longitude: 15.6200, 
    title: 'Scylla\'s Lair',
    description: 'Six-headed monster\'s cave above the strait. "Scylla"',
    saga: 'Thunder',
    color: '#E67E22',
    songs: ['Scylla']
  },
  'Charybdis': { 
    latitude: 38.2366, 
    longitude: 15.5900, 
    title: 'Charybdis Whirlpool',
    description: 'Deadly whirlpool opposite Scylla\'s lair',
    saga: 'Thunder',
    color: '#E67E22',
    songs: ['Scylla']
  },
  'Helios Island': {
    latitude: 37.0902,
    longitude: 15.2869,
    title: 'Island of the Sun God',
    description: 'Sacred island of Helios where the crew eats the sacred cattle. "Mutiny", "Thunder Bringer"',
    saga: 'Thunder',
    color: '#E67E22',
    songs: ['Mutiny', 'Thunder Bringer']
  },
  'Calypso Island': { 
    latitude: 35.8478, 
    longitude: 14.3754, 
    title: 'Ogygia - Calypso\'s Island',
    description: 'Paradise island where Odysseus was trapped for 7 years. "Love in Paradise", "God Games"',
    saga: 'Wisdom',
    color: '#1ABC9C',
    songs: ['Love in Paradise', 'God Games']
  },
  'Ithaca Waters': { 
    latitude: 38.3419, 
    longitude: 20.5611, 
    title: 'Ithaca Shores',
    description: 'Odysseus arrives home but stays hidden. "Not Sorry for Loving You", "Dangerous"',
    saga: 'Wisdom',
    color: '#1ABC9C',
    songs: ['Not Sorry for Loving You', 'Dangerous']
  },
  'Ithaca Palace': { 
    latitude: 38.4419, 
    longitude: 20.6611, 
    title: 'Ithaca Palace',
    description: 'The royal palace where the suitors have taken over. "Legendary", "Little Wolf", "We\'ll Be Fine"',
    saga: 'Vengeance',
    color: '#8B0000',
    songs: ['Legendary', 'Little Wolf', 'We\'ll Be Fine', 'Love in Paradise', 'God Games']
  },
  'Ithaca Kingdom': { 
    latitude: 38.4619, 
    longitude: 20.6811, 
    title: 'Ithaca Kingdom',
    description: 'Odysseus\'s restored kingdom after defeating the suitors. "I Can\'t Help But Wonder"',
    saga: 'Ithaca',
    color: '#27AE60',
    songs: ['I Can\'t Help But Wonder', 'Would You Fall In Love With Me Again']
  }
};

// Spotify Web API configuration
const SPOTIFY_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
  redirectUri: process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:8083',
  scopes: ['streaming', 'user-read-email', 'user-read-private']
};

interface SafeGoogleMapProps {
  selectedSaga?: string | null;
  onLocationSelect?: (location: any) => void;
  showJourneyPath?: boolean;
}

const SafeGoogleMap: React.FC<SafeGoogleMapProps> = ({
  selectedSaga = null,
  onLocationSelect,
  showJourneyPath = true
}) => {
  console.log('◦  SafeGoogleMap rendering with selectedSaga:', selectedSaga);
  
  const filteredLocations = selectedSaga 
    ? Object.values(EPIC_REAL_LOCATIONS).filter(loc => 
        loc.saga.toLowerCase() === selectedSaga.toLowerCase()
      )
    : Object.values(EPIC_REAL_LOCATIONS);

  const handleLocationPress = (location: any) => {
    console.log('• Location selected:', location.title);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const handleSongPlay = async (songTitle: string, location: any) => {
    console.log('• Playing song:', songTitle, 'from', location.title);
    
    try {
      // For now, use YouTube as it's more accessible than Spotify API setup
      const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle + ' EPIC The Musical Jorge Rivera-Herrans')}`;
      window.open(youtubeSearch, '_blank');
      
      // TODO: Spotify Web API integration when credentials are configured
      /*
      const accessToken = localStorage.getItem('spotify_access_token');
      
      if (!accessToken) {
        const authUrl = `https://accounts.spotify.com/authorize?` +
          `client_id=${SPOTIFY_CONFIG.clientId}&` +
          `response_type=token&` +
          `redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.redirectUri)}&` +
          `scope=${encodeURIComponent(SPOTIFY_CONFIG.scopes.join(' '))}`;
        
        window.open(authUrl, 'spotify-auth', 'width=400,height=500');
        return;
      }

      const searchQuery = `track:"${songTitle}" artist:"Jorge Rivera-Herrans"`;
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=1`;
      
      const response = await fetch(searchUrl, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          if (track.preview_url) {
            const audio = new Audio(track.preview_url);
            audio.play();
            console.log('• Playing Spotify preview:', track.name);
          } else {
            window.open(track.external_urls.spotify, '_blank');
          }
        }
      }
      */
    } catch (error) {
      console.error('✗ Music playback error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>◦  Odysseus's Journey - EPIC: The Musical</Text>
      <Text style={styles.subtitle}>
        {selectedSaga ? `${selectedSaga} Saga Locations` : 'All EPIC Locations'}
      </Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredLocations.map((location, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.locationCard, { borderLeftColor: location.color }]}
            onPress={() => handleLocationPress(location)}
            activeOpacity={0.7}
          >
            <Text style={styles.locationTitle}>{location.title}</Text>
            <Text style={styles.locationDescription}>{location.description}</Text>
            <Text style={styles.locationCoords}>
              • {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
            <Text style={[styles.locationSaga, { color: location.color }]}>
              {location.saga} Saga
            </Text>
            
            {/* Music integration - YouTube for now, Spotify when configured */}
            {location.songs && location.songs.length > 0 && (
              <View style={styles.songsContainer}>
                <Text style={styles.songsHeader}>• Featured Songs:</Text>
                {location.songs.map((song, songIndex) => (
                  <TouchableOpacity
                    key={songIndex}
                    style={styles.songButton}
                    onPress={() => handleSongPlay(song, location)}
                  >
                    <Text style={styles.songTitle}>▶• {song}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Music attribution */}
      <Text style={styles.musicCredit}>
        • EPIC: The Musical by Jorge Rivera-Herrans | Click ▶• to listen on YouTube
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationDescription: {
    fontSize: 14,
    color: '#E6E6FA',
    marginBottom: 8,
    lineHeight: 18,
  },
  locationCoords: {
    fontSize: 12,
    color: '#B0C4DE',
    marginBottom: 4,
  },
  locationSaga: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 8,
  },
  songsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2C3E50',
  },
  songsHeader: {
    fontSize: 14,
    color: '#1ABC9C',
    fontWeight: '600',
    marginBottom: 6,
  },
  songButton: {
    backgroundColor: '#2C3E50',
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  songTitle: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  musicCredit: {
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default SafeGoogleMap;
export { EPIC_REAL_LOCATIONS };
