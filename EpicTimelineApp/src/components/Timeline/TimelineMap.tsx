import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export interface TimelineLocation {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  description: string;
  category: string;
  significance?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
  orderIndex?: number;
}

export interface TimelineMapProps {
  title: string;
  subtitle?: string;
  locations: TimelineLocation[];
  categories: string[];
  selectedLocation?: TimelineLocation | null;
  selectedCategory?: string;
  showJourney: boolean;
  onLocationPress: (location: TimelineLocation) => void;
  onCategoryChange: (category: string) => void;
  getCategoryColor?: (category: string) => string;
  renderLocationCard?: (location: TimelineLocation, index: number) => React.ReactNode;
  renderCategoryLegend?: () => React.ReactNode;
}

export const TimelineMap: React.FC<TimelineMapProps> = ({
  title,
  subtitle,
  locations,
  categories,
  selectedLocation,
  selectedCategory,
  showJourney,
  onLocationPress,
  onCategoryChange,
  getCategoryColor = defaultGetCategoryColor,
  renderLocationCard,
  renderCategoryLegend,
}) => {
  
  const filteredLocations = selectedCategory && selectedCategory !== 'all' 
    ? locations.filter(loc => loc.category === selectedCategory)
    : locations;

  const defaultRenderLocationCard = (location: TimelineLocation, index: number) => (
    <TouchableOpacity
      key={location.id}
      style={[
        styles.locationCard,
        selectedLocation?.id === location.id && styles.selectedLocationCard
      ]}
      onPress={() => onLocationPress(location)}
    >
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>
          {index + 1}. {location.name}
        </Text>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(location.category) }]}>
          <Text style={styles.categoryText}>
            {location.category.toUpperCase()}
          </Text>
        </View>
      </View>
      
      {location.latitude && location.longitude && (
        <Text style={styles.locationCoords}>
          • {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
        </Text>
      )}
      
      <Text style={styles.locationDescription}>
        {location.description}
      </Text>
      
      {location.significance && (
        <Text style={styles.significance}>
          • {location.significance}
        </Text>
      )}
      
      {location.timestamp && (
        <Text style={styles.timestamp}>
          • {location.timestamp}
        </Text>
      )}
    </TouchableOpacity>
  );

  const defaultRenderCategoryLegend = () => (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>• Timeline Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.legendItems}>
          {categories.map((category) => (
            <View key={category} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: getCategoryColor(category) }]} />
              <Text style={styles.legendText}>{category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
        
        {/* Journey Route Indicator */}
        {showJourney && (
          <View style={styles.journeyIndicator}>
            <Text style={styles.journeyText}>◦  Timeline Route Active</Text>
          </View>
        )}
        
        {/* Location List */}
        <View style={styles.locationsContainer}>
          <Text style={styles.locationsHeader}>
            • {filteredLocations.length} Timeline Locations:
          </Text>
          <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={true}>
            {filteredLocations.length === 0 ? (
              <View style={styles.noLocationsContainer}>
                <Text style={styles.noLocationsText}>• No locations found</Text>
                <Text style={styles.noLocationsSubText}>
                  Try selecting a different category
                </Text>
              </View>
            ) : (
              filteredLocations.map((location, index) => 
                renderLocationCard 
                  ? renderLocationCard(location, index)
                  : defaultRenderLocationCard(location, index)
              )
            )}
          </ScrollView>
        </View>
        
        {/* Category Legend */}
        {renderCategoryLegend ? renderCategoryLegend() : defaultRenderCategoryLegend()}
      </View>
    </View>
  );
};

// Default color function
const defaultGetCategoryColor = (category: string): string => {
  const colors = [
    '#4A90E2', '#E94B3C', '#7ED321', '#F5A623', 
    '#9013FE', '#50E3C2', '#FF6B6B', '#4ECDC4'
  ];
  const index = category.length % colors.length;
  return colors[index];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#0f1419',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#B0C4DE',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  journeyIndicator: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 15,
  },
  journeyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  locationsHeader: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationsList: {
    flex: 1,
  },
  noLocationsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    margin: 10,
  },
  noLocationsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
    textAlign: 'center',
  },
  noLocationsSubText: {
    fontSize: 12,
    color: '#B0C4DE',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  locationCard: {
    backgroundColor: '#16213e',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  selectedLocationCard: {
    backgroundColor: '#2d3748',
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  locationCoords: {
    fontSize: 11,
    color: '#B0C4DE',
    marginBottom: 5,
  },
  locationDescription: {
    fontSize: 12,
    color: '#B0C4DE',
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 6,
  },
  significance: {
    fontSize: 11,
    color: '#FFD700',
    fontStyle: 'italic',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#00CED1',
    fontStyle: 'italic',
    marginTop: 2,
  },
  legend: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 9,
    color: '#B0C4DE',
  },
});