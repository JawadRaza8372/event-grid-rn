import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fbIcon from "../assets/images/fb-icon.png";
import googleIcon from "../assets/images/google-icon.png";
import instaIcon from "../assets/images/insta-icon.png";
import { useThemeColors } from "../hooks/useThemeColors";

const SocialContainer = ({ onGooglePress, onFacebookPress, onInstaPress }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainBtn: {
			width: 59,
			height: 59,
			borderRadius: 10,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			borderWidth: 1,
			borderColor: colors.socialBorderColor,
		},
		btnIcon: {
			width: 31,
			height: 31,
			resizeMode: "contain",
		},
		btnsContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 25,
		},
	});

	return (
		<View style={styles.btnsContainer}>
			<TouchableOpacity
				onPress={onGooglePress}
				style={styles.mainBtn}>
				<Image
					style={styles.btnIcon}
					source={googleIcon}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onFacebookPress}
				style={styles.mainBtn}>
				<Image
					style={styles.btnIcon}
					source={fbIcon}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onInstaPress}
				style={styles.mainBtn}>
				<Image
					style={styles.btnIcon}
					source={instaIcon}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SocialContainer;
