import HomeTabs from "@/components/client/dashboard/HomeTabs";
import HistoryCard from "@/components/client/history/HistoryCard";
import NoHistory from "@/components/client/history/NoHistory";
import OngoingCard from "@/components/client/history/OngoingCard";
import moment from "moment";
import React, { useState } from "react";
import { SectionList, Text, useWindowDimensions, View } from "react-native";

const DATA = [
	{
		title: "Main dishes",
		data: ["Pizza", "Burger", "Risotto"],
	},
	{
		title: "Sides",
		data: ["French Fries", "Onion Rings", "Fried Shrimps"],
	},
	{
		title: "Drinks",
		data: ["Water", "Coke", "Beer"],
	},
	{
		title: "Desserts",
		data: ["Cheese Cake", "Ice Cream"],
	},
];
const History = () => {
	const [tab, setTab] = useState(1);
	const { height } = useWindowDimensions();
	return (
		// <View className="flex-1">
		<SectionList
			className="bg-white px-6"
			showsVerticalScrollIndicator={false}
			sections={DATA}
			renderItem={() => (tab === 1 ? <HistoryCard /> : <OngoingCard />)}
			ListHeaderComponent={
				<HomeTabs
					tab1title="Completed"
					tab2title="Ongoing"
					setTab={setTab}
					tab={tab}
				/>
			}
			ListEmptyComponent={
				<NoHistory
					text={
						tab === 1
							? "You do not have any ongoing request"
							: "You do not have any completed request"
					}
				/>
			}
			keyExtractor={(section, index) => section + index}
			renderSectionHeader={({ section: {} }) => (
				<View className="py-2 relative mb-4">
					<Text className="text-support text-center text-sm leading-[17.64px]">
						{moment().format("MMMM YYYY")}
					</Text>
				</View>
			)}
			contentContainerStyle={{
				minHeight: height - 200,
			}}
		/>
		// </View>
	);
};

export default History;
