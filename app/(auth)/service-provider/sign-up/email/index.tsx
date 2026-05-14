import OTP from "@/components/shared/EmailVerification";
import SetupPassword from "@/components/shared/SetupPassword";
import SignUpHeader from "@/components/shared/SignUpHeader";
import BusinessInformation from "@/components/provider/BusinessInformation";
import EmailSignup from "@/components/provider/EmailSignup";
import IdentityVerification from "@/components/provider/IdentityVerification";
import Welcome from "@/components/Welcome";
import {
	getOnboardingCheckpoint,
	saveOnboardingCheckpoint,
} from "@/utils/onboardingCheckpoint";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpWithEmail = () => {
	const [steps, setSteps] = useState(1);
	const [checkpointLoaded, setCheckpointLoaded] = useState(false);
	const maxStepRef = useRef(1);

	useEffect(() => {
		async function restoreStep() {
			const cp = await getOnboardingCheckpoint();
			if (cp?.phase === "email" && cp.step && cp.userType === "service") {
				setSteps(cp.step);
				maxStepRef.current = cp.step;
			}
			setCheckpointLoaded(true);
		}
		restoreStep();
	}, []);

	const handleNextStep = useCallback((action: React.SetStateAction<number>) => {
		setSteps((prev) => {
			const next = typeof action === "function" ? action(prev) : action;
			if (next > maxStepRef.current && next < 6) {
				maxStepRef.current = next;
				saveOnboardingCheckpoint({ userType: "service", phase: "email", step: next });
			}
			return next;
		});
	}, []);

	if (!checkpointLoaded) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#1FB4FF" />
			</View>
		);
	}

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
					<EmailSignup steps={steps} setSteps={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 2 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Confirm your email"
					totalSteps={5}
				>
					<OTP nextStep={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 3 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Set Up Your Account"
					totalSteps={5}
				>
					<BusinessInformation nextStep={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 4 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Verify your identity"
					totalSteps={5}
				>
					<IdentityVerification nextStep={handleNextStep} />
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
