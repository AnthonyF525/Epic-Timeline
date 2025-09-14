export enum CharacterType {
    MORTAL = 'MORTAL',
    GOD = 'GOD',
    MONSTER = 'MONSTER'
}

export const CharacterTypeDisplay: Record<CharacterType, string> = {
    [CharacterType.MORTAL]: 'Mortal',
    [CharacterType.GOD]: 'God',
    [CharacterType.MONSTER]: 'Monster'
};

export type CharacterTypeKey = keyof typeof CharacterType;