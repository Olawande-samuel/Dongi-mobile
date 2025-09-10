import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ICategoryServices } from "@/types";
import { formatCurrency } from "@/utils";

const ServiceCard = ({
	category,
	name,
	provider,
	uuid,
	images,
	unique_customers,
	average_rating
}: ICategoryServices) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/client/booking/[vendorId]",
					params: {
						vendorId: provider.uuid,
						serviceId: uuid,
						categoryId: category.uuid,
					},
				})
			}
		>
			<View className="rounded-lg border border-[#Fafafa] p-3">
				<View className="flex-row mb-[10px]">
					<View className="w-[44px] h-[44px] mr-2">
						<Image
							source={
								provider?.business_logo
									? { uri: provider?.business_logo }
									: require("../../../assets/images/client/temp_user.png")
							}
							className="w-[44px] h-[44px] rounded-full"
							resizeMode="cover"
						/>
					</View>
					<View>
						<Text className="mb-1 text-base text-off-black">
							{`${provider?.firstname || ""} ${provider?.lastname || ""} ` ||
								""}
						</Text>
						<Text className="text-sm text-muted">{name || ""}</Text>
					</View>
				</View>
				<View className="flex-row gap-[2px] mb-[10px]">
					{images?.length > 0 ? (
						images.slice(0, 3).map((item, index) => (
							<View className="flex-1" key={index}>
								<Image
									source={{ uri: item }}
									className="h-[80px] w-full"
									resizeMode="cover"
								/>
							</View>
						))
					) : (
						<View className="flex-1">
							<Image
								source={require("../../../assets/images/client/preview_2.png")}
								className="h-[80px] w-full"
								resizeMode="cover"
							/>
						</View>
					)}
				</View>
				<View className="flex-row justify-between items-center">
					{/* <View>
						<Text className="mb-1 text-muted text-xs">Starting From</Text>
						<Text className="text-sm text-off-black">
							{formatCurrency(starting_price || 0) || ""}
						</Text>
					</View> */}
					<View>
						<Text className="mb-1 text-muted text-xs">Customers</Text>
						<Text className="text-sm text-off-black">{unique_customers}</Text>
					</View>
					<View>
						<Text className="mb-1 text-muted text-xs">Rating</Text>
						<View className="flex-row">
							<Ionicons name="star" color="#FFCE31" />
							<Text className="text-sm text-off-black">{average_rating}</Text>
						</View>
					</View>
					<Pressable className="py-[5px] px-[13px] bg-light rounded-[99px]">
						<Text className="text-sm text-off-black ">View</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
};

export default ServiceCard;
