import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

const ResendVerificationOtp = ({
	reference,
	type,
	initialSeconds = 300,
}: {
	reference: string;
	type: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION";
	initialSeconds?: number;
}) => {
	const [countdown, setCountdown] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(true);
	const globalContext = useGlobalContext();
	const { data } = useTempUser();
	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";

	const { setIsLoading } = globalContext;

	const { mutate, isPending } = useMutation({
		mutationFn: Api.resendToken,
		mutationKey: ["resend verification otp"],
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
			setCountdown(initialSeconds);
			setIsRunning(true);
		},
	});

	useEffect(() => {
		let timer: any;
		if (isRunning) {
			timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						setIsRunning(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [countdown, isRunning]);

	const resetCountdown = () => {
		mutate({
			type: userType,
			payload: {
				type,
				user_id: data?.userId,
				...(type === "EMAIL_VERIFICATION" && { email: reference }),
				...(type === "PHONE_VERIFICATION" && { phone: reference }),
			},
		});
	};
	const minutes = Math.floor(countdown / 60);
	const seconds = countdown % 60;
	const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	return (
		<View className="flex-row gap-2 items-center mt-3">
			<Text>Didn't get a token?</Text>
			{countdown > 0 ? (
				<Text>{formatted}</Text>
			) : (
				<Pressable onPress={resetCountdown}>
					<Text className="underline">Resend</Text>
				</Pressable>
			)}
		</View>
	);
};
export default ResendVerificationOtp;
