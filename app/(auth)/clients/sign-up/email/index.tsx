import EmailSignupForm from "@/components/client/EmailSignupForm";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpWithEmail = () => {
	const [steps, setSteps] = useState(1);

	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Confirm your email</Text>
				<View></View>
			</View>

			<View className="flex-row space-x-2 items-center mb-5">
				<View className="h-1 basis-[20%] rounded-[999px] bg-primary"></View>
				<View className="h-1 basis-[20%] rounded-[999px] bg-primary"></View>
				<View className="h-1 basis-[20%] rounded-[999px] bg-primary"></View>
				<View className="h-1 basis-[20%] rounded-[999px] bg-primary"></View>
				<View className="basis-[20]%">
					<Text className="ml-1 text-muted">{`${steps}/4`}</Text>
				</View>
			</View>
			<View className="flex-1 border border-red-400">
				<EmailSignupForm />
			</View>
		</SafeAreaView>
	);
};

export default SignUpWithEmail;
