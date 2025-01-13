import React from "react";
import { View } from "react-native";
import EmailSignupForm from "./EmailSignupForm";

const EmailSignup = ({
	steps,
	setSteps,
}: {
	steps: number;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-1">
			<EmailSignupForm nextStep={setSteps} />
		</View>
	);
};

export default EmailSignup;
