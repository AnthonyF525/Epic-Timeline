import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import EpicJourneyMap from '../components/Maps/EpicJourneyMap';
import SafeGoogleMap from '../components/Maps/SafeGoogleMap';
import SagaInfoPanel from '../components/UI/SagaInfoPanel';
import { SagaService } from '../services';
import { Saga } from '../types';
import { EPIC_SAGAS } from '../components/UI/SagaInfoPanel';
import { realSpotifyService } from '../services/RealSpotifyService';

const { width: screenWidth } = Dimensions.get('window');

// SVG map integration - stable and working

export const MapScreen: React.FC = () => {
  const [selectedSaga, setSelectedSaga] = useState<string>('');
  const [sagas, setSagas] = useState<Saga[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showJourney, setShowJourney] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Map type toggle for real geographic data
  const [useRealMap, setUseRealMap] = useState(false);
  
  // P2: Saga Info Panel state
  const [showSagaPanel, setShowSagaPanel] = useState(false);
  const [selectedSagaInfo, setSelectedSagaInfo] = useState<any>(null);
  
  // Spotify authentication state
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  const [showSpotifyStatus, setShowSpotifyStatus] = useState(true);

  // Troy Saga data for the info panel
  const troyPageData = {
    id: 'troy',
    name: 'The Troy Saga',
    color: '#FF4500',
    description: 'The beginning of Odysseus\'s epic journey, starting with the fall of Troy and his first moral challenges. After 10 years of war, victory comes at a cost that will haunt the hero forever.',
    theme: 'War, Strategy, and Moral Complexity',
    keyCharacters: ['Odysseus', 'Astyanax', 'Polites', 'Eurylochus'],
    songs: [
      {
        title: 'The Horse and the Infant',
        description: 'Odysseus faces the prophecy about Astyanax and makes a devastating choice.',
        duration: '4:15'
      },
      {
        title: 'Just a Man',
        description: 'Odysseus grapples with the weight of his decisions and their consequences.',
        duration: '4:42'
      },
      {
        title: 'Full Speed Ahead',
        description: 'The crew sets sail from Troy, optimistic about their journey home.',
        duration: '3:38'
      },
      {
        title: 'Open Arms',
        description: 'Polites encourages kindness and trust, contrasting with Odysseus\'s caution.',
        duration: '3:25'
      },
      {
        title: 'Warrior of the Mind',
        description: 'Athena appears to guide Odysseus, revealing their special connection.',
        duration: '4:20'
      }
    ],
    locations: ['Troy', 'Ancient Citadel', 'Trojan Palace'],
    emotionalTone: 'Epic, conflicted, and morally complex',
    musicalStyle: 'Orchestral with modern elements and character themes',
    keyMoments: [
      'The fall of Troy',
      'The infant\'s fate',
      'Departure from Troy',
      'First divine intervention',
      'Setting the moral tone'
    ],
    symbolism: 'Troy represents the cost of victory and the weight of leadership',
    order: 1
  };

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize Spotify service
      await realSpotifyService.initialize();
      
      // Load data
      loadSagas();
      loadLocations();
      await checkSpotifyAuth();
    };

    initializeApp();
  }, []);

  const loadSagas = async () => {
    try {
      const sagaData = await SagaService.getAllSagas();
      // Transform ApiSaga to Saga type for compatibility
      const transformedSagas = sagaData.map(apiSaga => ({
        id: apiSaga.id.toString(), // Convert number to string
        title: apiSaga.title,
        description: apiSaga.description,
        name: apiSaga.title, // Map title to name
        author: 'Jorge Rivera-Herrans', // Default author for EPIC
        period: 'Modern Musical Theatre', // Default period
        releaseDate: apiSaga.releaseDate,
        episodeCount: apiSaga.episodeCount,
        genres: apiSaga.genres,
        themes: apiSaga.themes,
        inspirations: apiSaga.inspirations,
        albumArtUrl: apiSaga.albumArtUrl,
        youtubePlaylistUrl: apiSaga.youtubePlaylistUrl,
        totalDurationSeconds: apiSaga.totalDurationSeconds
      }));
      setSagas(transformedSagas);
    } catch (error) {
      console.error('Error loading sagas:', error);
      Alert.alert('Error', 'Failed to load Epic Timeline sagas');
    }
  };

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading locations...');
      
      // Use static location data for stability
      const locations = [
        {
          id: 'troy',
          name: 'Troy',
          latitude: 39.9570,
          longitude: 26.2390,
          saga: 'Troy'
        },
        {
          id: 'ithaca',
          name: 'Ithaca',
          latitude: 38.4419,
          longitude: 20.6611,
          saga: 'Ithaca'
        }
      ];

      setLocations(locations);
      console.log('Locations loaded:', locations.length);
    } catch (err) {
      console.error('Failed to load locations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load locations');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const checkSpotifyAuth = async () => {
    const authenticated = realSpotifyService.isAuthenticated();
    setIsSpotifyAuthenticated(authenticated);
    console.log('Spotify authentication status:', authenticated);
    
    // Handle auth callback if present
    if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
      const success = await realSpotifyService.handleAuthCallback();
      if (success) {
        setIsSpotifyAuthenticated(true);
        Alert.alert('Spotify Connected!', 'You can now play real 30-second previews from Epic: The Musical!');
      }
    }
  };

  const handleSpotifyConnect = async () => {
    try {
      console.log('Spotify connect clicked');
      console.log('Service status:', realSpotifyService.getAuthStatus());
      console.log('Is configured?', realSpotifyService.isConfigured());
      console.log('Is authenticated?', realSpotifyService.isAuthenticated());
      
      // Always proceed with auth flow if not already authenticated
      if (realSpotifyService.isAuthenticated()) {
        console.log('Already authenticated');
        Alert.alert('Already Connected', 'Spotify is already connected! You can play real Epic: The Musical previews.');
        return;
      }

      if (!realSpotifyService.isConfigured()) {
        console.log('Spotify not configured');
        Alert.alert(
          'Epic: The Musical Setup',
          'Spotify needs to be configured to play real Epic songs!\n\nPlease check your configuration and try again.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Proceed directly with authentication
      await proceedWithAuth();
    } catch (error) {
      console.error('Spotify auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert('Connection Error', `Failed to connect to Spotify: ${errorMessage}`);
    }
  };

  const proceedWithAuth = async () => {
    try {
      console.log('Starting Spotify authentication flow');
      console.log('Getting auth URL...');
      
      // Prevent any default behavior that might cause page refresh
      if (typeof event !== 'undefined' && event.preventDefault) {
        event.preventDefault();
      }
      
      const authUrl = realSpotifyService.getAuthUrl();
      console.log('Auth URL generated:', authUrl.substring(0, 100) + '...');
      
      if (typeof window !== 'undefined') {
        // Web browser auth
        console.log('Attempting to open auth popup...');
        
        // Try multiple popup opening strategies
        let authWindow = null;
        
        try {
          // Strategy 1: Standard popup
          authWindow = window.open(
            authUrl, 
            'spotify-auth', 
            'width=600,height=700,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no'
          );
          
          console.log('Popup attempt 1:', authWindow ? 'Success' : 'Failed');
          
          // If popup failed, try different approach
          if (!authWindow) {
            console.log('Trying alternative popup method...');
            authWindow = window.open('', 'spotify-auth', 'width=600,height=700');
            if (authWindow) {
              authWindow.location.href = authUrl;
              console.log('Popup attempt 2: Success with delayed navigation');
            }
          }
          
        } catch (popupError) {
          console.error('Popup error:', popupError);
        }
        
        if (!authWindow || authWindow.closed) {
          console.log('All popup attempts failed - likely blocked');
          Alert.alert(
            'Popup Blocked', 
            'Your browser blocked the Spotify popup. Please:\n\n1. Allow popups for this site, OR\n2. Copy the URL below and open it in a new tab',
            [
              { text: 'Copy Auth URL', onPress: () => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(authUrl);
                  Alert.alert('URL Copied', 'Paste it in a new tab to authenticate with Spotify.');
                } else {
                  console.log('Auth URL for manual copy:', authUrl);
                  Alert.alert('Copy this URL:', authUrl);
                }
              }},
              { text: 'Try Same Window', onPress: () => {
                console.log('Opening auth in same window');
                window.location.href = authUrl;
              }}
            ]
          );
          return;
        }
        
        console.log('Auth window opened successfully');
        
        // Check auth status periodically
        let checkCount = 0;
        const checkAuth = setInterval(async () => {
          checkCount++;
          console.log(`Checking auth status (${checkCount}/30)...`);
          
          try {
            // Check if window is closed
            if (authWindow.closed) {
              console.log('Auth window closed by user');
              clearInterval(checkAuth);
              
              // Give a moment for any final processing
              setTimeout(async () => {
                await checkSpotifyAuth();
                if (realSpotifyService.isAuthenticated()) {
                  console.log('Auth detected after window close!');
                  Alert.alert('Success!', 'Spotify connected! Now you can play real Epic: The Musical previews!');
                }
              }, 1000);
              return;
            }
            
            // Check if we got authenticated
            if (realSpotifyService.isAuthenticated()) {
              console.log('Authentication successful!');
              setIsSpotifyAuthenticated(true);
              clearInterval(checkAuth);
              authWindow.close();
              Alert.alert('Success!', 'Spotify connected! Now you can play real Epic: The Musical previews!');
              return;
            }
          } catch (error) {
            console.log('Auth check error:', error);
          }
          
          // Stop checking after 30 seconds
          if (checkCount >= 30) {
            console.log('Auth check timeout');
            clearInterval(checkAuth);
            Alert.alert('Timeout', 'Authentication timed out. Please try again.');
          }
        }, 1000);
      } else {
        // Mobile - open in external browser
        console.log('Opening auth in external browser');
        await Linking.openURL(authUrl);
      }
    } catch (error) {
      console.error('Spotify auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert('Connection Error', `Failed to connect to Spotify: ${errorMessage}`);
    }
  };

  const handleSagaFilter = (sagaId: string) => {
    setSelectedSaga(sagaId);
    // TODO: Implement saga filtering when backend supports it
    console.log('Filtering by saga:', sagaId);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    
    // P2: Check if this is Troy and show the Troy Saga info panel
    const isTroy = location.name.toLowerCase().includes('troy');
    
    if (isTroy) {
      console.log('Troy hotspot tapped - showing Troy Saga panel');
      setSelectedSagaInfo(troyPageData);
      setShowSagaPanel(true);
    } else {
      // For other locations, show the standard alert
      Alert.alert(
        `${location.name}`,
        `${location.description}\n\n${location.significance}`,
        [{ text: 'Explore More', style: 'default' }]
      );
    }
  };

  // P2: Saga panel handlers
  const handleCloseSagaPanel = () => {
    setShowSagaPanel(false);
    setSelectedSagaInfo(null);
  };

  const handleSagaSelect = (sagaId: string) => {
    console.log('Selected saga:', sagaId);
    // TODO: Navigate to specific saga if needed
  };

  const handleSagaSelection = (saga: any) => {
    console.log('Saga selected:', saga.name);
    setSelectedSagaInfo(saga);
    setShowSagaPanel(true);
    // Extract saga name without "Saga" suffix to match location data
    const sagaName = saga.name.replace(' Saga', '');
    setSelectedSaga(sagaName);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Loading Epic Timeline Map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e', padding: 20 }}>
        <Text style={{ color: '#ff6b6b', fontSize: 18, marginBottom: 10 }}>Error Loading Map</Text>
        <Text style={{ color: '#fff', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.appTitle}> Epic Timeline Interactive Map</Text>
        <Text style={styles.appSubtitle}>
          Odysseus's Journey
        </Text>
      </View>
      
      <View style={styles.mainContent}>
        
        {/* Left Sidebar - Saga Selection */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Select Your Saga</Text>
          </View>
          <ScrollView style={styles.sagaList} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.sagaItem, !selectedSagaInfo && styles.sagaItemActive]}
              onPress={() => {
                setSelectedSagaInfo(null);
                setShowSagaPanel(false);
                setSelectedSaga('');
              }}
            >
              <Text style={[styles.sagaText, !selectedSagaInfo && styles.sagaTextActive]}>
                All Sagas
              </Text>
            </TouchableOpacity>
            
            {EPIC_SAGAS.map((saga) => (
              <TouchableOpacity
                key={saga.id}
                style={[
                  styles.sagaItem,
                  selectedSagaInfo?.id === saga.id && styles.sagaItemActive,
                  { borderLeftColor: saga.color }
                ]}
                onPress={() => handleSagaSelection(saga)}
              >
                <Text style={[
                  styles.sagaText,
                  selectedSagaInfo?.id === saga.id && styles.sagaTextActive
                ]}>
                  {saga.name}
                </Text>
                <View style={[styles.sagaIndicator, { backgroundColor: saga.color }]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Current Progress indicator */}
          {selectedSagaInfo && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>Current: {selectedSagaInfo.name}</Text>
              <Text style={styles.progressSubtitle}>Progress: 1/3 locations</Text>
            </View>
          )}
        </View>
        
        {/* Center Map */}
        <View style={styles.mapWrapper}>
          {/* Always-visible Spotify Status Bar */}
          {showSpotifyStatus && (
            <View style={styles.spotifyStatusBar}>
              <TouchableOpacity
                style={[
                  styles.spotifyButton,
                  isSpotifyAuthenticated ? styles.spotifyConnected : styles.spotifyDisconnected
                ]}
                onPress={() => {
                  console.log('Spotify button pressed!');
                  try {
                    if (isSpotifyAuthenticated) {
                      console.log('Already authenticated, showing status');
                      Alert.alert('Spotify Connected', 'You can now play real Epic: The Musical previews!');
                    } else {
                      console.log('Not authenticated, starting auth flow');
                      handleSpotifyConnect();
                    }
                  } catch (error) {
                    console.error('Button press error:', error);
                    Alert.alert('Error', 'Failed to process Spotify action');
                  }
                }}
              >
                <Text style={styles.spotifyButtonText}>
                  {isSpotifyAuthenticated ? 'Epic Songs Available!' : 'Get Real Epic Songs'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => setShowSpotifyStatus(false)}
              >
                <Text style={styles.dismissText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Mediterranean Sea - Odysseus's Journey</Text>
            <View style={styles.mapControls}>
              <TouchableOpacity
                style={[styles.mapToggleButton, useRealMap && styles.mapToggleActive]}
                onPress={() => setUseRealMap(true)}
              >
                <Text style={[styles.mapToggleText, useRealMap && styles.mapToggleTextActive]}>
                  Real Mediterranean
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mapToggleButton, !useRealMap && styles.mapToggleActive]}
                onPress={() => setUseRealMap(false)}
              >
                <Text style={[styles.mapToggleText, !useRealMap && styles.mapToggleTextActive]}>
                  Artistic Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {useRealMap ? (
            <SafeGoogleMap
              selectedSaga={selectedSaga}
              showJourneyPath={showJourney}
              onLocationSelect={(mapLocation) => {
                console.log('Real location selected:', mapLocation);
              }}
            />
          ) : (
            <EpicJourneyMap
              selectedSaga={selectedSaga}
              showJourneyPath={showJourney}
              onLocationSelect={(mapLocation) => {
                console.log('Location selected:', mapLocation);
              }}
            />
          )}
        </View>
        
        {/* Right Info Panel - SagaInfoPanel */}
        <SagaInfoPanel
          saga={selectedSagaInfo}
          isVisible={showSagaPanel}
          onClose={handleCloseSagaPanel}
          onSagaSelect={(saga) => handleSagaSelection(saga)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  // Top Header Styles
  topHeader: {
    backgroundColor: '#16213e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#B0C4DE',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  // Left Sidebar Styles
  sidebar: {
    width: screenWidth * 0.25, // 25% of screen width
    backgroundColor: '#16213e',
    borderRightWidth: 1,
    borderRightColor: '#4A90E2',
  },
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
    backgroundColor: '#1a1a2e',
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  sagaList: {
    flex: 1,
  },
  sagaItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sagaItemActive: {
    backgroundColor: '#2a2a4e',
    borderLeftColor: '#4A90E2',
  },
  sagaText: {
    fontSize: 14,
    color: '#B0C4DE',
    fontWeight: '500',
    flex: 1,
  },
  sagaTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sagaIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#4A90E2',
  },
  progressTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 11,
    color: '#B0C4DE',
  },
  // Center Map Styles
  mapWrapper: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  mapHeader: {
    padding: 12,
    backgroundColor: '#16213e',
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  mapControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  mapToggleButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  mapToggleActive: {
    backgroundColor: '#4A90E2',
  },
  mapToggleText: {
    color: '#B0C4DE',
    fontSize: 10,
    fontWeight: '600',
  },
  mapToggleTextActive: {
    color: '#ffffff',
  },
  // Spotify Button Styles
  spotifyStatusBar: {
    backgroundColor: 'rgba(45, 55, 72, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
  },
  spotifyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    marginRight: 8,
  },
  spotifyConnected: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  spotifyDisconnected: {
    backgroundColor: '#2C3E50',
    borderColor: '#4A90E2',
  },
  spotifyButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
  dismissButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dismissText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  // Legacy styles (kept for compatibility)
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  toggleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2d3748',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#4A90E2',
  },
  toggleText: {
    color: '#B0C4DE',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  infoPanel: {
    backgroundColor: '#16213e',
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#4A90E2',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoSaga: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default MapScreen;