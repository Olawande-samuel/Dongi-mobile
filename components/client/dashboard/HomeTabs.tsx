import { View, Text, Pressable } from "react-native";
import React from "react";

function Tab({
	isActive,
	setTab,
	title,
	id,
	compact,
}: {
	id: number;
	isActive: boolean;
	title: string;
	compact?: boolean;
	setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<Pressable
			onPress={() => setTab(id)}
			className={`py-2 large:py-[13px] px-3 flex-1 ${
				compact ? "max-w-[100px]" : "max-w-[129px]"
			} rounded-[999px] ${isActive ? "bg-off-black" : "bg-transparent"}`}
		>
			<Text
				className={`text-xs large:text-sm text-center ${
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
	tab3title,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
	tab1title: string;
	tab2title: string;
	tab3title?: string;
}) => {
	const compact = !!tab3title;
	return (
		<View className="flex-row mt-4 gap-x-2 mb-3">
			<Tab id={1} title={tab1title} isActive={tab === 1} setTab={setTab} compact={compact} />
			<Tab id={2} title={tab2title} isActive={tab === 2} setTab={setTab} compact={compact} />
			{tab3title ? (
				<Tab id={3} title={tab3title} isActive={tab === 3} setTab={setTab} compact={compact} />
			) : null}
		</View>
	);
};

export default HomeTabs;
