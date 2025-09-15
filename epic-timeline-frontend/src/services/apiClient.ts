import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// ✓ Epic Timeline API Configuration
interface EpicApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

// ✓ Environment-based configuration
const getApiConfig = (): EpicApiConfig => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    baseURL: isDevelopment 
      ? 'http://localhost:8080/api'  // Development - your Spring Boot backend
      : process.env.REACT_APP_API_BASE_URL || 'https://epic-timeline-api.com/api', // Production
    timeout: 15000, // 15 seconds for potentially large Epic data
    retryAttempts: 3,
    retryDelay: 1000, // 1 second between retries
  };
};

// ✓ Create base API client with Epic Timeline configuration
const createApiClient = (): AxiosInstance => {
  const config = getApiConfig();
  
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client': 'Epic-Timeline-Frontend',
      'X-Client-Version': '1.0.0',
    },
  });

  // ✓ Request interceptor with Epic Timeline branding
  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const timestamp = new Date().toISOString();
      console.log(`• [${timestamp}] Epic Timeline API Request:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        params: config.params,
      });

      // Add request ID for tracking
      config.headers = {
        ...config.headers,
        'X-Request-ID': `epic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      return config;
    },
    (error) => {
      console.error('ERROR Epic Timeline API Request Setup Error:', error);
      return Promise.reject(error);
    }
  );

  // ✓ Response interceptor with Epic Timeline error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const timestamp = new Date().toISOString();
      console.log(`✓ [${timestamp}] Epic Timeline API Success:`, {
        status: response.status,
        url: response.config.url,
        dataSize: JSON.stringify(response.data).length,
        requestId: response.config.headers?.['X-Request-ID'],
      });

      // Add Epic Timeline metadata to response
      response.data = {
        ...response.data,
        _epicMeta: {
          requestId: response.config.headers?.['X-Request-ID'],
          timestamp,
          endpoint: response.config.url,
          status: response.status,
        },
      };

      return response;
    },
    async (error) => {
      const timestamp = new Date().toISOString();
      const config = getApiConfig();

      console.error(`ERROR [${timestamp}] Epic Timeline API Error:`, {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
        requestId: error.config?.headers?.['X-Request-ID'],
      });

      // ✓ Epic Timeline specific error handling
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.warn('• Bad Request - Check your Epic Timeline request parameters');
            break;
          case 401:
            console.warn('AUTH Unauthorized - Epic Timeline authentication required');
            break;
          case 403:
            console.warn('⚠ Forbidden - Epic Timeline access denied');
            break;
          case 404:
            console.warn('• Not Found - Epic Timeline resource does not exist');
            break;
          case 429:
            console.warn('•• Too Many Requests - Epic Timeline rate limit exceeded');
            break;
          case 500:
            console.error('•• Internal Server Error - Epic Timeline backend issue');
            break;
          case 502:
            console.error('✗ Bad Gateway - Epic Timeline backend unreachable');
            break;
          case 503:
            console.error('• Service Unavailable - Epic Timeline backend maintenance');
            break;
          default:
            console.error(`ERROR Unexpected Error (${error.response.status}) - Epic Timeline API`);
        }
      } else if (error.request) {
        console.error('✗ Network Error - Cannot reach Epic Timeline backend');
      } else {
        console.error('•• Request Setup Error - Epic Timeline client configuration issue');
      }

      // ✓ Retry logic for Epic Timeline
      const shouldRetry = (
        error.response?.status === 429 || // Rate limit
        error.response?.status >= 500 ||  // Server errors
        !error.response // Network errors
      );

      if (shouldRetry && error.config && !error.config._retry) {
        error.config._retryCount = error.config._retryCount || 0;
        
        if (error.config._retryCount < config.retryAttempts) {
          error.config._retryCount++;
          error.config._retry = true;

          console.log(`RETRY Retrying Epic Timeline request (${error.config._retryCount}/${config.retryAttempts})`);
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, config.retryDelay));
          
          return client(error.config);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// ✓ Create the Epic Timeline API client instance
export const apiClient = createApiClient();

// ✓ Epic Timeline API health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    console.log('SUCCESS Epic Timeline API is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('•• Epic Timeline API health check failed:', error);
    return false;
  }
};

// ✓ Epic Timeline API configuration utilities
export const getApiBaseUrl = (): string => {
  return getApiConfig().baseURL;
};

export const isApiHealthy = async (): Promise<boolean> => {
  return checkApiHealth();
};

// ✓ Epic Timeline request wrapper with type safety
export const epicRequest = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(url, config),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post<T>(url, data, config),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put<T>(url, data, config),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(url, config),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch<T>(url, data, config),
};

// ✓ Export default client
export default apiClient;

// ✓ Epic Timeline API metrics (for monitoring)
export const getApiMetrics = () => {
  return {
    baseURL: getApiConfig().baseURL,
    timeout: getApiConfig().timeout,
    clientVersion: '1.0.0',
    timestamp: new Date().toISOString(),
  };
};