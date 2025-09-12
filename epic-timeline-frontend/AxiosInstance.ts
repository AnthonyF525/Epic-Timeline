import { apiClient, epicRequest } from './src/services/apiClient';
import { AxiosResponse } from 'axios';



export class EpicApiService {
  
  
  static async getAllSagas() {
    const response = await epicRequest.get('/sagas');
    return response.data;
  }

  static async getSagaById(id: number) {
    const response = await epicRequest.get(`/sagas/${id}`);
    return response.data;
  }

  static async getTroySaga() {
    return this.getSagaById(1); // Troy Saga
  }

  
  static async getAllCharacters() {
    const response = await epicRequest.get('/characters');
    return response.data;
  }

  static async getCharacterById(id: number) {
    const response = await epicRequest.get(`/characters/${id}`);
    return response.data;
  }

  static async getMortalCharacters() {
    const response = await epicRequest.get('/characters/type/MORTAL');
    return response.data;
  }

  static async getGodCharacters() {
    const response = await epicRequest.get('/characters/type/GOD');
    return response.data;
  }

 
  static async getAllSongs() {
    const response = await epicRequest.get('/songs');
    return response.data;
  }

  static async getSongById(id: number) {
    const response = await epicRequest.get(`/songs/${id}`);
    return response.data;
  }

  static async getSongsBySaga(sagaId: number) {
    const response = await epicRequest.get(`/songs/saga/${sagaId}`);
    return response.data;
  }

  static async getTroySagaSongs() {
    return this.getSongsBySaga(1); // Troy Saga songs
  }

  static async getSongsByCharacter(characterName: string) {
    const response = await epicRequest.get(`/songs/character/${encodeURIComponent(characterName)}`);
    return response.data;
  }

  
  static async getAllLocations() {
    const response = await epicRequest.get('/locations');
    return response.data;
  }

  static async getLocationById(id: number) {
    const response = await epicRequest.get(`/locations/${id}`);
    return response.data;
  }

  static async getEpicLocations() {
    const response = await epicRequest.get('/locations/epic');
    return response.data;
  }

  static async getTroyLocation() {
    const locations = await this.getEpicLocations();
    return locations.find((loc: any) => loc.name === 'Troy');
  }

  
  static async getAllEvents() {
    const response = await epicRequest.get('/events');
    return response.data;
  }

  static async getEventById(id: number) {
    const response = await epicRequest.get(`/events/${id}`);
    return response.data;
  }

  static async getEventsBySaga(sagaId: number) {
    const response = await epicRequest.get(`/events/saga/${sagaId}`);
    return response.data;
  }

  static async getTroyEvents() {
    return this.getEventsBySaga(1); // Troy Saga events
  }

  
  static async getHomerComparisons() {
    const response = await epicRequest.get('/comparisons/homer');
    return response.data;
  }

  static async getCharacterComparisons(characterId: number) {
    const response = await epicRequest.get(`/comparisons/character/${characterId}`);
    return response.data;
  }

  static async getSagaComparisons(sagaId: number) {
    const response = await epicRequest.get(`/comparisons/saga/${sagaId}`);
    return response.data;
  }

  // 🎓 EDUCATIONAL ENDPOINTS - Your sophisticated comparison system
  static async getEducationalComparisons() {
    const response = await epicRequest.get('/comparisons/educational');
    return response.data;
  }

  static async getMythologyComparisons() {
    const response = await epicRequest.get('/comparisons/mythology');
    return response.data;
  }

  static async getMusicalTheaterComparisons() {
    const response = await epicRequest.get('/comparisons/musical-theater');
    return response.data;
  }

  // 🔍 SEARCH ENDPOINTS
  static async searchSongs(query: string) {
    const response = await epicRequest.get(`/songs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  static async searchCharacters(query: string) {
    const response = await epicRequest.get(`/characters/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // 📊 STATS ENDPOINTS
  static async getEpicStats() {
    const response = await epicRequest.get('/stats');
    return response.data;
  }

  static async getComparisonStats() {
    const response = await epicRequest.get('/comparisons/stats');
    return response.data;
  }
}

// Export the service and base client
export { apiClient } from './src/services/apiClient';
export default EpicApiService;

