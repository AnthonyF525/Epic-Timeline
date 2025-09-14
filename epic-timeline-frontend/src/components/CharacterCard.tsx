import React from 'react';
import { Character, CharacterType, CharacterTypeDisplay, CharacterTypeIcons } from '../types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const getCharacterBadgeClass = (type: CharacterType): string => {
    switch (type) {
      case CharacterType.GOD:
        return 'badge-divine';
      case CharacterType.MONSTER:
        return 'badge-monster';
      case CharacterType.MORTAL:
        return 'badge-mortal';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="character-card">
      <div className="character-header">
        <h3>{character.name}</h3>
        <span className={`character-badge ${getCharacterBadgeClass(character.characterType)}`}>
          {CharacterTypeIcons[character.characterType]} {CharacterTypeDisplay[character.characterType]}
        </span>
      </div>
      
      <p className="character-description">{character.description}</p>
      
      {character.isProtagonist && (
        <span className="protagonist-badge">⭐ Protagonist</span>
      )}
      
      {character.aliases.length > 0 && (
        <div className="character-aliases">
          <strong>Also known as:</strong> {character.aliases.join(', ')}
        </div>
      )}
      
      {character.powers.length > 0 && (
        <div className="character-powers">
          <strong>Powers:</strong>
          <ul>
            {character.powers.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;