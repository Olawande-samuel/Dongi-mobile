import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/client/DoubleHeader";
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
				name="history/[serviceId]"
				options={{
					headerTitle: "Completed",
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 400,
					},
				}}
			/>
			<Stack.Screen name="profile" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
