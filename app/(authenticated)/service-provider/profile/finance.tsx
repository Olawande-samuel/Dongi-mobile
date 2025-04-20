import BackButton from "@/components/BackButton";
import NoHistory from "@/components/client/history/NoHistory";
import Copy from "@/svgs/Copy";
import { cn, formatCurrency } from "@/utils";
import moment from "moment";
import React from "react";
import { SectionList, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
	{
		title: "Main dishes",
		data: [
			{ name: "Pizza", type: "top-up" },
			{ name: "Burger", type: "top-up" },
			{ name: "Risotto", type: "top-up" },
		],
	},
	{
		title: "Sides",
		data: [
			{ name: "French Fries", type: "payment" },
			{ name: "Onion Rings", type: "payment" },
			{ name: "Fried Shrimps", type: "payment" },
		],
	},
	{
		title: "Drinks",
		data: [
			{ name: "Water", type: "top-up" },
			{ name: "Coke", type: "top-up" },
			{ name: "Beer", type: "top-up" },
		],
	},
];

function HeaderComponent() {
	return (
		<View className="flex-1 bg-white  pt-[18px]">
			<View className="rounded-lg bg-[#F7EFDE] justify-center items-center py-4 mb-2">
				<View className="mb-5">
					<Text>Balance</Text>
				</View>
				<View className="flex-row items-end">
					<Text className="text-off-black text-4xl large:text-[42px] text-center font-bold">
						{formatCurrency(0 || 0)}
					</Text>
				</View>
			</View>
			<View className="flex-row justify-center bg-[#F7EFDE] p-2 rounded items-center">
				<Text className="text-xs mr-1 large:text-sm font-normal text-center text-service-primary font-regular">
					Paystack-Titan
				</Text>
				<Text className="text-xs large:text-sm font-semibold text-service-primary">
					0123456789
				</Text>
				<Copy />
			</View>
			<Text className="text-center text-sm text-[#676B83] mt-6 mb-3">
				Transaction History
			</Text>
		</View>
	);
}

interface ItemProps {
	type: string;
}
function ItemComponent({ type }: ItemProps) {
	return (
		<View className="p-3 border border-outer-light rounded-lg">
			<View className="flex-row items-start justify-between">
				<Text className="text-xs large:text-sm text-black font-regular">
					Wallet top up
				</Text>
				<Text
					className={cn(
						"font-semibold text-xs large:text-sm text-error-600",
						type === "top-up" && "text-success-600"
					)}
				>
					+₦10,000
				</Text>
			</View>
			<Text className="text-xs text-support font-regular">
				{moment().format("DD MMM • hh:mmA")}
			</Text>
		</View>
	);
}

const Finance = () => {
	const { height } = useWindowDimensions();
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom", "top"]}>
			<View className="px-4 large:px-6 flex-1">
				<View className="flex-row justify-between py-2 items-center border-b border-[#FAFAFA]">
					<BackButton />
					<View className="mx-auto">
						<Text className="text-sm text-center large:text-base text-black font-normal font-regular">
							Finance
						</Text>
					</View>
					<View className="" />
				</View>

				<SectionList
					className="bg-white "
					showsVerticalScrollIndicator={false}
					sections={DATA}
					renderItem={({ item }) => <ItemComponent {...item} />}
					ListHeaderComponent={<HeaderComponent />}
					ListEmptyComponent={
						<NoHistory text={"You have made any transaction"} />
					}
					keyExtractor={(section, index) => section.name + index}
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
	);
};

export default Finance;
