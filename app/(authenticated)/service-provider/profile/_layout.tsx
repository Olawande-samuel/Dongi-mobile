import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/client/DoubleHeader";
import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="public-view" options={{ headerShown: false }} />
			<Stack.Screen
				name="info"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="change-email/index"
				options={{
					headerTitle: "Change Email",
					headerTitleStyle: {
						fontSize: 16,
						color: "#1A1B23",
					},
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="security/index"
				options={{
					headerTitle: () => (
						<DoubleHeader title="Security" subtitle="Change your password" />
					),

					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="help/index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="legal/index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="finance"
				options={{
					headerTitle: "Finance",
					headerTitleStyle: {
						fontSize: 16,
						color: "#1A1B23",
						fontWeight: 400,
					},
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
					headerTitleAlign: "center",
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
