import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen name="sign-up" />
			<Stack.Screen name="sign-in" />
		</Stack>
	);
};

export default Layout;
