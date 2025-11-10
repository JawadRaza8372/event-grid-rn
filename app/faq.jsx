import { useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../assets/icons";
import CenteredTitleTopBar from "../components/CenteredTitleTopBar";
import { faqArray } from "../constants/rawData";
import { useThemeColors } from "../hooks/useThemeColors";
const Faq = () => {
	const colors = useThemeColors();
	const [openedItemId, setopenedItemId] = useState("0");
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			backgroundColor: colors.topEventBg,
			paddingHorizontal: 25,
			paddingVertical: 31,
			borderRadius: 15,
			borderWidth: 1,
			borderColor: colors.dateBorder,
		},
		sepratorView: {
			width: "100%",
			height: 10,
		},
		questionTxt: {
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 22,
			color: colors.blackColor,
		},
		questionBtn: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 15,
		},
		answerTxt: {
			fontSize: 14,
			fontWeight: "400",
			lineHeight: 22,
			color: colors.inputPlaceHolderColor,
		},
		concludeTxt: {
			fontSize: 14,
			fontWeight: "700",
			lineHeight: 22,
			color: colors.inputPlaceHolderColor,
		},
		questionCont: {
			height: "auto",
			flex: 1,
		},
		answerView: {
			marginTop: 15,
			width: "100%",
			height: "auto",
		},
		iconContainer: {
			width: 22,
			height: 22,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},
		mainPointContainer: {
			width: "97%",
			alignSelf: "center",
			marginTop: 20,
		},
		pointsContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			gap: 10,
			alignItems: "flex-start",
			justifyContent: "flex-start",
		},
		smallDot: {
			width: 4,
			height: 4,
			borderRadius: 15,
			backgroundColor: colors.inputPlaceHolderColor,
			marginTop: 9,
		},
		bottomPadding: {
			width: "100%",
			height: 100,
		},
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
		},
	});
	return (
		<View style={styles.mainContainerScreen}>
			<CenteredTitleTopBar
				title={"FAQ"}
				showBackBtn={true}
			/>
			<View style={styles.chalidContainer}>
				<FlatList
					data={faqArray}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<View style={styles.mainContainer}>
							<TouchableOpacity
								style={styles.questionBtn}
								onPress={() => {
									if (openedItemId === `${index}`) {
										setopenedItemId("");
									} else {
										setopenedItemId(`${index}`);
									}
								}}>
								<View style={styles.questionCont}>
									<Text style={styles.questionTxt}>{item?.question}</Text>
								</View>
								{openedItemId === `${index}` ? <Icons.EyeOff /> : <Icons.Eye />}
							</TouchableOpacity>
							{openedItemId === `${index}` ? (
								<View style={styles.answerView}>
									<Text style={styles.answerTxt}>{item?.answer}</Text>
									{item?.points?.length > 0 ? (
										<View style={styles.mainPointContainer}>
											{item?.points?.map((dat, index) => (
												<View
													style={styles.pointsContainer}
													key={index}>
													<View style={styles.smallDot} />
													<Text style={styles.answerTxt}>{dat}</Text>
												</View>
											))}
										</View>
									) : null}
									{item?.answer2 ? (
										<Text style={styles.answerTxt}>{item?.answer2}</Text>
									) : null}

									{item?.conslude ? (
										<Text style={styles.concludeTxt}>{item?.conslude}</Text>
									) : null}
								</View>
							) : null}
						</View>
					)}
					ListFooterComponent={<View style={styles.bottomPadding} />}
				/>
			</View>
		</View>
	);
};

export default Faq;
