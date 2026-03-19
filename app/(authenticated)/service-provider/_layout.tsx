import { useAuth } from "@/context/Auth";
import { Redirect, Stack } from "expo-router";

export default function ServiceProviderLayout() {
	const { userType } = useAuth();

	// Redirect client users to their dashboard
	if (userType === "client") {
		return <Redirect href="/(authenticated)/client/(tabs)" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="requests" options={{ headerShown: false }} />
			<Stack.Screen
				name="history/[requestId]"
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="profile" options={{ headerShown: false }} />
		</Stack>
	);
}
