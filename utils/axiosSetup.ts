import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/Auth";
import { router } from "expo-router";

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

export const useResponseInterceptor = () => {
	const queryClient = useQueryClient();
	const { logout, userType } = useAuth();

	authInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (
				error.response?.data.message === "Session expired, kindly login again"
			) {
				queryClient.clear();
				logout();
			}
			return Promise.reject(error);
		}
	);
};

export { authInstance, baseInstance };
