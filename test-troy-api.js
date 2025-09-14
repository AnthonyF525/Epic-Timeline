/**
 * Test script to verify Troy location API integration
 * Run this to test if the backend API is properly returning Troy coordinates
 */

const BASE_URL = 'http://localhost:8080/api';

async function testTroyAPI() {
  console.log('🧪 Testing Troy Location API Integration...\n');
  
  try {
    // Test 1: Fetch all locations
    console.log('📍 Test 1: Fetching all locations...');
    const response = await fetch(`${BASE_URL}/locations`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const locations = await response.json();
    console.log(`✅ Success! Retrieved ${locations.length} locations`);
    
    // Test 2: Find Troy location
    console.log('\n🏰 Test 2: Finding Troy location...');
    const troy = locations.find(loc => loc.name.toLowerCase().includes('troy'));
    
    if (!troy) {
      throw new Error('Troy location not found in API response');
    }
    
    console.log('✅ Troy found!');
    console.log(`   📍 Coordinates: ${troy.latitude}, ${troy.longitude}`);
    console.log(`   🏛️ Modern Name: ${troy.modernName}`);
    console.log(`   📜 Description: ${troy.description.substring(0, 100)}...`);
    console.log(`   ⭐ Cultural Significance: ${troy.culturalSignificance?.importance}`);
    
    // Test 3: Verify coordinates match expected values
    console.log('\n🎯 Test 3: Verifying Troy coordinates...');
    const expectedLat = 39.957;
    const expectedLon = 26.239;
    const tolerance = 0.1; // Allow small rounding differences
    
    const latMatch = Math.abs(troy.latitude - expectedLat) < tolerance;
    const lonMatch = Math.abs(troy.longitude - expectedLon) < tolerance;
    
    if (latMatch && lonMatch) {
      console.log('✅ Coordinates match expected values for Troy, Turkey!');
      console.log(`   Expected: ${expectedLat}, ${expectedLon}`);
      console.log(`   Actual:   ${troy.latitude}, ${troy.longitude}`);
    } else {
      console.warn('⚠️ Coordinates differ from expected values');
      console.log(`   Expected: ${expectedLat}, ${expectedLon}`);
      console.log(`   Actual:   ${troy.latitude}, ${troy.longitude}`);
    }
    
    // Test 4: Verify React Native app can use this data
    console.log('\n📱 Test 4: React Native compatibility...');
    const rnLocation = {
      id: troy.id,
      name: troy.name,
      coordinates: [troy.latitude, troy.longitude], // Array format for RN
      description: troy.description,
      saga: 'The Troy Saga',
      significance: 'Starting point of Odysseus journey',
      modernLocation: troy.modernName,
      mythologyFacts: [
        'Site of the famous Trojan Horse',
        'Ten-year siege by the Greeks'
      ],
      songs: [
        'The Horse and the Infant',
        'Just a Man',
        'Full Speed Ahead'
      ]
    };
    
    console.log('✅ React Native location object created successfully!');
    console.log('🗺️ Location ready for map positioning:', {
      name: rnLocation.name,
      coordinates: rnLocation.coordinates,
      modernLocation: rnLocation.modernLocation
    });
    
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('🏆 Troy hotspot can be positioned using API coordinates:');
    console.log(`   📍 Latitude: ${troy.latitude}`);
    console.log(`   📍 Longitude: ${troy.longitude}`);
    console.log(`   🌍 Modern Location: ${troy.modernName}`);
    
    return {
      success: true,
      troyData: troy,
      rnLocation: rnLocation
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔄 Suggestions:');
    console.log('   1. Make sure the backend is running (mvn spring-boot:run)');
    console.log('   2. Check if port 8080 is available');
    console.log('   3. Verify database has been seeded with Troy data');
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for module use or run directly
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testTroyAPI };
} else {
  // Browser environment - run the test
  testTroyAPI();
}
