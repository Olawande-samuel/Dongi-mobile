import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="booking" options={{ headerShown: false }} />
			<Stack.Screen name="profile-info" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
