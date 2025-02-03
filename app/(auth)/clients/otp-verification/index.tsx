import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import StyledButton from "@/components/StyledButton";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { toast } from "sonner-native";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { router } from "expo-router";

const Otp = () => {
	const [otp, setOtp] = useState("");
	const [phone, setPhone] = useState({ phone: "", userId: "" });

	const globalContext = useGlobalContext();
	const { getItem } = useAsyncStorage();

	if (!globalContext) return null;

	const { setIsLoading } = globalContext;

	useEffect(() => {
		(async () => {
			const val = await getItem("tempUser");
			if (val) {
				setPhone(JSON.parse(val));
			}
		})();
	}, []);

	const { mutate } = useMutation({
		mutationFn: Api.phoneOTPVerification,
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function verifyOtp() {
		console.log({ phone });
		mutate(
			{
				type: "client",
				payload: { phone: phone.phone, code: otp, user_id: phone.userId },
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
			<View className="flex-1">
				<View className="flex-1">
					<View className="flex-1">
						<View className="mb-[6px]">
							<Text className="text-sm text-off-black">
								A code was sent to{" "}
								<Text className="font-bold">{phone?.phone ?? ""}</Text>
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
					</View>
					<View className="mt-auto">
						<StyledButton title="Submit" onPress={verifyOtp} />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Otp;
