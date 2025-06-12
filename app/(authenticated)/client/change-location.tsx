import useCurrentLocation from "@/hooks/useCurrentLocation";
import { SIZES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
	ActivityIndicator,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	View,
} from "react-native";
import {
	GooglePlaceDetail,
	GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

function LocationForm() {
	const { address, loading, location, updateLocation } = useCurrentLocation();

	async function handleLocationUpdate(data?: GooglePlaceDetail) {
		console.log("updating");
		// update location with coordinates and address
		const result = await updateLocation(data);

		console.log({ result });
		// invalidate location queries: userProfile
	}
	return (
		<View className="flex-1 p-6">
			<View className="space-y-[6px]">
				<Text className="text-sm text-off-black">Location</Text>
				<View>
					<GooglePlacesAutocomplete
						placeholder="Search"
						onFail={(error) => {
							console.log("failed", error);
							toast.error("An error occurred fetching your location");
						}}
						onPress={(data, details) => {
							console.log("pressed", data);
							handleLocationUpdate(details ?? undefined);
							// form.setValue("location", data.description);
						}}
						query={{
							key: process.env.EXPO_PUBLIC_GOOGLE_API,
							language: "en",
							components: "country:ng",
						}}
						fetchDetails
						styles={{
							textInput: {
								borderWidth: 1,
								borderColor: "#f2f2f2",
								padding: 2,
								color: "#99a2b3",
								borderRadius: 4,
								fontSize: 16,
							},
							listView: {
								zIndex: 9999,
								elevation: 5,
								position: "absolute",
								top: 60,
							},
						}}
						enablePoweredByContainer={false}
						keyboardShouldPersistTaps="handled"
						listUnderlayColor="transparent"
						debounce={400}
					/>
				</View>
				<View>
					{loading ? (
						<View className="items-center justify-center">
							<ActivityIndicator />
						</View>
					) : (
						<View>
							<Text className="text-primary">Your current location</Text>
							<Pressable onPress={() => handleLocationUpdate(undefined)}>
								<View>
									<Text>{address}</Text>
								</View>
							</Pressable>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

const ChangeLocation = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
				>
					<View className="flex-row justify-between py-[10px] bg-white px-4">
						<Pressable
							onPress={() => {
								router.dismiss();
							}}
						>
							<Ionicons
								name="arrow-back"
								size={SIZES.height > 700 ? 24 : 18}
								color="#1A1B23"
							/>
						</Pressable>
						<Text className="text-base text-off-black">Change Location</Text>
						<View></View>
					</View>

					<FlatList
						data={[]}
						ListHeaderComponent={() => <LocationForm />}
						renderItem={() => null}
						showsVerticalScrollIndicator={false}
						style={{
							flex: 1,
						}}
						contentContainerStyle={{
							justifyContent: "space-between",
						}}
					/>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default ChangeLocation;
