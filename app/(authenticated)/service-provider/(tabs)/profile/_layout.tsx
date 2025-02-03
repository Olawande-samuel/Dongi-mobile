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
					headerTitle: "Profile",
					headerLeft: () => <BackButton />,
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
