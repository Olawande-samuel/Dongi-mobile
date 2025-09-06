import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { getAddressFromCoordinates } from "./useLocation";

const useCurrentLocation = () => {
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const { setIsLoading } = useGlobalContext();
	const [address, setAddress] = useState<string | null>(null);

	const { mutate } = useMutation({
		mutationFn: Api.updateUserLocation,
		mutationKey: ["update user location"],
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

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

	useEffect(() => {
		console.log("address changed");
	}, [address]);

	async function updateLocation(data?: GooglePlaceDetail) {
		try {
			setLoading(true);
			if (data) {
				const currentLocation = {
					coords: {
						latitude: data.geometry.location.lat,
						longitude: data.geometry.location.lng,
					},
				} as Location.LocationObject;
				setLocation(currentLocation);
				setAddress(data.formatted_address);
				mutate({
					latitude: currentLocation.coords.latitude,
					longitude: currentLocation.coords.longitude,
					location: data.formatted_address,
				});
				return data.formatted_address;
			} else {
				const currentLocation = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				});
				setLocation(currentLocation);
				const result = await getAddressFromCoordinates(
					currentLocation.coords.latitude,
					currentLocation.coords.longitude
				);
				setAddress(result);
				return result;
			}
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
