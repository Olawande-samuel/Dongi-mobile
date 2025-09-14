import * as Location from "expo-location";
import { useEffect, useState } from "react";

// Initialize with your API key
// Geocoding.init(process.env.EXPO_PUBLIC_GOOGLE_API || "");

// Reverse geocoding example
// export const getAddressFromCoordinates = async (
// 	latitude: number,
// 	longitude: number
// ) => {
// 	try {
// 		const [res] = await Location.reverseGeocodeAsync({ latitude, longitude });
// 		if (!res) return null;
// 		const parts = [res.name, res.street, res.subregion, res.region, res.country]
// 			.filter(Boolean)
// 			.join(", ");
//
// 		return parts || null;
// 	} catch (error) {
// 		console.error("Error getting address:", error);
// 		return null;
// 	}
// };

const geocodeCache = new Map<string, string>();

export const getAddressFromCoordinates = async (lat: number, lng: number) => {
	const key = `${lat.toFixed(3)},${lng.toFixed(3)}`; // ~100–150m buckets
	const cached = geocodeCache.get(key);
	if (cached) return cached;

	const [res] = await Location.reverseGeocodeAsync({
		latitude: lat,
		longitude: lng,
	});
	const addr = res
		? [res.name, res.street, res.subregion, res.region, res.country]
				.filter(Boolean)
				.join(", ")
		: null;
	if (addr) geocodeCache.set(key, addr);
	return addr;
};

const useLocation = (latitude: number, longitude: number) => {
	const [location, setLocation] = useState("");

	useEffect(() => {
		if (latitude && longitude) {
			const result = getAddressFromCoordinates(latitude, longitude);
			//
		}
	}, [latitude, longitude]);
	return { location };
};

export default useLocation;
