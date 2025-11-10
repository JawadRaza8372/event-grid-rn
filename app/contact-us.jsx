import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import CustomDescription from "../components/create-event/CustomDescription";
import CustomInput from "../components/create-event/CustomInput";
import CustomButton from "../components/CustomButton";
import LoadingView from "../components/LoadingView";
import { useThemeColors } from "../hooks/useThemeColors";
import { postContactUsApi } from "../services/endpoints";
const ContactUs = () => {
	const colors = useThemeColors();
	const [isLoading, setisLoading] = useState(false);
	const [formData, setformData] = useState({
		title: "",
		description: "",
	});
	const sendMessageToAdminFun = async () => {
		try {
			if (formData.title?.length < 5) {
				Toast.show({ type: "error", text1: "Please enter valid subject" });
				return;
			}
			if (formData.description?.length < 50) {
				Toast.show({ type: "error", text1: "Please enter valid description" });
				return;
			}
			setisLoading(true);
			await postContactUsApi(formData.title, formData.description);
			setformData({ title: "", description: "" });
			setisLoading(false);
			Toast.show({
				type: "success",
				text1: "Posted successfully",
			});
		} catch (error) {
			setisLoading(false);
			console.log("contact error", error);
			Toast.show({
				type: "error",
				text1: error ?? "Contact failed",
			});
		}
	};
	const styles = StyleSheet.create({
		mainContainerScreen: {
			width: "100%",
			height: "100%",
			backgroundColor: colors.mainBgColor,
			paddingBottom: 30,
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		chalidContainer: {
			width: "100%",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		dataContainer: {
			borderRadius: 25,
			paddingVertical: 19,
			paddingHorizontal: 20,
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.topEventBg,
			minHeight: 120,
			gap: 12,
		},
		dataTitleTxt: {
			width: "100%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			lineHeight: 20,
		},
	});
	return (
		<View style={styles.mainContainerScreen}>
			<CenteredTitleTopBar
				title={"Contact Us"}
				showBackBtn={true}
			/>
			<View style={styles.chalidContainer}>
				<CustomInput
					inputWidth={Dimensions.get("screen").width - 40}
					title={"Subject"}
					value={formData.title}
					onChangeValue={(value) => setformData({ ...formData, title: value })}
					placeHolder={"Enter subject here"}
				/>
				<View style={styles.dataContainer}>
					<Text style={styles.dataTitleTxt}>Description</Text>
					<CustomDescription
						placeHolder={"Tell admin your issue"}
						value={formData.description}
						onChangeValue={(text) =>
							setformData({ ...formData, description: text })
						}
					/>
				</View>
				<CustomButton
					isDisabled={
						formData.title.length < 5 || formData.description.length < 50
					}
					btnTitle={"Submit"}
					onPressFun={sendMessageToAdminFun}
				/>
			</View>
			<LoadingView loading={isLoading} />
		</View>
	);
};

export default ContactUs;
