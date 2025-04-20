import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getAddressFromCoordinates } from "./useLocation";

const useCurrentLocation = () => {
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [address, setAddress] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			try {
				setLoading(true);
				let currentLocation = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				});
				setLocation(currentLocation);

				const locationFormat = await getAddressFromCoordinates(
					currentLocation.coords.latitude,
					currentLocation.coords.longitude
				);

				setAddress(locationFormat);
			} catch (error: unknown) {
				setErrorMsg(
					"Error getting location: " +
						(error instanceof Error ? error.message : String(error))
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	async function updateLocation() {
		try {
			setLoading(true);
			const currentLocation = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
			});
			setLocation(currentLocation);
			const result = await getAddressFromCoordinates(
				currentLocation.coords.latitude,
				currentLocation.coords.longitude
			);
			return result;
		} catch (error) {
			setErrorMsg(
				"Error getting current location: " +
					(error instanceof Error ? error.message : String(error))
			);
		} finally {
			setLoading(false);
		}
	}
	return { errorMsg, location, address, loading, updateLocation };
};

export default useCurrentLocation;
