import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import EmailSignInForm from "../shared/EmailSignInForm";
import BackButton from "../BackButton";

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
				<EmailSignInForm />
			</View>
		</View>
	);
};

export default EmailSignIn;
