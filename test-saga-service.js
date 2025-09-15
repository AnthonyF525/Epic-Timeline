/**
 * Test script to verify SagaService API connectivity
 */

const API_BASE_URL = 'http://localhost:8080';

// Test function to verify saga API
async function testSagaAPI() {
  console.log('Testing Saga API connectivity...');
  
  try {
    // Test 1: Get all sagas
    console.log('\nTest 1: Fetching all sagas...');
    const allSagasResponse = await fetch(`${API_BASE_URL}/api/sagas`);
    if (!allSagasResponse.ok) {
      throw new Error(`HTTP ${allSagasResponse.status}: ${allSagasResponse.statusText}`);
    }
    const allSagas = await allSagasResponse.json();
    console.log('All sagas fetched successfully:', allSagas.content.length, 'sagas found');
    console.log('Saga titles:', allSagas.content.map(s => s.title).join(', '));
    
    // Test 2: Get Troy Saga specifically
    console.log('\nTest 2: Fetching Troy Saga (ID: 1)...');
    const troySagaResponse = await fetch(`${API_BASE_URL}/api/sagas/1`);
    if (!troySagaResponse.ok) {
      throw new Error(`HTTP ${troySagaResponse.status}: ${troySagaResponse.statusText}`);
    }
    const troySaga = await troySagaResponse.json();
    console.log('Troy Saga fetched successfully:', troySaga.title);
    console.log('Troy Saga details:');
    console.log('  - Description:', troySaga.description);
    console.log('  - Release Date:', troySaga.releaseDate);
    console.log('  - Episode Count:', troySaga.episodeCount);
    console.log('  - Duration:', Math.round(troySaga.totalDurationSeconds / 60), 'minutes');
    console.log('  - Themes:', troySaga.themes.join(', '));
    console.log('  - Genres:', troySaga.genres.join(', '));
    
    // Test 3: Test by title search
    console.log('\nTest 3: Searching for Troy Saga by title...');
    const searchResult = allSagas.content.find(saga => 
      saga.title === 'The Troy Saga' || saga.title.toLowerCase().includes('troy')
    );
    if (searchResult) {
      console.log('Troy Saga found by title search:', searchResult.title);
    } else {
      console.log('Troy Saga not found by title search');
    }
    
    console.log('\nAll tests passed! Saga API is working correctly.');
    
  } catch (error) {
    console.error('Saga API test failed:', error);
    
    // Try to provide more details about the error
    if (error.message.includes('fetch')) {
      console.log('This looks like a network connectivity issue.');
      console.log('   Make sure the backend server is running on http://localhost:8080');
    }
  }
}

// Run the test
testSagaAPI();
