import EmailSignIn from "@/components/client/EmailSignIn";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<EmailSignIn />
		</SafeAreaView>
	);
};

export default SignIn;
