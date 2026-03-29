import { Stack } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
import DoubleHeader from "@/components/shared/DoubleHeader";
import BackButton from "@/components/BackButton";

const RequestsLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="new/[requestId]"
				options={{
					headerTitle: (props) => <DoubleHeader {...props} title="Request" />,
					headerRight: () => <View className="w-10" />,
					headerLeft: () => (
						<View className="w-10">
							<BackButton />
						</View>
					),
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="view/[requestId]"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default RequestsLayout;
