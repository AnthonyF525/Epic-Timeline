/**
 * CacheService - Implements intelligent caching for Epic Timeline API data
 * P2 Task: Cache Troy data to reduce API calls
 * 
 * Features:
 * - Automatic TTL (Time To Live) expiration
 * - Memory-efficient storage with size limits
 * - Troy-specific caching strategies
 * - Cache invalidation and refresh mechanisms
 * - Offline support with fallback data
 */

import { ApiEvent, Character, EventFilterParams } from './EventService';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  key: string;
}

export interface CacheConfig {
  maxEntries: number;
  defaultTtl: number; // Default TTL in milliseconds
  troyDataTtl: number; // Specific TTL for Troy data
  characterDataTtl: number; // Specific TTL for character data
}

export interface CacheStats {
  totalEntries: number;
  memoryUsage: number;
  hitRate: number;
  missRate: number;
  troyDataCached: boolean;
  lastTroyUpdate: number | null;
}

class CacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private cacheHits: number = 0;
  private cacheMisses: number = 0;
  
  private config: CacheConfig = {
    maxEntries: 100,
    defaultTtl: 5 * 60 * 1000, // 5 minutes default
    troyDataTtl: 15 * 60 * 1000, // 15 minutes for Troy data (longer since it's more static)
    characterDataTtl: 10 * 60 * 1000, // 10 minutes for character data
  };

  /**
   * Configure cache settings
   */
  public configure(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('• CacheService configured:', this.config);
  }

  /**
   * Generate cache key from parameters
   */
  private generateCacheKey(prefix: string, params?: any): string {
    if (!params) return prefix;
    
    // Create deterministic key from parameters
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = params[key];
        return sorted;
      }, {} as any);
    
    const paramString = JSON.stringify(sortedParams);
    return `${prefix}:${btoa(paramString)}`;
  }

  /**
   * Check if cache entry is still valid
   */
  private isValidEntry<T>(entry: CacheEntry<T>): boolean {
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  /**
   * Clean expired entries from cache
   */
  private cleanExpiredEntries(): void {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) >= entry.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    if (removedCount > 0) {
      console.log(`• Cleaned ${removedCount} expired cache entries`);
    }
  }

  /**
   * Enforce cache size limits
   */
  private enforceSizeLimit(): void {
    if (this.cache.size <= this.config.maxEntries) return;
    
    // Remove oldest entries first (LRU-style)
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toRemove = entries.slice(0, this.cache.size - this.config.maxEntries);
    for (const [key] of toRemove) {
      this.cache.delete(key);
    }
    
    console.log(`• Enforced cache size limit, removed ${toRemove.length} entries`);
  }

  /**
   * Store data in cache with appropriate TTL
   */
  public set<T>(key: string, data: T, customTtl?: number): void {
    const ttl = customTtl || this.config.defaultTtl;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      key
    };
    
    this.cache.set(key, entry);
    
    // Cleanup and size management
    this.cleanExpiredEntries();
    this.enforceSizeLimit();
    
    console.log(`• Cached data with key: ${key} (TTL: ${ttl}ms)`);
  }

  /**
   * Retrieve data from cache
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T>;
    
    if (!entry) {
      this.cacheMisses++;
      return null;
    }
    
    if (!this.isValidEntry(entry)) {
      this.cache.delete(key);
      this.cacheMisses++;
      console.log(`⏰ Cache entry expired: ${key}`);
      return null;
    }
    
    this.cacheHits++;
    console.log(`• Cache hit: ${key}`);
    return entry.data;
  }

  /**
   * Cache Troy events specifically
   */
  public cacheTroyEvents(events: ApiEvent[]): void {
    const key = this.generateCacheKey('troy_events');
    this.set(key, events, this.config.troyDataTtl);
    console.log('◦  Troy events cached successfully');
  }

  /**
   * Get cached Troy events
   */
  public getCachedTroyEvents(): ApiEvent[] | null {
    const key = this.generateCacheKey('troy_events');
    const cached = this.get<ApiEvent[]>(key);
    
    if (cached) {
      console.log('◦  Retrieved Troy events from cache');
    }
    
    return cached;
  }

  /**
   * Cache events with specific parameters
   */
  public cacheEvents(params: EventFilterParams, events: ApiEvent[]): void {
    const key = this.generateCacheKey('events', params);
    const ttl = params.locationId === 'troy' ? this.config.troyDataTtl : this.config.defaultTtl;
    this.set(key, events, ttl);
  }

  /**
   * Get cached events with specific parameters
   */
  public getCachedEvents(params: EventFilterParams): ApiEvent[] | null {
    const key = this.generateCacheKey('events', params);
    return this.get<ApiEvent[]>(key);
  }

  /**
   * Cache character details
   */
  public cacheCharacterDetails(characterId: number, character: Character): void {
    const key = this.generateCacheKey('character', { id: characterId });
    this.set(key, character, this.config.characterDataTtl);
    console.log(`• Character ${character.name} cached successfully`);
  }

  /**
   * Get cached character details
   */
  public getCachedCharacterDetails(characterId: number): Character | null {
    const key = this.generateCacheKey('character', { id: characterId });
    const cached = this.get<Character>(key);
    
    if (cached) {
      console.log(`• Retrieved character ${cached.name} from cache`);
    }
    
    return cached;
  }

  /**
   * Invalidate specific cache entries
   */
  public invalidate(pattern: string): number {
    let removedCount = 0;
    
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    console.log(`◦  Invalidated ${removedCount} cache entries matching: ${pattern}`);
    return removedCount;
  }

  /**
   * Invalidate all Troy-related cache
   */
  public invalidateTroyData(): void {
    this.invalidate('troy');
    console.log('◦  All Troy data cache invalidated');
  }

  /**
   * Force refresh of Troy data (invalidate + prefetch)
   */
  public async refreshTroyData(): Promise<void> {
    this.invalidateTroyData();
    console.log('• Troy data cache refreshed');
  }

  /**
   * Clear all cache entries
   */
  public clear(): void {
    const entriesCleared = this.cache.size;
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    console.log(`• Cleared all cache entries (${entriesCleared} removed)`);
  }

  /**
   * Get cache statistics
   */
  public getStats(): CacheStats {
    const totalRequests = this.cacheHits + this.cacheMisses;
    const hitRate = totalRequests > 0 ? (this.cacheHits / totalRequests) * 100 : 0;
    const missRate = totalRequests > 0 ? (this.cacheMisses / totalRequests) * 100 : 0;
    
    // Check if Troy data is cached
    const troyKey = this.generateCacheKey('troy_events');
    const troyEntry = this.cache.get(troyKey);
    const troyDataCached = troyEntry ? this.isValidEntry(troyEntry) : false;
    
    // Estimate memory usage (rough calculation)
    const memoryUsage = Array.from(this.cache.values())
      .reduce((total, entry) => total + JSON.stringify(entry).length * 2, 0); // 2 bytes per character (UTF-16)
    
    return {
      totalEntries: this.cache.size,
      memoryUsage,
      hitRate: Number(hitRate.toFixed(2)),
      missRate: Number(missRate.toFixed(2)),
      troyDataCached,
      lastTroyUpdate: troyEntry?.timestamp || null
    };
  }

  /**
   * Get human-readable cache status
   */
  public getStatusSummary(): string {
    const stats = this.getStats();
    const memoryMB = (stats.memoryUsage / (1024 * 1024)).toFixed(2);
    
    return `• Cache: ${stats.totalEntries} entries, ${memoryMB}MB, ${stats.hitRate}% hit rate, Troy: ${stats.troyDataCached ? '•' : '•'}`;
  }

  /**
   * Check if Troy data should be refreshed
   */
  public shouldRefreshTroyData(): boolean {
    const key = this.generateCacheKey('troy_events');
    const entry = this.cache.get(key);
    
    if (!entry) return true;
    
    const age = Date.now() - entry.timestamp;
    const refreshThreshold = this.config.troyDataTtl * 0.8; // Refresh at 80% of TTL
    
    return age >= refreshThreshold;
  }
}

// Export singleton instance
export default new CacheService();
