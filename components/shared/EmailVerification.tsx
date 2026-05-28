import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { toast } from "sonner-native";
import StyledButton from "../StyledButton";
import ResendOtp from "./ResendOtp";
import ResendVerificationOtp from "./ResendVerificationOTP";
import { usePathname } from "expo-router";
import { TouchableWithoutFeedback } from "react-native";

const EmailVerification = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [otp, setOtp] = useState("");
	const { data } = useTempUser();
	const globalContext = useGlobalContext();

	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.verifyEmail,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function maskEmail(val: string) {
		if (val) {
			const [name, domain] = val.split("@");
			const maskedName =
				name.length <= 4
					? name
					: `${name.slice(0, 2)}${"*".repeat(name.length - 4)}${name.slice(
							-2,
						)}`;
			return `${maskedName}@${domain}`;
		}
		return "";
	}

	function handleSubmit() {
		if (!otp) {
			toast.error("Enter OTP to continue");
			return;
		}
		if (userType === "client") {
			mutate(
				{
					type: "client",
					payload: {
						user_id: data?.userId,
						code: otp,
						email: data?.email,
					},
				},
				{
					onSuccess: (res) => {
						toast.success("Email Verified Successfully");
						nextStep((prev) => prev + 1);
					},
					onError: (err) => handleError(err),
				},
			);
		} else {
			mutate(
				{
					type: "service",
					payload: {
						user_id: data?.userId,
						code: otp,
						email: data?.email,
					},
				},
				{
					onSuccess: (res) => {
						toast.success("Email Verified Successfully");
						nextStep((prev) => prev + 1);
					},
					onError: (err) => handleError(err),
				},
			);
		}
	}
	return (
		<View className="flex-1 bg-white">
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					enabled
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={100}
					style={{
						flex: 1,
					}}
				>
					<View className="flex-1">
						<View className="flex-1 ">
							<View className="mb-[6px]">
								<Text className="text-sm text-off-black">
									A code was sent to{" "}
									<Text className="font-bold">{maskEmail(data?.email)}</Text>
								</Text>
							</View>
							<View>
								<OtpInput
									numberOfDigits={4}
									onTextChange={(text) => setOtp(text)}
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
							<ResendVerificationOtp
								type="EMAIL_VERIFICATION"
								reference={data?.email}
							/>
						</View>
						<View className="mt-auto mb-3">
							<StyledButton title="Submit" onPress={handleSubmit} />
						</View>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default EmailVerification;
