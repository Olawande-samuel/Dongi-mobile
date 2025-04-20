import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
interface props {
	children: string;
	tintColor?: string;
}
const TrackingHeader = (props: props) => {
	const params = useLocalSearchParams();
	const bookingId = params?.["booking-id"];

	const { data, isLoading } = useQuery({
		queryKey: ["get request detail", bookingId as string],
		queryFn: () => Api.getRequestById(bookingId as string),
	});

	const result = data?.data?.data;
	return (
		<View>
			<Text className="text-center text-base text-off-black font-regular">
				Track Booking
			</Text>
			<Text className="text-center text-muted text-sm font-regular ">
				{result?.provider_id}
			</Text>
		</View>
	);
};

export default TrackingHeader;
