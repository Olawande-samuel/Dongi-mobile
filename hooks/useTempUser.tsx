import { useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTempUser = () => {
	const { getItem } = useAsyncStorage();
	const [phone, setPhone] = useState({ phone: "", userId: "", email: "" });

	useEffect(() => {
		(async () => {
			const value = await AsyncStorage.getItem("tempUser");
			if (value) {
				setPhone(JSON.parse(value));
			}
		})();
	}, []);

	return { data: phone };
};

export default useTempUser;
