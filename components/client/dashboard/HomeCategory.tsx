import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
const categoryItems = [
	{
		id: 1,
		name: "Mechanical Services",
		image: require("../../../assets/images/mechanical.png"),
	},
	{
		id: 2,
		name: "Electrical Services",
		image: require("../../../assets/images/electrical.png"),
	},
	{
		id: 3,
		name: "Automobile Repairs",
		image: require("../../../assets/images/automobile.png"),
	},
	{
		id: 4,
		name: "Technical/Phone",
		image: require("../../../assets/images/phone_repair.png"),
	},
	{
		id: 5,
		name: "Computer/IT Services",
		image: require("../../../assets/images/computer.png"),
	},
	{
		id: 6,
		name: "Plumbing/Boreholes",
		image: require("../../../assets/images/plumbing.png"),
	},
];
const HomeCategory = () => {
	return (
		<View className="py-2 px-5 mb-3">
			<View className="p-2 bg-light rounded-lg">
				<View className="flex-row items-center justify-between mb-[10px]">
					<Text className="text-sm text-off-black">Categories</Text>
					<Link href="/" className="text-primary text-sm">
						See more
					</Link>
				</View>
				<View className="flex-row flex-wrap justify-between gap-4">
					{categoryItems.map((item) => (
						<View key={item.id} className="w-[99px]">
							<View className="h-[100px] mb-2 w-[99px] rounded-lg border-[0.5px] border-primary">
								<Image
									source={item.image}
									className="w-[99px] h-[100px]"
									resizeMode="cover"
								/>
							</View>
							<Text className="mt-2 leading-[17.64px] text-sm text-center text-support">
								{item.name}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

export default HomeCategory;
