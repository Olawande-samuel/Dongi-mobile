import { AuthProvider } from "@/context/Auth";
import GlobalStateProvider from "@/providers/GlobalStateProvider";
import QueryProvider from "@/providers/QueryProvider";
import {
	PlusJakartaSans_200ExtraLight,
	PlusJakartaSans_200ExtraLight_Italic,
	PlusJakartaSans_300Light,
	PlusJakartaSans_300Light_Italic,
	PlusJakartaSans_400Regular,
	PlusJakartaSans_400Regular_Italic,
	PlusJakartaSans_500Medium,
	PlusJakartaSans_500Medium_Italic,
	PlusJakartaSans_600SemiBold,
	PlusJakartaSans_600SemiBold_Italic,
	PlusJakartaSans_700Bold,
	PlusJakartaSans_700Bold_Italic,
	PlusJakartaSans_800ExtraBold,
	PlusJakartaSans_800ExtraBold_Italic,
	useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { Toaster } from "sonner-native";
import "../global.css";

function RootLayoutNav() {
	const [fontsLoaded] = useFonts({
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
		if (!fontsLoaded) {
			SplashScreen.preventAutoHideAsync();
			return;
		}
		SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="dark" />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="(auth)" />
				<Stack.Screen name="(authenticated)" />
			</Stack>
		</>
	);
}

export default function RootLayout() {
	return (
		<QueryProvider>
			<AuthProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<GlobalStateProvider>
						<BottomSheetModalProvider>
							<RootLayoutNav />
							<Toaster position="top-center" />
						</BottomSheetModalProvider>
					</GlobalStateProvider>
				</GestureHandlerRootView>
			</AuthProvider>
		</QueryProvider>
	);
}
