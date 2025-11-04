import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import { useThemeColors } from "../hooks/useThemeColors";

const EventTopImageScoll = ({
	imageLinks,
	isFavoriteEvent,
	favoriteBtnClickFun,
}) => {
	const colors = useThemeColors();
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);
	const viewabilityConfig = useRef({
		viewAreaCoveragePercentThreshold: 50,
	}).current;

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;
	const styles = StyleSheet.create({
		topHeaderView: {
			position: "absolute",
			top: 3,
			zIndex: 2,
			display: "flex",
			width: Dimensions.get("screen").width,
			alignSelf: "center",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		backBtn: {
			width: "50%",
			maxWidth: 80,
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		favoriteBtn: {
			width: "50%",
			maxWidth: 80,
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		bottmIndicator: {
			bottom: 0,
			left: 0,
			zIndex: 20,
			position: "absolute",
			width: "100%",
			height: 60,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 3,
		},
		activeIndicatorView: {
			width: 28,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.blackColor,
		},
		indicatorView: {
			width: 10,
			height: 10,
			borderRadius: 10,
			backgroundColor: colors.inActiveColor,
		},
		imageContainer: {
			width: "100%",
			height: "auto",
			position: "relative",
			backgroundColor: colors.scannerBg,
		},
		imageContainerView: {
			width: Dimensions.get("screen").width,
			height: Dimensions.get("screen").height / 2.8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.createEventInputBg,
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		backBtnStyle: {
			height: 50,
			width: 50,
			borderRadius: 80,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.modalBg4,
		},
	});

	return (
		<View style={styles.imageContainer}>
			<View style={styles.topHeaderView}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backBtn}>
					<View style={styles.backBtnStyle}>
						<Icons.TaleArrowLeftWhite />
					</View>
				</TouchableOpacity>
				{favoriteBtnClickFun ? (
					<TouchableOpacity
						onPress={favoriteBtnClickFun}
						style={styles.favoriteBtn}>
						<View style={styles.backBtnStyle}>
							{isFavoriteEvent ? (
								<Icons.HeartFillWhite
									width={25}
									height={25}
								/>
							) : (
								<Icons.HeartEmptyWhite
									width={25}
									height={25}
								/>
							)}
						</View>
					</TouchableOpacity>
				) : (
					<View style={styles.favoriteBtn} />
				)}
			</View>
			<View style={styles.bottmIndicator}>
				{imageLinks?.map((_, index) => (
					<View
						key={index}
						style={
							currentIndex === index
								? styles.activeIndicatorView
								: styles.indicatorView
						}
					/>
				))}
			</View>
			<FlatList
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				horizontal={true}
				data={imageLinks}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					return (
						<View style={styles.imageContainerView}>
							<Image
								style={styles.imageStyle}
								source={
									typeof item === "string" ? { uri: item } : placeHolderImage
								}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
};

export default EventTopImageScoll;
