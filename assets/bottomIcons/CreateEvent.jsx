import Svg, { Path } from "react-native-svg";
import { useThemeColors } from "../../hooks/useThemeColors";

function CreateEvent({ size, isActive }) {
	const colors = useThemeColors();
	return (
		<Svg
			width={size ?? 15}
			height={size ? size - 1 : 14}
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M0.9375 6.42188H7.29688V0.03125H8.51562V6.42188H14.875V7.25V7.57812H8.51562V13.9844H7.29688V7.57812H0.9375V6.75V6.42188Z"
				fill={isActive ? colors.mainBgColor : colors.inputPlaceHolderColor}
			/>
		</Svg>
	);
}

export default CreateEvent;
