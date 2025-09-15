# EPIC Timeline - Quick Spotify Setup

## For Real 30-Second Previews

### Step 1: Get Spotify Credentials
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app called "EPIC Timeline"
3. Set redirect URI to `http://localhost:8083`
4. Copy your Client ID

### Step 2: Configure the App
```bash
# Add to your environment or update RealSpotifyService.ts
export EXPO_PUBLIC_SPOTIFY_CLIENT_ID="your_actual_client_id_here"
export EXPO_PUBLIC_SPOTIFY_REDIRECT_URI="http://localhost:8083"
```

### Step 3: Test the Integration
1. Open the app at http://localhost:8083
2. Click "Connect Spotify for Previews" button
3. Authenticate in the popup window
4. Click any ▶ button to play 30-second previews!

## What You Get:
- **Real 30-second Spotify previews** from EPIC: The Musical
- **Automatic fallback to YouTube** if Spotify fails
- **Smart authentication** with visual status indicators
- **Works on both map types** (Real Mediterranean & Artistic)

## Without Spotify Setup:
- The app works perfectly with YouTube fallback
- All features functional, just opens YouTube search instead of playing previews
- No loss of functionality!

Ready to experience Odysseus's journey with authentic music!
