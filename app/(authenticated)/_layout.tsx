import { useAuth } from "@/context/Auth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthenticatedLayout() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#18658B" />
			</View>
		);
	}

	if (!isAuthenticated) {
		return <Redirect href="/" />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
