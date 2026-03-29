import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { OngoingRequest } from "@/types";
import moment from "moment";

const OngoingCard = ({
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
				<View className="border border-inner-light p-2 mb-[10px] rounded">
					<Text
						className="text-base font-regular text-off-black"
						numberOfLines={3}
					>
						{message || ""}
					</Text>
				</View>
				<View className="flex-row justify-between gap-x-4 flex-wrap">
					<View className="flex-row items-center max-w-[50%]">
						<Image
							className="h-[42px] w-[42px] rounded-full"
							source={require("../../../assets/images/client/temp_user_sq.png")}
							resizeMode="cover"
						/>
						<View className="ml-2 gap-y-1">
							<Text className="text-base font-regular text-off-black">
								{provider.name || ""}
							</Text>
							<Text
								className="text-xs font-regular text-support"
								numberOfLines={1}
							>
								Real estate agent
							</Text>
						</View>
					</View>
					<View className="gap-y-1 max-w-[45%]">
						<View className="flex-row items-center justify-end">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<Text
								className="font-regular max-w-[150px] text-sm text-off-black"
								numberOfLines={1}
							>
								{location || ""}
							</Text>
						</View>
						<Text className="text-xs text-end font-regular text-primaryII">
							{moment(created_at).format("DD MMM • hh:mmA")}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default OngoingCard;
