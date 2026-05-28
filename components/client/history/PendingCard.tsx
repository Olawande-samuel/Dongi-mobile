import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { OngoingRequest } from "@/types";
import moment from "moment";

const PendingCard = ({
	message,
	provider,
	location,
	created_at,
	id,
	uuid,
	service_id,
	provider_id,
}: OngoingRequest) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/client/booking/track-booking/[booking-id]",
					params: {
						"booking-id": uuid,
						id,
						service_id,
						provider_id,
					},
				})
			}
			style={{
				elevation: 1,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.15,
				shadowRadius: 2,
			}}
			className="p-3 rounded-lg bg-white border border-outer-light mb-4"
		>
			<View>
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-xs font-medium text-[#E4AE1B] bg-[#FDF6E3] px-2 py-1 rounded-full">
						Pending
					</Text>
					<Text className="text-xs font-regular text-support">
						{moment(created_at).format("DD MMM • hh:mmA")}
					</Text>
				</View>
				<View className="border border-inner-light p-2 mb-[10px] rounded">
					<Text
						className="text-base font-regular text-off-black"
						numberOfLines={3}
					>
						{message || ""}
					</Text>
				</View>
				<View className="flex-row justify-between gap-x-4 flex-wrap">
					<View className="flex-row items-center max-w-[60%]">
						<Image
							className="h-[42px] w-[42px] rounded-full"
							source={{
								uri:
									provider.image ||
									`https://ui-avatars.com/api/?name=${provider.name}`,
							}}
							resizeMode="cover"
						/>
						<View className="ml-2 gap-y-1">
							<Text className="text-base font-regular text-off-black">
								{provider.name || ""}
							</Text>
						</View>
					</View>
					<View className="flex-row items-center max-w-[35%]">
						<Image
							source={require("../../../assets/images/location.png")}
							width={18}
							height={18}
							resizeMode="contain"
							className="w-[18px] h-[18px] mr-[6px]"
						/>
						<Text
							className="font-regular text-sm text-off-black"
							numberOfLines={1}
						>
							{location || ""}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default PendingCard;
