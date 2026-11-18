const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 *
 * Debug builds skip JS bundling, so the physical Android app loads from this
 * packager. The watcher health check recrawls if macOS FSEvents drop a save.
 */
const config = {
  watcher: {
    healthCheck: {
      enabled: true,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
