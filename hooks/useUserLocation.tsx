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
			let location = await Location.getCurrentPositionAsync();
			setLocation(location);
		}
		getCurrentLocation();
	}, []);

	if (location) {
	}

	return { location, errorMsg };
};

export default useUserLocation;
