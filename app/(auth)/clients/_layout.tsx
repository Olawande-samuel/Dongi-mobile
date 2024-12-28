import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen name="sign-up" />
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="reset-password" />
		</Stack>
	);
};

export default Layout;
