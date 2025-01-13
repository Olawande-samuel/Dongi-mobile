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
	tab1title,
	tab2title,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
	tab1title: string;
	tab2title: string;
}) => {
	return (
		<View className="flex-row mt-4 space-x-2 mb-3">
			<Tab id={1} title={tab1title} isActive={tab === 1} setTab={setTab} />
			<Tab id={2} title={tab2title} isActive={tab === 2} setTab={setTab} />
		</View>
	);
};

export default HomeTabs;
