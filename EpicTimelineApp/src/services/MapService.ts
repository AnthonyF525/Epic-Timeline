export interface EpicMapLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  songs: string[];
}

export class MapService {
  private static epicLocations: EpicMapLocation[] = [
    {
      id: 'troy',
      name: 'Troy',
      latitude: 39.9570,
      longitude: 26.2390,
      description: 'The legendary city where the Trojan War took place.',
      saga: 'troy-saga',
      significance: 'Where Odysseus made the choice in "Just a Man"',
      songs: ['The Horse and the Infant', 'Just a Man', 'Full Speed Ahead', 'Open Arms', 'Warrior of the Mind']
    },
    {
      id: 'polyphemus-cave',
      name: 'Polyphemus\'s Cave',
      latitude: 37.0902,
      longitude: 25.1536,
      description: 'The cave of the cyclops Polyphemus.',
      saga: 'cyclops-saga',
      significance: 'Where Odysseus revealed his name and doomed his crew',
      songs: ['Polyphemus', 'Survive', 'Remember Them', 'My Goodbye']
    },
    {
      id: 'poseidon-ocean',
      name: 'Poseidon\'s Domain',
      latitude: 36.5000,
      longitude: 23.0000,
      description: 'The vast ocean where Poseidon rules.',
      saga: 'ocean-saga',
      significance: 'Where Poseidon taught Odysseus about ruthlessness',
      songs: ['Storm', 'Luck Runs Out', 'Keep Your Friends Close', 'Ruthlessness']
    },
    {
      id: 'circe-island',
      name: 'Circe\'s Island',
      latitude: 41.2033,
      longitude: 13.0667,
      description: 'The island of the powerful sorceress Circe.',
      saga: 'circe-saga',
      significance: 'Where Odysseus learned there are other ways',
      songs: ['Puppeteer', 'Wouldn\'t You Like', 'Done For', 'There Are Other Ways']
    },
    {
      id: 'underworld',
      name: 'The Underworld',
      latitude: 38.0000,
      longitude: 22.0000,
      description: 'The realm of the dead where Odysseus spoke to the prophet.',
      saga: 'underworld-saga',
      significance: 'Where Odysseus learned he was becoming a monster',
      songs: ['The Underworld', 'No Longer You', 'Monster']
    },
    {
      id: 'scylla-strait',
      name: 'Scylla\'s Strait',
      latitude: 38.2500,
      longitude: 15.6333,
      description: 'The dangerous strait guarded by the six-headed monster Scylla.',
      saga: 'thunder-saga',
      significance: 'Where Odysseus sacrificed six men to save the rest',
      songs: ['Suffering', 'Different Beast', 'Scylla', 'Mutiny', 'Thunder Bringer']
    },
    {
      id: 'calypso-island',
      name: 'Calypso\'s Island',
      latitude: 35.0000,
      longitude: 18.0000,
      description: 'The paradise island where Calypso held Odysseus for seven years.',
      saga: 'wisdom-saga',
      significance: 'Where Athena played the God Games to free Odysseus',
      songs: ['Legendary', 'Little Wolf', 'We\'ll Be Fine', 'Love in Paradise', 'God Games']
    },
    {
      id: 'ithaca',
      name: 'Ithaca',
      latitude: 38.3667,
      longitude: 20.7167,
      description: 'The home island of Odysseus, where his family waits.',
      saga: 'ithaca-saga',
      significance: 'Where Odysseus finally returns and reclaims his throne',
      songs: ['The Challenge', 'Hold Them Down', 'Odysseus', 'I Can\'t Help But Wonder']
    },
  ];

  static getAllLocations(): EpicMapLocation[] {
    return this.epicLocations;
  }

  static getLocationsBySaga(saga: string): EpicMapLocation[] {
    if (!saga) return this.epicLocations;
    return this.epicLocations.filter(location => location.saga === saga);
  }

  static getLocationById(id: string): EpicMapLocation | undefined {
    return this.epicLocations.find(location => location.id === id);
  }
}