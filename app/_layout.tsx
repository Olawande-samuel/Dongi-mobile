import AuthProvider from "@/providers/AuthProvider";
import { Stack } from "expo-router";

function AppEntry() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
export default function RootLayout() {
	return (
		<AuthProvider>
			<AppEntry />
		</AuthProvider>
	);
}
