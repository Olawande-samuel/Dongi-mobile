import Header from "@/components/Header";
import { CATEGORY_IMAGE_MAP } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
	const params = useLocalSearchParams();

	console.log({ params });

	const { data, isLoading } = useQuery({
		queryKey: ["get client service categories"],
		queryFn: Api.getClientServiceCategories,
	});

	const categoryItems = [
		...(data?.data?.data?.categories.filter(
			(item) => item.status === "active"
		) || []),
		{
			name: "Customized Services",
			id: "",
			uuid:"custom_services"
		},
	];

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
										source={CATEGORY_IMAGE_MAP[item.name]}
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
