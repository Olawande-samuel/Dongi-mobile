import HomeTabs from "@/components/client/dashboard/HomeTabs";
import NoHistory from "@/components/client/history/NoHistory";
import CompletedServiceItem from "@/components/provider/Dashboard/CompletedServiceItem";
import RequestCard from "@/components/provider/Dashboard/RequestCard";
import RouteHeader from "@/components/shared/RouteHeader";
import moment from "moment";
import React, { useState } from "react";
import { SectionList, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white px-4 large:px-6">
				<RouteHeader title="History" />
				<SectionList
					className="bg-white "
					showsVerticalScrollIndicator={false}
					sections={DATA}
					renderItem={({ item }) =>
						tab === 1 ? (
							<RequestCard
								activeTab={1} //1 represents ongoing
							/>
						) : (
							<CompletedServiceItem />
						)
					}
					ListHeaderComponent={
						<HomeTabs
							tab1title="Ongoing"
							tab2title="Completed"
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
			</View>
		</SafeAreaView>
		// </View>
	);
};

export default History;
