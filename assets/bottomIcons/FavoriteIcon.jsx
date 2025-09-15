import Svg, { Path } from "react-native-svg";
import { useThemeColors } from "../../hooks/useThemeColors";

function FavoriteIcon({ size, isActive }) {
	const colors = useThemeColors();

	return (
		<Svg
			width={size ?? 30}
			height={size ? size - 1 : 29}
			viewBox="0 0 10 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M7 2.293c.442 0 .8.368.8.823M5 1.964l.274-.29c.852-.899 2.234-.899 3.087 0 .83.877.855 2.288.057 3.196l-2.29 2.61a1.483 1.483 0 01-2.256 0l-2.29-2.61a2.397 2.397 0 01.057-3.195c.853-.9 2.235-.9 3.087 0l.274.29z"
				stroke={isActive ? colors.mainBgColor : colors.inputPlaceHolderColor}
				strokeWidth={0.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default FavoriteIcon;
