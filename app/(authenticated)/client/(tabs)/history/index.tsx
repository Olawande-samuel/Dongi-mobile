import { View, Text, ScrollView, SectionList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import HomeTabs from "@/components/client/dashboard/HomeTabs";
import HistoryCard from "@/components/client/history/HistoryCard";
import moment from "moment";

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
	return (
		// <SafeAreaView className="flex-1 bg-white px-6">
		<SectionList
			className="bg-white"
			showsVerticalScrollIndicator={false}
			sections={DATA}
			renderItem={() => <HistoryCard />}
			ListHeaderComponent={<HomeTabs setTab={setTab} tab={tab} />}
			keyExtractor={(section, index) => section + index}
			renderSectionHeader={({ section: {} }) => (
				<View className="py-2 relative mb-4">
					{/* <View className="border border-[#Fafafa]"></View> */}
					{/* <View
						className="bg-white"
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: [{ translateX: -50 }],
							// paddingHorizontal: 16,
						}}
					> */}
					<Text className="text-support text-center text-sm leading-[17.64px]">
						{moment().format("MMMM YYYY")}
					</Text>
					{/* </View> */}
				</View>
			)}
		/>
		// </SafeAreaView>
	);
};

export default History;
