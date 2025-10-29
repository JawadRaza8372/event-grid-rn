import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

const CategoryView = ({ options, value, onChangeValue, viewWidth, mt, mb }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
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
		inputMainContainer: {
			height: "auto",
			width: viewWidth ?? Dimensions.get("screen").width - 32,
			alignSelf: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			marginTop: mt ?? 15,
			marginBottom: mb ?? 26,
		},
		sepratorView: {
			width: 6,
			height: "auto",
		},
	});

	return (
		<View style={styles.inputMainContainer}>
			<FlatList
				data={options}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.categoryView,
							{
								backgroundColor:
									value === item ? colors.blackColor : "transparent",
							},
						]}
						onPress={() => onChangeValue(item)}>
						<Text
							style={[
								styles.categoryTxt,
								{
									color:
										value === item ? colors.mainBgColor : colors.blackColor,
								},
							]}>
							{item ?? ""}
						</Text>
					</TouchableOpacity>
				)}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
			/>
		</View>
	);
};

export default CategoryView;
