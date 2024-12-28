import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import EmailSignInForm from "./EmailSignInForm";

const EmailSignIn = () => {
	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Setup Your Account </Text>
				<View></View>
			</View>
			<View className="flex-1">
				<EmailSignInForm />
			</View>
		</View>
	);
};

export default EmailSignIn;
