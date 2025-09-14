import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/shared/DoubleHeader";
import { Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="requests" options={{ headerShown: false }} />
			<Stack.Screen
				name="history/[requestId]"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="profile" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
