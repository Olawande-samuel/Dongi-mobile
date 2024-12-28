import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ResetPasswordForm from "@/components/client/ResetPasswordForm";

const ResetPassword = () => {
	return (
		<SafeAreaView className="flex-1 bg-white px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Reset Password </Text>
				<View></View>
			</View>
			<ResetPasswordForm />
		</SafeAreaView>
	);
};

export default ResetPassword;
