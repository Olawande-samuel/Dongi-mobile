import BackButton from "@/components/BackButton";
import ResetPasswordForm from "@/components/client/ResetPasswordForm";
import React from "react";
import { Text, View } from "react-native";

const ResetPassword = () => {
	
	
	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<BackButton />
				<Text className="text-base text-off-black">Reset Password </Text>
				<View></View>
			</View>
			<ResetPasswordForm />
		</View>
	);
};

export default ResetPassword;
