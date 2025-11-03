import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useThemeColors } from "../hooks/useThemeColors";
const CustomValueSelection = ({
	title,
	data,
	value,
	setValue,
	placeHolder,
	inputWidth,
	labelSize,
}) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		inputContainer: {
			width: inputWidth ?? "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 7,
		},

		selectContainer: {
			height: 38,
			width: "100%",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			borderRadius: 10,
			paddingHorizontal: 15,
			backgroundColor: colors.createEventInputBg,
		},
		selectLabel: {
			color: colors.blackColor,
			fontFamily: "700",
			fontSize: 12,
		},
		inputLabel: {
			width: "100%",
			fontSize: labelSize ?? 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
		placeholderStyle: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.inputPlaceHolderColor,
		},
	});

	return (
		<View style={styles.inputContainer}>
			<Text
				numberOfLines={1}
				ellipsizeMode="tail"
				style={styles.inputLabel}>
				{title}
			</Text>
			<Dropdown
				style={styles.selectContainer}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectLabel}
				itemContainerStyle={{
					backgroundColor: colors.mainBgColor,
				}}
				activeColor={colors.organizerTabBg}
				flatListProps={{
					ItemSeparatorComponent: () => <View style={{ height: 1 }} />,
				}}
				itemTextStyle={{ ...styles.placeholderStyle, color: colors.blackColor }}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={placeHolder}
				value={value}
				onChange={(item) => {
					setValue(item.value);
				}}
			/>
		</View>
	);
};

export default CustomValueSelection;
