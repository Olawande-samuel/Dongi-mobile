import React from "react";
import { View } from "react-native";
import OTPForm from "./OTPForm";
import SignUpHeader from "./SignUpHeader";

const OTP = ({
	setSteps,
}: {
	steps: number;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-1">
			<OTPForm nextStep={setSteps} />
		</View>
	);
};

export default OTP;
