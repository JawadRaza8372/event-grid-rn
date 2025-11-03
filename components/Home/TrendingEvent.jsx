import { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Icons } from "../../assets/icons";
import eventImage from "../../assets/images/eventDetails.png";
import { useThemeColors } from "../../hooks/useThemeColors";
import {
	addFavoriteEventApi,
	removeFavoriteEventApi,
} from "../../services/endpoints";

const TrendingEvent = ({
	id,
	name,
	location,
	date,
	onPressFun,
	ticketTiers,
	bannerImage,
	isFullWidth,
}) => {
	const { favEvents } = useSelector((state) => state?.user);
	const findEventInFavorites = favEvents?.find((dat) => dat?.id === id);
	const colors = useThemeColors();
	const [isFavorite, setisFavorite] = useState(false);
	const formattedTiers = (ticketTiers || []).slice(0, 2).map((tier) => {
		let shortName = "";
		if (tier.name) {
			const words = tier.name.trim().split(" ");
			if (words.length > 1) {
				// multiple words → take first letter of each
				shortName = words.map((w) => w[0]?.toUpperCase()).join("");
			} else {
				// single word
				if (tier.name === tier.name.toUpperCase()) {
					// all uppercase (like "VIP")
					shortName = tier.name.slice(0, 3);
				} else {
					shortName = tier.name.slice(0, 3).toUpperCase();
				}
			}
		}
		return { price: tier.price, shortName };
	});
	useEffect(() => {
		setisFavorite(findEventInFavorites ? true : false);
	}, [findEventInFavorites, favEvents]);

	const favoriteBtnClickFun = async () => {
		try {
			if (!findEventInFavorites) {
				await addFavoriteEventApi(id);
				setisFavorite(true);
			} else {
				await removeFavoriteEventApi(id);
				setisFavorite(false);
			}
		} catch (error) {
			console.log("event fav error: ", error);
			Toast.show({
				type: "error",
				text1: error ?? "Event Favorite failed.",
			});
		}
	};
	const styles = StyleSheet.create({
		mainContainer: {
			width: isFullWidth ? "95%" : Dimensions.get("screen").width * 0.82,
			alignSelf: "center",
			height: 260,
			borderRadius: 20,
			overflow: "hidden",
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.32,
			shadowRadius: 5.46,
			elevation: 9,
			marginBottom: 10,
		},
		imageContainer: {
			height: 155,
			width: "100%",
			backgroundColor: colors.createEventInputBg,
		},
		childContainer: {
			width: "100%",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 7,
			paddingHorizontal: 19,
			marginVertical: 15,
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		eventNameTxt: {
			fontSize: 12,
			fontWeight: "600",
			lineHeight: 20,
			color: colors.dataTitleColor,
		},
		addressTxt: {
			fontSize: 9,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
		},
		addressTxtLineHeight: {
			fontSize: 9,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
			lineHeight: 20,
		},
		vipTxt: {
			fontSize: 11,
			fontWeight: "600",
			color: colors.dataTitleColor,
		},
		generalTxt: {
			fontSize: 11,
			fontWeight: "600",
			color: colors.profileItemsTxtColor,
		},
		inLineContent: {
			height: "auto",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 7,
		},
		firstChild: {
			height: "100%",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 5,
			alignItems: "flex-start",
			justifyContent: "center",
		},
		secondChild: {
			height: "100%",
			width: 60,
			display: "flex",
			flexDirection: "column",
			gap: 5,
			alignItems: "flex-start",
			justifyContent: "center",
		},
		favoriteBtn: {
			position: "absolute",
			zIndex: 2,
			top: 15,
			left: 15,
			backgroundColor: colors.mainBgColor,
			width: 35,
			height: 35,
			borderRadius: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.32,
			shadowRadius: 5.46,
			elevation: 9,
		},
		shareBtn: {
			position: "absolute",
			zIndex: 2,
			top: 15,
			right: 15,
			backgroundColor: colors.mainBgColor,
			width: 35,
			height: 35,
			borderRadius: 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			shadowColor: colors.blackColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.32,
			shadowRadius: 5.46,
			elevation: 9,
		},
	});
	const RenderComp = onPressFun ? TouchableOpacity : View;
	const renderProps = onPressFun ? { onPress: onPressFun } : {};

	return (
		<RenderComp
			{...renderProps}
			style={styles.mainContainer}>
			<View style={styles.imageContainer}>
				<Image
					source={bannerImage ? { uri: bannerImage } : eventImage}
					style={styles.imageStyle}
				/>
				<TouchableOpacity
					onPress={favoriteBtnClickFun}
					style={styles.favoriteBtn}>
					{isFavorite ? (
						<Icons.HeartFill
							width={20}
							height={20}
						/>
					) : (
						<Icons.HeartEmpty
							width={20}
							height={20}
						/>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => console.log("hy")}
					style={styles.shareBtn}>
					<Icons.ShareDark
						width={20}
						height={20}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.childContainer}>
				<View style={styles.firstChild}>
					<Text style={styles.eventNameTxt}>{name ?? ""}</Text>
					<Text style={styles.addressTxt}>{date ?? 0}</Text>
					<View style={styles.inLineContent}>
						<Icons.SendIcon />
						<Text style={styles.addressTxt}>{location ?? ""}</Text>
					</View>
				</View>
				<View style={styles.secondChild}>
					<Text style={styles.addressTxtLineHeight}>{"Starting at"}</Text>
					{formattedTiers.length > 0 ? (
						formattedTiers.map((tier, i) => (
							<View
								key={i}
								style={styles.inLineContent}>
								<Text style={styles.generalTxt}>
									${tier.price}/{tier.shortName}
								</Text>
							</View>
						))
					) : (
						<View style={styles.inLineContent}>
							<Text style={styles.addressTxt}></Text>
						</View>
					)}
					{/* {genralPrice ? (
						<View style={styles.inLineContent}>
							<Text style={styles.generalTxt}>{genralPrice ?? 0}/GA</Text>
						</View>
					) : (
						<View style={styles.inLineContent}>
							<Text style={styles.addressTxt}></Text>
						</View>
					)}
					{vipPrice ? (
						<View style={styles.inLineContent}>
							<Text style={styles.vipTxt}>{vipPrice ?? 0}/VIP</Text>
						</View>
					) : (
						<View style={styles.inLineContent}>
							<Text style={styles.addressTxt}></Text>
						</View>
					)} */}
				</View>
			</View>
		</RenderComp>
	);
};

export default TrendingEvent;
