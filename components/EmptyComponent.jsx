import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import CustomButton from "./CustomButton";

const EmptyComponent = ({ title, showBack }) => {
	const router = useRouter();
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: 160,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 10,
		},
		emptyText: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.inputPlaceHolderColor,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.emptyText}>{title ?? "No data found"}</Text>
			{showBack ? (
				<CustomButton
					btnWidth={"60%"}
					btnTitle={"Go Back"}
					onPressFun={() => router.back()}
					txtSize={12}
				/>
			) : null}
		</View>
	);
};

export default EmptyComponent;
