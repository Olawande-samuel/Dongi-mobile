import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/client/DoubleHeader";

const RequestsLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="new/[requestId]"
				options={{
					headerTitle: (props) => <DoubleHeader {...props} title="Request" />,
					headerLeft: () => <BackButton />,
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
