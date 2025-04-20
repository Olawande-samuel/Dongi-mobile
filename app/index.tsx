import Welcome from "@/components/Welcome";
import { useAuth } from "@/context/Auth";
import useUserType from "@/hooks/useUserType";
import { useTempStore } from "@/store/temp-user-store";
import { UserType } from "@/types";
import { useResponseInterceptor } from "@/utils/axiosSetup";
import { Redirect, router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const { user, userType, isLoading } = useAuth();
	const { userType: user_type } = useUserType();

	const { setUserType } = useTempStore();

	useResponseInterceptor();

	async function storeUserType(val: UserType) {
		try {
			// await AsyncStorage.setItem("userType", val);
			setUserType(val);
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

	if (isLoading) {
		return <Welcome />;
	}

	if (!user) {
		if (user_type === "client") {
			return <Redirect href="/(auth)/clients/sign-in/email" />;
		}
		return <Redirect href="/(auth)/service-provider/sign-in/email" />;
	}

	if (user && userType === "service") {
		return <Redirect href="/service-provider/(tabs)" />;
	}

	if (user && userType === "client") {
		return <Redirect href="/client/(tabs)" />;
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
