import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const BackButton = () => {
	return (
		<Pressable
			onPress={() => {
				router.back();
			}}
		>
			<Ionicons name="arrow-back" size={24} />
		</Pressable>
	);
};

export default BackButton;
