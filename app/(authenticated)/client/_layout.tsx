import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { Octicons } from "@expo/vector-icons";
import Header from "@/components/Header";

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="booking" options={{ headerShown: false }} />
			<Stack.Screen
				name="change-location"
				options={{
					presentation: "modal",
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default Layout;
