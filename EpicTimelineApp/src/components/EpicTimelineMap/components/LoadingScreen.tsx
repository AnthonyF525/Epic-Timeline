import React from 'react';
import { View, Text } from 'react-native';
import { mapStyles } from '../styles';
import { MapLoadingState } from '../constants';

interface LoadingScreenProps {
  loadingState: MapLoadingState;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingState }) => {
  return (
    <View style={mapStyles.loadingContainer}>
      <View style={mapStyles.loadingContent}>
        <Text style={mapStyles.loadingTitle}>🗺️ Loading Epic Timeline Map</Text>
        <Text style={mapStyles.loadingSubtitle}>Preparing Odysseus's Journey</Text>
        
        {/* Progress bar */}
        <View style={mapStyles.progressContainer}>
          <View style={mapStyles.progressBar}>
            <View style={[
              mapStyles.progressFill,
              { width: `${loadingState.loadingProgress}%` }
            ]} />
          </View>
          <Text style={mapStyles.progressText}>{loadingState.loadingProgress}%</Text>
        </View>
        
        {/* Loading steps */}
        <View style={mapStyles.loadingSteps}>
          <Text style={[
            mapStyles.loadingStep,
            loadingState.loadingProgress >= 25 && mapStyles.loadingStepComplete
          ]}>
            🌊 Mediterranean Bounds
          </Text>
          <Text style={[
            mapStyles.loadingStep,
            loadingState.loadingProgress >= 50 && mapStyles.loadingStepComplete
          ]}>
            🎭 EPIC Theme
          </Text>
          <Text style={[
            mapStyles.loadingStep,
            loadingState.loadingProgress >= 75 && mapStyles.loadingStepComplete
          ]}>
            🏛️ Troy Configuration
          </Text>
          <Text style={[
            mapStyles.loadingStep,
            loadingState.loadingProgress >= 100 && mapStyles.loadingStepComplete
          ]}>
            ⚡ Finalizing Setup
          </Text>
        </View>
      </View>
    </View>
  );
};
