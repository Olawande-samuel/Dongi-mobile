import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

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
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
