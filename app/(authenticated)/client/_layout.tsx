import { useAuth } from "@/context/Auth";
import { Redirect, Stack } from "expo-router";

export default function ClientLayout() {
	const { userType } = useAuth();

	// Redirect service users to their dashboard
	if (userType === "service") {
		return <Redirect href="/(authenticated)/service-provider/(tabs)" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="booking" options={{ headerShown: false }} />
			<Stack.Screen
				name="change-location"
				options={{
					presentation: "modal",
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
