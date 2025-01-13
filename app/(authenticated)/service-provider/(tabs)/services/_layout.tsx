import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "Services",
					headerLeft: () => <BackButton />,
				}}
			/>
			<Stack.Screen
				name="add-new"
				options={{
					headerTitle: "Add New",
					headerLeft: () => <BackButton />,
				}}
			/>
		</Stack>
	);
};

export default Layout;
