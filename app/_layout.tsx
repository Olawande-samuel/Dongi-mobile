import { SplashScreen, Stack } from "expo-router";
import {
	useFonts,
	PlusJakartaSans_200ExtraLight,
	PlusJakartaSans_300Light,
	PlusJakartaSans_400Regular,
	PlusJakartaSans_500Medium,
	PlusJakartaSans_600SemiBold,
	PlusJakartaSans_700Bold,
	PlusJakartaSans_800ExtraBold,
	PlusJakartaSans_200ExtraLight_Italic,
	PlusJakartaSans_300Light_Italic,
	PlusJakartaSans_400Regular_Italic,
	PlusJakartaSans_500Medium_Italic,
	PlusJakartaSans_600SemiBold_Italic,
	PlusJakartaSans_700Bold_Italic,
	PlusJakartaSans_800ExtraBold_Italic,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import QueryProvider from "@/providers/QueryProvider";
import GlobalStateProvider from "@/providers/GlobalStateProvider";
import React from "react";
import "react-native-get-random-values";
import { AuthProvider } from "@/context/Auth";

function AppEntry() {
	return (
		<>
			<StatusBar style="dark" />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</>
	);
}
export default function RootLayout() {
	let [fontsLoaded] = useFonts({
		PlusJakartaSans_200ExtraLight,
		PlusJakartaSans_300Light,
		PlusJakartaSans_400Regular,
		PlusJakartaSans_500Medium,
		PlusJakartaSans_600SemiBold,
		PlusJakartaSans_700Bold,
		PlusJakartaSans_800ExtraBold,
		PlusJakartaSans_200ExtraLight_Italic,
		PlusJakartaSans_300Light_Italic,
		PlusJakartaSans_400Regular_Italic,
		PlusJakartaSans_500Medium_Italic,
		PlusJakartaSans_600SemiBold_Italic,
		PlusJakartaSans_700Bold_Italic,
		PlusJakartaSans_800ExtraBold_Italic,
	});
	useEffect(() => {
		async function prepareApp() {
			await SplashScreen.preventAutoHideAsync();
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		}
		prepareApp();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<QueryProvider>
			<AuthProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<GlobalStateProvider>
						<BottomSheetModalProvider>
							<AppEntry />
							<Toaster position="top-center" />
						</BottomSheetModalProvider>
					</GlobalStateProvider>
				</GestureHandlerRootView>
			</AuthProvider>
		</QueryProvider>
	);
}
