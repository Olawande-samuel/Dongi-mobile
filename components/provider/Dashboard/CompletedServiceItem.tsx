import StatusPill from "@/components/StatusPill";
import { ICompletedRequest } from "@/types";
import { SIZES } from "@/utils/constants";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props extends ICompletedRequest {
	activeTab: number;
}

const CompletedServiceItem = ({ id, uuid, provider,   }: Props) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/service-provider/history/[serviceId]",
					params: {
						serviceId: uuid,
					},
				})
			}
			className="bg-white border border-[#FAFAFA] rounded-lg p-3 mb-4"
		>
			<View className="flex-row">
				<View className="h-16 w-16 large:h-20 large:w-20 mr-2">
					<Image
						className="h-16 w-16 large:h-20 large:w-20 rounded-lg"
						source={require("../../../assets/images/client/temp_user_sq.png")}
						resizeMode="cover"
					/>
				</View>
				<View className="flex-1">
					<View className="flex-row justify-between">
						<View className="large:mb-2">
							<Text className="text-xs large:text-sm text-off-black mb-1 leading-[17.64px]">
								{provider?.name || ""}{" "}
							</Text>
							<Text className="text-[10px] large:text-xs text-support  leading-[15.12px]">
								{}{" "}
							</Text>
						</View>
						<View className="flex-row items-center">
							<Entypo
								name="star"
								size={SIZES.height > 700 ? 24 : 18}
								color="#FFCE31"
								className="mr-[4.5px]"
							/>
							<Text className="text-xs large:text-sm">4.5</Text>
						</View>
					</View>
					<Text className="text-[10px] large:text-xs text-support large:mb-2 leading-[15.12px]">
						Lagos Island, Lagos
					</Text>
					<View className="flex-row items-center justify-between">
						<Text className="text-[10px] large:text-xs text-support leading-[15.12px]">
							20 Nov 08:30AM
						</Text>
						<StatusPill title="Completed" buttonClassName="py-[2px]" />
					</View>
				</View>
				{/* <View>
					<View className="flex-row items-center">
						<Entypo
							name="star"
							size={24}
							color="#FFCE31"
							className="mr-[4.5px]"
						/>
						<Text>4.5</Text>
					</View>
				</View> */}
			</View>
		</Pressable>
	);
};

export default CompletedServiceItem;
