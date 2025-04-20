import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SignOut = ({ showPrompt }: { showPrompt: VoidFunction }) => {
	return (
		<Pressable
			onPress={showPrompt}
			className="flex-row justify-between items-center"
		>
			<View className="flex-row gap-2 items-center">
				<Image
					source={require("../../../assets/images/client/profile/logout.png")}
					className="w-4 large:w-6 h-4 large:h-6"
					resizeMode="contain"
				/>
				<Text className="text-sm large:text-base text-off-black font-regular">
					Sign out
				</Text>
			</View>

			<Ionicons name="arrow-forward" size={20} color="#676B83" />
		</Pressable>
	);
};

export default SignOut;
