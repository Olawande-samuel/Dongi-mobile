import EmailSignup from "@/components/client/EmailSignup";
import EmailVerification from "@/components/shared/EmailVerification";
import FacialVerification from "@/components/client/FacialVerification";
import SetupPassword from "@/components/shared/SetupPassword";
import SignUpHeader from "@/components/shared/SignUpHeader";
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
			if (cp?.phase === "email" && cp.step && cp.userType === "client") {
				setSteps(cp.step);
				maxStepRef.current = cp.step;
			}
			setCheckpointLoaded(true);
		}
		restoreStep();
	}, []);

	// Only saves checkpoint when advancing forward, never when going back.
	// This ensures closing the app after tapping back doesn't regress the checkpoint.
	const handleNextStep = useCallback((action: React.SetStateAction<number>) => {
		setSteps((prev) => {
			const next = typeof action === "function" ? action(prev) : action;
			if (next > maxStepRef.current && next < 5) {
				maxStepRef.current = next;
				saveOnboardingCheckpoint({ userType: "client", phase: "email", step: next });
			}
			return next;
		});
	}, []);

	if (!checkpointLoaded) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#18658B" />
			</View>
		);
	}

	if (steps === 5) {
		return <Welcome />;
	}

	return (
		<SafeAreaView
			className="bg-white flex-1 px-6 pb-4"
			edges={["top", "bottom"]}
		>
			{steps === 1 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Setup your account"
				>
					<EmailSignup nextStep={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 2 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Confirm your email"
				>
					<EmailVerification nextStep={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 3 && (
				<SignUpHeader
					steps={steps}
					setSteps={setSteps}
					title="Secure your account"
				>
					<SetupPassword nextStep={handleNextStep} />
				</SignUpHeader>
			)}
			{steps === 4 && <FacialVerification steps={steps} setSteps={setSteps} />}
		</SafeAreaView>
	);
};

export default SignUpWithEmail;
