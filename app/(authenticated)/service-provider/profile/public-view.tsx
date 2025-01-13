import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import VendorProfile from "@/components/client/VendorProfile";

function ServiceComponent() {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 space-y-2">
			<View>
				<Image
					source={require("../../../../assets/images/client/preview_1.png")}
					className="w-full h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-base font-regular text-off-black">
					Real estate survey assistance
				</Text>
				<Text className="text-support text-sm font-regular">
					Buy or survey a property in Nigeria, obtain survey papers and
					engineering consultation.
				</Text>
			</View>
			<Pressable>
				<Text className="text-center text-primary text-sm font-regular">
					Request
				</Text>
			</Pressable>
		</View>
	);
}

const PublicProfile = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<ScrollView
				className="bg-white flex-1 pt-[18px] border-t border-outer-light px-6"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-1 bg-white ">
					<VendorProfile />
					<Pressable
						onPress={() => {}}
						className="mb-6 py-3 px-1 bg-off-black rounded"
					>
						<Text className="text-base font-regular text-center text-white">
							Request a custom service
						</Text>
					</Pressable>
					<View className="flex-1 mb-6">
						<Text className="text-center text-sm text-off-black font-regular mb-3">
							Services
						</Text>
						<View className="bg-inner-background-light flex-1 p-2 rounded-lg">
							{[...Array(3)].map((item, i) => (
								<ServiceComponent key={i} />
							))}
						</View>
					</View>
					<View className="mb-6">
						<Text className="text-center text-sm text-off-black font-regular mb-3">
							Bio
						</Text>
						<Text className="text-sm text-support leading-[22.4px] font-regular">
							Navigating the real estate market can be overwhelming—but it
							doesn’t have to be. As an experienced real estate consultant, I
							specialize in helping clients buy and sell property with
							confidence. I provide personalized advice, market analysis, and
							negotiation strategies to ensure you get the best deal possible.
						</Text>
					</View>
					<Pressable
						onPress={() => {}}
						className="border-[0.5px] border-primary px-1 py-3 rounded"
					>
						<Text className="text-center text-primary text-base ">
							Need a custom service?
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PublicProfile;
