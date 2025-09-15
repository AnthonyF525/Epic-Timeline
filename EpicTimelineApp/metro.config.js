const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable development sounds
config.resolver = {
  ...config.resolver,
  platforms: ['ios', 'android', 'native', 'web'],
};

config.server = {
  ...config.server,
  enableVisualizer: false,
};

module.exports = config;
