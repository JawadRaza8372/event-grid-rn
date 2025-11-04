import { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icons } from "../../assets/icons";
import { promoCodeType } from "../../constants/rawData";
import { useThemeColors } from "../../hooks/useThemeColors";
import CustomValueSelection from "../CustomValueSelection";
import CustomInput from "../create-event/CustomInput";
import PromoSelectorItem from "./PromoSelectorItem";

const PromoCodeSelector = ({ formData, setformData }) => {
	const colors = useThemeColors();
	const [ticketTier, setticketTier] = useState({
		type: "",
		value: "",
	});
	const promoCodeList = formData.promoCodes || [];

	const handleAddPromoCode = () => {
		// Add the current ticket to the array
		const updatedList = [...promoCodeList, ticketTier];
		setformData({ ...formData, promoCodes: updatedList });

		// Reset inputs
		setticketTier({
			type: "",
			value: "",
		});
	};

	const handleDeletePromoCode = (index) => {
		const updatedList = promoCodeList.filter((_, i) => i !== index);
		setformData({ ...formData, promoCodes: updatedList });
	};
	const isAddDisabled = !ticketTier.type.trim() || !ticketTier.value.trim();

	const styles = StyleSheet.create({
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
			fontSize: 14,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.dataTitleColor,
			marginBottom: 5,
		},
		sideBySide: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
		giftTxt: {
			fontSize: 11,
			fontWeight: "500",
			lineHeight: 20,
			color: colors.profileItemsTxtColor,
			textAlign: "center",
		},
		giftContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 5,
			paddingVertical: 20,
		},
		addBtn: {
			opacity: isAddDisabled ? 0.3 : 1,
		},
		deleteBtn: {
			width: 35,
			height: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},
		sepratorComp: {
			width: "100%",
			height: 1,
			marginVertical: 5,
		},
		ticketTextCont: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
		},
		ticketCard: {
			width: "100%",
			height: 35,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		ticketText: {
			width: "49%",
			fontSize: 11,
			fontWeight: "500",
			color: colors.createInputLabelColor,
			textTransform: "capitalize",
		},
	});

	return (
		<View style={styles.dataContainer}>
			<View style={styles.sideBySide}>
				<Text style={styles.dataTitleTxt}>Promo Codes</Text>
				<TouchableOpacity
					style={styles.addBtn}
					disabled={isAddDisabled}
					onPress={handleAddPromoCode}>
					<Icons.AddCircle
						width={25}
						height={25}
					/>
				</TouchableOpacity>
			</View>
			<CustomValueSelection
				title={"Promo Code Type"}
				placeHolder={"Select Code Type"}
				data={promoCodeType}
				value={ticketTier.type}
				setValue={(value) => setticketTier({ ...ticketTier, type: value })}
			/>
			<CustomInput
				maxLength={2}
				isNumber={true}
				inputWidth={"100%"}
				title={"Discount"}
				value={ticketTier.value}
				onChangeValue={(value) =>
					setticketTier({
						...ticketTier,
						value: `${value}`.replace(/[^0-9.]/g, ""),
					})
				}
				placeHolder={"80"}
			/>
			{promoCodeList.length > 0 && (
				<FlatList
					data={promoCodeList}
					ItemSeparatorComponent={<View style={styles.sepratorComp} />}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item, index }) => (
						<PromoSelectorItem
							type={item.type}
							value={item.value}
							deletePromoCode={() => handleDeletePromoCode(index)}
						/>
					)}
				/>
			)}
		</View>
	);
};

export default PromoCodeSelector;
