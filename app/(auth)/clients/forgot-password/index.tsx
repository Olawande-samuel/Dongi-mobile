import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ForgotPasswordForm from "@/components/client/ForgotPasswordForm";

const ForgotPassword = () => {
	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Forgot Password </Text>
				<View></View>
			</View>
			<ForgotPasswordForm />
		</SafeAreaView>
	);
};

export default ForgotPassword;
