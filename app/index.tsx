import { UserType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	async function storeUserType(val: UserType) {
		try {
			await AsyncStorage.setItem("userType", val);
			if (val === "client") {
				router.push("/(auth)/clients/sign-up");
			} else {
				router.push("/(auth)/service-provider/sign-up");
			}
			// router.push("/(auth)/clients/sign-up");
		} catch (error) {
			console.log("Error storing data", error);
		}
	}
	return (
		<SafeAreaView className="flex-1 px-6 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white justify-center items-center">
				<View className="flex-1 justify-center items-center">
					<View>
						<View className="h-[150px] mb-6 justify-center items-center">
							<Image
								source={require("../assets/images/icon.png")}
								width={159}
								height={145}
								resizeMode="contain"
								className="max-w-full w-[159px] h-[145px]"
							/>
						</View>
						<Text className="text-primary font-semibold text-[32px] text-center max-w-[70%]">
							Get it done
						</Text>
						<Text className="text-primary font-semibold text-[32px] text-center max-w-[70%]">
							Anywhere
						</Text>
					</View>
				</View>
				<View className="w-full mb-[38px]">
					<Pressable
						className="mb-2 bg-primary py-[10px] rounded w-full"
						onPress={() => storeUserType("client")}
					>
						<Text className="text-base text-center text-white">
							I need a service
						</Text>
					</Pressable>
					<Pressable
						className="bg-[#1FB4FF1A] py-[10px] rounded w-full"
						onPress={() => storeUserType("service")}
					>
						<Text className="text-base text-primary text-center">
							I am a service provider
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
