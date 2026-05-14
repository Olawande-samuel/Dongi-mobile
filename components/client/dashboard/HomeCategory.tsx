import useServiceCategories from "@/hooks/useServiceCategories";
import { CATEGORY_IMAGE_MAP } from "@/utils";
import { Link, router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const HomeCategory = () => {
	const { data, isLoading } = useServiceCategories();
	return (
		<View className="py-2 mb-3">
			<View className="p-2 bg-light rounded-lg">
				<View className="flex-row items-center justify-between mb-[10px]">
					<Text className="text-sm text-off-black">Categories</Text>
					<Link href="/client/search" className="text-primary text-sm">
						See more
					</Link>
				</View>
				<View className="flex-row flex-wrap justify-between gap-y-4 ">
					{data?.data?.categories?.slice(0, 6).map((item, index) => (
						<Pressable
							key={item.uuid + String(index)}
							className="w-[99px] "
							onPress={() =>
								router.push({
									pathname: "/client/search/category/[query]",
									params: {
										query: item.uuid,
									},
								})
							}
						>
							<View className="h-[100px] mb-2 rounded-lg border-[0.5px] border-primary">
								<Image
									source={
										item.imageUrl && item.imageUrl !== ""
											? { uri: item.imageUrl }
											: CATEGORY_IMAGE_MAP[item.name as string]
									}
									className="w-[99px] h-[100px] rounded-lg "
									resizeMode="cover"
								/>
							</View>
							<Text className="mt-2 leading-[17.64px] text-sm text-center text-support">
								{item.name}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
		</View>
	);
};

export default HomeCategory;
