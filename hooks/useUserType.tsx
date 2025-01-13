import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type USERTYPE = "client" | "service" | null;

const useUserType = (): { userType: USERTYPE } => {
	const [userType, setUserType] = useState<USERTYPE>(null);

	useEffect(() => {
		async function getUserType() {
			const result = await AsyncStorage.getItem("userType");
			if (result === "client" || result === "service") {
				setUserType(result);
			}
		}
		getUserType();
	}, []);

	return { userType };
};

export default useUserType;
