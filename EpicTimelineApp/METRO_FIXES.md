# • Fix Metro/React Native Maps Issues

## Quick Fix Commands

Run these commands in your **EpicTimelineApp** directory:

```bash
# 1. Clear all caches
npx expo install --fix
rm -rf node_modules
npm install

# 2. Clear Metro cache  
npx expo start --clear

# 3. If on iOS simulator, reset it
npx expo run:ios --clear-cache

# 4. If still having issues, reinstall maps
npx expo install react-native-maps expo-maps
```

## Issue Analysis

From your console screenshot, the main problems are:

### • Metro Bundle Errors
- **Native module compilation issues**
- **Cache corruption from switching map components**
- **React Native Maps WebView dependencies**

### • Component Reference Error  
- **EpicJourneyMap reference still exists somewhere**
- **Import path conflicts**

## • Step-by-Step Resolution

### Step 1: Clean Install
```bash
cd EpicTimelineApp
rm -rf node_modules
rm package-lock.json
npm install
```

### Step 2: Clear Metro Cache
```bash
npx expo start --clear
```

### Step 3: Test Basic Map
Try using a simpler map component first to verify React Native Maps works:

```typescript
// Temporary test in MapScreen.tsx
import MapView from 'react-native-maps';

// Replace EpicGoogleMap temporarily with:
<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 38.0,
    longitude: 20.0,
    latitudeDelta: 12.0,
    longitudeDelta: 15.0,
  }}
/>
```

### Step 4: Update Expo if Needed
```bash
npx expo install --fix
```

## • Alternative: Fallback to SVG Map

If React Native Maps continues to have issues, we can:

1. **Keep using EpicJourneyMap** (SVG-based) for now
2. **Add Google Maps as optional enhancement**
3. **Implement progressive loading**

```typescript
// Hybrid approach in MapScreen.tsx
const useGoogleMaps = false; // Toggle this

return (
  <View style={styles.mapWrapper}>
    {useGoogleMaps ? (
      <EpicGoogleMap 
        selectedSaga={selectedSaga}
        onLocationSelect={handleLocationSelect}
      />
    ) : (
      <EpicJourneyMap 
        selectedSaga={selectedSaga}
        onLocationSelect={handleLocationSelect}
      />
    )}
  </View>
);
```

## • Expected Result

After clearing caches and reinstalling:
- Metro bundler should compile successfully
- No more native module errors
- Map component loads without crashes
- Spotify integration continues to work with Axios

## • If Problems Persist

1. **Use SVG map for now** (it was working fine)
2. **Focus on Spotify integration** (already working)
3. **Add Google Maps later** as enhancement

The core app functionality (music, sagas, interactions) will work perfectly with either map solution.
