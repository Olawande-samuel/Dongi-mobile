import useCurrentLocation from "@/hooks/useCurrentLocation";
import { SIZES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

function LocationForm() {
	const { address, loading, location } = useCurrentLocation();

	function handleLocationUpdate() {
		// update location with coordinates and address
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
						onPress={(data) => {
							// form.setValue("location", data.description);
						}}
						query={{
							key: process.env.EXPO_PUBLIC_GOOGLE_API,
							language: "en",
						}}
						styles={{
							textInput: {
								borderWidth: 1,
								borderColor: "#f2f2f2",
								padding: 2,
								color: "#99a2b3",
								borderRadius: 4,
								fontSize: 16,
							},
						}}
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
							<Pressable onPress={handleLocationUpdate}>
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
		</SafeAreaView>
	);
};

export default ChangeLocation;
