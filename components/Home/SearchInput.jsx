import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { Icons } from "../../assets/icons";
import { useThemeColors } from "../../hooks/useThemeColors";

const SearchInput = ({ value, onChangeValue }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			height: 43,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			marginBottom: 20,
			backgroundColor: colors.searchInputBg,
			borderRadius: 10,
		},
		iconContainer: {
			width: 43,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		inputStyle: {
			height: "100%",
			flex: 1,
			color: colors.authTitleColor,
			fontSize: 10,
			fontWeight: "400",
		},
	});
	return (
		<View style={styles.mainContainer}>
			<View style={styles.iconContainer}>
				<Icons.Search />
			</View>
			<TextInput
				style={styles.inputStyle}
				placeholder="What event are you looking for..."
				placeholderTextColor={colors.morningColor}
				value={value}
				onChangeText={(text) => onChangeValue(text)}
			/>
		</View>
	);
};

export default SearchInput;
