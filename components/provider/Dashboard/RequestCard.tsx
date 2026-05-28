import { IRequestListItem } from "@/types";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props extends IRequestListItem {
	activeTab: number;
}

const RequestCard = ({
	message,
	customer,
	created_at,
	uuid,
	activeTab,
	service,
}: Props) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname:
						activeTab === 1
							? "/(authenticated)/service-provider/requests/view/[requestId]"
							: "/(authenticated)/service-provider/requests/new/[requestId]",
					params: {
						requestId: uuid,
					},
				})
			}
		>
			<View className="p-3 rounded-lg border border-outer-light mb-5">
				<View className="flex-row justify-between gap-x-4 flex-wrap mb-[10px]">
					<View className="flex-row items-center max-w-[50%]">
						<Image
							className="h-9 w-9 large:h-[42px] large:w-[42px] rounded-full"
							source={require("../../../assets/images/client/temp_user_sq.png")}
							resizeMode="cover"
						/>
						<View className="ml-2 gap-y-1">
							<Text className="text-sm large:text-base font-regular text-off-black">
								{customer?.name ||
									`${customer?.first_name || ""} ${customer?.last_name || ""}`}
							</Text>
							<Text className="text-[10px] large:text-xs font-regular text-support">
								{service?.name || ""}
							</Text>
						</View>
					</View>
					<View className="gap-y-1 max-w-[50%]">
						<View className="flex-row items-center justify-end">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-4 h-4 large:w-[18px] large:h-[18px] mr-[6px]"
							/>
							<Text
								className="font-regular text-xs large:text-sm text-off-black"
								numberOfLines={2}
							>
								{customer?.location || ""}
							</Text>
						</View>
						<Text className="text-xs text-end font-regular text-primaryII">
							{moment(created_at).format("DD MMM • hh:mmA")}
						</Text>
					</View>
				</View>
				<View className="border border-inner-light p-2 rounded ">
					<Text
						className="text-sm large:text-base font-regular text-off-black"
						numberOfLines={3}
					>
						{message}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default RequestCard;
