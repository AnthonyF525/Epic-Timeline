import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import SagaInfoPanel, { EPIC_SAGAS, SagaInfo } from '../components/UI/SagaInfoPanel';
import { ErrorDisplay, ErrorBanner, LoadingWithRetry } from '../components/UI/ErrorDisplay';
import { LocationService, ApiLocation } from '../services/LocationService';
import { SagaService, ApiSaga, API_BASE_URL, SagaDisplayInfo } from '../services/SagaService';
import ApiRetryService, { ApiErrorBoundary } from '../utils/apiRetry';
import CacheStatusIndicator from '../components/Debug/CacheStatusIndicator';

// Define basic types
interface EpicLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance?: string;
  songs?: string[];
}

interface SVGLocation {
  id: string;
  name: string;
  saga: string;
  x: number;
  y: number;
  color: string;
  songs: string[];
  state: 'locked' | 'current' | 'visited';
  order: number;
}

// Saga data and colors - Updated to use dynamic colors from API data
const getSAGAS = (dynamicColors: { [key: string]: string }) => [
  { name: 'All Sagas', color: '#4A90E2' },
  ...EPIC_SAGAS.map(saga => ({
    name: saga.name,
    color: dynamicColors[saga.name] || saga.color // Use dynamic color if available, fallback to static
  }))
];

// Mediterranean coastline path
const MEDITERRANEAN_COASTLINE = "M50,300 Q200,250 350,280 Q500,260 650,300 Q650,200 500,180 Q350,160 200,180 Q50,200 50,300 Z";

// Convert backend locations to SVG positions with progression states
const convertToSVGLocations = (locations: EpicLocation[], currentProgressIndex: number = 0, dynamicColors: { [key: string]: string } = {}): SVGLocation[] => {
  const svgPositions = [
    { x: 580, y: 180 },  // Troy (eastern Mediterranean)
    { x: 460, y: 220 },  // Ithaca
    { x: 380, y: 300 },  // Underworld
  ];

  return locations.map((location, index) => {
    const getLocationState = (index: number): 'locked' | 'current' | 'visited' => {
      if (index < currentProgressIndex) return 'visited';
      if (index === currentProgressIndex) return 'current';
      return 'locked';
    };

    // Get color from dynamic saga colors based on location's saga
    const getSagaColorForLocation = (location: EpicLocation): string => {
      // Try to match with dynamic colors first
      if (location.saga && dynamicColors[location.saga]) {
        return dynamicColors[location.saga];
      }
      
      // Fallback to location-specific colors
      if (location.name.toLowerCase().includes('troy')) {
        return dynamicColors['The Troy Saga'] || '#CD853F';
      }
      
      // Default fallback
      return '#ff6b6b';
    };

    return {
      id: location.id,
      name: location.name,
      saga: location.saga,
      x: svgPositions[index % svgPositions.length].x,
      y: svgPositions[index % svgPositions.length].y,
      color: getSagaColorForLocation(location),
      songs: location.songs || [],
      state: getLocationState(index),
      order: index + 1
    };
  });
};

// Enhanced SVG Mediterranean Map Component with Animations and Loading States
const SVGMediterraneanMap: React.FC<{
  locations: SVGLocation[];
  selectedLocationId: string | null;
  onLocationPress: (locationId: string) => void;
  showJourney: boolean;
  loadingHotspotId: string | null;
}> = ({ locations, selectedLocationId, onLocationPress, showJourney, loadingHotspotId }) => {
  const screenWidth = Dimensions.get('window').width;
  const mapWidth = Math.min(screenWidth - 40, 700);
  const mapHeight = mapWidth * 0.6;
  
  // Pulsing animation for selected hotspot
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (selectedLocationId) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [selectedLocationId, pulseAnim]);

  return (
    <View style={{ alignItems: 'center', marginVertical: 15 }}>
      <Svg width={mapWidth} height={mapHeight} viewBox="0 0 700 400">
        <Defs>
          {/* Gradients for enhanced visuals */}
          <RadialGradient id="seaGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#1E90FF" stopOpacity={0.3} />
            <Stop offset="100%" stopColor="#4A90E2" stopOpacity={0.1} />
          </RadialGradient>
          <RadialGradient id="troyGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFD700" stopOpacity={0.8} />
            <Stop offset="100%" stopColor="#CD853F" stopOpacity={0.3} />
          </RadialGradient>
          <RadialGradient id="currentGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFD700" stopOpacity={0.9} />
            <Stop offset="50%" stopColor="#FFA500" stopOpacity={0.6} />
            <Stop offset="100%" stopColor="#FF4500" stopOpacity={0.2} />
          </RadialGradient>
          <RadialGradient id="loadingGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FFA500" stopOpacity={0.9} />
            <Stop offset="50%" stopColor="#FF8C00" stopOpacity={0.6} />
            <Stop offset="100%" stopColor="#FF6347" stopOpacity={0.3} />
          </RadialGradient>
        </Defs>

        {/* Enhanced Mediterranean Sea Background */}
        <Path
          d={MEDITERRANEAN_COASTLINE}
          fill="url(#seaGradient)"
          stroke="#4A90E2"
          strokeWidth={2}
        />

        {/* Animated Journey Path Lines */}
        {showJourney && locations.map((location, index) => {
          const nextLocation = locations[index + 1];
          if (!nextLocation) return null;
          
          return (
            <Line
              key={`path-${index}`}
              x1={location.x}
              y1={location.y}
              x2={nextLocation.x}
              y2={nextLocation.y}
              stroke="#FFD700"
              strokeWidth={3}
              strokeDasharray="10,5"
              opacity={0.8}
            />
          );
        })}

        {/* Enhanced Location Hotspots with States and Loading */}
        {locations.map((location) => {
          const isTroy = location.name.toLowerCase().includes('troy');
          const isSelected = selectedLocationId === location.id;
          const isUnderworld = location.name.toLowerCase().includes('underworld');
          const isLoading = loadingHotspotId === location.id;
          
          // State-based styling
          const getStateColor = () => {
            if (isLoading) return '#FFA500'; // Orange for loading
            switch (location.state) {
              case 'visited':
                return isTroy ? '#32CD32' : '#90EE90'; // Green for visited
              case 'current':
                return isTroy ? '#CD853F' : '#FFD700'; // Gold for current
              case 'locked':
                return '#696969'; // Gray for locked
              default:
                return location.color;
            }
          };

          const getStateBorder = () => {
            if (isLoading) return '#FF8C00';
            switch (location.state) {
              case 'visited':
                return '#32CD32';
              case 'current':
                return '#FFD700';
              case 'locked':
                return '#808080';
              default:
                return '#ffffff';
            }
          };

          const getStateOpacity = () => {
            if (isLoading) return 0.8;
            return location.state === 'locked' ? 0.5 : 0.95;
          };

          const isClickable = location.state !== 'locked' && !isLoading;
          
          return (
            <React.Fragment key={location.id}>
              {/* State-based outer glow */}
              {(isTroy || isUnderworld || location.state === 'current' || isLoading) && (
                <Circle
                  cx={location.x}
                  cy={location.y}
                  r={isLoading ? 35 : location.state === 'current' ? 30 : 25}
                  fill={
                    isLoading 
                      ? "url(#loadingGlow)"
                      : location.state === 'current' 
                        ? "url(#currentGlow)" 
                        : isTroy 
                          ? "url(#troyGlow)" 
                          : "#2F4F4F"
                  }
                  opacity={isLoading ? 0.6 : location.state === 'current' ? 0.4 : 0.3}
                />
              )}
              
              {/* Loading spinner ring */}
              {isLoading && (
                <Circle
                  cx={location.x}
                  cy={location.y}
                  r={isTroy ? 26 : 22}
                  fill="none"
                  stroke="#FFA500"
                  strokeWidth={2}
                  strokeDasharray="12,8"
                  opacity={0.9}
                >
                  {/* Note: SVG animations would require additional setup */}
                </Circle>
              )}
              
              {/* State progress ring for current location */}
              {location.state === 'current' && !isLoading && (
                <Circle
                  cx={location.x}
                  cy={location.y}
                  r={isTroy ? 24 : 20}
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth={3}
                  strokeDasharray="8,4"
                  opacity={0.8}
                />
              )}
              
              {/* Main Hotspot Circle */}
              <Circle
                cx={location.x}
                cy={location.y}
                r={isTroy ? 18 : isUnderworld ? 15 : 12}
                fill={getStateColor()}
                stroke={getStateBorder()}
                strokeWidth={isSelected ? 4 : isLoading ? 3 : 2}
                opacity={getStateOpacity()}
                onPress={isClickable ? () => onLocationPress(location.id) : undefined}
              />
              
              {/* Selection pulse effect */}
              {isSelected && isClickable && (
                <Circle
                  cx={location.x}
                  cy={location.y}
                  r={isTroy ? 22 : 16}
                  fill="none"
                  stroke="#4A90E2"
                  strokeWidth={3}
                  opacity={0.6}
                />
              )}

              {/* State indicators */}
              {isLoading && (
                <SvgText
                  x={location.x}
                  y={location.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#FFA500"
                  fontWeight="bold"
                >
                  •
                </SvgText>
              )}
              
              {!isLoading && location.state === 'visited' && (
                <SvgText
                  x={location.x}
                  y={location.y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#32CD32"
                  fontWeight="bold"
                >
                  •
                </SvgText>
              )}
              
              {!isLoading && location.state === 'locked' && (
                <SvgText
                  x={location.x}
                  y={location.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#808080"
                >
                  •
                </SvgText>
              )}
              
              {/* Order number for progression */}
              <SvgText
                x={location.x + 15}
                y={location.y - 15}
                textAnchor="middle"
                fontSize="10"
                fill={location.state === 'locked' ? '#808080' : '#FFD700'}
                fontWeight="bold"
                stroke="#000000"
                strokeWidth="0.5"
              >
                {location.order}
              </SvgText>
              
              {/* Location Label with enhanced styling */}
              <SvgText
                x={location.x}
                y={location.y - 30}
                textAnchor="middle"
                fontSize={isTroy ? "16" : isUnderworld ? "14" : "12"}
                fill={location.state === 'locked' ? '#A0A0A0' : '#ffffff'}
                fontWeight={isTroy ? "bold" : "600"}
                stroke="#000000"
                strokeWidth="1"
                onPress={isClickable ? () => onLocationPress(location.id) : undefined}
              >
                {isTroy ? `◦  ${location.name}` : isUnderworld ? `• ${location.name}` : location.name}
              </SvgText>

              {/* Special symbols for important locations */}
              {isTroy && location.state !== 'locked' && (
                <SvgText
                  x={location.x}
                  y={location.y + 8}
                  textAnchor="middle"
                  fontSize="16"
                  fill="#FFD700"
                  onPress={isClickable ? () => onLocationPress(location.id) : undefined}
                >
                  ◦ 
                </SvgText>
              )}
              
              {isUnderworld && location.state !== 'locked' && (
                <SvgText
                  x={location.x}
                  y={location.y + 6}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#8A2BE2"
                  onPress={isClickable ? () => onLocationPress(location.id) : undefined}
                >
                  •
                </SvgText>
              )}
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

// Simple map component with SVG and saga navigation
const BasicEpicMap = () => {
  const [locations, setLocations] = useState<EpicLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<EpicLocation | null>(null);
  const [selectedSaga, setSelectedSaga] = useState('All Sagas');
  const [showJourney, setShowJourney] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progressIndex, setProgressIndex] = useState(0); // Track journey progress
  const [loadingHotspotId, setLoadingHotspotId] = useState<string | null>(null); // Track loading hotspot
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    message: string;
    type: 'network' | 'server' | 'timeout' | 'parse' | 'unknown';
    retryable: boolean;
    statusCode?: number;
    lastAttempt?: Date;
    attemptCount?: number;
  }>({ 
    hasError: false, 
    message: '', 
    type: 'unknown',
    retryable: false,
    attemptCount: 0
  });
  
  // SagaInfoPanel state
  const [selectedSagaInfo, setSelectedSagaInfo] = useState<SagaInfo | null>(null);
  const [showSagaPanel, setShowSagaPanel] = useState(false);
  const [panelAnimationType, setPanelAnimationType] = useState<'slide-right' | 'slide-up' | 'slide-down' | 'slide-left'>('slide-right');
  
  // Troy Saga backend data state
  const [troySagaData, setTroySagaData] = useState<ApiSaga | null>(null);
  const [troySagaDisplayInfo, setTroySagaDisplayInfo] = useState<SagaDisplayInfo | null>(null);
  const [allSagasData, setAllSagasData] = useState<ApiSaga[]>([]);
  const [dynamicSagaColors, setDynamicSagaColors] = useState<{ [key: string]: string }>({});
  const [enhancedSagas, setEnhancedSagas] = useState<SagaInfo[]>(EPIC_SAGAS);
  const [isLoadingSaga, setIsLoadingSaga] = useState(false);
  const [sagaError, setSagaError] = useState<string | null>(null);
  const [showSagaDetails, setShowSagaDetails] = useState(false);
  
  // Animation for details panel
  const detailsScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchLocations();
    fetchTroySagaData(); // Fetch Troy Saga data when component mounts
    fetchAllSagas(); // Fetch all sagas data when component mounts
  }, []);
  
  useEffect(() => {
    if (selectedLocation) {
      Animated.spring(detailsScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      detailsScale.setValue(0);
    }
  }, [selectedLocation, detailsScale]);

  // Debug logging for state tracking
  useEffect(() => {
    console.log('• Debug - State update:', {
      isLoading,
      errorState,
      loadingHotspotId,
      locationsCount: locations.length,
      selectedLocation: selectedLocation?.name
    });
  }, [isLoading, errorState, loadingHotspotId, locations.length, selectedLocation]);

  const fetchLocations = async () => {
    try {
      setErrorState({ 
        hasError: false, 
        message: '', 
        type: 'unknown',
        retryable: false,
        attemptCount: 0
      });
      setIsLoading(true);
      
      console.log('• Starting location fetch...');
      
      // First check if backend is healthy
      const isHealthy = await LocationService.checkApiHealth();
      if (!isHealthy) {
        console.log('◦  Backend health check failed, proceeding with fallback');
      }
      
      const apiLocations = await LocationService.getAllLocations();
      const transformedLocations = apiLocations.map((loc: ApiLocation) => ({
        id: loc.id.toString(),
        name: loc.name,
        latitude: loc.latitude || 0,
        longitude: loc.longitude || 0,
        description: loc.description,
        saga: loc.saga || 'Troy Saga',
        significance: loc.significance,
        songs: loc.songs || ['Horse and the Infant', 'Just a Man']
      }));
      
      setLocations(transformedLocations);
      console.log('• Loaded locations:', transformedLocations.length);
      
      // If we're using fallback data, show a warning (but only if locations are actually empty)
      if (!isHealthy && transformedLocations.length === 0) {
        setErrorState({ 
          hasError: true, 
          message: 'Backend unavailable. Using offline data. Some features may be limited.', 
          type: 'network',
          retryable: true,
          lastAttempt: new Date(),
          attemptCount: 1
        });
      } else if (!isHealthy) {
        // Backend health check failed but we got data - just log it
        console.log('◦  Backend health check failed but data loaded successfully');
      }
      
    } catch (error) {
      console.error('✗ Critical error loading locations:', error);
      setErrorState({ 
        hasError: true, 
        message: 'Failed to load locations. Please check your connection and try again.', 
        type: 'network',
        retryable: true,
        lastAttempt: new Date(),
        attemptCount: 1
      });
      
      // Emergency fallback
      setLocations([
        {
          id: '1',
          name: 'Troy',
          latitude: 39.957,
          longitude: 26.239,
          description: 'Ancient fortified city, site of the legendary Trojan War.',
          saga: 'Troy Saga',
          significance: 'Starting point of Odysseus\'s journey',
          songs: ['Horse and the Infant', 'Just a Man', 'Full Speed Ahead']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Troy Saga data from backend API
  const fetchTroySagaData = async () => {
    try {
      setIsLoadingSaga(true);
      setSagaError(null);
      
      console.log('• Fetching Troy Saga data from backend...');
      console.log('• Backend URL:', `${API_BASE_URL}/api/sagas`);
      
      // First try to get Troy Saga by title
      let troySaga = await SagaService.getSagaByTitle('The Troy Saga');
      
      // If not found by title, try by ID (assuming Troy Saga has ID 1)
      if (!troySaga) {
        console.log('• Troy Saga not found by title, trying by ID...');
        troySaga = await SagaService.getSagaById(1);
      }
      
      if (troySaga) {
        setTroySagaData(troySaga);
        
        // Format saga display information
        const displayInfo = SagaService.formatSagaDisplayInfo(troySaga);
        setTroySagaDisplayInfo(displayInfo);
        
        console.log('• Troy Saga data loaded successfully:', troySaga.title);
        console.log('• Troy Saga data details:', {
          title: troySaga.title,
          description: troySaga.description,
          releaseDate: troySaga.releaseDate,
          releaseStatus: displayInfo.releaseStatus,
          episodeCount: troySaga.episodeCount,
          duration: displayInfo.duration,
          themes: troySaga.themes,
          genres: troySaga.genres
        });
        
        // Convert to SagaInfo format and update the EPIC_SAGAS array if needed
        const troySagaInfo = SagaService.convertApiSagaToSagaInfo(troySaga);
        
        console.log('• Converted Troy Saga to SagaInfo format:', troySagaInfo);
        
        // Update the Troy Saga in EPIC_SAGAS with backend data
        const updatedSagas = EPIC_SAGAS.map(saga => {
          if (saga.id === 'troy' || saga.name === 'The Troy Saga') {
            return {
              ...saga,
              ...troySagaInfo,
              // Preserve any frontend-specific fields
              keyCharacters: saga.keyCharacters,
              songs: saga.songs,
              locations: saga.locations,
              keyMoments: saga.keyMoments
            };
          }
          return saga;
        });
        
        console.log('• Updated Troy Saga with backend data');
      } else {
        console.log('◦  No Troy Saga data found in backend, using fallback');
        setSagaError('Troy Saga data not available from backend');
      }
      
    } catch (error) {
      console.error('✗ Error fetching Troy Saga data:', error);
      console.error('✗ Error details:', {
        name: (error as Error)?.name || 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      setSagaError(`Failed to load Troy Saga data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingSaga(false);
    }
  };

  // Fetch all sagas data from backend API
  const fetchAllSagas = async () => {
    try {
      console.log('• Fetching all sagas data from backend...');
      
      const allSagas = await SagaService.getAllSagas();
      
      if (allSagas && allSagas.length > 0) {
        setAllSagasData(allSagas);
        
        // Generate dynamic colors based on API data
        const colorMap: { [key: string]: string } = {};
        allSagas.forEach(saga => {
          const sagaColor = SagaService.getSagaColor(saga);
          colorMap[saga.title] = sagaColor;
          console.log(`• ${saga.title}: ${sagaColor} (based on themes: ${saga.themes.join(', ')})`);
        });
        setDynamicSagaColors(colorMap);
        
        // Update enhanced sagas with dynamic colors and backend data
        const updatedEnhancedSagas = EPIC_SAGAS.map(saga => {
          // Find matching backend saga
          const backendSaga = allSagas.find(apiSaga => 
            apiSaga.title === saga.name || 
            apiSaga.title.toLowerCase() === saga.name.toLowerCase()
          );
          
          if (backendSaga) {
            // Merge backend data with frontend saga info
            const backendSagaInfo = SagaService.convertApiSagaToSagaInfo(backendSaga);
            return {
              ...saga,
              ...backendSagaInfo,
              color: colorMap[backendSaga.title] || saga.color,
              // Preserve important frontend-specific fields
              keyCharacters: saga.keyCharacters,
              songs: saga.songs,
              locations: saga.locations,
              keyMoments: saga.keyMoments,
              symbolism: saga.symbolism
            };
          } else {
            // Use dynamic color if available, fallback to original
            return {
              ...saga,
              color: colorMap[saga.name] || saga.color
            };
          }
        });
        
        setEnhancedSagas(updatedEnhancedSagas);
        
        console.log('• All sagas data loaded successfully:', allSagas.length, 'sagas');
        console.log('• Dynamic colors generated:', colorMap);
        console.log('• Enhanced sagas updated with backend data and dynamic colors');
        
        // Log release status for each saga
        allSagas.forEach(saga => {
          const displayInfo = SagaService.formatSagaDisplayInfo(saga);
          console.log(`• ${displayInfo.name}: ${SagaService.getReleaseStatusDisplay(displayInfo.releaseStatus)}`);
        });
      } else {
        console.log('◦  No sagas data found in backend');
      }
      
    } catch (error) {
      console.error('✗ Error fetching all sagas data:', error);
    }
  };

  // Handle hotspot press with enhanced loading and error states
  const handleHotspotPress = async (locationId: string) => {
    try {
      setLoadingHotspotId(locationId);
      setErrorState({ 
        hasError: false, 
        message: '', 
        type: 'unknown',
        retryable: false,
        attemptCount: 0
      });
      
      console.log(`• Loading details for location: ${locationId}`);
      
      // Try to get detailed location data from the service
      const detailedLocation = await LocationService.getLocationById(locationId);
      
      if (detailedLocation) {
        // Use API data if available
        const location: EpicLocation = {
          id: detailedLocation.id.toString(),
          name: detailedLocation.name,
          latitude: detailedLocation.latitude,
          longitude: detailedLocation.longitude,
          description: detailedLocation.description,
          saga: detailedLocation.saga,
          significance: detailedLocation.significance,
          songs: detailedLocation.songs || []
        };
        setSelectedLocation(location);
        console.log('• Location details loaded from API:', location.name);
      } else {
        // Fallback to cached location data
        const location = locations.find(loc => loc.id === locationId);
        if (location) {
          setSelectedLocation(location);
          console.log('• Location details loaded from cache:', location.name);
        }
      }
      
    } catch (error) {
      console.error('✗ Error loading location details:', error);
      setErrorState({
        hasError: true,
        message: `Failed to load details for this location. Please try again.`,
        type: 'network',
        retryable: true,
        lastAttempt: new Date(),
        attemptCount: 1
      });
      
      // Still try to show basic info if available
      const basicLocation = locations.find(loc => loc.id === locationId);
      if (basicLocation) {
        setSelectedLocation(basicLocation);
      }
    } finally {
      setLoadingHotspotId(null);
    }
  };

  // Enhanced retry function for error recovery
  const handleRetry = async () => {
    console.log(`• Retrying ${errorState.type} operation...`);
    
    if (errorState.type === 'network') {
      // Retry fetching locations
      await fetchLocations();
    } else {
      // General retry - refresh everything
      setErrorState({ 
        hasError: false, 
        message: '', 
        type: 'unknown',
        retryable: false,
        attemptCount: 0
      });
      setSelectedLocation(null);
      await fetchLocations();
    }
  };

  // SagaInfoPanel handlers
  const handleSagaCardPress = async (sagaName: string) => {
    if (sagaName === 'All Sagas') {
      setSelectedSaga(sagaName);
      return;
    }
    
    // Set loading state when opening panel to show skeletons
    setIsLoadingSaga(true);
    console.log('• Setting loading state for SagaInfoPanel...');
    
    // Find saga in enhanced sagas (which includes backend data and dynamic colors)
    const sagaInfo = enhancedSagas.find(saga => saga.name === sagaName);
    if (sagaInfo) {
      // Check if this is Troy Saga and we have backend data for enhanced description
      if (sagaName === 'The Troy Saga' && troySagaData && troySagaDisplayInfo) {
        console.log('• Using enhanced Troy Saga data for panel');
        
        // Create enhanced description with backend data
        const enhancedSagaInfo: SagaInfo = {
          ...sagaInfo,
          description: `${troySagaDisplayInfo.description}\n\n${SagaService.getReleaseStatusDisplay(troySagaDisplayInfo.releaseStatus)} • Released: ${new Date(troySagaDisplayInfo.releaseDate).toLocaleDateString()}\n• ${troySagaDisplayInfo.episodeCount} episodes • ⏱• ${troySagaDisplayInfo.duration}\n• Themes: ${troySagaDisplayInfo.themes.join(', ')}`
        };
        
        setSelectedSagaInfo(enhancedSagaInfo);
      } else {
        setSelectedSagaInfo(sagaInfo);
      }
      
      setShowSagaPanel(true);
      setSelectedSaga(sagaName);
      
      // Simulate loading delay to show skeletons (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoadingSaga(false);
      console.log('• Loading state cleared, showing saga content');
    }
  };

  const handleSagaSelect = (sagaId: string) => {
    const sagaInfo = enhancedSagas.find(saga => saga.id === sagaId);
    if (sagaInfo) {
      setSelectedSagaInfo(sagaInfo);
      setSelectedSaga(sagaInfo.name);
    }
  };

  const closeSagaPanel = () => {
    setShowSagaPanel(false);
    setSelectedSagaInfo(null);
  };

  if (isLoading) {
    return (
      <View 
        style={styles.container}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel="Loading Epic Timeline Map locations from backend server"
      >
        <Text 
          style={styles.title}
          accessible={true}
          accessibilityRole="header"
        >
          ◦  Epic Timeline Map
        </Text>
        
        <View style={styles.loadingContainer}>
          <Text 
            style={styles.loading}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Currently loading locations from backend, please wait"
          >
            • Connecting to backend...
          </Text>
          
          <Text 
            style={styles.loadingSubtext}
            accessible={true}
            accessibilityRole="text"
          >
            Loading Odysseus's journey locations
          </Text>
          
          <View style={styles.loadingProgress}>
            <Text style={styles.loadingProgressText}>
              • Fetching Troy, Ithaca, and the Underworld...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      accessible={false}
      accessibilityLabel="Epic Timeline Interactive Map Application"
    >
      <Text 
        style={styles.title}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Epic Timeline Interactive Map - Main title"
      >
        ◦  Epic Timeline Interactive Map
      </Text>
      <Text 
        style={styles.subtitle}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Connected to backend with ${locations.length} locations loaded for Odysseus's Journey${troySagaDisplayInfo ? `, Troy Saga live data available - ${SagaService.getReleaseStatusDisplay(troySagaDisplayInfo.releaseStatus)}` : ''}`}
      >
        • Connected: {locations.length} locations loaded • Odysseus's Journey
        {troySagaDisplayInfo && (
          <Text style={{ color: SagaService.getReleaseStatusColor(troySagaDisplayInfo.releaseStatus) }}>
            {' • '}{SagaService.getReleaseStatusDisplay(troySagaDisplayInfo.releaseStatus)}
          </Text>
        )}
        {isLoadingSaga && <Text style={{ color: '#FFB74D' }}> • • Loading Saga...</Text>}
        {sagaError && <Text style={{ color: '#FF6B6B' }}> • • Saga Error</Text>}
      </Text>
      
      {/* Error State Display */}
      {errorState.hasError && (
        <ErrorDisplay
          error={{
            type: errorState.type,
            message: errorState.message,
            retryable: errorState.retryable,
            statusCode: errorState.statusCode,
            lastAttempt: errorState.lastAttempt,
            attemptCount: errorState.attemptCount
          }}
          onRetry={handleRetry}
          onDismiss={() => setErrorState(prev => ({ ...prev, hasError: false }))}
          showRetryButton={errorState.retryable}
          showDismissButton={true}
          maxRetryAttempts={3}
        />
      )}
      
      {/* Troy Saga Information Panel - Enhanced Display */}
      {troySagaData && troySagaDisplayInfo && (
        <View style={styles.sagaInfoPanel}>
          <TouchableOpacity 
            style={styles.sagaInfoHeader}
            onPress={() => setShowSagaDetails(!showSagaDetails)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${showSagaDetails ? 'Collapse' : 'Expand'} Troy Saga details`}
          >
            <Text style={styles.sagaInfoTitle}>• {troySagaDisplayInfo.name}</Text>
            <Text style={styles.expandIcon}>{showSagaDetails ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          
          {/* Release Status - Always Visible */}
          <View style={styles.releaseStatusContainer}>
            <Text style={[
              styles.releaseStatusText,
              { color: SagaService.getReleaseStatusColor(troySagaDisplayInfo.releaseStatus) }
            ]}>
              {SagaService.getReleaseStatusDisplay(troySagaDisplayInfo.releaseStatus)}
            </Text>
            <Text style={styles.releaseDateText}>
              • {new Date(troySagaDisplayInfo.releaseDate).toLocaleDateString()}
            </Text>
          </View>
          
          {/* Expandable Details */}
          {showSagaDetails && (
            <>
              {/* Description */}
              <View style={styles.sagaDescriptionContainer}>
                <Text style={styles.sectionTitle}>• Description</Text>
                <ScrollView style={styles.descriptionScroll} showsVerticalScrollIndicator={false}>
                  <Text style={styles.descriptionText}>
                    {troySagaDisplayInfo.description}
                  </Text>
                </ScrollView>
              </View>
              
              {/* Themes */}
              <View style={styles.sagaThemesContainer}>
                <Text style={styles.sectionTitle}>• Themes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {troySagaDisplayInfo.themes.map((theme, index) => (
                    <View key={index} style={styles.themeTag}>
                      <Text style={styles.themeText}>{theme}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              
              {/* Additional Info */}
              <View style={styles.sagaStatsContainer}>
                <Text style={styles.sectionTitle}>• Details</Text>
                <Text style={styles.debugText}>
                  • {troySagaDisplayInfo.episodeCount} episodes • 
                  ⏱• {troySagaDisplayInfo.duration} • 
                  • {troySagaDisplayInfo.genres.join(', ')}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
      
      {/* Debug button to manually test Troy Saga fetch */}
      {!troySagaData && !isLoadingSaga && (
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={fetchTroySagaData}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Manually fetch Troy Saga data"
        >
          <Text style={styles.debugButtonText}>• Retry Troy Saga Fetch</Text>
        </TouchableOpacity>
      )}
      
      {/* Enhanced Saga Navigation Cards */}
      <View 
        style={styles.sagaContainer}
        accessible={true}
        accessibilityRole="tablist"
        accessibilityLabel="Saga selection tabs"
      >
        <Text 
          style={styles.sagaNavigationTitle}
          accessible={true}
          accessibilityRole="header"
        >
          • Select Your Saga
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sagaScrollContent}
          accessible={false}
          accessibilityLabel="Horizontal scrollable saga list"
        >
          {getSAGAS(dynamicSagaColors).map((saga, index) => (
            <TouchableOpacity
              key={saga.name}
              style={[
                styles.sagaCard,
                { 
                  backgroundColor: selectedSaga === saga.name ? saga.color : 'rgba(44, 62, 80, 0.8)',
                  borderColor: saga.color,
                  shadowColor: saga.color,
                }
              ]}
              onPress={() => handleSagaCardPress(saga.name)}
              accessible={true}
              accessibilityRole="tab"
              accessibilityLabel={`${saga.name} saga`}
              accessibilityHint={
                selectedSaga === saga.name 
                  ? "Currently selected saga. Double tap to view details."
                  : "Tap to select this saga and filter locations."
              }
              accessibilityState={{
                selected: selectedSaga === saga.name
              }}
            >
              <Text style={[
                styles.sagaCardText,
                { color: selectedSaga === saga.name ? '#ffffff' : '#B0C4DE' }
              ]}>
                {saga.name}
              </Text>
              {selectedSaga === saga.name && (
                <Text 
                  style={styles.sagaSelectedIndicator}
                  accessible={false}
                >
                  •
                </Text>
              )}
              {saga.name !== 'All Sagas' && (
                <Text 
                  style={[styles.sagaInfoIcon, { color: saga.color }]}
                  accessible={false}
                >
                  ℹ•
                </Text>
              )}
              {/* Show backend data indicator for Troy Saga */}
              {saga.name === 'The Troy Saga' && (
                <View style={styles.backendStatusContainer}>
                  {isLoadingSaga ? (
                    <Text style={styles.backendStatusText} accessible={false}>•</Text>
                  ) : troySagaDisplayInfo ? (
                    <Text 
                      style={[styles.backendStatusText, { color: SagaService.getReleaseStatusColor(troySagaDisplayInfo.releaseStatus) }]}
                      accessible={true}
                      accessibilityLabel={`${SagaService.getReleaseStatusDisplay(troySagaDisplayInfo.releaseStatus)}`}
                    >
                      {troySagaDisplayInfo.releaseStatus === 'released' ? '•' : 
                       troySagaDisplayInfo.releaseStatus === 'upcoming' ? '•' :
                       troySagaDisplayInfo.releaseStatus === 'in-production' ? '•' : '•'}
                    </Text>
                  ) : sagaError ? (
                    <Text 
                      style={[styles.backendStatusText, { color: '#FF6B6B' }]}
                      accessible={true}
                      accessibilityLabel="Backend data unavailable, using offline data"
                    >
                      •
                    </Text>
                  ) : null}
                </View>
              )}
              
              {/* Show release status for other sagas if we have the data */}
              {saga.name !== 'All Sagas' && saga.name !== 'The Troy Saga' && allSagasData.length > 0 && (() => {
                const sagaData = allSagasData.find(s => s.title === saga.name);
                if (sagaData) {
                  const displayInfo = SagaService.formatSagaDisplayInfo(sagaData);
                  return (
                    <View style={[styles.backendStatusContainer, { top: 25, right: 5 }]}>
                      <Text 
                        style={[styles.backendStatusText, { 
                          color: SagaService.getReleaseStatusColor(displayInfo.releaseStatus),
                          fontSize: 8
                        }]}
                        accessible={true}
                        accessibilityLabel={`${SagaService.getReleaseStatusDisplay(displayInfo.releaseStatus)}`}
                      >
                        {displayInfo.releaseStatus === 'released' ? '•' : 
                         displayInfo.releaseStatus === 'upcoming' ? '•' :
                         displayInfo.releaseStatus === 'in-production' ? '•' : '•'}
                      </Text>
                    </View>
                  );
                }
                return null;
              })()}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Enhanced Map Controls with Progress */}
      <View 
        style={styles.controlsContainer}
        accessible={false}
        accessibilityLabel="Map navigation controls"
      >
        <View 
          style={styles.currentSagaDisplay}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Current saga: ${selectedSaga}. Journey progress: ${progressIndex + 1} of ${locations.length} locations completed.`}
        >
          <Text style={styles.controlsText}>• Current: {selectedSaga}</Text>
          <Text style={styles.progressText}>
            Progress: {progressIndex + 1}/{locations.length} locations
          </Text>
        </View>
        
        <View 
          style={styles.progressControls}
          accessible={false}
          accessibilityLabel="Journey progression controls"
        >
          <TouchableOpacity
            style={[
              styles.progressButton,
              { opacity: progressIndex > 0 ? 1 : 0.5 }
            ]}
            onPress={() => setProgressIndex(Math.max(0, progressIndex - 1))}
            disabled={progressIndex <= 0}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go to previous location"
            accessibilityHint={
              progressIndex <= 0 
                ? "Already at the first location. Cannot go back further."
                : `Go back to location ${progressIndex} in Odysseus's journey.`
            }
            accessibilityState={{
              disabled: progressIndex <= 0
            }}
          >
            <Text style={styles.progressButtonText}>⬅• Prev</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.progressButton,
              { opacity: progressIndex < locations.length - 1 ? 1 : 0.5 }
            ]}
            onPress={() => setProgressIndex(Math.min(locations.length - 1, progressIndex + 1))}
            disabled={progressIndex >= locations.length - 1}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go to next location"
            accessibilityHint={
              progressIndex >= locations.length - 1 
                ? "Already at the final location. Journey is complete."
                : `Advance to location ${progressIndex + 2} in Odysseus's journey.`
            }
            accessibilityState={{
              disabled: progressIndex >= locations.length - 1
            }}
          >
            <Text style={styles.progressButtonText}>Next ◦ </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[
            styles.journeyButton, 
            { 
              backgroundColor: showJourney ? '#4A90E2' : 'rgba(44, 62, 80, 0.8)',
              borderColor: showJourney ? '#4A90E2' : '#666'
            }
          ]}
          onPress={() => setShowJourney(!showJourney)}
          accessible={true}
          accessibilityRole="switch"
          accessibilityLabel="Toggle journey path visibility"
          accessibilityHint={
            showJourney 
              ? "Currently showing journey path lines on the map. Tap to hide them."
              : "Currently hiding journey path lines on the map. Tap to show them."
          }
          accessibilityState={{
            checked: showJourney
          }}
        >
          <Text style={styles.journeyButtonText}>
            {showJourney ? '◦  Hide Path' : '◦  Show Path'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.journeyButton, { backgroundColor: 'rgba(255, 140, 0, 0.8)', borderColor: '#FF8C00' }]}
          onPress={() => {
            const types: Array<'slide-right' | 'slide-up' | 'slide-down' | 'slide-left'> = ['slide-right', 'slide-up', 'slide-down', 'slide-left'];
            const currentIndex = types.indexOf(panelAnimationType);
            const nextIndex = (currentIndex + 1) % types.length;
            setPanelAnimationType(types[nextIndex]);
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Change panel animation style"
          accessibilityHint={`Currently using ${panelAnimationType} animation. Tap to cycle to the next animation style.`}
        >
          <Text style={styles.journeyButtonText}>
            • {panelAnimationType.replace('-', ' ').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* SVG Map */}
      <View 
        style={styles.mapContainer}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`Interactive Mediterranean Sea map showing Odysseus's journey. ${locations.length} locations available. Current progress: ${progressIndex + 1} of ${locations.length} locations.`}
      >
        <Text 
          style={styles.mapTitle}
          accessible={true}
          accessibilityRole="header"
        >
          Mediterranean Sea - Odysseus's Journey
        </Text>
        
        <SVGMediterraneanMap
          locations={convertToSVGLocations(locations, progressIndex, dynamicSagaColors)}
          selectedLocationId={selectedLocation?.id || null}
          onLocationPress={handleHotspotPress}
          showJourney={showJourney}
          loadingHotspotId={loadingHotspotId}
        />
        
        {/* Debug info to ensure map container is visible */}
        <Text style={{ color: '#FFD700', textAlign: 'center', marginTop: 10, fontSize: 12 }}>
          • Map Debug: {locations.length} locations • Progress: {progressIndex + 1}/{locations.length}
          {selectedLocation && ` • Selected: ${selectedLocation.name}`}
        </Text>
        
        {/* Enhanced Location Details with State Info */}
        {selectedLocation && (
          <Animated.View 
            style={[
              styles.detailsContainer,
              {
                transform: [{ scale: detailsScale }],
              }
            ]}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={`Location details for ${selectedLocation.name}`}
            accessibilityViewIsModal={true}
          >
            <View 
              style={styles.detailsHeader}
              accessible={false}
            >
              <Text 
                style={styles.detailsTitle}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel={`${selectedLocation.name} location details`}
              >
                {selectedLocation.name.toLowerCase().includes('troy') ? '◦ ' : 
                 selectedLocation.name.toLowerCase().includes('underworld') ? '•' : '◦ '} {selectedLocation.name}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedLocation(null)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Close location details"
                accessibilityHint="Tap to close the location details and return to the map"
              >
                <Text style={styles.closeButtonText}>•</Text>
              </TouchableOpacity>
            </View>
            
            {/* Location Status Badge */}
            {(() => {
              const svgLocations = convertToSVGLocations(locations, progressIndex, dynamicSagaColors);
              const currentSvgLocation = svgLocations.find(loc => loc.id === selectedLocation.id);
              const state = currentSvgLocation?.state;
              const order = currentSvgLocation?.order;
              
              return (
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: 
                      state === 'visited' ? 'rgba(50, 205, 50, 0.2)' :
                      state === 'current' ? 'rgba(255, 215, 0, 0.2)' :
                      'rgba(128, 128, 128, 0.2)'
                  }
                ]}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={
                  state === 'visited' ? `This location has been visited. It is stop number ${order} in the journey.` :
                  state === 'current' ? `This is the current location in your journey. It is stop number ${order}.` :
                  `This location is locked and not yet accessible. It is stop number ${order} in the journey.`
                }
                >
                  <Text style={[
                    styles.statusBadgeText,
                    { 
                      color: 
                        state === 'visited' ? '#32CD32' :
                        state === 'current' ? '#FFD700' :
                        '#808080'
                    }
                  ]}>
                    {state === 'visited' ? '• Visited' :
                     state === 'current' ? '• Current Location' :
                     '• Locked'} • Stop #{order}
                  </Text>
                </View>
              );
            })()}
            
            <Text 
              style={styles.detailsSaga}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`This location belongs to the ${selectedLocation.saga}`}
            >
              • {selectedLocation.saga}
            </Text>
            <Text 
              style={styles.detailsDescription}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`Location description: ${selectedLocation.description}`}
            >
              {selectedLocation.description}
            </Text>
            
            {selectedLocation.significance && (
              <View 
                style={styles.significanceContainer}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={`Significance: ${selectedLocation.significance}`}
              >
                <Text 
                  style={styles.significanceTitle}
                  accessible={false}
                >
                  ⭐ Significance:
                </Text>
                <Text 
                  style={styles.significanceText}
                  accessible={false}
                >
                  {selectedLocation.significance}
                </Text>
              </View>
            )}
            
            {selectedLocation.songs && selectedLocation.songs.length > 0 && (
              <View 
                style={styles.songsContainer}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={`Featured songs: ${selectedLocation.songs.join(', ')}`}
              >
                <Text 
                  style={styles.songsTitle}
                  accessible={false}
                >
                  • Featured Songs:
                </Text>
                {selectedLocation.songs.map((song, idx) => (
                  <Text 
                    key={idx} 
                    style={styles.songItem}
                    accessible={false}
                  >
                    • {song}
                  </Text>
                ))}
              </View>
            )}
          </Animated.View>
        )}
      </View>
      
      {/* Enhanced Status with Progression */}
      <View 
        style={styles.statusContainer}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Application status: Backend connected with ${locations.length} locations. Current progress: ${progressIndex + 1} of ${locations.length} locations completed. ${
          progressIndex === 0 ? 'Journey begins!' : 
          progressIndex === locations.length - 1 ? 'Journey complete!' :
          'Continue to unlock the next location'
        }`}
      >
        <Text 
          style={styles.statusText}
          accessible={false}
        >
          • Backend Connected • {locations.length} Locations • Progress: {progressIndex + 1}/{locations.length}
        </Text>
        <Text 
          style={styles.statusSubText}
          accessible={false}
        >
          {progressIndex === 0 ? '• Journey begins!' : 
           progressIndex === locations.length - 1 ? '• Journey complete!' :
           `• Continue to unlock the next location`}
        </Text>
      </View>
      
      {/* SagaInfoPanel */}
      <SagaInfoPanel
        saga={selectedSagaInfo}
        isVisible={showSagaPanel}
        onClose={closeSagaPanel}
        onSagaSelect={handleSagaSelect}
        allSagas={enhancedSagas}
        animationType={panelAnimationType}
        isLoading={isLoadingSaga}
      />
      
      {/* Debug Controls */}
      <View style={styles.debugControls}>
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => {
            // Simulate a network error for testing
            setErrorState({
              hasError: true,
              message: 'Simulated network error for testing retry functionality',
              type: 'network',
              retryable: true,
              lastAttempt: new Date(),
              attemptCount: 1
            });
          }}
        >
          <Text style={styles.debugButtonText}>🧪 Test Network Error</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => {
            // Test endpoint health status
            const healthyCount = Object.keys(ApiErrorBoundary).length;
            console.log('• API Health Check:', {
              sagasHealthy: ApiErrorBoundary.isEndpointHealthy(`${API_BASE_URL}/api/sagas`),
              locationsHealthy: ApiErrorBoundary.isEndpointHealthy(`${API_BASE_URL}/api/locations`),
            });
          }}
        >
          <Text style={styles.debugButtonText}>• Check API Health</Text>
        </TouchableOpacity>
      </View>

      {/* P2 Cache Status Indicator - Development tool */}
      <CacheStatusIndicator position="top-right" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  loading: {
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 50,
  },
  // Enhanced Loading Styles
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#B0C4DE',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  loadingProgress: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  loadingProgressText: {
    fontSize: 12,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Error Display Styles
  errorContainer: {
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 69, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    minHeight: 400, // Ensure minimum height
    marginVertical: 10, // Add some spacing
  },
  mapTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  hotspotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  hotspot: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  troyHotspot: {
    backgroundColor: '#CD853F', // Troy bronze color
    borderColor: '#FFD700', // Gold border
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedHotspot: {
    borderColor: '#4A90E2',
    borderWidth: 3,
  },
  hotspotText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.15)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginTop: 15,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsTitle: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
  },
  detailsSaga: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 15,
    lineHeight: 22,
  },
  significanceContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  significanceTitle: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  significanceText: {
    fontSize: 13,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  songsContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  songsTitle: {
    fontSize: 16,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  songItem: {
    fontSize: 14,
    color: '#B0C4DE',
    marginLeft: 10,
    marginBottom: 3,
  },
  closeButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#4A90E2',
    textAlign: 'center',
  },
  statusSubText: {
    fontSize: 11,
    color: '#B0C4DE',
    textAlign: 'center',
    marginTop: 3,
    fontStyle: 'italic',
  },
  // Saga Navigation Styles
  sagaContainer: {
    marginBottom: 15,
  },
  sagaNavigationTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sagaScrollContent: {
    paddingHorizontal: 10,
  },
  sagaCard: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    borderWidth: 2,
    minWidth: 120,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sagaCardText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sagaSelectedIndicator: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 2,
  },
  sagaInfoIcon: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  // Map Controls Styles
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  currentSagaDisplay: {
    flex: 1,
    minWidth: 150,
  },
  progressText: {
    color: '#B0C4DE',
    fontSize: 12,
    marginTop: 2,
  },
  progressControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  progressButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  progressButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  controlsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  journeyButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  journeyButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Backend status indicator styles
  backendStatusContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  },
  backendStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Debug panel styles
  debugContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  debugTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugScroll: {
    maxHeight: 60,
  },
  debugText: {
    color: '#B0C4DE',
    fontSize: 12,
  },
  debugButton: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.5)',
  },
  debugButtonText: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
  },
  // Saga display information styles
  releaseStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  releaseStatusText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  releaseDateText: {
    color: '#B0C4DE',
    fontSize: 12,
  },
  descriptionScroll: {
    maxHeight: 80,
    marginBottom: 10,
  },
  descriptionText: {
    color: '#E6E6FA',
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  // Enhanced saga information panel styles
  sagaInfoPanel: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sagaInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sagaInfoTitle: {
    color: '#E6E6FA',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  expandIcon: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sagaDescriptionContainer: {
    marginBottom: 12,
  },
  sagaThemesContainer: {
    marginBottom: 12,
  },
  themeTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  themeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  sagaStatsContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 8,
    padding: 10,
  },
  debugControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default BasicEpicMap;
