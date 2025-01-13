import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import StatusPill from "@/components/StatusPill";

const HistoryDetailUserCard = () => {
	return (
		<View className="border border-inner-light p-2 rounded-lg">
			<View className="flex-row gap-x-3">
				<View className="">
					<Image
						className="rounded-lg w-20 h-20"
						source={require("../../../assets/images/client/temp_user_sq.png")}
						resizeMode="cover"
						height={80}
						width={80}
					/>
				</View>

				<View className="flex-1 justify-between gap-y-3">
					<View className="flex-row justify-between">
						<View>
							<Text className="text-sm text-off-black mb-1 leading-[17.64px] font-regular">
								John Musa
							</Text>
							<Text className="text-xs text-support mb-2 leading-[15.12px] font-regular">
								Real Estate Agent
							</Text>
						</View>
						<View className="flex-row gap-1 items-center">
							<Entypo
								name="star"
								size={24}
								color="#FFCE31"
								className="mr-[4.5px]"
							/>
							<Text>4.5</Text>
						</View>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular">Status</Text>
						<StatusPill title="Completed" />
					</View>
				</View>
			</View>
		</View>
	);
};

export default HistoryDetailUserCard;
