import React, { useEffect, useState } from "react";

import * as Location from "expo-location";

const useUserLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject>();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			});
			setLocation(location);
		}
		getCurrentLocation();
	}, []);

	if (location) {
	}

	return {
		location: {
			logitude: location?.coords.longitude,
			latitutde: location?.coords.latitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
		errorMsg,
	};
};

export default useUserLocation;
