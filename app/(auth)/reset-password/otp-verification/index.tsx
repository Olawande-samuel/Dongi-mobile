import React from "react";
import { useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import BackButton from "@/components/BackButton";
import StyledButton from "@/components/StyledButton";
import { router, useLocalSearchParams } from "expo-router";
import { FormType } from "../_layout";

const OTPVerification = () => {
	const params = useLocalSearchParams();
	const userType = params.userType as USERTYPE;

	const form = useFormContext<FormType>();

	function handleContinue() {
		router.push({
			pathname: "/(auth)/reset-password",
			params: { userType },
		});
	}

	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<BackButton />
				<Text className="text-base text-off-black ">Enter Reset OTP </Text>
				<View></View>
			</View>
			<View className="flex-1">
				<View className="flex-1">
					<View className="flex-1">
						<View className="mb-[6px]">
							<Text className="text-sm text-off-black text-center">
								A code was sent to your email
							</Text>
						</View>
						<View>
							<OtpInput
								numberOfDigits={6}
								onTextChange={(text) => {
									form.setValue("token", text);
								}}
								type="numeric"
								textInputProps={{
									accessibilityLabel: "One-Time Password",
								}}
								theme={{
									pinCodeContainerStyle: {
										width: 40.25,
										borderRadius: 4,
										borderWidth: 1,
										borderColor: "#F2F2F2",
									},
								}}
							/>
						</View>
					</View>
					<View className="mt-auto">
						<StyledButton title="Continue" onPress={handleContinue} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default OTPVerification;
