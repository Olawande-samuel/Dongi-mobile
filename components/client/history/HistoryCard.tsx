import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ICompletedRequest } from "@/types";
import moment from "moment";

const HistoryCard = ({
	provider,
	uuid,
	rating,
	location,
	created_at,
}: ICompletedRequest) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/client/history/details",
					params: {
						id: uuid,
					},
				})
			}
			className="bg-white border border-[#FAFAFA] rounded-lg p-3 mb-4"
		>
			<View className="flex-row">
				<View className="h-[80px] w-[80px] mr-2">
					<Image
						className="h-[80px] w-[80px] rounded-lg"
						source={
							provider.image
								? { uri: provider.image }
								: require("../../../assets/images/client/temp_user_sq.png")
						}
						resizeMode="cover"
					/>
				</View>
				<View className="flex-1">
					<Text className="text-sm text-off-black mb-1 leading-[17.64px]">
						{provider?.name || ""}
					</Text>
					<Text className="text-xs text-support mb-2 leading-[15.12px]">
						Real Estate Agent
					</Text>
					<Text className="text-xs text-support mb-2 leading-[15.12px]">
						{location || ""}
					</Text>
					<Text className="text-xs text-support leading-[15.12px]">
						{moment(created_at).format("DD MMM • hh:mmA")}
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
						<Text>{rating?.average_rating || ""}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default HistoryCard;
