import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ServiceCard = () => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/client/booking/[vendorId]",
					params: {
						vendorId: "1",
						id: "1",
						name: "Real Estate Agent",
						service: "Property Management",
						rating: 4.5,
						reviews: 120,
						price: "#. 150,000 - #. 300,000",
						location: "Island Lagos, Nigeria",
						customers: 12,
					},
				
				})
			}
		>
			<View className="rounded-lg border border-[#Fafafa] p-3">
				<View className="flex-row mb-[10px]">
					<View className="w-[44px] h-[44px] mr-2">
						<Image
							source={require("../../../assets/images/client/temp_user.png")}
							className="w-[44px] h-[44px] rounded-full"
							resizeMode="cover"
						/>
					</View>
					<View>
						<Text className="mb-1 text-base text-off-black">John Musa</Text>
						<Text className="text-sm text-muted">Real Estate Agent</Text>
					</View>
				</View>
				<View className="flex-row gap-[2px] mb-[10px]">
					<View className="flex-1">
						<Image
							source={require("../../../assets/images/client/preview_1.png")}
							className="h-[80px] w-full"
							resizeMode="cover"
						/>
					</View>
					<View className="flex-1">
						<Image
							source={require("../../../assets/images/client/preview_2.png")}
							className="h-[80px] w-full"
							resizeMode="cover"
						/>
					</View>
					<View className="flex-1">
						<Image
							source={require("../../../assets/images/client/preview_3.png")}
							className="h-[80px] w-full"
							resizeMode="cover"
						/>
					</View>
				</View>
				<View className="flex-row justify-between items-center">
					<View>
						<Text className="mb-1 text-muted text-xs">Starting From</Text>
						<Text className="text-sm text-off-black">#245</Text>
					</View>
					<View>
						<Text className="mb-1 text-muted text-xs">Customers</Text>
						<Text className="text-sm text-off-black">12</Text>
					</View>
					<View>
						<Text className="mb-1 text-muted text-xs">Rating</Text>
						<View className="flex-row">
							<Ionicons name="star" color="#FFCE31" />
							<Text className="text-sm text-off-black">4.5</Text>
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
