import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

const ResendOtp = ({
	reference,
	type,
}: {
	reference: string;
	type: "EMAIL_VERIFICATION" | "PHONE_VERIFICATION";
}) => {
	const [countdown, setCountdown] = useState(20);
	const [isRunning, setIsRunning] = useState(true);
	const globalContext = useGlobalContext();
	const { data } = useTempUser();

	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";

	const { setIsLoading } = globalContext;

	const { mutate, isPending } = useMutation({
		mutationFn: Api.resendResetOTP,
		mutationKey: ["resend reset otp"],
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
			setCountdown(20);
			setIsRunning(true);
		},
	});

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
		mutate({
			reference,
			type,
			user_id: data?.userId,
			user_type: userType === "service" ? "SERVICE_PROVIDER" : "CUSTOMER",
		});
	};
	return (
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
	);
};
export default ResendOtp;
