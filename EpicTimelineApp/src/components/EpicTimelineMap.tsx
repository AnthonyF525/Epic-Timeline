import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TimelineMap, TimelineLocation, TimelineMapProps } from './Timeline/TimelineMap';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

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

interface EpicTimelineMapProps {
  locations: EpicLocation[];
  selectedLocation?: EpicLocation | null;
  showJourney: boolean;
  onLocationPress: (location: EpicLocation) => void;
}

// Convert EPIC location to Timeline location
const convertToTimelineLocation = (epicLocation: EpicLocation): TimelineLocation => ({
  id: epicLocation.id,
  name: epicLocation.name,
  latitude: epicLocation.latitude,
  longitude: epicLocation.longitude,
  description: epicLocation.description,
  category: epicLocation.saga,
  significance: epicLocation.significance,
  metadata: { songs: epicLocation.songs },
});

// Add Mediterranean bounds configuration at the top
const MEDITERRANEAN_BOUNDS = {
  // Mediterranean Sea geographical bounds
  north: 46.0,    // Northern Italy/Southern France
  south: 30.0,    // Northern Africa
  east: 42.0,     // Eastern Turkey/Cyprus
  west: -6.0,     // Gibraltar/Spain
  center: {
    latitude: 38.0,   // Center of Mediterranean
    longitude: 18.0,  // Center of Mediterranean
  },
  zoom: {
    initial: 5,       // Good overview of entire Mediterranean
    min: 3,           // Can zoom out to see broader context
    max: 12,          // Can zoom in to see location details
  }
};

// Add EPIC theme colors at the top
const EPIC_THEME = {
  colors: {
    // Primary EPIC colors
    epicBlue: '#4A90E2',
    epicGold: '#FFD700',
    epicCrimson: '#DC143C',
    
    // Background variations
    darkBg: '#0a0e1a',        // Deepest background
    mediumBg: '#0f1419',      // Current background
    lightBg: '#16213e',       // Card backgrounds
    
    // Accent colors
    seaBlue: '#1E90FF',
    mediterraneanTeal: '#00CED1',
    ancientGold: '#B8860B',
    heroicPurple: '#9932CC',
    
    // Text colors
    primaryText: '#ffffff',
    secondaryText: '#B0C4DE',
    accentText: '#4A90E2',
    mutedText: '#8A8A8A',
    
    // Status colors
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8',
  },
  
  // Enhanced gradients for visual depth
  gradients: {
    heroic: 'linear-gradient(135deg, #4A90E2, #9932CC)',
    mediterranean: 'linear-gradient(90deg, #1E90FF, #00CED1)',
    epic: 'linear-gradient(45deg, #FFD700, #DC143C)',
    journey: 'linear-gradient(180deg, #0a0e1a, #16213e)',
  },
  
  // Shadow effects
  shadows: {
    card: '0 4px 8px rgba(0, 0, 0, 0.3)',
    epic: '0 6px 12px rgba(74, 144, 226, 0.2)',
    journey: '0 2px 4px rgba(255, 215, 0, 0.1)',
  }
};

// Add Troy-specific focus configuration
const TROY_FOCUS_CONFIG = {
  // Troy's actual geographical coordinates (Historical Troy/Hisarlik, Turkey)
  latitude: 39.9576,   // Troy's real latitude
  longitude: 26.2385,  // Troy's real longitude
  
  // Map display coordinates for focusing
  displayCoords: {
    x: 350,  // Horizontal position on map
    y: 80    // Vertical position on map
  },
  
  // Troy-specific zoom and bounds
  focusZoom: 8,        // Close-up view of Troy region
  focusBounds: {
    north: 41.0,       // Northern Turkey coast
    south: 38.5,       // Aegean Sea area
    east: 28.0,        // Towards Bosphorus
    west: 24.0,        // Greek islands area
    center: {
      latitude: 39.9576,
      longitude: 26.2385,
    }
  }
};

// Add loading and error types at the top
interface MapLoadingState {
  isLoading: boolean;
  isInitializing: boolean;
  isLoadingLocations: boolean;
  isFocusing: boolean;
  error: string | null;
  loadingProgress: number;
}

interface MapError {
  type: 'NETWORK_ERROR' | 'DATA_ERROR' | 'GESTURE_ERROR' | 'BOUNDS_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  timestamp: number;
  recoverable: boolean;
}

export const EpicTimelineMap: React.FC<EpicTimelineMapProps> = ({
  locations,
  selectedLocation,
  showJourney,
  onLocationPress,
}) => {
  const [currentBounds, setCurrentBounds] = React.useState(MEDITERRANEAN_BOUNDS);
  const [zoomLevel, setZoomLevel] = React.useState(MEDITERRANEAN_BOUNDS.zoom.initial);
  
  // Existing pan state
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [lastPanPosition, setLastPanPosition] = React.useState({ x: 0, y: 0 });

  // ADD LOADING AND ERROR STATE MANAGEMENT:
  const [loadingState, setLoadingState] = React.useState<MapLoadingState>({
    isLoading: true,
    isInitializing: true,
    isLoadingLocations: false,
    isFocusing: false,
    error: null,
    loadingProgress: 0,
  });

  const [mapErrors, setMapErrors] = React.useState<MapError[]>([]);

  // Error handling utility
  const handleError = (error: Partial<MapError>) => {
    const mapError: MapError = {
      type: error.type || 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
      timestamp: Date.now(),
      recoverable: error.recoverable ?? true,
    };

    setMapErrors(prev => [mapError, ...prev.slice(0, 4)]); // Keep last 5 errors
    
    setLoadingState(prev => ({
      ...prev,
      error: mapError.message,
      isLoading: false,
      isInitializing: false,
    }));

    console.error(`🗺️ Map Error [${mapError.type}]:`, mapError.message);
  };

  // Clear errors
  const clearErrors = () => {
    setMapErrors([]);
    setLoadingState(prev => ({
      ...prev,
      error: null,
    }));
  };

  // Enhanced loading simulation with progress
  const simulateMapInitialization = async () => {
    try {
      setLoadingState(prev => ({
        ...prev,
        isLoading: true,
        isInitializing: true,
        loadingProgress: 0,
        error: null,
      }));

      // Simulate loading Mediterranean bounds
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingState(prev => ({ ...prev, loadingProgress: 25 }));

      // Simulate loading EPIC theme
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoadingState(prev => ({ ...prev, loadingProgress: 50 }));

      // Simulate loading Troy configuration
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoadingState(prev => ({ ...prev, loadingProgress: 75 }));

      // Simulate finalizing map setup
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingState(prev => ({
        ...prev,
        loadingProgress: 100,
        isLoading: false,
        isInitializing: false,
      }));

      console.log('🎭 Epic Timeline Map initialized successfully!');
    } catch (error) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Failed to initialize map data',
        recoverable: true,
      });
    }
  };

  // Initialize map on component mount
  React.useEffect(() => {
    simulateMapInitialization();
  }, []);

  // Enhanced location loading with error handling
  React.useEffect(() => {
    if (locations.length === 0) {
      setLoadingState(prev => ({
        ...prev,
        isLoadingLocations: true,
        error: null,
      }));
      return;
    }

    try {
      setLoadingState(prev => ({
        ...prev,
        isLoadingLocations: false,
        error: null,
      }));

      // Validate location data
      const invalidLocations = locations.filter(loc => 
        !loc.latitude || !loc.longitude || 
        loc.latitude < -90 || loc.latitude > 90 ||
        loc.longitude < -180 || loc.longitude > 180
      );

      if (invalidLocations.length > 0) {
        handleError({
          type: 'DATA_ERROR',
          message: `${invalidLocations.length} locations have invalid coordinates`,
          recoverable: true,
        });
      }
    } catch (error) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Failed to process location data',
        recoverable: true,
      });
    }
  }, [locations]);

  // Enhanced focus functions with error handling
  const focusOnTroy = async () => {
    if (!troyLocation) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Troy location not found in data',
        recoverable: true,
      });
      return;
    }

    try {
      setLoadingState(prev => ({
        ...prev,
        isFocusing: true,
        error: null,
      }));

      setCurrentBounds(TROY_FOCUS_CONFIG.focusBounds);
      setZoomLevel(TROY_FOCUS_CONFIG.focusZoom);
      setPanOffset({ x: 0, y: 0 });
      onLocationPress(troyLocation);

      // Simulate focus animation time
      await new Promise(resolve => setTimeout(resolve, 500));

      setLoadingState(prev => ({
        ...prev,
        isFocusing: false,
      }));

      console.log(`🏛️ Successfully focused on Troy`);
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Failed to focus on Troy location',
        recoverable: true,
      });
      
      setLoadingState(prev => ({
        ...prev,
        isFocusing: false,
      }));
    }
  };

  // Find Troy location from the locations array
  const troyLocation = locations.find(loc => 
    loc.name.toLowerCase().includes('troy') || 
    loc.saga === 'troy-saga'
  );

  // Enhanced focus functions
  const focusOnTroy = () => {
    if (troyLocation) {
      setCurrentBounds(TROY_FOCUS_CONFIG.focusBounds);
      setZoomLevel(TROY_FOCUS_CONFIG.focusZoom);
      setPanOffset({ x: 0, y: 0 }); // ADD THIS LINE
      onLocationPress(troyLocation); // Select Troy as well
      console.log(`🏛️ Focused on Troy • Reset pan to (0, 0)`);
    }
  };

  // Auto-focus on Troy when component loads
  React.useEffect(() => {
    if (troyLocation && !selectedLocation) {
      // Auto-focus on Troy when map first loads
      setTimeout(() => {
        focusOnTroy();
      }, 1000); // Small delay for smooth initial load
    }
  }, [troyLocation]);

  // SINGLE focusOnLocation function - Enhanced with Troy priority
  const focusOnLocation = (location: EpicLocation) => {
    if (location.name.toLowerCase().includes('troy')) {
      // Use special Troy focus configuration
      setCurrentBounds(TROY_FOCUS_CONFIG.focusBounds);
      setZoomLevel(TROY_FOCUS_CONFIG.focusZoom);
    } else {
      // Regular location focus
      const focusBounds = {
        ...currentBounds,
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        }
      };
      setCurrentBounds(focusBounds);
      setZoomLevel(8); // Zoom in for location detail
    }
    setPanOffset({ x: 0, y: 0 }); // ADD THIS LINE
  };

  // Enhanced zoom functions with bounds checking
  const zoomIn = () => {
    const newZoom = Math.min(zoomLevel + 1, MEDITERRANEAN_BOUNDS.zoom.max);
    setZoomLevel(newZoom);
    
    // Adjust pan offset for new zoom level
    const constrainedOffset = constrainPanOffset(panOffset);
    setPanOffset(constrainedOffset);
    
    console.log(`🔍 Zoomed in to ${newZoom}x`);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoomLevel - 1, MEDITERRANEAN_BOUNDS.zoom.min);
    setZoomLevel(newZoom);
    
    // Adjust pan offset for new zoom level
    const constrainedOffset = constrainPanOffset(panOffset);
    setPanOffset(constrainedOffset);
    
    console.log(`🔍 Zoomed out to ${newZoom}x`);
  };

  // ADD THESE PAN FUNCTIONS HERE:
  
  // Calculate pan boundaries based on zoom level and Mediterranean bounds
  const calculatePanBoundaries = () => {
    const zoomFactor = zoomLevel / MEDITERRANEAN_BOUNDS.zoom.initial;
    const baseWidth = 400; // Base map width
    const baseHeight = 300; // Base map height
    
    const scaledWidth = baseWidth * zoomFactor;
    const scaledHeight = baseHeight * zoomFactor;
    
    // Calculate maximum pan distances
    const maxPanX = Math.max(0, (scaledWidth - baseWidth) / 2);
    const maxPanY = Math.max(0, (scaledHeight - baseHeight) / 2);
    
    return {
      minX: -maxPanX,
      maxX: maxPanX,
      minY: -maxPanY,
      maxY: maxPanY,
    };
  };

  // Constrain pan offset within Mediterranean boundaries
  const constrainPanOffset = (offset: { x: number; y: number }) => {
    const boundaries = calculatePanBoundaries();
    
    return {
      x: Math.max(boundaries.minX, Math.min(boundaries.maxX, offset.x)),
      y: Math.max(boundaries.minY, Math.min(boundaries.maxY, offset.y)),
    };
  };

  // Handle pan gesture
  const onPanGestureEvent = (event: any) => {
    try {
      if (!isDragging) return;
      
      const { translationX, translationY } = event.nativeEvent;
      
      if (isNaN(translationX) || isNaN(translationY)) {
        throw new Error('Invalid gesture coordinates');
      }

      const newOffset = {
        x: lastPanPosition.x + translationX * 0.5,
        y: lastPanPosition.y + translationY * 0.5,
      };
      
      const constrainedOffset = constrainPanOffset(newOffset);
      setPanOffset(constrainedOffset);
    } catch (error) {
      handleError({
        type: 'GESTURE_ERROR',
        message: 'Pan gesture failed',
        recoverable: true,
      });
    }
  };

  // Handle pan state changes
  const onPanHandlerStateChange = (event: any) => {
    try {
      const { state, translationX, translationY } = event.nativeEvent;
      
      switch (state) {
        case State.BEGAN:
          setIsDragging(true);
          setLastPanPosition(panOffset);
          clearErrors(); // Clear errors when user starts interacting
          console.log('🎯 Started panning Mediterranean map');
          break;
          
        case State.END:
        case State.CANCELLED:
          setIsDragging(false);
          
          if (isNaN(translationX) || isNaN(translationY)) {
            throw new Error('Invalid final gesture coordinates');
          }

          const finalOffset = {
            x: lastPanPosition.x + translationX * 0.5,
            y: lastPanPosition.y + translationY * 0.5,
          };
          
          const constrainedFinalOffset = constrainPanOffset(finalOffset);
          setPanOffset(constrainedFinalOffset);
          
          console.log(`🗺️ Finished panning to: (${constrainedFinalOffset.x.toFixed(1)}, ${constrainedFinalOffset.y.toFixed(1)})`);
          break;
      }
    } catch (error) {
      handleError({
        type: 'GESTURE_ERROR',
        message: 'Pan state change failed',
        recoverable: true,
      });
      setIsDragging(false);
    }
  };

  // Enhanced zoom with error handling
  const zoomIn = () => {
    try {
      const newZoom = Math.min(zoomLevel + 1, MEDITERRANEAN_BOUNDS.zoom.max);
      setZoomLevel(newZoom);
      
      const constrainedOffset = constrainPanOffset(panOffset);
      setPanOffset(constrainedOffset);
      
      console.log(`🔍 Zoomed in to ${newZoom}x`);
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Zoom in operation failed',
        recoverable: true,
      });
    }
  };

  const zoomOut = () => {
    try {
      const newZoom = Math.max(zoomLevel - 1, MEDITERRANEAN_BOUNDS.zoom.min);
      setZoomLevel(newZoom);
      
      const constrainedOffset = constrainPanOffset(panOffset);
      setPanOffset(constrainedOffset);
      
      console.log(`🔍 Zoomed out to ${newZoom}x`);
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Zoom out operation failed',
        recoverable: true,
      });
    }
  };

  // Enhanced reset with error handling
  const resetToMediterranean = () => {
    try {
      setCurrentBounds(MEDITERRANEAN_BOUNDS);
      setZoomLevel(MEDITERRANEAN_BOUNDS.zoom.initial);
      setPanOffset({ x: 0, y: 0 });
      clearErrors();
      console.log('🌊 Reset to Mediterranean overview');
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Failed to reset map view',
        recoverable: true,
      });
    }
  };

  // Enhanced retry function
  const retryOperation = () => {
    clearErrors();
    simulateMapInitialization();
  };

  // Loading screen component
  const LoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContent}>
        <Text style={styles.loadingTitle}>🗺️ Loading Epic Timeline Map</Text>
        <Text style={styles.loadingSubtitle}>Preparing Odysseus's Journey</Text>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${loadingState.loadingProgress}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>{loadingState.loadingProgress}%</Text>
        </View>
        
        {/* Loading steps */}
        <View style={styles.loadingSteps}>
          <Text style={[
            styles.loadingStep,
            loadingState.loadingProgress >= 25 && styles.loadingStepComplete
          ]}>
            🌊 Mediterranean Bounds
          </Text>
          <Text style={[
            styles.loadingStep,
            loadingState.loadingProgress >= 50 && styles.loadingStepComplete
          ]}>
            🎭 EPIC Theme
          </Text>
          <Text style={[
            styles.loadingStep,
            loadingState.loadingProgress >= 75 && styles.loadingStepComplete
          ]}>
            🏛️ Troy Configuration
          </Text>
          <Text style={[
            styles.loadingStep,
            loadingState.loadingProgress >= 100 && styles.loadingStepComplete
          ]}>
            ⚡ Finalizing Setup
          </Text>
        </View>
      </View>
    </View>
  );

  // Error screen component
  const ErrorScreen = () => (
    <View style={styles.errorContainer}>
      <View style={styles.errorContent}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Map Loading Failed</Text>
        <Text style={styles.errorMessage}>{loadingState.error}</Text>
        
        {mapErrors.length > 0 && (
          <View style={styles.errorsList}>
            <Text style={styles.errorsTitle}>Recent Errors:</Text>
            {mapErrors.slice(0, 3).map((error, index) => (
              <Text key={index} style={styles.errorItem}>
                • {error.type}: {error.message}
              </Text>
            ))}
          </View>
        )}
        
        <TouchableOpacity style={styles.retryButton} onPress={retryOperation}>
          <Text style={styles.retryButtonText}>🔄 Retry Loading</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clearErrorsButton} onPress={clearErrors}>
          <Text style={styles.clearErrorsButtonText}>✨ Clear Errors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Show loading screen during initialization
  if (loadingState.isInitializing || loadingState.isLoading) {
    return <LoadingScreen />;
  }

  // Show error screen for non-recoverable errors
  if (loadingState.error && !mapErrors[0]?.recoverable) {
    return <ErrorScreen />;
  }

  // Find Troy location (with error handling)
  const troyLocation = React.useMemo(() => {
    try {
      return locations.find(loc => 
        loc.name.toLowerCase().includes('troy') || 
        loc.saga === 'troy-saga'
      );
    } catch (error) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Failed to find Troy location',
        recoverable: true,
      });
      return null;
    }
  }, [locations]);

  // Calculate bounds that include all EPIC locations
  const calculateLocationBounds = () => {
    if (locations.length === 0) return MEDITERRANEAN_BOUNDS;

    const lats = locations.map(loc => loc.latitude);
    const lngs = locations.map(loc => loc.longitude);

    const bounds = {
      north: Math.max(...lats) + 2,    // Add padding
      south: Math.min(...lats) - 2,
      east: Math.max(...lngs) + 2,
      west: Math.min(...lngs) - 2,
      center: {
        latitude: (Math.max(...lats) + Math.min(...lats)) / 2,
        longitude: (Math.max(...lngs) + Math.min(...lngs)) / 2,
      },
      zoom: MEDITERRANEAN_BOUNDS.zoom
    };

    return bounds;
  };

  // Auto-fit bounds to show all locations
  const fitToLocations = () => {
    const bounds = calculateLocationBounds();
    setCurrentBounds(bounds);
    setZoomLevel(bounds.zoom.initial);
  };

  // Enhanced reset function that also resets pan
  const resetToMediterranean = () => {
    setCurrentBounds(MEDITERRANEAN_BOUNDS);
    setZoomLevel(MEDITERRANEAN_BOUNDS.zoom.initial);
    setPanOffset({ x: 0, y: 0 }); // ADD THIS LINE
  };

  // Handle location press with bounds update
  const handleLocationPress = (location: EpicLocation) => {
    focusOnLocation(location);
    onLocationPress(location);
  };

  const timelineLocations = locations.map(convertToTimelineLocation);
  const selectedTimelineLocation = selectedLocation ? convertToTimelineLocation(selectedLocation) : null;
  
  const epicSagas = [
    'troy-saga', 'cyclops-saga', 'ocean-saga', 'circe-saga',
    'underworld-saga', 'thunder-saga', 'wisdom-saga', 'vengeance-saga', 'ithaca-saga'
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapPlaceholder}>
        {/* Enhanced Map Header with Loading/Error States */}
        <View style={styles.mapHeader}>
          <Text style={styles.placeholderTitle}>🗺️ EPIC: The Musical Map</Text>
          <Text style={styles.placeholderSubtitle}>
            Mediterranean Sea • Odysseus's Journey Through {locations.length} Locations
          </Text>
          <Text style={styles.boundsInfo}>
            📍 {currentBounds.center.latitude.toFixed(1)}°N, {currentBounds.center.longitude.toFixed(1)}°E
            • Zoom: {zoomLevel}x
          </Text>
          
          {/* Enhanced status indicators */}
          <Text style={styles.panInfo}>
            🧭 Pan: ({panOffset.x.toFixed(1)}, {panOffset.y.toFixed(1)}) 
            {isDragging && " • Dragging"}
            {loadingState.isFocusing && " • Focusing"}
            {loadingState.isLoadingLocations && " • Loading Locations"}
          </Text>
          
          {/* Error indicator */}
          {loadingState.error && (
            <TouchableOpacity style={styles.errorIndicator} onPress={clearErrors}>
              <Text style={styles.errorIndicatorText}>
                ⚠️ {loadingState.error} (Tap to dismiss)
              </Text>
            </TouchableOpacity>
          )}
          
          {/* Troy Focus Indicator with error handling */}
          {troyLocation && currentBounds === TROY_FOCUS_CONFIG.focusBounds && (
            <Text style={styles.troyFocusIndicator}>
              🏛️ Focused on Troy • Display Position: ({TROY_FOCUS_CONFIG.displayCoords.x}, {TROY_FOCUS_CONFIG.displayCoords.y})
            </Text>
          )}
        </View>

        {/* Enhanced Map Controls with Loading States */}
        <View style={styles.mapControls}>
          <TouchableOpacity 
            style={[
              styles.controlButton,
              loadingState.isFocusing && styles.controlButtonDisabled
            ]} 
            onPress={resetToMediterranean}
            disabled={loadingState.isFocusing}
          >
            <Text style={styles.controlButtonText}>🌊 Reset View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.controlButton, 
              styles.troyFocusButton,
              (loadingState.isFocusing || !troyLocation) && styles.controlButtonDisabled
            ]} 
            onPress={focusOnTroy}
            disabled={loadingState.isFocusing || !troyLocation}
          >
            <Text style={styles.troyFocusButtonText}>
              {loadingState.isFocusing ? '⏳ Focusing...' : '🏛️ Focus Troy'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.controlButton,
              loadingState.isLoadingLocations && styles.controlButtonDisabled
            ]} 
            onPress={fitToLocations}
            disabled={loadingState.isLoadingLocations}
          >
            <Text style={styles.controlButtonText}>📍 Fit All</Text>
          </TouchableOpacity>
          
          {/* Enhanced Zoom Controls with Loading States */}
          <View style={styles.zoomControls}>
            <TouchableOpacity 
              style={[
                styles.zoomButton,
                (isMinZoom || loadingState.isFocusing) && styles.zoomButtonDisabled
              ]} 
              onPress={zoomOut}
              disabled={isMinZoom || loadingState.isFocusing}
            >
              <Text style={[
                styles.zoomButtonText,
                (isMinZoom || loadingState.isFocusing) && styles.zoomButtonTextDisabled
              ]}>-</Text>
            </TouchableOpacity>
            
            <View style={styles.zoomLevelContainer}>
              <Text style={styles.zoomLevel}>{zoomLevel}x</Text>
              <Text style={styles.zoomRange}>
                {MEDITERRANEAN_BOUNDS.zoom.min}-{MEDITERRANEAN_BOUNDS.zoom.max}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.zoomButton,
                (isMaxZoom || loadingState.isFocusing) && styles.zoomButtonDisabled
              ]}
              onPress={zoomIn}
              disabled={isMaxZoom || loadingState.isFocusing}
            >
              <Text style={[
                styles.zoomButtonText,
                (isMaxZoom || loadingState.isFocusing) && styles.zoomButtonTextDisabled
              ]}>+</Text>
            </TouchableOpacity>
          </View>
          
          {/* Status indicator */}
          <View style={styles.statusIndicator}>
            <Text style={styles.statusText}>
              {loadingState.isLoadingLocations ? '⏳ Loading...' : 
               loadingState.error ? '⚠️ Error' : 
               '✅ Ready'}
            </Text>
          </View>
        </View>

        {/* Show "No Locations" state with retry option */}
        {locations.length === 0 ? (
          <View style={styles.noLocationsContainer}>
            <Text style={styles.noLocationsText}>
              {loadingState.isLoadingLocations ? '⏳ Loading EPIC Locations...' : '📍 No Locations Found'}
            </Text>
            <Text style={styles.noLocationsSubText}>
              {loadingState.isLoadingLocations ? 
                'Fetching Odysseus\'s journey data...' : 
                'The epic journey data is not available.'}
            </Text>
            {!loadingState.isLoadingLocations && (
              <TouchableOpacity style={styles.retryButton} onPress={retryOperation}>
                <Text style={styles.retryButtonText}>🔄 Retry Loading</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          /* Enhanced Pannable Map Container */
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}
            enabled={!loadingState.isFocusing && !loadingState.isLoadingLocations}
          >
            <View style={[
              styles.pannableMapContainer,
              {
                transform: [
                  { translateX: panOffset.x },
                  { translateY: panOffset.y },
                  { scale: zoomLevel / MEDITERRANEAN_BOUNDS.zoom.initial },
                ],
              },
              isDragging && styles.draggingMapContainer,
              loadingState.isFocusing && styles.focusingMapContainer,
            ]}>
              {/* Enhanced Journey Indicator */}
              {showJourney && (
                <View style={styles.journeyIndicator}>
                  <Text style={styles.journeyText}>
                    🛤️ Epic Journey Route Active • Starting from Troy
                    {loadingState.isFocusing && ' • Focusing...'}
                  </Text>
                  <Text style={styles.journeyBounds}>
                    From Troy ({TROY_FOCUS_CONFIG.latitude.toFixed(1)}°N, {TROY_FOCUS_CONFIG.longitude.toFixed(1)}°E) to Ithaca
                  </Text>
                </View>
              )}

              {/* Enhanced Location List */}
              <View style={styles.locationsContainer}>
                <View style={styles.locationsHeader}>
                  <Text style={styles.debugText}>📍 {locations.length} EPIC Locations:</Text>
                  <Text style={styles.regionText}>
                    {currentBounds === TROY_FOCUS_CONFIG.focusBounds ? 
                      "Troy Region Focus • Aegean Sea Area" : 
                      "Mediterranean Region Overview"
                    }
                    {loadingState.isLoadingLocations && " • Loading..."}
                    {loadingState.isFocusing && " • Focusing..."}
                  </Text>
                </View>
                
                <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={true}>
                  {locations.map((location, index) => {
                    const isTroy = location.name.toLowerCase().includes('troy');
                    
                    return (
                      <TouchableOpacity
                        key={location.id}
                        style={[
                          styles.locationCard,
                          selectedLocation?.id === location.id && styles.selectedLocationItem,
                          isTroy && styles.troyLocationCard,
                          loadingState.isFocusing && styles.loadingLocationCard,
                        ]}
                        onPress={() => handleLocationPress(location)}
                        disabled={loadingState.isFocusing}
                      >
                        <View style={styles.locationHeader}>
                          <Text style={styles.locationName}>
                            {isTroy && "🏛️ "}
                            {index + 1}. {location.name}
                            {isTroy && " (Journey Start)"}
                          </Text>
                          <View style={[styles.sagaBadge, { backgroundColor: getSagaColor(location.saga) }]}>
                            <Text style={styles.sagaText}>
                              {location.saga.replace('-saga', '').toUpperCase()}
                            </Text>
                          </View>
                        </View>
                        
                        {/* Enhanced coordinates with Troy special info */}
                        <Text style={styles.locationCoords}>
                          📐 {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E
                          • {getRegionalContext(location)}
                          {isTroy && " • Ancient City of Troy"}
                        </Text>
                        
                        {/* Troy-specific display coordinates */}
                        {isTroy && (
                          <Text style={styles.troyDisplayCoords}>
                            🎯 Map Display: ({TROY_FOCUS_CONFIG.displayCoords.x}, {TROY_FOCUS_CONFIG.displayCoords.y})
                          </Text>
                        )}
                        
                        <Text style={styles.locationDescription}>
                          {location.description}
                        </Text>
                        
                        {location.significance && (
                          <Text style={styles.significance}>
                            ✨ {location.significance}
                          </Text>
                        )}
                        
                        {location.songs && location.songs.length > 0 && (
                          <Text style={styles.songsPreview}>
                            🎵 Songs: {location.songs.slice(0, 2).join(', ')}
                            {location.songs.length > 2 ? ` +${location.songs.length - 2} more` : ''}
                          </Text>
                        )}
                        
                        {/* Distance from Troy instead of center for Troy focus */}
                        <Text style={styles.distanceInfo}>
                          🧭 {isTroy ? 
                            "Journey Starting Point" : 
                            `${calculateDistance(TROY_FOCUS_CONFIG.focusBounds.center, location).toFixed(0)}km from Troy`
                          }
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </PanGestureHandler>
        )}

        {/* Keep legend outside of pannable area */}
        {/* EPIC Sagas Legend with CORRECT Official Colors */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>🎭 EPIC: The Musical Sagas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FF4500' }]} />
                <Text style={styles.legendText}>Troy</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#8B0000' }]} />
                <Text style={styles.legendText}>Cyclops</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#1E90FF' }]} />
                <Text style={styles.legendText}>Ocean</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#9932CC' }]} />
                <Text style={styles.legendText}>Circe</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#2F4F4F' }]} />
                <Text style={styles.legendText}>Underworld</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FFD700' }]} />
                <Text style={styles.legendText}>Thunder</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#00CED1' }]} />
                <Text style={styles.legendText}>Wisdom</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#008B8B' }]} />
                <Text style={styles.legendText}>Vengeance</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#DC143C' }]} />
                <Text style={styles.legendText}>Ithaca</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

// Update the getSagaColor function with CORRECT official EPIC album colors
const getSagaColor = (saga: string): string => {
  switch (saga.toLowerCase()) {
    // Troy Saga - Fiery orange/red (burning Troy)
    case 'troy-saga': return '#FF4500';        // Orange-red flames from album cover
    
    // Cyclops Saga - Deep red/crimson (Polyphemus's eye)
    case 'cyclops-saga': return '#8B0000';     // Dark red from the cyclops eye
    
    // Ocean Saga - Ocean blue/teal (stormy seas)
    case 'ocean-saga': return '#1E90FF';       // Deep ocean blue from album
    
    // Circe Saga - Purple/magenta (magical/mystical)
    case 'circe-saga': return '#9932CC';       // Purple magic from Circe's album
    
    // Underworld Saga - Dark gray/black (death and shadows)
    case 'underworld-saga': return '#2F4F4F';  // Dark slate gray from underworld album
    
    // Thunder Saga - Bright gold/yellow (Zeus's lightning)
    case 'thunder-saga': return '#FFD700';     // Bright gold lightning from album
    
    // Wisdom Saga - Cyan/turquoise (Athena's wisdom)
    case 'wisdom-saga': return '#00CED1';      // Cyan from Athena's album cover
    
    // Vengeance Saga - Teal/turquoise (different from Wisdom)
    case 'vengeance-saga': return '#008B8B';   // Dark cyan from vengeance album
    
    // Ithaca Saga - RED/CRIMSON (homecoming but with blood/sacrifice theme)
    case 'ithaca-saga': return '#DC143C';      // Deep red/crimson from Ithaca album
    
    default: return EPIC_THEME.colors.epicBlue;
  }
};

// Helper function to get regional context
const getRegionalContext = (location: EpicLocation): string => {
  const { latitude, longitude } = location;
  
  // Define Mediterranean regions
  if (latitude > 41) return "Northern Mediterranean";
  if (latitude < 34) return "Southern Mediterranean";
  if (longitude < 10) return "Western Mediterranean";
  if (longitude > 25) return "Eastern Mediterranean";
  return "Central Mediterranean";
};

// Helper function to calculate distance between two points
const calculateDistance = (point1: {latitude: number, longitude: number}, point2: {latitude: number, longitude: number}): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
  const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EPIC_THEME.colors.darkBg,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: EPIC_THEME.colors.mediumBg,
    padding: 15,
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicBlue,
    // Add subtle glow effect
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // Enhanced header styling
  mapHeader: {
    marginBottom: 20,
    backgroundColor: EPIC_THEME.colors.lightBg,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicGold,
    shadowColor: EPIC_THEME.colors.epicGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.epicGold,
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: EPIC_THEME.colors.mediterraneanTeal,
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  boundsInfo: {
    fontSize: 11,
    color: EPIC_THEME.colors.mutedText,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'monospace',
    backgroundColor: EPIC_THEME.colors.darkBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'center',
  },
  panInfo: {
    fontSize: 10,
    color: EPIC_THEME.colors.mediterraneanTeal,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0, 206, 209, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'center',
  },
  
  // Enhanced map controls with better spacing
  mapControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: EPIC_THEME.colors.lightBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicBlue,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButton: {
    backgroundColor: EPIC_THEME.colors.darkBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicBlue,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  controlButtonText: {
    color: EPIC_THEME.colors.epicBlue,
    fontSize: 11,
    fontWeight: 'bold',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EPIC_THEME.colors.darkBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.heroicPurple,
    shadowColor: EPIC_THEME.colors.heroicPurple,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 4,
  },
  zoomButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonDisabled: {
    opacity: 0.3,
    backgroundColor: EPIC_THEME.colors.mutedText,
  },
  zoomButtonText: {
    color: EPIC_THEME.colors.heroicPurple,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zoomButtonTextDisabled: {
    color: EPIC_THEME.colors.mutedText,
  },
  zoomLevelContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: 50,
  },
  zoomLevel: {
    color: EPIC_THEME.colors.epicGold,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zoomRange: {
    color: EPIC_THEME.colors.mutedText,
    fontSize: 8,
    textAlign: 'center',
    marginTop: 1,
  },
  
  // Enhanced zoom level display
  zoomIndicator: {
    backgroundColor: EPIC_THEME.colors.darkBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.mediterraneanTeal,
  },
  zoomIndicatorText: {
    color: EPIC_THEME.colors.mediterraneanTeal,
    fontSize: 10,
    fontWeight: '500',
  },
  
  // Enhanced journey indicator
  journeyIndicator: {
    backgroundColor: EPIC_THEME.colors.epicBlue,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicGold,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  journeyText: {
    color: EPIC_THEME.colors.primaryText,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  journeyBounds: {
    fontSize: 10,
    color: EPIC_THEME.colors.epicGold,
    marginTop: 3,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Enhanced location container
  locationsContainer: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: EPIC_THEME.colors.lightBg,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.mediterraneanTeal,
  },
  locationsHeader: {
    marginBottom: 12,
    backgroundColor: EPIC_THEME.colors.darkBg,
    padding: 8,
    borderRadius: 8,
  },
  debugText: {
    color: EPIC_THEME.colors.epicGold,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  regionText: {
    fontSize: 11,
    color: EPIC_THEME.colors.mediterraneanTeal,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2,
  },
  
  // Enhanced location cards with EPIC theming
  locationCard: {
    backgroundColor: EPIC_THEME.colors.darkBg,
    padding: 14,
    marginVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicBlue,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLocationItem: {
    backgroundColor: EPIC_THEME.colors.lightBg,
    borderColor: EPIC_THEME.colors.epicGold,
    borderWidth: 2,
    shadowColor: EPIC_THEME.colors.epicGold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.primaryText,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Enhanced saga badges
  sagaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sagaText: {
    fontSize: 10,
    color: EPIC_THEME.colors.primaryText,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  
  // Enhanced text elements
  locationCoords: {
    fontSize: 11,
    color: EPIC_THEME.colors.mediterraneanTeal,
    marginBottom: 6,
    fontWeight: '500',
  },
  locationDescription: {
    fontSize: 12,
    color: EPIC_THEME.colors.secondaryText,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 6,
  },
  significance: {
    fontSize: 11,
    color: EPIC_THEME.colors.epicGold,
    fontStyle: 'italic',
    marginTop: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  songsPreview: {
    fontSize: 12,
    color: EPIC_THEME.colors.heroicPurple,
    fontStyle: 'italic',
    marginTop: 4,
    backgroundColor: 'rgba(153, 50, 204, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceInfo: {
    fontSize: 10,
    color: EPIC_THEME.colors.mutedText,
    marginTop: 4,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  
  // Enhanced legend with EPIC theming
  legend: {
    backgroundColor: EPIC_THEME.colors.lightBg,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicGold,
    shadowColor: EPIC_THEME.colors.epicGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.epicGold,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: EPIC_THEME.colors.darkBg,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  legendText: {
    fontSize: 9,
    color: EPIC_THEME.colors.secondaryText,
    fontWeight: '500',
  },
  
  // No locations state styling
  noLocationsContainer: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EPIC_THEME.colors.darkBg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: EPIC_THEME.colors.epicBlue,
    margin: 10,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  noLocationsText: {
    fontSize: 16,
    fontWeight: 'bold',