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
			<Stack.Screen
				name="details"
				options={{
					headerTitle: "History",
					headerLeft: () => (
						<Pressable
							onPress={() => {
								console.log("pressed");
							}}
						>
							<Ionicons name="arrow-back" size={24} />
						</Pressable>
					),
				}}
			/>
		</Stack>
	);
};

export default HistoryLayout;
