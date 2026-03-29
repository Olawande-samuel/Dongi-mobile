import StyledButton from "@/components/StyledButton";
import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import ResendVerificationOtp from "../shared/ResendVerificationOTP";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SIZES } from "@/utils/constants";

const PhoneOTPVerification = () => {
	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";
	const [otp, setOtp] = useState("");
	const { data } = useTempUser();
	const globalContext = useGlobalContext();

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.phoneOTPVerification,
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function verifyOtp() {
		if (pathname.includes("/clients")) {
			mutate(
				{
					type: "client",
					payload: { phone: data.phone, code: otp, user_id: data.userId },
				},
				{
					onSuccess: (res) => {
						toast.success(res.data.message);
						router.push("/clients/sign-up/email");
					},
					onError: (err) => {
						handleError(err);
						setOtp("");
					},
				},
			);
		} else {
			mutate(
				{
					type: "service",
					payload: { phone: data.phone, code: otp, user_id: data.userId },
				},
				{
					onSuccess: (res) => {
						toast.success(res.data.message);
						router.push("/service-provider/sign-up/email");
					},
					onError: (err) => {
						handleError(err);
						setOtp("");
					},
				},
			);
		}
	}

	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Verify Phone Number </Text>
				<View></View>
			</View>
			<View className="flex-1 pb-2">
				<KeyboardAvoidingView
					enabled
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={100}
					style={{
						flex: 1,
					}}
				>
					<ScrollView className="flex-1 " style={{ flex: 1 }}>
						<View className="flex-1 justify-between">
							<View className="flex-1">
								<View className="mb-[6px]">
									<Text className="text-sm text-off-black">
										A code was sent to{" "}
										<Text className="font-bold">{data?.phone ?? ""}</Text>
									</Text>
								</View>
								<View>
									<OtpInput
										numberOfDigits={4}
										onTextChange={(text) => setOtp(text)}
										type="numeric"
										textInputProps={{
											accessibilityLabel: "One-Time Password",
											className: "text-sm",
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
									reference={data?.phone}
									type="PHONE_VERIFICATION"
								/>
							</View>
						</View>
					</ScrollView>
					<View className="mt-auto">
						<StyledButton title="Submit" onPress={verifyOtp} />
					</View>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default PhoneOTPVerification;
