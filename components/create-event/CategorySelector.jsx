import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const CategorySelector = ({ options, title, value, onChangeValue }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 7,
		},
		inputLabel: {
			width: "100%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
		categoryChilds: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
			flexWrap: "wrap",
		},
		categoryView: {
			height: "auto",
			borderRadius: 15,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "auto",
			paddingHorizontal: 18,
			paddingVertical: 5,
			borderWidth: 1,
			borderColor: colors.blackColor,
		},
		categoryTxt: {
			fontSize: 8,
			fontWeight: "500",
			color: colors.blackColor,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.inputLabel}>
				{title ?? ""}
			</Text>
			<View style={styles.categoryChilds}>
				{options.length > 0
					? options?.map((dat, index) => (
							<TouchableOpacity
								key={index}
								style={{
									...styles.categoryView,
									backgroundColor:
										value === dat ? colors.blackColor : "transparent",
								}}
								onPress={() => onChangeValue(dat)}>
								<Text style={styles.categoryTxt}>{dat}</Text>
							</TouchableOpacity>
					  ))
					: null}
			</View>
		</View>
	);
};

export default CategorySelector;
