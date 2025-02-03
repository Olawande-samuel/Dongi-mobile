import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import SearchBar from "../dashboard/SearchBar";
import { cn } from "@/utils";

const categoryItems = [
	{
		id: 1,
		name: "Mechanical Services",
	},
	{
		id: 2,
		name: "Electrical Services",
	},
	{
		id: 3,
		name: "Automobile Repairs",
	},
	{
		id: 4,
		name: "Technical/Phone",
	},
	{
		id: 5,
		name: "Computer/IT Services",
	},
	{
		id: 6,
		name: "Plumbing/Boreholes",
	},
	{
		id: 7,
		name: "TV/Cable Services",
	},
	{
		id: 8,
		name: "Customized Services",
	},
];
function Tab({
	isActive,
	title,
	setActiveTab,
	id,
}: {
	isActive: boolean;
	title: string;
	setActiveTab: React.Dispatch<React.SetStateAction<number>>;
	id: number;
}) {
	return (
		<Pressable
			onPress={() => setActiveTab(id)}
			className={cn(
				"py-1 px-3 rounded min-w-[60px] mr-2",
				isActive ? "bg-off-black" : " bg-inner-light"
			)}
		>
			<Text
				className={cn(
					"text-regular text-center text-inactive text-sm",
					isActive && "text-white"
				)}
			>
				{title}
			</Text>
		</Pressable>
	);
}

const Search = () => {
	const [activeTab, setActiveTab] = useState(1);
	return (
		<View>
			<View className="py-6 border-b border-outer-light px-6">
				<SearchBar />
				<View className="flex-row gap-x-4 mt-4">
					<View className="flex-1">
						<Text className="font-xs text-muted font-regular mb-1">
							Location
						</Text>
						<View className="flex-row items-center px-1 py-[7px] rounded-lg bg-light">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<Text className="mr-[2px] text-sm font-regular text-off-black">
								Island Lagos, Nigeria
							</Text>
							<Feather name="x" size={24} color="#1A1B23" />
						</View>
					</View>
					<View className="flex-1">
						<Text className="font-xs text-muted font-regular mb-1">
							Location
						</Text>
						<View className="flex-row items-center px-1 py-[7px] rounded-lg bg-light">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<Text className="mr-[2px] text-sm font-regular text-off-black">
								Island Lagos, Nigeria
							</Text>
							<Feather name="x" size={24} color="#1A1B23" />
						</View>
					</View>
				</View>
			</View>
			<View className="px-6 mb-3">
                <ScrollView
                    horizontal
                    className="flex-1 flex-row gap-x-2"
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    decelerationRate="fast"
                >
                    <Tab
                        title="All"
                        id={1}
                        isActive={activeTab === 1}
                        setActiveTab={setActiveTab}
                    />
                    {categoryItems.map((item) => (
                        <Tab
                            key={item.id}
                            title={item.name}
                            id={item.id + 1}
                            setActiveTab={setActiveTab}
                            isActive={activeTab === item.id + 1}
                        />
                    ))}
                </ScrollView>
			</View>
		</View>
	);
};

export default Search;
