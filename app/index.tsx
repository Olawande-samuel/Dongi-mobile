import { useAuth } from "@/context/Auth";
import { useOnboardingStore } from "@/store/onboarding-store";
import {
	getOnboardingCheckpoint,
	OnboardingCheckpoint,
} from "@/utils/onboardingCheckpoint";
import { UserType } from "@/types";
import { Redirect, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function checkpointToHref(cp: OnboardingCheckpoint): string {
	const base =
		cp.userType === "client"
			? "/(auth)/clients"
			: "/(auth)/service-provider";
	if (cp.phase === "phone-verification") {
		return `${base}/phone-verification`;
	}
	return `${base}/sign-up/email`;
}

export default function Index() {
	const { isAuthenticated, userType, isLoading } = useAuth();
	const { setSelectedUserType } = useOnboardingStore();
	const [resumeHref, setResumeHref] = useState<string | null>(null);
	const [checkpointLoaded, setCheckpointLoaded] = useState(false);

	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	useEffect(() => {
		async function loadCheckpoint() {
			const cp = await getOnboardingCheckpoint();
			if (cp) {
				setResumeHref(checkpointToHref(cp));
			}
			setCheckpointLoaded(true);
		}
		loadCheckpoint();
	}, []);

	// Show loading while checking auth state or checkpoint
	if (isLoading || !checkpointLoaded) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#18658B" />
			</View>
		);
	}

	// Redirect authenticated users to their dashboard
	if (isAuthenticated && userType) {
		return (
			<Redirect
				href={
					userType === "client"
						? "/(authenticated)/client/(tabs)"
						: "/(authenticated)/service-provider/(tabs)"
				}
			/>
		);
	}

	// Resume incomplete onboarding
	if (resumeHref) {
		return <Redirect href={resumeHref as any} />;
	}

	function handleUserTypeSelection(type: UserType) {
		setSelectedUserType(type);
		if (type === "client") {
			router.push("/(auth)/clients/sign-up");
		} else {
			router.push("/(auth)/service-provider/sign-up");
		}
	}

	return (
		<SafeAreaView className="flex-1 px-6 bg-white" edges={["top", "bottom"]}>
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
						{/* <Text className="text-primary font-semibold text-[32px] text-center max-w-[70%]">
							Get it done
						</Text>
						<Text className="text-primary font-semibold text-[32px] text-center max-w-[70%]">
							Anywhere
						</Text> */}
					</View>
				</View>
				<View className="w-full mb-[38px]">
					<Pressable
						className="mb-2 bg-primary py-[10px] rounded w-full"
						onPress={() => handleUserTypeSelection("client")}
					>
						<Text className="text-base text-center text-white">
							I need a service
						</Text>
					</Pressable>
					<Pressable
						className="bg-[#1FB4FF1A] py-[10px] rounded w-full"
						onPress={() => handleUserTypeSelection("service")}
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
