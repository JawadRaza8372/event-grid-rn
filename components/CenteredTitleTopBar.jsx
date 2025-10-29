import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const CenteredTitleTopBar = ({ title, showBackBtn }) => {
	const colors = useThemeColors();
	const router = useRouter();

	const styles = StyleSheet.create({
		screenHeaderTitle: {
			color: colors.blackColor,
			fontSize: 18,
			fontWeight: "600",
			lineHeight: 20,
			height: "auto",
			flex: 1,
			textAlign: "center",
		},
		topBarContainer: {
			width: "100%",
			alignSelf: "center",
			height: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			paddingHorizontal: 16,
		},
		backBtn: {
			height: 44,
			width: 44,
			borderRadius: 14,
			borderWidth: 1,
			borderColor: colors.inActiveColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		sideBtn: { height: 44, width: 44, borderRadius: 44 },
	});
	return (
		<View style={styles.topBarContainer}>
			{showBackBtn ? (
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backBtn}>
					<Icons.ArrowBack
						width={25}
						height={25}
					/>
				</TouchableOpacity>
			) : (
				<View style={styles.sideBtn} />
			)}
			<View style={styles.sideBtn}></View>
			<Text style={styles.screenHeaderTitle}>{title ?? ""}</Text>
			<View style={styles.sideBtn} />
		</View>
	);
};

export default CenteredTitleTopBar;
