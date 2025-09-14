// Mediterranean bounds configuration
export const MEDITERRANEAN_BOUNDS = {
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

// Troy-specific focus configuration
export const TROY_FOCUS_CONFIG = {
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
    },
    zoom: {
      initial: 8,
      min: 6,
      max: 12,
    }
  }
};

// EPIC theme colors
export const EPIC_THEME = {
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

// Loading and error types
export interface MapLoadingState {
  isLoading: boolean;
  isInitializing: boolean;
  isLoadingLocations: boolean;
  isFocusing: boolean;
  error: string | null;
  loadingProgress: number;
}

export interface MapError {
  type: 'NETWORK_ERROR' | 'DATA_ERROR' | 'GESTURE_ERROR' | 'BOUNDS_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  timestamp: number;
  recoverable: boolean;
}

export interface EpicLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance?: string;
  songs?: string[];
}

export interface EpicTimelineMapProps {
  locations: EpicLocation[];
  selectedLocation?: EpicLocation | null;
  showJourney: boolean;
  onLocationPress: (location: EpicLocation) => void;
}

// Utility functions

// Get the official EPIC album colors for each saga
export const getSagaColor = (saga: string): string => {
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
export const getRegionalContext = (location: EpicLocation): string => {
  const { latitude, longitude } = location;
  
  // Define Mediterranean regions
  if (latitude > 41) return "Northern Mediterranean";
  if (latitude < 34) return "Southern Mediterranean";
  if (longitude < 10) return "Western Mediterranean";
  if (longitude > 25) return "Eastern Mediterranean";
  return "Central Mediterranean";
};

// Helper function to calculate distance between two points
export const calculateDistance = (point1: {latitude: number, longitude: number}, point2: {latitude: number, longitude: number}): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
  const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Add this helper function:
export const getLocationIcon = (saga: string): string => {
  const sagaIcons: Record<string, string> = {
    'troy-saga': '🏛️',
    'cyclops-saga': '👁️',
    'ocean-saga': '🌊',
    'circe-saga': '🔮',
    'underworld-saga': '💀',
    'thunder-saga': '⚡',
    'wisdom-saga': '🦉',
    'vengeance-saga': '⚔️',
    'ithaca-saga': '🏠',
  };
  return sagaIcons[saga] || '📍';
};

// Animation configuration
export const ANIMATION_CONFIG = {
  // Troy-specific animations
  TROY_PULSE: {
    scale: 1.5,
    duration: 2500,
    delay: 0,
    opacity: { from: 0.8, to: 0.2 },
  },
  
  // General location animations
  LOCATION_PULSE: {
    scale: 1.3,
    duration: 2000,
    delay: 500,
    opacity: { from: 0.6, to: 0.3 },
  },
  
  // Hover effects
  HOVER: {
    scale: 1.2,
    duration: 200,
    tension: 300,
    friction: 10,
  },
  
  // Selection effects
  SELECTION: {
    scale: 1.15,
    tension: 150,
    friction: 8,
  },
  
  // Card animations
  CARD_HOVER: {
    scale: 1.05,
    duration: 150,
  },
} as const;
