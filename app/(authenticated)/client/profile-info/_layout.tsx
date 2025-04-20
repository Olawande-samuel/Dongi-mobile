import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/client/DoubleHeader";
import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerLeft: () => <BackButton />,
					headerTitle: "Profile",
					headerTitleStyle: {
						fontSize: 16,
						color: "#1A1B23",
					},
					headerShadowVisible: false,
					// headerShown: false,
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
					headerTitle: "Help",
					headerTitleStyle: {
						fontSize: 16,
						color: "#1A1B23",
						fontWeight: 400,
					},
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="legal/index"
				options={{
					headerTitle: "Legal",
					headerTitleStyle: {
						fontSize: 16,
						color: "#1A1B23",
						fontWeight: 400,
					},
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
