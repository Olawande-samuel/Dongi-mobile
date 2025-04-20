import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserType = (): { userType: USERTYPE } => {
	const [userType, setUserType] = useState<USERTYPE>(null);

	useEffect(() => {
		async function getUserType() {
			const result = await AsyncStorage.getItem("userType");
			if (result === "client" || result === "service") {
				setUserType(result);
				return;
			}
			setUserType(null);
		}
		getUserType();
	}, []);

	return { userType };
};

export default useUserType;
