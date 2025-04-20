import StyledButton from "@/components/StyledButton";
import React from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Security = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<View className="flex-1 bg-white px-6 pb-4 pt-[18px]">
				<KeyboardAvoidingView
					enabled
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={{
						flex: 1,
					}}
				>
					<View className="space-y-5">
						<View>
							<Text className="text-sm large:text-base mb-[6px]">
								Enter your email address
							</Text>
							<TextInput
								className="p-2 text-sm large:text-base text-black font-regular rounded border border-inner-light"
								keyboardType="email-address"
								textContentType="emailAddress"
							/>
						</View>
						<View>
							<Text className="text-sm large:text-base mb-[6px]">
								Enter your old password
							</Text>
							<TextInput
								className="p-2 text-sm large:text-base text-black font-regular rounded border border-inner-light"
								secureTextEntry={true}
								textContentType="password"
							/>
						</View>
						<View>
							<Text className="text-sm large:text-base mb-[6px]">
								Enter your new password
							</Text>
							<TextInput
								className="p-2 text-sm large:text-base text-black font-regular rounded border border-inner-light"
								secureTextEntry={true}
								textContentType="password"
							/>
						</View>
						<View>
							<Text className="text-sm large:text-base mb-[6px]">
								Re-enter your new password
							</Text>
							<TextInput
								className="p-2 text-sm large:text-base text-black font-regular rounded border border-inner-light"
								secureTextEntry={true}
								textContentType="password"
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
				<View className="mt-auto">
					<StyledButton onPress={() => {}} title="Change Password" />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Security;
