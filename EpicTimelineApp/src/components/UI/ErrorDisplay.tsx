/**
 * Enhanced Error Display Components with Retry Functionality
 * Provides comprehensive error handling UI for the Epic Timeline app
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';

export interface ErrorDisplayProps {
  error: {
    type: 'network' | 'server' | 'timeout' | 'parse' | 'unknown';
    message: string;
    retryable: boolean;
    statusCode?: number;
    lastAttempt?: Date;
    attemptCount?: number;
  };
  onRetry?: () => Promise<void>;
  onDismiss?: () => void;
  style?: any;
  showRetryButton?: boolean;
  showDismissButton?: boolean;
  maxRetryAttempts?: number;
}

/**
 * Enhanced error display with retry functionality
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
  style,
  showRetryButton = true,
  showDismissButton = true,
  maxRetryAttempts = 3
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(error.attemptCount || 0);
  
  const fadeAnim = new Animated.Value(1);

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return '•';
      case 'server':
        return '•';
      case 'timeout':
        return '⏱';
      case 'parse':
        return '•';
      default:
        return '⚠';
    }
  };

  const getErrorTitle = () => {
    switch (error.type) {
      case 'network':
        return 'Connection Problem';
      case 'server':
        return 'Server Error';
      case 'timeout':
        return 'Request Timeout';
      case 'parse':
        return 'Data Format Error';
      default:
        return 'Unknown Error';
    }
  };

  const getErrorDescription = () => {
    switch (error.type) {
      case 'network':
        return 'Please check your internet connection and try again.';
      case 'server':
        return 'The server is experiencing issues. This usually resolves quickly.';
      case 'timeout':
        return 'The request took too long to complete. The server may be busy.';
      case 'parse':
        return 'The server returned unexpected data. This may be a temporary issue.';
      default:
        return 'An unexpected error occurred.';
    }
  };

  const handleRetry = async () => {
    if (!onRetry || isRetrying) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
      setRetryCount(prev => prev + 1);
    } catch (retryError) {
      console.error('Retry failed:', retryError);
      Alert.alert(
        'Retry Failed',
        'The retry attempt was unsuccessful. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsRetrying(false);
    }
  };

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  };

  const canRetry = error.retryable && showRetryButton && retryCount < maxRetryAttempts;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, style]}>
      <View style={[styles.errorCard, { borderLeftColor: getErrorBorderColor() }]}>
        <View style={styles.header}>
          <Text style={styles.icon}>{getErrorIcon()}</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{getErrorTitle()}</Text>
            {error.statusCode && (
              <Text style={styles.statusCode}>Error {error.statusCode}</Text>
            )}
          </View>
        </View>
        
        <Text style={styles.message}>{error.message}</Text>
        <Text style={styles.description}>{getErrorDescription()}</Text>
        
        {error.lastAttempt && (
          <Text style={styles.timestamp}>
            Last attempt: {error.lastAttempt.toLocaleTimeString()}
          </Text>
        )}
        
        <View style={styles.buttonContainer}>
          {canRetry && (
            <TouchableOpacity
              style={[styles.button, styles.retryButton]}
              onPress={handleRetry}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.retryButtonText}>
                  ↻ Retry ({maxRetryAttempts - retryCount} left)
                </Text>
              )}
            </TouchableOpacity>
          )}
          
          {showDismissButton && (
            <TouchableOpacity
              style={[styles.button, styles.dismissButton]}
              onPress={handleDismiss}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
  
  function getErrorBorderColor() {
    switch (error.type) {
      case 'network':
        return '#FF6B6B';
      case 'server':
        return '#FFA500';
      case 'timeout':
        return '#FFD700';
      case 'parse':
        return '#8A2BE2';
      default:
        return '#808080';
    }
  }
};

/**
 * Compact error banner for inline display
 */
export const ErrorBanner: React.FC<{
  message: string;
  type: 'warning' | 'error' | 'info';
  onRetry?: () => void;
  onDismiss?: () => void;
}> = ({ message, type, onRetry, onDismiss }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return '#FF6B6B20';
      case 'warning':
        return '#FFA50020';
      case 'info':
        return '#4169E120';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'error':
        return '#D32F2F';
      case 'warning':
        return '#F57C00';
      case 'info':
        return '#1976D2';
    }
  };

  return (
    <View style={[styles.banner, { backgroundColor: getBackgroundColor() }]}>
      <Text style={[styles.bannerText, { color: getTextColor() }]}>
        {message}
      </Text>
      <View style={styles.bannerActions}>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} style={styles.bannerButton}>
            <Text style={[styles.bannerButtonText, { color: getTextColor() }]}>
              Retry
            </Text>
          </TouchableOpacity>
        )}
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.bannerButton}>
            <Text style={[styles.bannerButtonText, { color: getTextColor() }]}>
              ×
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

/**
 * Loading state with retry information
 */
export const LoadingWithRetry: React.FC<{
  message: string;
  attemptNumber?: number;
  maxAttempts?: number;
  onCancel?: () => void;
}> = ({ message, attemptNumber, maxAttempts, onCancel }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.loadingMessage}>{message}</Text>
      {attemptNumber && maxAttempts && (
        <Text style={styles.attemptInfo}>
          Attempt {attemptNumber} of {maxAttempts}
        </Text>
      )}
      {onCancel && (
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  errorCard: {
    backgroundColor: '#1A1A2E',
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statusCode: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: 'monospace',
  },
  message: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 12,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 10,
    color: '#808080',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#4A90E2',
  },
  dismissButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#606060',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dismissButtonText: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  bannerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bannerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bannerButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessage: {
    marginTop: 12,
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  attemptInfo: {
    marginTop: 8,
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#E0E0E0',
    fontSize: 12,
  },
});

export default ErrorDisplay;
