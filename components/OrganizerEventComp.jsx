import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import MyEventComp from "./MyEventComp";

const OrganizerEventComp = ({
	id,
	bannerImage,
	address,
	date,
	ticketsSold,
	title,
	showOnlyUpdateBtn,
	showSmallButtons,
	onDeleteFun,
	onPublishFun,
	onUpdateFun,
	totalTickets,
	totalAmount,
	isClickAble,
}) => {
	const router = useRouter();
	const RenderComponent = isClickAble ? TouchableOpacity : View;
	const renderProps = isClickAble
		? {
				onPress: () =>
					router.push({
						pathname: "/event-details-organizer",
						params: {
							eventId: id,
						},
					}),
		  }
		: {};

	return (
		<RenderComponent {...renderProps}>
			<MyEventComp
				bannerImage={bannerImage}
				address={address}
				date={date}
				soldTickets={ticketsSold}
				title={title}
				totalTickets={totalTickets}
				totalAmount={totalAmount}
				showSmallButtons={showSmallButtons}
				showOnlyUpdateBtn={showOnlyUpdateBtn}
				onDeleteFun={onDeleteFun}
				onPublishFun={onPublishFun}
				onUpdateFun={onUpdateFun}
			/>
		</RenderComponent>
	);
};

export default OrganizerEventComp;
