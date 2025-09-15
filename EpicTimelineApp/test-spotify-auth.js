/**
 * Test Spotify Authentication Flow
 * Run this to verify Spotify setup is working
 */

// Load environment variables from .env file
require('dotenv').config();

console.log('▶ Testing Spotify Authentication Setup...\n');

// Test environment variables
const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI;

console.log('Environment Variables:');
console.log('- Client ID:', clientId ? `${clientId.substring(0, 8)}...` : 'NOT SET');
console.log('- Redirect URI:', redirectUri || 'NOT SET');

if (!clientId) {
  console.error('✗ EXPO_PUBLIC_SPOTIFY_CLIENT_ID is not set!');
  process.exit(1);
}

if (!redirectUri) {
  console.error('✗ EXPO_PUBLIC_SPOTIFY_REDIRECT_URI is not set!');
  process.exit(1);
}

// Test Spotify service
try {
  const { realSpotifyService } = require('./src/services/RealSpotifyService.ts');
  
  console.log('\n• Spotify Service Status:');
  console.log('- Configured:', realSpotifyService.isConfigured());
  console.log('- Authenticated:', realSpotifyService.isAuthenticated());
  
  if (realSpotifyService.isConfigured()) {
    const authUrl = realSpotifyService.getAuthUrl();
    console.log('\n• Auth URL (first 100 chars):');
    console.log(authUrl.substring(0, 100) + '...');
    
    console.log('\n• Spotify setup appears to be working!');
    console.log('\nNext steps:');
    console.log('1. Start the app: npx expo start --web --port 8081');
    console.log('2. Click "Get Real Epic Songs" button');
    console.log('3. Complete Spotify authentication');
    console.log('4. Try playing a song to hear real previews!');
  } else {
    console.log('\n• Spotify service is not properly configured');
  }
  
} catch (error) {
  console.error('\n• Error testing Spotify service:', error.message);
}

console.log('\n• Test complete!');
