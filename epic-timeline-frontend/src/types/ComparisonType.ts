export enum ComparisonType {
    MUSICAL_INSPIRATION = 'MUSICAL_INSPIRATION',
    HISTORICAL_EVENT = 'HISTORICAL_EVENT',
    MYTHOLOGICAL_SOURCE = 'MYTHOLOGICAL_SOURCE',
    LITERARY_REFERENCE = 'LITERARY_REFERENCE'
}

export const ComparisonTypeDisplay: Record<ComparisonType, string> = {
    [ComparisonType.MUSICAL_INSPIRATION]: 'Musical Inspiration',
    [ComparisonType.HISTORICAL_EVENT]: 'Historical Event',
    [ComparisonType.MYTHOLOGICAL_SOURCE]: 'Mythological Source',
    [ComparisonType.LITERARY_REFERENCE]: 'Literary Reference'
};

export const ComparisonTypeColors: Record<ComparisonType, string> = {
  [ComparisonType.MUSICAL_INSPIRATION]: '#9333ea', // purple
  [ComparisonType.HISTORICAL_EVENT]: '#dc2626',    // red
  [ComparisonType.MYTHOLOGICAL_SOURCE]: '#059669', // green
  [ComparisonType.LITERARY_REFERENCE]: '#2563eb'   // blue
};

export type ComparisonTypeKey = keyof typeof ComparisonType;