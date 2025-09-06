import { useAuth } from "@/context/Auth";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
	const { user } = useAuth();
	const { setItem } = useAsyncStorage("hasAccount");
	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";

	useEffect(() => {
		const timeout = setTimeout(() => {
			setItem(JSON.stringify(true));
			if (user) {
				if (pathname.includes("/clients")) {
					router.push("/client");
				} else {
					router.push("/service-provider");
				}
			}
		}, 4000);

		return () => clearTimeout(timeout);
	}, []);

	const backgroundColorClass =
		userType === "client" ? "bg-client-primary" : "bg-service-primary";

	return (
		<SafeAreaView className={`flex-1 ${backgroundColorClass}`}>
			<View className={`flex-1 ${backgroundColorClass} justify-between`}>
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
