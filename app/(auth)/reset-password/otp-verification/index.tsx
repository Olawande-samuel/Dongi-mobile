import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ResetPasswordForm from "@/components/client/ResetPasswordForm";
import { OtpInput } from "react-native-otp-entry";
import useUserType from "@/hooks/useUserType";
import StyledButton from "@/components/StyledButton";
import BackButton from "@/components/BackButton";
import { FormType } from "../_layout";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";

const OTPVerification = () => {
	const { userType } = useUserType();
	const { setIsLoading } = useGlobalContext();

	const form = useFormContext<FormType>();

	const { mutate } = useMutation({
		mutationFn: Api.resetPassword,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function verifyOtp(val: FormType) {
		const payload = {
			token: val.token,
			new_password: val.new_password,
		};
		mutate({ type: userType, payload });
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
								{/* <Text className="font-bold">{phone?.phone ?? ""}</Text> */}
							</Text>
						</View>
						<View>
							<OtpInput
								numberOfDigits={4}
								onTextChange={(text) => {
									form.setValue("token", text);
								}}
								type="numeric"
								textInputProps={{
									accessibilityLabel: "One-Time Password",
								}}
								theme={{
									pinCodeContainerStyle: {
										width: 62.25,
										borderRadius: 4,
										borderWidth: 1,
										borderColor: "#F2F2F2",
									},
								}}
							/>
						</View>
					</View>
					<View className="mt-auto">
						<StyledButton
							title="Submit"
							onPress={form.handleSubmit(verifyOtp)}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default OTPVerification;
