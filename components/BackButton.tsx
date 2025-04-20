import { SIZES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity } from "react-native";

const BackButton = () => {
	const router = useRouter();
	return (
		<TouchableOpacity
			onPress={() => {
				router.back();
			}}
			className="size-20 "
		>
			<Ionicons name="arrow-back" size={SIZES.height > 700 ? 24 : 18} />
		</TouchableOpacity>
	);
};

export default BackButton;
