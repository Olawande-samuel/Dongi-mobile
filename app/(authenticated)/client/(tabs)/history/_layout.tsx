import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

const HistoryLayout = () => {
	const router = useRouter();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "History",
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="details"
				options={{
					headerTitle: "History",
					headerLeft: () => (
						<Pressable
							onPress={() => {
								router.back();
							}}
						>
							<Ionicons name="arrow-back" size={24} />
						</Pressable>
					),
					headerTitleAlign: "center",
					headerShadowVisible: false,
				}}
			/>
		</Stack>
	);
};

export default HistoryLayout;
