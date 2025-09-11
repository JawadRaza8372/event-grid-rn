import Svg, { Path } from "react-native-svg";

function Edit({ size, color }) {
	return (
		<Svg
			width={size ?? 17}
			height={size ?? 17}
			viewBox="0 0 17 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M2.679 11.552l-.554 3.323 3.323-.554a2.806 2.806 0 001.523-.784l7.493-7.493a1.403 1.403 0 000-1.984L12.94 2.536a1.403 1.403 0 00-1.984 0l-7.493 7.493a2.806 2.806 0 00-.784 1.523zM9.917 4.25l2.833 2.833"
				stroke={color ?? "#50555C"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default Edit;
