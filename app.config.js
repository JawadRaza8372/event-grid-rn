import "dotenv/config";
import appJson from "./app.json";

export default ({ config }) => ({
	...appJson.expo, // load values from app.json
	...config, // include base config from Expo
	extra: {
		...appJson.expo.extra,
		stripePublishKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHKEY,
	},
});
