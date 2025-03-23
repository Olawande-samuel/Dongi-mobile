// get, update, delete and set values in asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";


type AsyncStorageHook = {
	getItem: (key: string) => any;
	setItem: (key: string, value: string) => Promise<void>;
	removeItem: (key: string) => Promise<void>;
};

const useAsyncStorage = (): AsyncStorageHook => {
	const getItem = useCallback(async (key: string) => {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (error) {
			console.error("Error getting item from AsyncStorage:", error);
			return null;
		}
	}, []);

	const setItem = useCallback(async (key: string, value: string) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.error("Error setting item in AsyncStorage:", error);
		}
	}, []);

	const removeItem = useCallback(async (key: string) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.error("Error removing item from AsyncStorage:", error);
		}
	}, []);

	return {
		getItem,
		setItem,
		removeItem,
	};
};

export default useAsyncStorage;
