import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const VendorProfile = () => {
	return (
		<View className="flex-row mb-5">
			<View className="mr-4">
				<Image
					source={require("../../assets/images/client/temp_user.png")}
					className="w-[100px] h-[100px] rounded-full"
					width={100}
					height={100}
				/>
			</View>
			<View className="flex-1 py-[6px] space-y-2 ">
				<View>
					<Text className="text-sm font-regular text-support mb-2">
						I specialize in helping clients buy and sell property with
						confidence.
					</Text>
				</View>
				<View className="flex-row justify-between">
					<View>
						<Text className="text-xs font-regular mb-1 text-muted">
							Starting From
						</Text>
						<Text className="text-sm text-center text-off-black">#245</Text>
					</View>
					<View>
						<Text className="text-xs font-regular mb-1 text-muted">
							Customers
						</Text>
						<Text className="text-sm text-center text-off-black">#245</Text>
					</View>
					<View>
						<Text className="text-xs font-regular mb-1 text-muted">Rating</Text>
						<View className="flex-row">
							<Ionicons name="star" color="#FFCE31" />
							<Text className="text-sm text-off-black">4.5</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default VendorProfile;
