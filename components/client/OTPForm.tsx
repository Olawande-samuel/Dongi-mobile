import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import StyledButton from "../StyledButton";
import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { toast } from "sonner-native";
import { handleError } from "@/utils";

const OTPForm = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [otp, setOtp] = useState("");
	const { data } = useTempUser();
	const globalContext = useGlobalContext();

	if (!globalContext) return null;

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
							-2
					  )}`;
			return `${maskedName}@${domain}`;
		}
		return "";
	}

	function handleSubmit() {
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
					console.log({ res });
					toast.success("Email Verified Successfully");
					nextStep((prev) => prev + 1);
				},
				onError: (err) => handleError(err),
			}
		);
	}
	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-[6px]">
					<Text className="text-sm text-off-black">
						A code was sent to
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
			</View>
			<View className="mt-auto">
				<StyledButton title="Submit" onPress={handleSubmit} />
			</View>
		</View>
	);
};

export default OTPForm;
