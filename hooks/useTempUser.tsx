import { useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";

const useTempUser = () => {
	const { getItem } = useAsyncStorage();
	const [phone, setPhone] = useState({ phone: "", userId: "", email: "" });

	useEffect(() => {
		(async () => {
			const val = await getItem("tempUser");
			if (val) {
				setPhone(JSON.parse(val));
			}
		})();
	}, []);
	return { data: phone };
};

export default useTempUser;
