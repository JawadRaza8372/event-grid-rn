import { ActivityIndicator, Modal, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const LoadingView = ({ loading }) => {
	const colors = useThemeColors();
	if (!loading) {
		return null;
	}
	return (
		<Modal
			transparent={true}
			visible={true}
			onRequestClose={false}>
			<View
				style={{
					width: "100%",
					height: "100%",
					zIndex: 5000,
					backgroundColor: colors.modalBg,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					position: "absolute",
					top: 0,
					left: 0,
				}}>
				<ActivityIndicator
					size={"large"}
					color={colors.mainBgColor}
				/>
			</View>
		</Modal>
	);
};

export default LoadingView;
