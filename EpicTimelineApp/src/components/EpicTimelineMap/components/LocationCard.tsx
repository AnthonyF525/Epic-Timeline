import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { mapStyles } from '../styles';
import { EpicLocation, getSagaColor } from '../constants';
import { TROY_SAGA_COLORS } from './troyColors';

interface LocationCardProps {
  location: EpicLocation;
  index: number;
  isSelected: boolean;
  isTroy: boolean;
  isLoading: boolean;
  onPress: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  index,
  isSelected,
  isTroy,
  isLoading,
  onPress,
}) => {
  // Enhanced Troy styling
  const troyCardStyle = isTroy ? {
    backgroundColor: isSelected ? TROY_SAGA_COLORS.selected : TROY_SAGA_COLORS.primary,
    borderColor: TROY_SAGA_COLORS.gold,
    borderWidth: 2,
    shadowColor: TROY_SAGA_COLORS.fire,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  } : {};

  return (
    <TouchableOpacity
      style={[
        mapStyles.locationCard,
        isSelected && mapStyles.selectedLocationItem,
        isTroy && mapStyles.troyLocationCard,
        troyCardStyle, // Enhanced Troy styling
        isLoading && mapStyles.loadingLocationCard,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={mapStyles.locationHeader}>
        <Text style={[
          mapStyles.locationName,
          isTroy && styles.troyLocationName
        ]}>
          {isTroy && "🏛️ "}
          {index + 1}. {location.name}
          {isTroy && " ⚔️"}
        </Text>
        <View style={[
          mapStyles.sagaBadge, 
          { backgroundColor: isTroy ? TROY_SAGA_COLORS.fire : getSagaColor(location.saga) },
          isTroy && styles.troySagaBadge
        ]}>
          <Text style={[
            mapStyles.sagaText,
            isTroy && styles.troySagaText
          ]}>
            {isTroy ? "⚔️ TROY SAGA" : location.saga.replace('-saga', '').toUpperCase()}
          </Text>
        </View>
      </View>
      
      {/* Troy-specific subtitle */}
      {isTroy && (
        <Text style={styles.troySubtitle}>
          🏛️ Ancient Citadel • 🗡️ Site of the Trojan War
        </Text>
      )}
      
      <Text style={[
        mapStyles.locationCoords,
        isTroy && styles.troyCoords
      ]}>
        📐 {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E
        {isTroy && " • Hisarlik, Turkey"}
      </Text>
      
      <Text style={[
        mapStyles.locationDescription,
        isTroy && styles.troyDescription
      ]}>
        {location.description}
      </Text>
      
      {location.significance && (
        <Text style={[
          mapStyles.significance,
          isTroy && styles.troySignificance
        ]}>
          ✨ {location.significance}
        </Text>
      )}
      
      {location.songs && location.songs.length > 0 && (
        <Text style={[
          mapStyles.songsPreview,
          isTroy && styles.troySongs
        ]}>
          🎵 Songs: {location.songs.slice(0, 2).join(', ')}
          {location.songs.length > 2 ? ` +${location.songs.length - 2} more` : ''}
        </Text>
      )}

      {/* Troy-specific war badge */}
      {isTroy && (
        <View style={styles.troyWarBadge}>
          <Text style={styles.troyWarBadgeText}>
            ⚔️ JOURNEY BEGINS HERE
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  troyLocationName: {
    color: TROY_SAGA_COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: TROY_SAGA_COLORS.smoke,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  troySagaBadge: {
    borderColor: TROY_SAGA_COLORS.gold,
    borderWidth: 1,
  },
  troySagaText: {
    color: TROY_SAGA_COLORS.text,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  troySubtitle: {
    color: TROY_SAGA_COLORS.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 8,
  },
  troyCoords: {
    color: TROY_SAGA_COLORS.textSecondary,
  },
  troyDescription: {
    color: TROY_SAGA_COLORS.textSecondary,
  },
  troySignificance: {
    color: TROY_SAGA_COLORS.gold,
    fontWeight: 'bold',
  },
  troySongs: {
    color: TROY_SAGA_COLORS.gold,
    fontWeight: '600',
  },
  troyWarBadge: {
    backgroundColor: TROY_SAGA_COLORS.ember,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: TROY_SAGA_COLORS.gold,
  },
  troyWarBadgeText: {
    color: TROY_SAGA_COLORS.text,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
