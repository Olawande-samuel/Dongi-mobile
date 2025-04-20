import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="add-new"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="edit/[serviceId]"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default Layout;
