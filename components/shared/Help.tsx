import Links from "@/components/client/profile/Links";
import RouteHeader from "@/components/shared/RouteHeader";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image, Linking, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const message = require("../../assets/images/client/profile/message.png");
const phone = require("../../assets/images/client/profile/telephone.png");
const location = require("../../assets/images/client/profile/location.png");
const time = require("../../assets/images/client/profile/time.png");

const Help = () => {
	async function handleContactPress(val: string) {
		const isSupported = await Linking.canOpenURL(val);
		if (isSupported) {
			Linking.openURL(val);
		} else {
			console.log("Action not supported");
		}
	}
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
			<View className="flex-1 px-4 large:px-6">
				<RouteHeader title="Help" />
				<View className="flex-1 bg-white pt-[18px]">
					<View>
						<View className="mb-4">
							<TouchableOpacity
								onPress={() => handleContactPress("mailto:+2348066547109")}
							>
								<View className="flex-row w-full justify-between items-center">
									<View className="flex-row flex-1 gap-2 items-center">
										<Image
											source={message}
											className="w-4 large:w-6 h-4 large:h-6"
											resizeMode="contain"
										/>
										<Text className="flex-1 text-sm large:text-base text-off-black font-regular max-w-[231px]">
											Send us a message
										</Text>
									</View>

									<Ionicons name="arrow-forward" size={20} color="#676B83" />
								</View>
							</TouchableOpacity>
						</View>

						<View className="mb-4">
							<View className="flex-row w-full justify-between items-center">
								<View className="flex-row flex-1 gap-x-2 items-center">
									<Image
										source={phone}
										className="w-6 h-6"
										resizeMode="contain"
									/>
									<View>
										<TouchableOpacity
											onPress={() => handleContactPress("tel:+2349122255063")}
										>
											<Text className="text-base text-off-black font-regular">
												+234 912 225 5063
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => handleContactPress("tel:+2348066547109")}
										>
											<Text className="text-base text-off-black font-regular">
												+234 806 654 7109
											</Text>
										</TouchableOpacity>
									</View>
								</View>
								<Ionicons name="arrow-forward" size={20} color="#676B83" />
							</View>
						</View>
						<View className="mb-4">
							<View className="flex-row w-full justify-between items-center">
								<View className="flex-row flex-1 gap-x-2 items-center">
									<Image
										source={location}
										className="w-6 h-6"
										resizeMode="contain"
									/>
									<View>
										<Text className="text-base text-off-black font-regular">
											Gwandal Centre, Wuse 2 Abuja
										</Text>
										<Text className="text-base text-off-black font-regular">
											1 Bishop Road, Amufi, Ikpoba Hill Benin City
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View className="mb-4">
							<View className="flex-row w-full justify-between items-center">
								<View className="flex-row flex-1 gap-x-2 items-center">
									<Image
										source={time}
										className="w-6 h-6"
										resizeMode="contain"
									/>
									<View>
										<Text className="text-base text-off-black font-regular">
											Available: 24/7
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Help;
