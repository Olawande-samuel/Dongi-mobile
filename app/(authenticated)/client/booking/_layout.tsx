import { View, Text, Pressable } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import DoubleHeader from "@/components/client/DoubleHeader";
import { Ionicons, Octicons } from "@expo/vector-icons";
import TrackingHeader from "@/components/client/booking/TrackingHeader";
import BackButton from "@/components/BackButton";

const BookingLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="[vendorId]"
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
				name="track-booking/[booking-id]"
				options={{
					headerTitle: (props) => <TrackingHeader {...props} />,
					headerLeft: () => (
						<Pressable
							onPress={() => {
								router.back();
							}}
						>
							<Ionicons name="arrow-back" color="#1A1B23" size={24} />
						</Pressable>
					),
					headerShadowVisible: false,
				}}
			/>
		</Stack>
	);
};

export default BookingLayout;
