import EmailSignup from "@/components/client/EmailSignup";
import FacialVerification from "@/components/client/FacialVerification";
import OTP from "@/components/client/OTP";
import SetupPassword from "@/components/client/SetupPassword";
import SignUpHeader from "@/components/client/SignUpHeader";
import Welcome from "@/components/Welcome";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpWithEmail = () => {
	const [steps, setSteps] = useState(1);
	if (steps === 5) {
		return <Welcome />;
	}
	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			{steps === 1 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Setup your account"
				>
					<EmailSignup steps={steps} setSteps={setSteps} />
				</SignUpHeader>
			)}
			{steps === 2 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Confirm your email"
				>
					<OTP steps={steps} setSteps={setSteps} />
				</SignUpHeader>
			)}
			{steps === 3 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Secure your account"
				>
					<SetupPassword steps={steps} setSteps={setSteps} />
				</SignUpHeader>
			)}
			{steps === 4 && <FacialVerification steps={steps} setSteps={setSteps} />}
		</SafeAreaView>
	);
};

export default SignUpWithEmail;
