import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const DeleteAccount = ({ showPrompt }: { showPrompt: VoidFunction }) => {
	return (
		<Pressable
			onPress={showPrompt}
			className="flex-row justify-between items-center"
		>
			<View className="flex-row gap-2 items-center">
				<Image
					source={require("../../../assets/images/client/profile/delete.png")}
					className="w-4 large:w-6 h-4 large:h-6"
					resizeMode="contain"
				/>
				<Text className="text-sm large:text-base text-off-black font-regular">
					Delete Account
				</Text>
			</View>

			<Ionicons name="arrow-forward" size={20} color="#676B83" />
		</Pressable>
	);
};

export default DeleteAccount;
