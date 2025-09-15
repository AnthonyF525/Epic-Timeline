import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mapStyles } from '../styles';
import { MapLoadingState, MapError } from '../constants';

interface ErrorScreenProps {
  loadingState: MapLoadingState;
  mapErrors: MapError[];
  onRetry: () => void;
  onClearErrors: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  loadingState, 
  mapErrors, 
  onRetry, 
  onClearErrors 
}) => {
  return (
    <View style={mapStyles.errorContainer}>
      <View style={mapStyles.errorContent}>
        <Text style={mapStyles.errorIcon}>◦ </Text>
        <Text style={mapStyles.errorTitle}>Map Loading Failed</Text>
        <Text style={mapStyles.errorMessage}>{loadingState.error}</Text>
        
        {mapErrors.length > 0 && (
          <View style={mapStyles.errorsList}>
            <Text style={mapStyles.errorsTitle}>Recent Errors:</Text>
            {mapErrors.slice(0, 3).map((error, index) => (
              <Text key={index} style={mapStyles.errorItem}>
                • {error.type}: {error.message}
              </Text>
            ))}
          </View>
        )}
        
        <TouchableOpacity style={mapStyles.retryButton} onPress={onRetry}>
          <Text style={mapStyles.retryButtonText}>• Retry Loading</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={mapStyles.clearErrorsButton} onPress={onClearErrors}>
          <Text style={mapStyles.clearErrorsButtonText}>• Clear Errors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
