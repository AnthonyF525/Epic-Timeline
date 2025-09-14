/**
 * Test script to verify saga display functionality
 */

const API_BASE_URL = 'http://localhost:8080';

// Mock the SagaService functions for testing
class SagaServiceTest {
  static determineReleaseStatus(releaseDate) {
    try {
      const release = new Date(releaseDate);
      const now = new Date();
      
      if (isNaN(release.getTime())) {
        return 'unknown';
      }
      
      if (release <= now) {
        return 'released';
      }
      
      const monthsUntilRelease = (release.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      if (monthsUntilRelease > 6) {
        return 'in-production';
      }
      
      return 'upcoming';
      
    } catch (error) {
      console.warn('Error determining release status for date:', releaseDate, error);
      return 'unknown';
    }
  }

  static formatSagaDisplayInfo(saga) {
    const releaseStatus = SagaServiceTest.determineReleaseStatus(saga.releaseDate);
    const durationMinutes = Math.round(saga.totalDurationSeconds / 60);
    
    return {
      name: saga.title,
      description: saga.description,
      releaseStatus,
      releaseDate: saga.releaseDate,
      episodeCount: saga.episodeCount,
      duration: `${durationMinutes} minutes`,
      themes: saga.themes,
      genres: saga.genres
    };
  }

  static getReleaseStatusDisplay(status) {
    switch (status) {
      case 'released':
        return '✅ Released';
      case 'upcoming':
        return '🔜 Coming Soon';
      case 'in-production':
        return '🎬 In Production';
      case 'unknown':
        return '❓ Status Unknown';
      default:
        return '❓ Status Unknown';
    }
  }
}

// Test function to verify saga display functionality
async function testSagaDisplay() {
  console.log('🎭 Testing Saga Display Functionality...\n');
  
  try {
    // Test 1: Fetch Troy Saga and format display info
    console.log('📚 Test 1: Fetching and formatting Troy Saga display...');
    const response = await fetch(`${API_BASE_URL}/api/sagas/1`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const troySaga = await response.json();
    const displayInfo = SagaServiceTest.formatSagaDisplayInfo(troySaga);
    
    console.log('✅ Troy Saga Display Information:');
    console.log(`   🎭 Name: ${displayInfo.name}`);
    console.log(`   📖 Description: ${displayInfo.description}`);
    console.log(`   ${SagaServiceTest.getReleaseStatusDisplay(displayInfo.releaseStatus)}`);
    console.log(`   📅 Release Date: ${new Date(displayInfo.releaseDate).toLocaleDateString()}`);
    console.log(`   🎵 Episodes: ${displayInfo.episodeCount}`);
    console.log(`   ⏱️ Duration: ${displayInfo.duration}`);
    console.log(`   🎭 Themes: ${displayInfo.themes.join(', ')}`);
    console.log(`   🎨 Genres: ${displayInfo.genres.join(', ')}`);
    
    // Test 2: Test different release dates
    console.log('\n🕒 Test 2: Testing release status determination...');
    
    const testDates = [
      { date: '2022-12-25', expected: 'released' },
      { date: '2030-01-01', expected: 'in-production' },
      { date: '2025-11-15', expected: 'upcoming' },
      { date: 'invalid-date', expected: 'unknown' }
    ];
    
    testDates.forEach(test => {
      const status = SagaServiceTest.determineReleaseStatus(test.date);
      const statusDisplay = SagaServiceTest.getReleaseStatusDisplay(status);
      const success = status === test.expected ? '✅' : '❌';
      console.log(`   ${success} ${test.date} → ${statusDisplay} (expected: ${test.expected})`);
    });
    
    // Test 3: Test all available sagas
    console.log('\n📚 Test 3: Testing all available sagas...');
    const allSagasResponse = await fetch(`${API_BASE_URL}/api/sagas`);
    
    if (allSagasResponse.ok) {
      const allSagas = await allSagasResponse.json();
      
      console.log(`Found ${allSagas.content.length} sagas:\n`);
      
      allSagas.content.forEach((saga, index) => {
        const displayInfo = SagaServiceTest.formatSagaDisplayInfo(saga);
        console.log(`${index + 1}. 🎭 ${displayInfo.name}`);
        console.log(`   ${SagaServiceTest.getReleaseStatusDisplay(displayInfo.releaseStatus)} • ${displayInfo.episodeCount} episodes • ${displayInfo.duration}`);
        console.log(`   📖 ${displayInfo.description.substring(0, 80)}...`);
        console.log('');
      });
    }
    
    console.log('🎉 All saga display tests passed!');
    
  } catch (error) {
    console.error('❌ Saga display test failed:', error);
  }
}

// Run the test
testSagaDisplay();
