import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserType from "@/hooks/useUserType";
import { router } from "expo-router";

const Welcome = () => {
	const { userType } = useUserType();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (userType === "client") {
				router.push("/client");
			} else {
				router.push("/service-provider");
			}
		}, 4000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<SafeAreaView className={`flex-1 bg-${userType}-primary`}>
			<View className={`flex-1 bg-${userType}-primary justify-between`}>
				<View />
				<View className="items-center">
					<Image
						source={require("../assets/images/icon.png")}
						className="w-[116.51px] h-[106.26px] mb-6"
						resizeMode="contain"
					/>
					<Text className="text-white font-semibold text-lg text-center">
						Welcome to Dongi
					</Text>
					<Text className="text-white text-center text-sm">
						Customizing your experience
					</Text>
				</View>
				<View>
					<Text className="text-[#CCCCCC] text-sm text-center">Powered By</Text>
					<Text className="text-center text-base text-white">
						Skymog global investments
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Welcome;
