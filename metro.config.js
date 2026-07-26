const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
    cssEntryFile: './src/global.css',
    dtsFile: './src/uniwind-types.d.ts'
});

module.exports.transformer = {
  ...module.exports.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

module.exports.resolver = {
  ...module.exports.resolver,
  assetExts: module.exports.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...module.exports.resolver.sourceExts, 'svg'],
};