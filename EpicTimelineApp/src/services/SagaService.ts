import { Saga } from '../types';

export class SagaService {
  private static sagas: Saga[] = [
    {
      id: 'troy-saga',
      name: 'The Troy Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'The Horse and the Infant, Just a Man, Full Speed Ahead, Open Arms, Warrior of the Mind',
      period: 'EPIC: The Musical',
    },
    {
      id: 'cyclops-saga',
      name: 'The Cyclops Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Polyphemus, Survive, Remember Them, My Goodbye',
      period: 'EPIC: The Musical',
    },
    {
      id: 'ocean-saga',
      name: 'The Ocean Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Storm, Luck Runs Out, Keep Your Friends Close, Ruthlessness',
      period: 'EPIC: The Musical',
    },
    {
      id: 'circe-saga',
      name: 'The Circe Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Puppeteer, Wouldn\'t You Like, Done For, There Are Other Ways',
      period: 'EPIC: The Musical',
    },
    {
      id: 'underworld-saga',
      name: 'The Underworld Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'The Underworld, No Longer You, Monster',
      period: 'EPIC: The Musical',
    },
    {
      id: 'thunder-saga',
      name: 'The Thunder Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Suffering, Different Beast, Scylla, Mutiny, Thunder Bringer',
      period: 'EPIC: The Musical',
    },
    {
      id: 'wisdom-saga',
      name: 'The Wisdom Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Legendary, Little Wolf, We\'ll Be Fine, Love in Paradise, God Games',
      period: 'EPIC: The Musical',
    },
    {
      id: 'vengeance-saga',
      name: 'The Vengeance Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'Not Sorry for Loving You, Dangerous, Charybdis, Get in the Water, 600 Strike',
      period: 'EPIC: The Musical',
    },
    {
      id: 'ithaca-saga',
      name: 'The Ithaca Saga',
      author: 'Jorge Rivera-Herrans',
      description: 'The Challenge, Hold Them Down, Odysseus, I Can\'t Help But Wonder',
      period: 'EPIC: The Musical',
    },
  ];

  static async getAllSagas(): Promise<Saga[]> {
    return this.sagas;
  }
}