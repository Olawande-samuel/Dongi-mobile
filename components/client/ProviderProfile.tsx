import { ICategoryServices, IProviderService } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const ProviderProfile = ({
	provider,
	description,
	unique_customers,
	total_ratings,
	category,
}: IProviderService) => {
	return (
		<View className="flex-row mb-5">
			<View className="mr-4">
				<Image
					// source={require("../../assets/images/client/temp_user.png")}
					source={
						provider?.business_logo
							? { uri: provider?.business_logo }
							: require("../../assets/images/client/temp_user.png")
					}
					className="w-[100px] h-[100px] rounded-full"
					width={100}
					height={100}
				/>
			</View>
			<View className="flex-1 py-[6px] gap-y-2 ">
				<View>
					<Text
						className="text-sm font-regular text-support mb-2"
						numberOfLines={4}
					>
						{description || ""}
					</Text>
				</View>
				<View className="flex-row justify-between">
					{/* <View>
						<Text className="text-xs font-regular mb-1 text-muted">
							Starting From
						</Text>
						<Text className="text-sm text-center text-off-black">
							{formatCurrency(starting_price)}
						</Text>
					</View> */}
					<View>
						<Text className="text-xs font-regular mb-1 text-muted">
							Customers
						</Text>
						<Text className="text-sm text-center text-off-black">
							{unique_customers || 0}
						</Text>
					</View>
					<View>
						<Text className="text-xs font-regular mb-1 text-muted">Rating</Text>
						<View className="flex-row">
							<Ionicons name="star" color="#FFCE31" />
							<Text className="text-sm text-off-black">{total_ratings}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ProviderProfile;
