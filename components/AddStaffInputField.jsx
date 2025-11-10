import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
const AddStaffInputField = ({ value, onChangeValue, addMemeberFun }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			borderWidth: 1,
			borderColor: colors.blackColor,
			borderRadius: 10,
			padding: 15,
			gap: 10,
		},
	});
	return (
		<View style={styles.mainContainer}>
			<CustomInput
				title={"Type staff email to send invitation"}
				placeHolderText={"Email"}
				value={value}
				onChangeValue={onChangeValue}
			/>
			<CustomButton
				btnWidth={"65%"}
				btnAlignSelf={"flex-start"}
				btnTitle={"Invite"}
				onPressFun={addMemeberFun}
				isDisabled={value.length < 5}
			/>
		</View>
	);
};

export default AddStaffInputField;
