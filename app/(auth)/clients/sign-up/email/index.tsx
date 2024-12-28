import EmailSignup from "@/components/client/EmailSignup";
import FacialVerification from "@/components/client/FacialVerification";
import OTP from "@/components/client/OTP";
import SetupPassword from "@/components/client/SetupPassword";
import SignUpHeader from "@/components/client/SignUpHeader";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpWithEmail = () => {
	const [steps, setSteps] = useState(1);
	if (steps === 5) {
		return (
			<SafeAreaView className="flex-1 bg-primary">
				<View className="flex-1 bg-primary justify-between">
					<View />
					<View className="items-center">
						<Image
							source={require("../../../../../assets/images/icon.png")}
							className="w-[116.51px] h-[106.26px] mb-6"
							resizeMode="contain"
						/>
						<Text className="text-white font-semibold text-lg text-center">
							Welcome to Dongi
						</Text>
						<Text className="text-white text-center text-sm">
							Customizing your experience
						</Text>
					</View>
					<View>
						<Text className="text-[#CCCCCC] text-sm text-center">
							Powered By
						</Text>
						<Text className="text-center text-base text-white">
							Skymog global investments
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
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
