import {
	View,
	Text,
	ScrollView,
	Pressable,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { IService } from "@/types";

// const categoryItems = [
// 	{
// 		id: 1,
// 		name: "Mechanical Services",
// 		image: require("../../../../../assets/images/mechanical.png"),
// 	},
// 	{
// 		id: 2,
// 		name: "Electrical Services",
// 		image: require("../../../../../assets/images/electrical.png"),
// 	},
// 	{
// 		id: 3,
// 		name: "Automobile Repairs",
// 		image: require("../../../../../assets/images/automobile.png"),
// 	},
// 	{
// 		id: 4,
// 		name: "Technical/Phone",
// 		image: require("../../../../../assets/images/phone_repair.png"),
// 	},
// 	{
// 		id: 5,
// 		name: "Computer/IT Services",
// 		image: require("../../../../../assets/images/computer.png"),
// 	},
// 	{
// 		id: 6,
// 		name: "Plumbing/Boreholes",
// 		image: require("../../../../../assets/images/plumbing.png"),
// 	},
// 	{
// 		id: 7,
// 		name: "TV/Cable Services",
// 		image: require("../../../../../assets/images/tv.png"),
// 	},
// 	{
// 		id: 8,
// 		name: "Customized Services",
// 		image: require("../../../../../assets/images/custom.png"),
// 	},
// ];

const Search = () => {
	const params = useLocalSearchParams();

	console.log({ params });

	const { data, isLoading } = useQuery({
		queryKey: ["get client service categories"],
		queryFn: Api.getClientServiceCategories,
	});

	const categoryItems =
		data?.data?.data?.categories.filter((item) => item.status === "active") ||
		[];

	return (
		<SafeAreaView className="flex-1 bg-white px-4 large:px-6 " edges={["top"]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
				className="flex-1"
			>
				<Header title="All Categories" />
				<View className="flex-1 flex-row flex-wrap justify-between gap-y-4 ">
					{isLoading ? (
						<View className="flex-row w-full justify-center items-center">
							<ActivityIndicator />
						</View>
					) : (
						categoryItems?.map((item) => (
							<Pressable
								key={item.id}
								className="max-w-[162px] w-full mr-2 large:mr-0"
								onPress={() =>
									router.push({
										pathname: "/client/search/category/[query]",
										params: {
											query: item.uuid,
										},
									})
								}
							>
								<View className="h-[154px] w-full  max-w-[162px] mb-2 rounded-lg border-[0.5px] border-primary">
									<Image
										source={{ uri: item.image }}
										className="max-w-[162px] h-[154px]"
										resizeMode="cover"
									/>
								</View>
								<Text className="mt-2 leading-[17.64px] text-sm text-center text-support">
									{item.name}
								</Text>
							</Pressable>
						))
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;
