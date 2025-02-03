import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import DoubleHeader from "@/components/client/DoubleHeader";
import BackButton from "@/components/BackButton";
import { Octicons } from "@expo/vector-icons";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="public-view"
				options={{
					headerTitle: (props) => <DoubleHeader {...props} />,
					headerLeft: () => <BackButton />,
					headerRight: () => (
						<Pressable>
							<Octicons name="share-android" size={24} color="#676B83" />
						</Pressable>
					),
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="info"
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
