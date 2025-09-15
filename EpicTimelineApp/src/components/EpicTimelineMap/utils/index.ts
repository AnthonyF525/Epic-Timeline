// Utility functions for the Epic Timeline Map

// Helper function to format coordinates for display
export const formatCoordinates = (latitude: number, longitude: number): string => {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  return `${Math.abs(latitude).toFixed(2)}°${latDirection}, ${Math.abs(longitude).toFixed(2)}°${lonDirection}`;
};

// Helper function to format distance
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// Helper function to capitalize saga names
export const capitalizeSagaName = (saga: string): string => {
  return saga
    .replace('-saga', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to get saga emoji
export const getSagaEmoji = (saga: string): string => {
  switch (saga.toLowerCase()) {
    case 'troy-saga': return '◦ ';
    case 'cyclops-saga': return '◦ ';
    case 'ocean-saga': return '•';
    case 'circe-saga': return '•';
    case 'underworld-saga': return '•';
    case 'thunder-saga': return '•';
    case 'wisdom-saga': return '⚪';
    case 'vengeance-saga': return '◦ ';
    case 'ithaca-saga': return '•';
    default: return '◦ ';
  }
};

// Device type detection
export const getDeviceType = (width: number): 'phone' | 'tablet' | 'desktop' => {
  if (width < 768) return 'phone';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

// Performance utilities
export const measurePerformance = <T>(fn: () => T, label: string): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`• ${label}: ${(end - start).toFixed(2)}ms`);
  return result;
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
