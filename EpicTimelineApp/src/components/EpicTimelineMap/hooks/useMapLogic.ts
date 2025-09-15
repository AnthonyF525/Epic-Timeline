import React from 'react';
import { Dimensions, Text } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { 
  EpicLocation, 
  MapLoadingState, 
  MapError, 
  MEDITERRANEAN_BOUNDS, 
  TROY_FOCUS_CONFIG 
} from '../constants';

export const useMapLogic = (
  locations: EpicLocation[], 
  selectedLocation: EpicLocation | null, 
  onLocationPress: (location: EpicLocation) => void
) => {
  // Safety check for locations
  const safeLocations = locations || [];
  
  // Core map state
  const [currentBounds, setCurrentBounds] = React.useState(MEDITERRANEAN_BOUNDS);
  const [zoomLevel, setZoomLevel] = React.useState(MEDITERRANEAN_BOUNDS.zoom.initial);
  
  // Pan state
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [lastPanPosition, setLastPanPosition] = React.useState({ x: 0, y: 0 });

  // Loading and error state
  const [loadingState, setLoadingState] = React.useState<MapLoadingState>({
    isLoading: true,
    isInitializing: true,
    isLoadingLocations: false,
    isFocusing: false,
    error: null,
    loadingProgress: 0,
  });

  const [mapErrors, setMapErrors] = React.useState<MapError[]>([]);

  // Device information
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Performance tracking
  const [performanceMetrics, setPerformanceMetrics] = React.useState({
    renderTime: 0,
    panResponsiveness: 0,
    zoomSmoothness: 0,
    locationCount: safeLocations.length,
    deviceInfo: {
      width: screenWidth,
      height: screenHeight,
      pixelRatio: Dimensions.get('window').scale
    }
  });

  // Error handling utility
  const handleError = React.useCallback((error: Partial<MapError>) => {
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

    console.error(`◦  Map Error [${mapError.type}]:`, mapError.message);
  }, []);

  // Clear errors
  const clearErrors = React.useCallback(() => {
    setMapErrors([]);
    setLoadingState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  // Enhanced loading simulation with progress
  const simulateMapInitialization = React.useCallback(async () => {
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

      console.log('• Epic Timeline Map initialized successfully!');
    } catch (error) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Failed to initialize map data',
        recoverable: true,
      });
    }
  }, [handleError]);

  // Initialize map on component mount
  React.useEffect(() => {
    simulateMapInitialization();
  }, [simulateMapInitialization]);

  // Find Troy location (with error handling)
  const troyLocation = React.useMemo(() => {
    try {
      if (!safeLocations || safeLocations.length === 0) return null;
      
      return safeLocations.find(loc => 
        loc?.name?.toLowerCase().includes('troy') || 
        loc?.saga === 'troy-saga'
      ) || null;
    } catch (error) {
      handleError({
        type: 'DATA_ERROR',
        message: 'Failed to find Troy location',
        recoverable: true,
      });
      return null;
    }
  }, [safeLocations, handleError]);

  // Calculate pan boundaries based on zoom level and Mediterranean bounds
  const calculatePanBoundaries = React.useCallback(() => {
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
  }, [zoomLevel]);

  // Constrain pan offset within Mediterranean boundaries
  const constrainPanOffset = React.useCallback((offset: { x: number; y: number }) => {
    const boundaries = calculatePanBoundaries();
    
    return {
      x: Math.max(boundaries.minX, Math.min(boundaries.maxX, offset.x)),
      y: Math.max(boundaries.minY, Math.min(boundaries.maxY, offset.y)),
    };
  }, [calculatePanBoundaries]);

  // Handle pan gesture
  const onPanGestureEvent = React.useCallback((event: any) => {
    const startTime = performance.now();
    
    try {
      if (!isDragging) return;
      
      const { translationX, translationY } = event.nativeEvent;
      
      // Scale translation based on device size
      const scaleFactor = screenWidth > 768 ? 0.3 : 0.5; // Tablets vs phones
      
      const newOffset = {
        x: lastPanPosition.x + translationX * scaleFactor,
        y: lastPanPosition.y + translationY * scaleFactor,
      };
      
      const constrainedOffset = constrainPanOffset(newOffset);
      setPanOffset(constrainedOffset);
      
      // Track performance
      const endTime = performance.now();
      setPerformanceMetrics(prev => ({
        ...prev,
        panResponsiveness: endTime - startTime
      }));
      
    } catch (error) {
      handleError({
        type: 'GESTURE_ERROR',
        message: `Pan failed on ${screenWidth}x${screenHeight} device`,
        recoverable: true,
      });
    }
  }, [isDragging, lastPanPosition, constrainPanOffset, screenWidth, screenHeight, handleError]);

  // Handle pan state changes
  const onPanHandlerStateChange = React.useCallback((event: any) => {
    try {
      const { state, translationX, translationY } = event.nativeEvent;
      
      switch (state) {
        case State.BEGAN:
          setIsDragging(true);
          setLastPanPosition(panOffset);
          clearErrors(); // Clear errors when user starts interacting
          console.log('• Started panning Mediterranean map');
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
          
          console.log(`◦  Finished panning to: (${constrainedFinalOffset.x.toFixed(1)}, ${constrainedFinalOffset.y.toFixed(1)})`);
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
  }, [panOffset, lastPanPosition, constrainPanOffset, handleError, clearErrors]);

  // Enhanced zoom with error handling
  const zoomIn = React.useCallback(() => {
    try {
      const newZoom = Math.min(zoomLevel + 1, MEDITERRANEAN_BOUNDS.zoom.max);
      setZoomLevel(newZoom);
      
      const constrainedOffset = constrainPanOffset(panOffset);
      setPanOffset(constrainedOffset);
      
      console.log(`• Zoomed in to ${newZoom}x`);
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Zoom in operation failed',
        recoverable: true,
      });
    }
  }, [zoomLevel, panOffset, constrainPanOffset, handleError]);

  const zoomOut = React.useCallback(() => {
    try {
      const newZoom = Math.max(zoomLevel - 1, MEDITERRANEAN_BOUNDS.zoom.min);
      setZoomLevel(newZoom);
      
      const constrainedOffset = constrainPanOffset(panOffset);
      setPanOffset(constrainedOffset);
      
      console.log(`• Zoomed out to ${newZoom}x`);
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Zoom out operation failed',
        recoverable: true,
      });
    }
  }, [zoomLevel, panOffset, constrainPanOffset, handleError]);

  // Enhanced focus functions with error handling
  const focusOnTroy = React.useCallback(async () => {
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

      console.log(`◦  Successfully focused on Troy`);
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
  }, [troyLocation, onLocationPress, handleError]);

  // Auto-focus on Troy when component loads
  React.useEffect(() => {
    if (troyLocation && !selectedLocation) {
      // Auto-focus on Troy when map first loads
      setTimeout(() => {
        focusOnTroy();
      }, 1000); // Small delay for smooth initial load
    }
  }, [troyLocation, selectedLocation, focusOnTroy]);

  // SINGLE focusOnLocation function - Enhanced with Troy priority
  const focusOnLocation = React.useCallback((location: EpicLocation) => {
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
    setPanOffset({ x: 0, y: 0 });
  }, [currentBounds]);

  // Calculate bounds that include all EPIC locations
  const calculateLocationBounds = React.useCallback(() => {
    if (safeLocations.length === 0) return MEDITERRANEAN_BOUNDS;

    const lats = safeLocations.map(loc => loc.latitude);
    const lngs = safeLocations.map(loc => loc.longitude);

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
  }, [safeLocations]);

  // Auto-fit bounds to show all locations
  const fitToLocations = React.useCallback(() => {
    const bounds = calculateLocationBounds();
    setCurrentBounds(bounds);
    setZoomLevel(bounds.zoom.initial);
  }, [calculateLocationBounds]);

  // Enhanced reset with error handling
  const resetToMediterranean = React.useCallback(() => {
    try {
      setCurrentBounds(MEDITERRANEAN_BOUNDS);
      setZoomLevel(MEDITERRANEAN_BOUNDS.zoom.initial);
      setPanOffset({ x: 0, y: 0 });
      clearErrors();
      console.log('• Reset to Mediterranean overview');
    } catch (error) {
      handleError({
        type: 'BOUNDS_ERROR',
        message: 'Failed to reset map view',
        recoverable: true,
      });
    }
  }, [handleError, clearErrors]);

  // Handle location press with bounds update
  const handleLocationPress = React.useCallback((location: EpicLocation) => {
    focusOnLocation(location);
    onLocationPress(location);
  }, [focusOnLocation, onLocationPress]);

  // Device-aware bounds configuration
  const getDeviceAwareBounds = React.useCallback(() => {
    const isTablet = screenWidth > 768;
    const isHighDPI = Dimensions.get('window').scale > 2;
    
    return {
      ...MEDITERRANEAN_BOUNDS,
      zoom: {
        initial: isTablet ? 6 : 5,
        min: isTablet ? 2 : 3,
        max: isHighDPI ? 15 : 12,
      }
    };
  }, [screenWidth]);

  // Retry operation function
  const retryOperation = React.useCallback(() => {
    clearErrors();
    simulateMapInitialization();
  }, [clearErrors, simulateMapInitialization]);

  // Computed properties
  const isMinZoom = zoomLevel <= MEDITERRANEAN_BOUNDS.zoom.min;
  const isMaxZoom = zoomLevel >= MEDITERRANEAN_BOUNDS.zoom.max;

  return {
    // State
    currentBounds,
    zoomLevel,
    panOffset,
    isDragging,
    loadingState,
    mapErrors,
    performanceMetrics,
    screenWidth,
    screenHeight,
    troyLocation,

    // Computed properties
    isMinZoom,
    isMaxZoom,

    // Actions
    zoomIn,
    zoomOut,
    focusOnTroy,
    focusOnLocation,
    resetToMediterranean,
    fitToLocations,
    handleLocationPress,
    onPanGestureEvent,
    onPanHandlerStateChange,
    handleError,
    clearErrors,
    retryOperation,
    getDeviceAwareBounds,
    calculateLocationBounds,
  };
};
