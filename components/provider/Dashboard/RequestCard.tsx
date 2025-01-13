import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

const RequestCard = () => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname:
						"/(authenticated)/service-provider/requests/view/[requestId]",
					params: {
						requestId: "1",
					},
				})
			}
		>
			<View className="p-3 rounded-lg border border-outer-light mb-5">
				<View className="flex-row justify-between gap-x-4 flex-wrap mb-[10px]">
					<View className="flex-row items-center">
						<Image
							className="h-[42px] w-[42px] rounded-full"
							source={require("../../../assets/images/client/temp_user_sq.png")}
							resizeMode="cover"
						/>
						<View className="ml-2 space-y-1">
							<Text className="text-base font-regular text-off-black">
								John Musa
							</Text>
							<Text className="text-xs font-regular text-support">
								Real estate agent
							</Text>
						</View>
					</View>
					<View className="space-y-1">
						<View className="flex-row items-center justify-end">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<Text className="font-regular text-sm text-off-black">Lagos</Text>
						</View>
						<Text className="text-xs text-end font-regular text-primaryII">
							20 Nov • 08:30AM
						</Text>
					</View>
				</View>
				<View className="border border-inner-light p-2 rounded ">
					<Text
						className="text-base font-regular text-off-black"
						numberOfLines={3}
					>
						I’m planning to sell my property but need advice on pricing and
						staging. Can you assist with marketing it to attract potential
						buyers?
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default RequestCard;
