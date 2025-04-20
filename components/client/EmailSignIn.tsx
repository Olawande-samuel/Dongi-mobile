import React from "react";
import { Text, View } from "react-native";
import BackButton from "../BackButton";
import EmailSignInForm from "../shared/EmailSignInForm";

const EmailSignIn = () => {
	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<BackButton />
				<Text className="text-base text-off-black">
					Sign Into Your Account{" "}
				</Text>
				<View></View>
			</View>
			<View className="flex-1">
				<EmailSignInForm userType="service" />
			</View>
		</View>
	);
};

export default EmailSignIn;
