import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Links from "@/components/client/profile/Links";
import { Ionicons } from "@expo/vector-icons";

const message = require("../../../../../assets/images/client/profile/message.png");
const phone = require("../../../../../assets/images/client/profile/telephone.png");
const location = require("../../../../../assets/images/client/profile/location.png");
const time = require("../../../../../assets/images/client/profile/time.png");
const Help = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<View className="flex-1 bg-white px-6 pt-[18px]">
				<View>
					<View className="mb-4">
						<Links
							title="Send us a message"
							link="/client/profile-info/help"
							source={message}
						/>
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
									<Text className="text-base text-off-black font-regular">
										+ 90 523 323 23 23
									</Text>
									<Text className="text-base text-off-black font-regular">
										+234 8932 3232 32
									</Text>
								</View>
							</View>
							<Ionicons name="arrow-forward" size={20} color="#676B83" />
						</View>
					</View>
					<View className="mb-4">
						<Links
							title="Palace Road, Amufi, Ikpoba hill Edo State, Nigeria"
							link="/client/profile-info/legal"
							source={location}
						/>
					</View>
					<View className="mb-4">
						<View className="flex-row w-full justify-between items-center">
							<View className="flex-row flex-1 gap-x-2 items-center">
								<Image source={time} className="w-6 h-6" resizeMode="contain" />
								<View>
									<Text className="text-base text-off-black font-regular">
										Weekdays: 8 am to 6 pm
									</Text>
									<Text className="text-base text-off-black font-regular">
										Saturday: 9 am to 12 pm
									</Text>
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
