import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";

const HistoryCard = () => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/client/history/details",
					params: {
						id: "1",
					},
				})
			}
			className="bg-white border border-[#FAFAFA] rounded-lg p-3 mb-4"
		>
			<View className="flex-row">
				<View className="h-[80px] w-[80px] mr-2">
					<Image
						className="h-[80px] w-[80px] rounded-lg"
						source={require("../../../assets/images/client/temp_user_sq.png")}
						resizeMode="cover"
					/>
				</View>
				<View className="flex-1">
					<Text className="text-sm text-off-black mb-1 leading-[17.64px]">
						John Musa
					</Text>
					<Text className="text-xs text-support mb-2 leading-[15.12px]">
						Real Estate Agent
					</Text>
					<Text className="text-xs text-support mb-2 leading-[15.12px]">
						Lagos Island, Lagos
					</Text>
					<Text className="text-xs text-support leading-[15.12px]">
						20 Nov 08:30AM
					</Text>
				</View>
				<View>
					<View className="flex-row items-center">
						<Entypo
							name="star"
							size={24}
							color="#FFCE31"
							className="mr-[4.5px]"
						/>
						<Text>4.5</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default HistoryCard;
