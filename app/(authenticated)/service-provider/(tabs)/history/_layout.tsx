import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

const HistoryLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "History",
					headerLeft: () => <BackButton />,
				}}
			/>
		</Stack>
	);
};

export default HistoryLayout;
