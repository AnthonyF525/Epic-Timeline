/**
 * API Retry Utility for Epic Timeline
 * Provides robust retry mechanisms with exponential backoff and comprehensive error handling
 */

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number; // Base delay in milliseconds
  maxDelay: number; // Maximum delay in milliseconds
  backoffMultiplier: number; // Multiplier for exponential backoff
  retryOnStatusCodes?: number[]; // HTTP status codes to retry on
  retryOnNetworkError: boolean; // Whether to retry on network errors
  jitter: boolean; // Add random jitter to delay
}

export interface RetryResult<T> {
  data: T;
  attempt: number;
  totalTime: number;
  wasRetried: boolean;
  errors: Error[];
}

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  type: 'network' | 'http' | 'timeout' | 'parse' | 'unknown';
  retryable: boolean;
}

export class ApiRetryService {
  private static readonly DEFAULT_CONFIG: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffMultiplier: 2,
    retryOnStatusCodes: [408, 429, 500, 502, 503, 504],
    retryOnNetworkError: true,
    jitter: true
  };

  /**
   * Execute a function with retry logic
   */
  static async executeWithRetry<T>(
    fn: () => Promise<T>,
    config: Partial<RetryConfig> = {},
    context: string = 'API Call'
  ): Promise<RetryResult<T>> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    const errors: Error[] = [];
    const startTime = Date.now();
    
    console.log(`• Starting ${context} with retry config:`, {
      maxRetries: finalConfig.maxRetries,
      baseDelay: finalConfig.baseDelay,
      backoffMultiplier: finalConfig.backoffMultiplier
    });

    for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
      try {
        const result = await fn();
        const totalTime = Date.now() - startTime;
        
        console.log(`• ${context} succeeded on attempt ${attempt + 1}`, {
          totalTime: `${totalTime}ms`,
          wasRetried: attempt > 0
        });

        return {
          data: result,
          attempt: attempt + 1,
          totalTime,
          wasRetried: attempt > 0,
          errors
        };
      } catch (error) {
        const apiError = this.classifyError(error);
        errors.push(apiError);
        
        console.warn(`◦  ${context} failed on attempt ${attempt + 1}:`, {
          error: apiError.message,
          type: apiError.type,
          status: apiError.status,
          retryable: apiError.retryable
        });

        // Don't retry if error is not retryable or we've reached max retries
        if (!apiError.retryable || attempt >= finalConfig.maxRetries) {
          const totalTime = Date.now() - startTime;
          console.error(`• ${context} failed after ${attempt + 1} attempts`, {
            totalTime: `${totalTime}ms`,
            finalError: apiError.message,
            allErrors: errors.map(e => ({ 
              type: (e as ApiError).type || 'unknown', 
              message: e.message 
            }))
          });
          throw apiError;
        }

        // Calculate delay for next retry
        const delay = this.calculateDelay(attempt, finalConfig);
        console.log(`• Retrying ${context} in ${delay}ms (attempt ${attempt + 2}/${finalConfig.maxRetries + 1})`);
        
        await this.sleep(delay);
      }
    }

    // This should never be reached, but TypeScript requires it
    throw new Error(`Maximum retries exceeded for ${context}`);
  }

  /**
   * Classify error to determine if it's retryable
   */
  private static classifyError(error: any): ApiError {
    const apiError: ApiError = {
      name: error.name || 'ApiError',
      message: error.message || 'Unknown error',
      type: 'unknown',
      retryable: false
    };

    // Network errors (fetch fails completely)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      apiError.type = 'network';
      apiError.retryable = true;
      apiError.message = 'Network connection failed. Please check your internet connection.';
      return apiError;
    }

    // Timeout errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      apiError.type = 'timeout';
      apiError.retryable = true;
      apiError.message = 'Request timed out. The server may be busy.';
      return apiError;
    }

    // HTTP errors (response received but not ok)
    if (error.status !== undefined) {
      apiError.status = error.status;
      apiError.statusText = error.statusText;
      apiError.type = 'http';
      
      // Determine if HTTP error is retryable
      const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
      apiError.retryable = retryableStatusCodes.includes(error.status);
      
      if (error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) {
        apiError.retryable = false; // Client errors (except timeout and rate limit) are not retryable
        apiError.message = `Client error: ${error.status} ${error.statusText}`;
      } else if (error.status >= 500) {
        apiError.retryable = true; // Server errors are retryable
        apiError.message = `Server error: ${error.status} ${error.statusText}`;
      }
      
      return apiError;
    }

    // JSON parsing errors
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      apiError.type = 'parse';
      apiError.retryable = false; // Parse errors usually indicate bad data, not transient issues
      apiError.message = 'Invalid response format from server';
      return apiError;
    }

    // Default: Unknown error, not retryable
    apiError.type = 'unknown';
    apiError.retryable = false;
    apiError.message = error.message || 'An unknown error occurred';
    
    return apiError;
  }

  /**
   * Calculate delay with exponential backoff and optional jitter
   */
  private static calculateDelay(attempt: number, config: RetryConfig): number {
    const exponentialDelay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
    let delay = Math.min(exponentialDelay, config.maxDelay);
    
    // Add jitter to prevent thundering herd
    if (config.jitter) {
      const jitterAmount = delay * 0.1; // 10% jitter
      delay += (Math.random() - 0.5) * 2 * jitterAmount;
    }
    
    return Math.max(0, Math.round(delay));
  }

  /**
   * Sleep utility
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Create a fetch wrapper with timeout
   */
  static async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs: number = 10000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Enhanced fetch with built-in retry logic
   */
  static async retryFetch(
    url: string,
    options: RequestInit = {},
    retryConfig: Partial<RetryConfig> = {},
    timeoutMs: number = 10000
  ): Promise<Response> {
    const result = await this.executeWithRetry(
      () => this.fetchWithTimeout(url, options, timeoutMs),
      retryConfig,
      `Fetch ${url}`
    );
    
    return result.data;
  }
}

/**
 * Error boundary for API operations
 */
export class ApiErrorBoundary {
  private static errorCounts: Map<string, number> = new Map();
  private static lastErrors: Map<string, Date> = new Map();
  private static readonly ERROR_THRESHOLD = 5;
  private static readonly ERROR_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

  /**
   * Check if an endpoint is experiencing frequent errors
   */
  static isEndpointHealthy(endpoint: string): boolean {
    const errorCount = this.errorCounts.get(endpoint) || 0;
    const lastError = this.lastErrors.get(endpoint);
    
    if (!lastError) return true;
    
    const timeSinceLastError = Date.now() - lastError.getTime();
    
    // Reset error count if error window has passed
    if (timeSinceLastError > this.ERROR_WINDOW_MS) {
      this.errorCounts.delete(endpoint);
      this.lastErrors.delete(endpoint);
      return true;
    }
    
    return errorCount < this.ERROR_THRESHOLD;
  }

  /**
   * Record an error for an endpoint
   */
  static recordError(endpoint: string): void {
    const currentCount = this.errorCounts.get(endpoint) || 0;
    this.errorCounts.set(endpoint, currentCount + 1);
    this.lastErrors.set(endpoint, new Date());
    
    console.warn(`• Error recorded for ${endpoint}. Count: ${currentCount + 1}/${this.ERROR_THRESHOLD}`);
  }

  /**
   * Reset error count for an endpoint (call on successful request)
   */
  static resetErrors(endpoint: string): void {
    if (this.errorCounts.has(endpoint)) {
      console.log(`• Resetting error count for ${endpoint}`);
      this.errorCounts.delete(endpoint);
      this.lastErrors.delete(endpoint);
    }
  }
}

export default ApiRetryService;
