import BackButton from "@/components/BackButton";
import ForgotPasswordForm from "@/components/client/ForgotPasswordForm";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<BackButton />
				<Text className="text-base text-off-black">Forgot Password </Text>
				<View></View>
			</View>
			<ForgotPasswordForm />
		</SafeAreaView>
	);
};

export default ForgotPassword;
