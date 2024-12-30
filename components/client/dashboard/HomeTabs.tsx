import { View, Text, Pressable } from "react-native";
import React from "react";

function Tab({
	isActive,
	setTab,
	title,
	id,
}: {
	id: number;
	isActive: boolean;
	title: string;
	setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<Pressable
			onPress={() => setTab(id)}
			className={`py-[13px] px-3 w-full max-w-[129px] h-[44px] rounded-[999px] ${
				isActive ? "bg-off-black" : "bg-transparent"
			}`}
		>
			<Text
				className={`text-sm text-center ${
					isActive ? "text-white" : "text-inactive"
				}`}
			>
				{title}
			</Text>
		</Pressable>
	);
}
const HomeTabs = ({
	setTab,
	tab,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-row space-x-2 px-6 mb-3">
			<Tab id={1} title="Ongoing" isActive={tab === 1} setTab={setTab} />
			<Tab id={2} title="Recommended" isActive={tab === 2} setTab={setTab} />
		</View>
	);
};

export default HomeTabs;
