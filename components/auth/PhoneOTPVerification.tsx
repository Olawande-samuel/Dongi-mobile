import StyledButton from "@/components/StyledButton";
import useTempUser from "@/hooks/useTempUser";
import useUserType from "@/hooks/useUserType";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const PhoneOTPVerification = () => {
	const { userType } = useUserType();
	const [otp, setOtp] = useState("");
	const { data } = useTempUser();
	const globalContext = useGlobalContext();
	const [countdown, setCountdown] = useState(20);
	const [isRunning, setIsRunning] = useState(true);

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.phoneOTPVerification,
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function verifyOtp() {
		if (userType === "client") {
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
					},
				}
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
						console.log(err);
						handleError(err);
					},
				}
			);
		}
	}

	useEffect(() => {
		let timer: any;
		if (isRunning) {
			timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
				if (countdown === 1) {
					setIsRunning(false);
				}
			}, 1000);
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [countdown, isRunning]);

	const resetCountdown = () => {
		setCountdown(20);
		setIsRunning(true);
	};

	return (
		<SafeAreaView className="bg-white flex-1 px-6" edges={["top", "bottom"]}>
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">Verify Phone Number </Text>
				<View></View>
			</View>
			<View className="flex-1 pb-4">
				<View className="flex-1">
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
						<View className="flex-row gap-2 items-center mt-3">
							<Text>Didn't get a token?</Text>
							{countdown > 1 ? (
								<Text>{countdown}</Text>
							) : (
								<Pressable onPress={resetCountdown}>
									<Text className="underline">Resend</Text>
								</Pressable>
							)}
						</View>
					</View>
					<View className="mt-auto">
						<StyledButton title="Submit" onPress={verifyOtp} />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default PhoneOTPVerification;
