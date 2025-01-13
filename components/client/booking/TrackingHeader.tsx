import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
interface props {
	children: string;
	tintColor?: string;
}
const TrackingHeader = (props: props) => {
	const params = useLocalSearchParams();
	console.log("DOUBLE HEADER, ", params);
	return (
		<View>
			<Text className="text-center text-base text-off-black font-regular">
				Track Booking
			</Text>
			<Text className="text-center text-muted text-sm font-regular ">
				John Musa
			</Text>
		</View>
	);
};

export default TrackingHeader;
