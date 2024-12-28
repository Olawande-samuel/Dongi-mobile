import React from "react";
import { View } from "react-native";
import SetupPasswordForm from "./SetupPasswordForm";
import SignUpHeader from "./SignUpHeader";

const SetupPassword = ({
	steps,
	setSteps,
}: {
	steps: number;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-1">
			<SetupPasswordForm nextStep={setSteps} />
		</View>
	);
};

export default SetupPassword;
