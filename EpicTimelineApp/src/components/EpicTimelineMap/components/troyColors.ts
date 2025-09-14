export const TROY_SAGA_COLORS = {
  // Primary Troy colors - bronze/copper theme for ancient warfare
  primary: '#CD7F32', // Bronze
  secondary: '#B8860B', // Dark Golden Rod
  accent: '#8B4513', // Saddle Brown
  
  // War/Fire colors for the siege
  fire: '#FF4500', // Orange Red
  ember: '#DC143C', // Crimson
  smoke: '#2F4F4F', // Dark Slate Gray
  
  // Royal colors for King Priam/Hector
  royal: '#4B0082', // Indigo
  gold: '#FFD700', // Gold
  
  // Text and UI
  text: '#FFFAF0', // Floral White
  textSecondary: '#F5DEB3', // Wheat
  background: '#1C1C1C', // Very Dark
  
  // States
  selected: '#FF6347', // Tomato
  hover: '#FF7F50', // Coral
  disabled: '#696969', // Dim Gray
} as const;

export const TROY_GRADIENT = [
  TROY_SAGA_COLORS.primary,
  TROY_SAGA_COLORS.fire,
  TROY_SAGA_COLORS.gold
];