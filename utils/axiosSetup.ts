import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { isAxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

console.log({ BASE_URL });

const baseInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const authInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

authInstance.interceptors.request.use(
	async (config) => {
		let authToken;
		const storedData = await AsyncStorage.getItem("user");
		if (storedData) {
			authToken = JSON.parse(storedData).token;
		}
		if (authToken) {
			config.headers.Authorization = "Bearer " + authToken;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

authInstance.interceptors.response.use(
	(response) => {
		console.log({ response });
		return response;
	},
	async (error) => {
		if (isAxiosError(error)) {
			if (error.status === 403) {
				try {
					const userType = await AsyncStorage.getItem("userType");
					await AsyncStorage.multiRemove(["user", "userType"]);

					if (userType === "client") {
						router.replace("/(auth)/clients/sign-in");
					} else if (userType === "service") {
						router.replace("/(auth)/service-provider/sign-in");
					}

					// Show alert after navigation
					setTimeout(() => {
						Alert.alert(
							"Session Expired",
							"Your session has expired. Please log in again.",
							[{ text: "OK" }],
							{ cancelable: false }
						);
					}, 100);
				} catch (error) {
					console.error("Error during logout:", error);
				}
			}
		}
		console.log("interceptor error", { error });
		return Promise.reject(error);
	}
);

export { authInstance, baseInstance };
