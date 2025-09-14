import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { mapStyles } from '../styles';

const EPIC_SAGAS = [
  { name: 'Troy', color: '#FF4500' },
  { name: 'Cyclops', color: '#8B0000' },
  { name: 'Ocean', color: '#1E90FF' },
  { name: 'Circe', color: '#9932CC' },
  { name: 'Underworld', color: '#2F4F4F' },
  { name: 'Thunder', color: '#FFD700' },
  { name: 'Wisdom', color: '#00CED1' },
  { name: 'Vengeance', color: '#008B8B' },
  { name: 'Ithaca', color: '#DC143C' },
];

export const SagaLegend: React.FC = () => {
  return (
    <View style={mapStyles.legend}>
      <Text style={mapStyles.legendTitle}>🎭 EPIC: The Musical Sagas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={mapStyles.legendItems}>
          {EPIC_SAGAS.map((saga, index) => (
            <View key={index} style={mapStyles.legendItem}>
              <View style={[mapStyles.legendColor, { backgroundColor: saga.color }]} />
              <Text style={mapStyles.legendText}>{saga.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
