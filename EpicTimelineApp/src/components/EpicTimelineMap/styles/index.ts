import { StyleSheet } from 'react-native';
import { EPIC_THEME } from '../constants';
import { TROY_SAGA_COLORS } from '../components/troyColors';

export const mapStyles = StyleSheet.create({
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
  controlButtonDisabled: {
    opacity: 0.5,
    backgroundColor: EPIC_THEME.colors.mutedText,
  },
  controlButtonText: {
    color: EPIC_THEME.colors.epicBlue,
    fontSize: 11,
    fontWeight: 'bold',
  },
  troyFocusButton: {
    backgroundColor: EPIC_THEME.colors.lightBg,
    borderColor: EPIC_THEME.colors.epicGold,
  },
  troyFocusButtonText: {
    color: EPIC_THEME.colors.epicGold,
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
    color: EPIC_THEME.colors.primaryText,
    textAlign: 'center',
    marginBottom: 8,
  },
  noLocationsSubText: {
    fontSize: 12,
    color: EPIC_THEME.colors.mutedText,
    textAlign: 'center',
    marginBottom: 15,
  },
  
  // Loading screen styles
  loadingContainer: {
    flex: 1,
    backgroundColor: EPIC_THEME.colors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: EPIC_THEME.colors.lightBg,
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: EPIC_THEME.colors.epicBlue,
    shadowColor: EPIC_THEME.colors.epicBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.epicGold,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: EPIC_THEME.colors.mediterraneanTeal,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Progress bar styles
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: EPIC_THEME.colors.darkBg,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: EPIC_THEME.colors.epicBlue,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: EPIC_THEME.colors.secondaryText,
    fontWeight: 'bold',
  },
  // Loading steps styles
  loadingSteps: {
    alignItems: 'flex-start',
  },
  loadingStep: {
    fontSize: 12,
    color: EPIC_THEME.colors.mutedText,
    marginVertical: 2,
    paddingLeft: 10,
  },
  loadingStepComplete: {
    color: EPIC_THEME.colors.success,
    fontWeight: 'bold',
  },
  
  // Error screen styles
  errorContainer: {
    flex: 1,
    backgroundColor: EPIC_THEME.colors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContent: {
    alignItems: 'center',
    backgroundColor: EPIC_THEME.colors.lightBg,
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: EPIC_THEME.colors.danger,
    maxWidth: 350,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.danger,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: EPIC_THEME.colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  errorsList: {
    width: '100%',
    marginBottom: 20,
  },
  errorsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.mutedText,
    marginBottom: 8,
  },
  errorItem: {
    fontSize: 11,
    color: EPIC_THEME.colors.mutedText,
    marginVertical: 2,
    paddingLeft: 5,
  },
  // Button styles
  retryButton: {
    backgroundColor: EPIC_THEME.colors.epicBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  retryButtonText: {
    color: EPIC_THEME.colors.primaryText,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearErrorsButton: {
    backgroundColor: EPIC_THEME.colors.success,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  clearErrorsButtonText: {
    color: EPIC_THEME.colors.primaryText,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Status indicators
  errorIndicator: {
    backgroundColor: 'rgba(220, 53, 69, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'center',
  },
  errorIndicatorText: {
    color: EPIC_THEME.colors.danger,
    fontSize: 10,
    textAlign: 'center',
  },
  statusIndicator: {
    backgroundColor: EPIC_THEME.colors.darkBg,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.success,
  },
  statusText: {
    color: EPIC_THEME.colors.success,
    fontSize: 9,
    fontWeight: 'bold',
  },
  
  // Common styles for map and pannable container
  pannableMapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  draggingMapContainer: {
    // Styles while dragging
    opacity: 0.9,
  },
  focusingMapContainer: {
    // Styles while focusing
    opacity: 0.8,
  },
  
  // Performance overlay styles
  performanceOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicGold,
    zIndex: 1000,
  },
  perfText: {
    color: EPIC_THEME.colors.secondaryText,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  troyFocusIndicator: {
    fontSize: 10,
    color: EPIC_THEME.colors.epicGold,
    textAlign: 'center',
    marginTop: 2,
    fontStyle: 'italic',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'center',
  },
  hotspotsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none', // Allow touches to pass through container
  },
  
  // Real map container styles
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: EPIC_THEME.colors.mediumBg,
  },

  map: {
    flex: 1,
    borderRadius: 12,
  },

  // Real MapView styles
  mapView: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  // Map marker styles
  mapMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: EPIC_THEME.colors.epicBlue,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  
  selectedMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: EPIC_THEME.colors.epicGold,
    transform: [{ scale: 1.2 }],
  },
  
  markerIcon: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  markerNumber: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: EPIC_THEME.colors.epicGold,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  markerNumberText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  
  // Map overlay styles
  mapControlsOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 8,
  },
  
  mapHeaderOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: EPIC_THEME.colors.epicGold,
  },
  
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: EPIC_THEME.colors.epicGold,
    marginBottom: 4,
  },
  
  mapSubtitle: {
    fontSize: 12,
    color: EPIC_THEME.colors.secondaryText,
  },
  
  // Add these Troy-specific styles to your existing StyleSheet.create():
  // Enhanced Troy location card styling
  troyLocationCard: {
    backgroundColor: TROY_SAGA_COLORS.primary,
    borderColor: TROY_SAGA_COLORS.gold,
    borderWidth: 2,
    shadowColor: TROY_SAGA_COLORS.fire,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  
  // Troy hotspot styling for SVG map
  troyHotspot: {
    fill: TROY_SAGA_COLORS.primary,
    stroke: TROY_SAGA_COLORS.gold,
    strokeWidth: 3,
  },
  
  // Troy pulse animation
  troyPulse: {
    stroke: TROY_SAGA_COLORS.fire,
    strokeWidth: 2,
    strokeOpacity: 0.6,
  },
  
  // Troy text styling
  troyHotspotText: {
    fill: TROY_SAGA_COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    stroke: TROY_SAGA_COLORS.smoke,
    strokeWidth: 0.5,
  },
});