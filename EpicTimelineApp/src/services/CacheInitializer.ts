/**
 * CacheInitializer - Handles intelligent cache initialization for Epic Timeline
 * P2 Task: Preload and manage Troy data caching for optimal performance
 * 
 * This service initializes the cache system when the app starts and manages
 * background refreshing of Troy data to ensure optimal user experience.
 */

import EventService from './EventService';
import CacheService from './CacheService';

export interface CacheInitConfig {
  preloadTroyData: boolean;
  backgroundRefresh: boolean;
  refreshIntervalMinutes: number;
  enableDevelopmentMode: boolean;
}

class CacheInitializer {
  private refreshInterval: NodeJS.Timeout | null = null;
  private isInitialized = false;
  
  private config: CacheInitConfig = {
    preloadTroyData: true,
    backgroundRefresh: true,
    refreshIntervalMinutes: 30, // Refresh every 30 minutes
    enableDevelopmentMode: false,
  };

  /**
   * Configure cache initialization
   */
  public configure(config: Partial<CacheInitConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('⚙️ CacheInitializer configured:', this.config);
  }

  /**
   * Initialize the cache system
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('📦 Cache system already initialized');
      return;
    }

    console.log('🚀 Initializing Epic Timeline cache system...');

    try {
      // Configure cache service with optimal settings for Troy data
      CacheService.configure({
        maxEntries: 150,
        defaultTtl: 5 * 60 * 1000, // 5 minutes default
        troyDataTtl: 20 * 60 * 1000, // 20 minutes for Troy data
        characterDataTtl: 15 * 60 * 1000, // 15 minutes for character data
      });

      // Preload Troy data if enabled
      if (this.config.preloadTroyData) {
        await this.preloadCriticalData();
      }

      // Setup background refresh if enabled
      if (this.config.backgroundRefresh) {
        this.setupBackgroundRefresh();
      }

      this.isInitialized = true;
      console.log('✅ Cache system initialization complete');
      console.log(EventService.getCacheStatus());

    } catch (error) {
      console.error('❌ Cache initialization failed:', error);
    }
  }

  /**
   * Preload critical data for immediate availability
   */
  private async preloadCriticalData(): Promise<void> {
    console.log('⏳ Preloading critical Troy data...');

    try {
      // Preload Troy events (main P2 requirement)
      await EventService.preloadTroyData();

      // Log cache status after preloading
      const stats = EventService.getCacheStats();
      console.log(`📊 Cache after preload: ${stats.totalEntries} entries, Troy cached: ${stats.troyDataCached}`);

    } catch (error) {
      console.error('❌ Error preloading critical data:', error);
    }
  }

  /**
   * Setup background refresh of Troy data
   */
  private setupBackgroundRefresh(): void {
    const intervalMs = this.config.refreshIntervalMinutes * 60 * 1000;
    
    this.refreshInterval = setInterval(async () => {
      try {
        if (EventService.shouldRefreshTroyData()) {
          console.log('🔄 Background refresh: Updating Troy data...');
          await EventService.refreshTroyCache();
          console.log('✅ Background refresh: Troy data updated');
        }
      } catch (error) {
        console.error('❌ Background refresh failed:', error);
      }
    }, intervalMs);

    console.log(`⏰ Background refresh scheduled every ${this.config.refreshIntervalMinutes} minutes`);
  }

  /**
   * Force refresh all cached data
   */
  public async forceRefresh(): Promise<void> {
    console.log('🔄 Force refreshing all cache data...');
    
    try {
      EventService.clearCache();
      await this.preloadCriticalData();
      console.log('✅ Force refresh complete');
    } catch (error) {
      console.error('❌ Force refresh failed:', error);
    }
  }

  /**
   * Get cache health status
   */
  public getCacheHealth(): { status: 'healthy' | 'warning' | 'error'; details: any } {
    const stats = EventService.getCacheStats();
    
    // Determine health based on Troy data availability and hit rate
    let status: 'healthy' | 'warning' | 'error' = 'healthy';
    
    if (!stats.troyDataCached) {
      status = 'warning';
    }
    
    if (stats.hitRate < 30 && stats.totalEntries > 5) {
      status = 'warning';
    }
    
    if (stats.totalEntries === 0) {
      status = 'error';
    }

    return {
      status,
      details: {
        ...stats,
        summary: EventService.getCacheStatus(),
        backgroundRefreshActive: this.refreshInterval !== null,
        isInitialized: this.isInitialized
      }
    };
  }

  /**
   * Stop background services
   */
  public stop(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      console.log('⏹️ Background refresh stopped');
    }
  }

  /**
   * Restart background services
   */
  public restart(): void {
    this.stop();
    if (this.config.backgroundRefresh) {
      this.setupBackgroundRefresh();
    }
  }

  /**
   * Get detailed cache metrics for debugging
   */
  public getDetailedMetrics(): any {
    const stats = EventService.getCacheStats();
    const health = this.getCacheHealth();
    
    return {
      cache: stats,
      health: health.status,
      config: this.config,
      initialized: this.isInitialized,
      backgroundRefreshActive: this.refreshInterval !== null,
      troyDataAge: stats.lastTroyUpdate ? Date.now() - stats.lastTroyUpdate : null,
      recommendations: this.generateRecommendations(stats)
    };
  }

  /**
   * Generate performance recommendations based on cache stats
   */
  private generateRecommendations(stats: any): string[] {
    const recommendations: string[] = [];
    
    if (!stats.troyDataCached) {
      recommendations.push('⚠️ Troy data not cached - consider preloading');
    }
    
    if (stats.hitRate < 50 && stats.totalEntries > 10) {
      recommendations.push('📊 Low cache hit rate - consider longer TTL values');
    }
    
    if (stats.memoryUsage > 10 * 1024 * 1024) { // 10MB
      recommendations.push('💾 High memory usage - consider reducing cache size');
    }
    
    if (stats.totalEntries > 100) {
      recommendations.push('📦 Large cache size - monitoring recommended');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Cache performance is optimal');
    }
    
    return recommendations;
  }
}

// Export singleton instance
export default new CacheInitializer();
