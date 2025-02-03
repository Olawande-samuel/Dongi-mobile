import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "@/types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Authentication = () => {
	async function storeUserType(val: UserType) {
		try {
			await AsyncStorage.setItem("userType", val);
			if (val === "client") {
				router.push("/(auth)/clients/sign-up");
			} else {
				router.push("/(auth)/provider/sign-up");
			}
		} catch (error) {
			console.log("Error storing data", error);
		}
	}
	//TODO: if user has previously signed in, go to user login screen
	return (
		<SafeAreaView className="flex-1 bg-white px-6" edges={["top", "bottom"]}>
			<View className="flex-1 bg-white justify-center items-center">
				<View className="flex-1 justify-center items-center">
					<View>
						<View className="h-[150px] mb-6 justify-center items-center">
							<Image
								source={require("../../assets/images/icon.png")}
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
};

export default Authentication;
