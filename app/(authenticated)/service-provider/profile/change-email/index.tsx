import { View, Text, TextInput } from "react-native";
import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeEmail = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<View className="flex-1 bg-white px-6 pt-[18px]">
				<View className="space-y-5">
					<View>
						<Text className="mb-[6px]">Enter your old email address</Text>
						<TextInput
							className="p-2 text-base text-black font-regular rounded border border-inner-light"
							keyboardType="email-address"
							textContentType="emailAddress"
						/>
					</View>
					<View>
						<Text className="mb-[6px]">Enter your new email address</Text>
						<TextInput
							className="p-2 text-base text-black font-regular rounded border border-inner-light"
							keyboardType="email-address"
							textContentType="emailAddress"
						/>
					</View>
				</View>
				<View className="mt-auto">
					<PrimaryButton onPress={() => {}} title="Continue" />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ChangeEmail;
