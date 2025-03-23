import OTP from "@/components/client/EmailVerification";
import SetupPassword from "@/components/client/SetupPassword";
import SignUpHeader from "@/components/client/SignUpHeader";
import BusinessInformation from "@/components/provider/BusinessInformation";
import EmailSignup from "@/components/provider/EmailSignup";
import IdentityVerification from "@/components/provider/IdentityVerification";
import Welcome from "@/components/Welcome";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpWithEmail = () => {
	const [steps, setSteps] = useState(1);
	if (steps === 6) {
		return <Welcome />;
	}
	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			{steps === 1 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Setup your account"
					totalSteps={5}
				>
					<EmailSignup steps={steps} setSteps={setSteps} />
				</SignUpHeader>
			)}
			{steps === 2 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Confirm your email"
					totalSteps={5}
				>
					<OTP nextStep={setSteps} />
				</SignUpHeader>
			)}
			{steps === 3 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Set Up Your Account"
				>
					<BusinessInformation nextStep={setSteps} />
				</SignUpHeader>
			)}
			{steps === 4 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Verify your identity"
					totalSteps={5}
				>
					<IdentityVerification nextStep={setSteps} />
				</SignUpHeader>
			)}
			{steps === 5 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					totalSteps={5}
					title="Secure your account"
				>
					<SetupPassword nextStep={setSteps} />
				</SignUpHeader>
			)}
		</SafeAreaView>
	);
};

export default SignUpWithEmail;
