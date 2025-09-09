const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add SVG transformer configuration
config.transformer = {
	...config.transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
	...config.resolver,
	assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
	sourceExts: [...config.resolver.sourceExts, "svg"],
	// Keep your existing resolver options
	sourceExts: [...config.resolver.sourceExts, "svg", "cjs"],
	unstable_enablePackageExports: false,
};

module.exports = config;
