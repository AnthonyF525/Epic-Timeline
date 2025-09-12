# Epic Timeline App - Frontend Map Component State

## Project Overview
This is a React Native/Expo app for exploring EPIC: The Musical (Jorge Rivera-Herrans' musical) with an interactive Mediterranean map showing Odysseus's journey through the 9 sagas.

## Project Structure
```
EpicTimelineApp/
├── src/
│   ├── components/
│   │   ├── EpicTimelineMap.tsx ⚠️ CURRENT WORK - Performance testing needed
│   │   └── Timeline/
│   │       └── TimelineMap.tsx ✅ COMPLETED - Base component
│   ├── screens/
│   │   └── MapScreen.tsx ✅ COMPLETED
│   ├── services/
│   │   ├── MapService.ts ✅ COMPLETED - All 8 EPIC locations
│   │   └── SagaService.ts ✅ COMPLETED - All 9 sagas
│   └── types/ (Various TypeScript interfaces)
├── epic-timeline-backend/ (Spring Boot backend)
└── epic-timeline-frontend/ (Additional frontend)
```

## Current Component Status: EpicTimelineMap.tsx

### ✅ COMPLETED Features:
1. **P2 Create components/Timeline/TimelineMap.tsx base component** ✅
2. **P2 Set up Mediterranean region initial view bounds** ✅
3. **P2 Add basic map styling (colors, themes matching app design)** ✅
4. **P2 Configure map to focus on Troy location coordinates {x: 350, y: 80}** ✅
5. **P2 Add zoom controls (+/- buttons) with min/max zoom limits** ✅
6. **P2 Implement pan/scroll functionality with boundary constraints** ✅
7. **P2 Add map loading states and error handling** ✅

### 🔄 CURRENT TASK:
**P2 Test map performance on different device sizes** - IN PROGRESS

## EPIC: The Musical Data Structure

### 9 Official Sagas with Correct Colors:
1. **Troy Saga** - `#FF4500` (Fire orange) - "The Horse and the Infant", "Just a Man", "Full Speed Ahead", "Open Arms", "Warrior of the Mind"
2. **Cyclops Saga** - `#8B0000` (Dark red) - "Polyphemus", "Survive", "Remember Them", "My Goodbye"
3. **Ocean Saga** - `#1E90FF` (Ocean blue) - "Storm", "Luck Runs Out", "Keep Your Friends Close", "Ruthlessness"
4. **Circe Saga** - `#9932CC` (Purple magic) - "Puppeteer", "Wouldn't You Like", "Done For", "There Are Other Ways"
5. **Underworld Saga** - `#2F4F4F` (Dark gray) - "The Underworld", "No Longer You", "Monster"
6. **Thunder Saga** - `#FFD700` (Gold lightning) - "Suffering", "Different Beast", "Scylla", "Mutiny", "Thunder Bringer"
7. **Wisdom Saga** - `#00CED1` (Cyan wisdom) - "Legendary", "Little Wolf", "We'll Be Fine", "Love in Paradise", "God Games"
8. **Vengeance Saga** - `#008B8B` (Dark cyan) - "Not Sorry for Loving You", "Dangerous", "Charybdis", "Get in the Water", "600 Strike"
9. **Ithaca Saga** - `#DC143C` (Deep red/crimson) - "The Challenge", "Hold Them Down", "Odysseus", "I Can't Help But Wonder"

### 8 Mediterranean Locations:
1. **Troy** (39.9576°N, 26.2385°E) - Troy Saga - Starting point with auto-focus
2. **Polyphemus's Cave** (37.0902°N, 25.1536°E) - Cyclops Saga
3. **Poseidon's Domain** (36.5°N, 23.0°E) - Ocean Saga
4. **Circe's Island** (41.2033°N, 13.0667°E) - Circe Saga
5. **The Underworld** (38.0°N, 22.0°E) - Underworld Saga
6. **Scylla's Strait** (38.25°N, 15.6333°E) - Thunder Saga
7. **Calypso's Island** (35.0°N, 18.0°E) - Wisdom Saga
8. **Ithaca** (38.3667°N, 20.7167°E) - Ithaca Saga - Journey end point

## Technical Implementation Details

### Core Configuration:
```typescript
// Mediterranean bounds for map viewport
const MEDITERRANEAN_BOUNDS = {
  north: 46.0, south: 30.0, east: 42.0, west: -6.0,
  center: { latitude: 38.0, longitude: 18.0 },
  zoom: { initial: 5, min: 3, max: 12 }
};

// Troy auto-focus configuration
const TROY_FOCUS_CONFIG = {
  latitude: 39.9576, longitude: 26.2385,
  displayCoords: { x: 350, y: 80 },
  focusZoom: 8,
  focusBounds: { north: 41.0, south: 38.5, east: 28.0, west: 24.0 }
};
```

### Current State Management:
- Pan offset with boundary constraints
- Zoom level (3-12x) with device-aware performance
- Loading states (initializing, focusing, loading locations)
- Error handling with recoverable/non-recoverable states
- Performance metrics tracking for device testing

### EPIC Theme Colors:
```typescript
const EPIC_THEME = {
  colors: {
    epicBlue: '#4A90E2', epicGold: '#FFD700', epicCrimson: '#DC143C',
    darkBg: '#0a0e1a', mediumBg: '#0f1419', lightBg: '#16213e',
    seaBlue: '#1E90FF', mediterraneanTeal: '#00CED1', heroicPurple: '#9932CC'
  }
};
```

## Performance Testing Implementation

### Current Device Dimension Tracking:
```typescript
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const [performanceMetrics, setPerformanceMetrics] = React.useState({
  renderTime: 0, panResponsiveness: 0, zoomSmoothness: 0,
  locationCount: locations.length,
  deviceInfo: { width: screenWidth, height: screenHeight, pixelRatio: Dimensions.get('window').scale }
});
```

### Pan Gesture Performance Monitoring:
- Gesture event timing tracking
- Scale factors based on device size (tablets vs phones)
- Error handling for gesture coordinate validation
- Performance metrics for pan responsiveness

### Key Functions Requiring Performance Testing:
1. `onPanGestureEvent()` - Pan gesture handling with boundary constraints
2. `calculatePanBoundaries()` - Zoom-dependent boundary calculations
3. Location list rendering with ScrollView (8 locations across 9 sagas)
4. Transform operations on `pannableMapContainer`
5. Loading state transitions and error handling

### Device Categories for Testing:
1. **Small phones** (320-480px width) - Basic pan/zoom functionality
2. **Standard phones** (480-768px width) - Full location list performance
3. **Tablets** (768px+ width) - All sagas visible simultaneously
4. **High DPI devices** - Rendering quality vs performance balance

## Critical Issues Found:
- Duplicate `focusOnLocation` function declarations (fixed)
- Missing styles for pan-specific features
- Performance monitoring not fully implemented for different device sizes

## Dependencies:
- react-native-gesture-handler for pan/zoom
- Official EPIC: The Musical album colors integrated
- Mediterranean geographical accuracy maintained
- Real vs mythological location validation
- Geographic search capabilities
- Travel information and cultural significance

### 4. Characters API (/api/characters) ✅ COMPLETED
- CharacterType enum validation (MORTAL|GOD|MONSTER)
- Boolean flag logic (cannot be both protagonist/antagonist)
- Rich arrays: roles, traits, abilities, relationships
- Type-specific endpoints by character type
- Physical descriptions and voice actor info

### 5. Events API (/api/events) ✅ COMPLETED
- Relationship array handling (characters, locations, songs, sagas)
- Content arrays: witnesses, consequences, cultural impacts
- Weather and political context
- Timeline chronological ordering
- Boolean validation (historical vs mythological)

### 6. Comparisons API (/api/comparisons) ✅ COMPLETED
- ComparisonType enum validation
- Entity comparison framework with scoring
- Auto-generation capabilities
- Type-specific theme validation
- Advanced metrics and statistics

## Key Technical Features Implemented

### Array Field Validation Patterns
- Extensive validation for all list fields
- Duplicate prevention and cleaning
- Size constraints (min/max elements)
- Content validation against predefined lists
- Business logic validation

### Entity Relationship Management
- Cross-entity validation (IDs must exist)
- Bi-directional relationship handling
- Add/remove relationship endpoints
- Cascade validation for entity integrity

### Geographic Features
- Coordinate validation with proper ranges
- Proximity search within radius
- Region type validation
- Boolean flag business logic

### Comparison System
- Sophisticated scoring and criteria system
- Auto-generation of comparison criteria
- Type-specific validation rules
- Statistical analysis and breakdown

### Business Logic Validation
- Epic Timeline specific rules
- Character type transition logic
- Location real vs mythological validation
- Event historical vs mythological logic
- Cultural significance importance levels

## Current File Context
User was last viewing: `/Users/anthony/Project/Epic-Timeline/epic-timeline-backend/src/main/java/com/epicstuff/dto/AutoComparisonRequest.java`

This file contains validation for auto-generating comparisons with:
- ComparisonType enum field
- Entity ID validation
- Analysis type patterns
- Criteria count constraints
- Boolean flags for metrics/context inclusion

## Validation Patterns Used Throughout
- `@NotNull`, `@NotBlank`, `@NotEmpty` for required fields
- `@Size(min=X, max=Y)` for string and array constraints
- `@Pattern(regexp="...")` for enum-like string validation
- `@DecimalMin`/`@DecimalMax` for coordinate validation
- `@Valid` for nested object validation
- Custom business logic validation in service layers

## Epic Timeline Domain Specifics
- Characters: MORTAL, GOD, MONSTER types with mythological properties
- Locations: Real world places vs mythological realms
- Events: Historical vs mythological with cultural impact
- Songs: Musical analysis with narrative importance
- Comparisons: Academic analysis tool with scoring
- No release status tracking (musical is complete)

## Development Context
- Spring Boot backend with comprehensive validation
- Lombok for boilerplate reduction
- JPA/Hibernate for persistence
- RESTful API design with pagination and filtering
- Cross-origin support for frontend integration
- Professional-grade validation and error handling

## Architecture Quality
- Domain-driven design principles
- Enterprise-level validation patterns
- Proper service layer abstraction
- Consistent DTO patterns
- Comprehensive relationship management
- Academic research tool capabilities

The project represents a sophisticated backend for cultural heritage, mythology research, and educational platforms with extensive validation and relationship management capabilities.
