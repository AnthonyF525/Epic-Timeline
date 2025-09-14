# Epic Timeline Map - Modular Structure

This directory contains the refactored Epic Timeline Map component, split into a modular structure for better maintainability and reusability.

## Structure

```
EpicTimelineMap/
├── constants/
│   └── index.ts          # All configuration constants, types, and interfaces
├── hooks/
│   ├── useMapLogic.ts    # Main map state logic and effects
│   └── index.ts
├── components/
│   ├── LoadingScreen.tsx     # Loading state component
│   ├── ErrorScreen.tsx       # Error handling component
│   ├── MapControls.tsx       # Map control buttons and zoom
│   ├── LocationCard.tsx      # Individual location card
│   ├── LocationsList.tsx     # List of all locations
│   ├── SagaLegend.tsx       # EPIC sagas color legend
│   └── index.ts
├── styles/
│   └── index.ts          # All StyleSheet definitions
├── utils/
│   └── index.ts          # Utility functions and helpers
└── index.ts              # Main module exports
```

## Key Features

### Constants (`constants/index.ts`)
- `MEDITERRANEAN_BOUNDS` - Mediterranean Sea geographical configuration
- `TROY_FOCUS_CONFIG` - Troy-specific focus settings
- `EPIC_THEME` - Complete theme colors and styling
- Type definitions for `EpicLocation`, `MapLoadingState`, `MapError`
- Utility functions for saga colors, distance calculation, regional context

### Hooks (`hooks/useMapLogic.ts`)
- Complete state management for map functionality
- Pan and zoom gesture handling
- Loading states and error management
- Location focusing and bounds calculation
- Device-aware configuration
- Performance tracking

### Components
- **LoadingScreen**: Animated loading with progress indicators
- **ErrorScreen**: Error handling with retry functionality
- **MapControls**: Zoom controls, reset, Troy focus, fit all locations
- **LocationCard**: Individual location display with saga colors
- **LocationsList**: Scrollable list of all locations with optimized rendering
- **SagaLegend**: EPIC sagas color legend with official album colors

### Styles (`styles/index.ts`)
- Complete StyleSheet with EPIC theme integration
- Responsive design for different device sizes
- Enhanced visual effects (shadows, gradients, animations)
- Consistent color scheme throughout all components

### Utils (`utils/index.ts`)
- Coordinate formatting utilities
- Distance and measurement helpers
- Performance measurement tools
- Device type detection
- Debounce functionality

## Usage

```tsx
import { EpicTimelineMap } from './components/EpicTimelineMap';

// The component maintains the same external API
<EpicTimelineMap
  locations={epicLocations}
  selectedLocation={selectedLocation}
  showJourney={true}
  onLocationPress={handleLocationPress}
/>
```

## Benefits of Refactoring

1. **Modularity**: Each concern is separated into its own module
2. **Maintainability**: Easier to find and modify specific functionality
3. **Reusability**: Components and hooks can be reused in other parts of the app
4. **Testing**: Each module can be tested independently
5. **Performance**: Better code splitting and loading optimization
6. **Readability**: Much smaller, focused files instead of one massive component
7. **Type Safety**: Better TypeScript support with proper exports

## Configuration

The map is pre-configured for EPIC: The Musical with:
- Mediterranean Sea bounds
- Troy as the starting point
- Official EPIC saga colors
- Optimized pan/zoom for the Epic journey
- Responsive design for mobile and tablet devices

## Performance

- Optimized FlatList rendering for large location lists
- Gesture handling with performance tracking
- Debounced operations for smooth interactions
- Device-aware configurations for different screen sizes
- Error boundary patterns for robust error handling
