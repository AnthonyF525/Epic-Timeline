/**
 * Ocean Saga Seed Data Verification Test
 * P3 Implementation - Verify Ocean Saga data integrity and structure
 */

import { OCEAN_SAGA_SEED_DATA } from './src/services/OceanSagaSeedData';

console.log('▶ Testing Ocean Saga Seed Data...\n');

// Test metadata
console.log('• Ocean Saga Metadata:');
console.log(`- Saga: ${OCEAN_SAGA_SEED_DATA.metadata.sagaName}`);
console.log(`- Characters: ${OCEAN_SAGA_SEED_DATA.metadata.totalCharacters}`);
console.log(`- Locations: ${OCEAN_SAGA_SEED_DATA.metadata.totalLocations}`);
console.log(`- Songs: ${OCEAN_SAGA_SEED_DATA.metadata.totalSongs}`);
console.log(`- Events: ${OCEAN_SAGA_SEED_DATA.metadata.totalEvents}`);
console.log(`- Significance: ${OCEAN_SAGA_SEED_DATA.metadata.significance}\n`);

// Test characters
console.log('• Ocean Saga Characters:');
OCEAN_SAGA_SEED_DATA.characters.forEach(char => {
  const description = char.description || 'No description';
  console.log(`- ${char.name} (${char.characterType}): ${description.substring(0, 80)}...`);
});
console.log();

// Test locations
console.log('◦  Ocean Saga Locations:');
OCEAN_SAGA_SEED_DATA.locations.forEach(loc => {
  console.log(`- ${loc.name} (${loc.locationType}): ${loc.description.substring(0, 80)}...`);
});
console.log();

// Test songs
console.log('• Ocean Saga Songs:');
OCEAN_SAGA_SEED_DATA.songs.forEach(song => {
  const duration = Math.floor(song.durationSeconds / 60) + ':' + String(song.durationSeconds % 60).padStart(2, '0');
  console.log(`- Track ${song.trackNumber}: "${song.title}" (${duration})`);
});
console.log();

// Test events
console.log('• Ocean Saga Events:');
OCEAN_SAGA_SEED_DATA.events.forEach(event => {
  console.log(`- ${event.sequenceOrder}. ${event.title} (${event.eventContext.importance})`);
  console.log(`  • ${event.location.name} | • ${event.songs.length > 0 ? event.songs[0].title : 'No song'}`);
});
console.log();

// Test Poseidon encounters specifically
console.log('• Poseidon Encounters:');
const poseidonEvents = OCEAN_SAGA_SEED_DATA.events.filter(event => 
  event.characters.some(char => char.name === 'Poseidon')
);
console.log(`Found ${poseidonEvents.length} events with Poseidon:`);
poseidonEvents.forEach(event => {
  console.log(`- ${event.title}: ${event.description.substring(0, 100)}...`);
});
console.log();

// Test storm events
console.log('⛈• Storm Events:');
const stormEvents = OCEAN_SAGA_SEED_DATA.events.filter(event => 
  event.title.toLowerCase().includes('storm') || 
  event.description.toLowerCase().includes('storm')
);
console.log(`Found ${stormEvents.length} storm-related events:`);
stormEvents.forEach(event => {
  console.log(`- ${event.title}: ${event.location.name}`);
});
console.log();

// Verify data integrity
console.log('✓ Data Integrity Checks:');
const characterIds = new Set(OCEAN_SAGA_SEED_DATA.characters.map(c => c.id));
const locationIds = new Set(OCEAN_SAGA_SEED_DATA.locations.map(l => l.id));
const songIds = new Set(OCEAN_SAGA_SEED_DATA.songs.map(s => s.id));

console.log(`- Character IDs unique: ${characterIds.size === OCEAN_SAGA_SEED_DATA.characters.length}`);
console.log(`- Location IDs unique: ${locationIds.size === OCEAN_SAGA_SEED_DATA.locations.length}`);
console.log(`- Song IDs unique: ${songIds.size === OCEAN_SAGA_SEED_DATA.songs.length}`);

// Check event references
const validEventReferences = OCEAN_SAGA_SEED_DATA.events.every(event => {
  const locationExists = locationIds.has(event.location.id);
  const charactersExist = event.characters.every(char => characterIds.has(char.id));
  const songsExist = event.songs.every(song => songIds.has(song.id));
  return locationExists && charactersExist && songsExist;
});
console.log(`- All event references valid: ${validEventReferences}`);

console.log('\n• Ocean Saga seed data verification complete!');
