import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import Geocoding from "react-native-geocoding";

// Initialize with your API key
Geocoding.init(process.env.EXPO_PUBLIC_GOOGLE_API || "");

// Reverse geocoding example
export const getAddressFromCoordinates = async (
	latitude: number,
	longitude: number
) => {
	try {
		const response = await Geocoding.from(latitude, longitude);
		// console.log("response 15", JSON.stringify(response, null, 2));
		const address = response.results[0].formatted_address;
		return address;
	} catch (error) {
		console.error("Error getting address:", error);
		return null;
	}
};

const useLocation = (latitude: number, longitude: number) => {
	const [location, setLocation] = useState("");

	useEffect(() => {
		if (latitude && longitude) {
			const result = getAddressFromCoordinates(latitude, longitude);
			// console.log({ result });
		}
	}, [latitude, longitude]);
	return { location };
};

export default useLocation;
