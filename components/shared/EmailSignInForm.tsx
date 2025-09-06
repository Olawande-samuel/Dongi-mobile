import { useAuth } from "@/context/Auth";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { z } from "zod";
import PasswordInput from "../PasswordInput";
import StyledButton from "../StyledButton";

const FormSchema = z.object({
	email: z.string().trim().email(),
	password: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailSignInForm = ({ userType }: { userType: USERTYPE }) => {
	const { setItem } = useAsyncStorage("user");
	const { setItem: setUserType } = useAsyncStorage("userType");

	const { handleLoginToken } = useAuth();

	const { setIsLoading } = useGlobalContext();

	const form = useForm<FormType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { mutate } = useMutation({
		mutationFn: Api.login,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function submit(val: FormType) {
		mutate(
			{
				type: userType,
				payload: val,
			},
			{
				onSuccess: (res) => {
					const value = {
						token: res.data.data.token,
						user: res.data.data.user,
					};
					// store in async storage
					setItem(JSON.stringify(value));

					if (userType === "client") {
						setUserType("client");
						// setAuthUserType("client");
					} else {
						setUserType("service");
						// setAuthUserType("service");
					}
					handleLoginToken(res.data.data.token);
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}

	// useEffect(() => {
	// 	async function storeUserType(val) {
	// 		try {
	// 			// await AsyncStorage.setItem("userType", val);
	// 			setUserType(val);
	// 			if (val === "client") {
	// 				router.push("/(auth)/clients/sign-up");
	// 			} else {
	// 				router.push("/(auth)/service-provider/sign-up");
	// 			}
	// 			// router.push("/(auth)/clients/sign-up");
	// 		} catch (error) {
	// 			console.log("Error storing data", error);
	// 		}
	// 	}
	// 	storeUserType("service");
	// }, []);
	return (
		<View className="">
			<View className="mb-5">
				<Controller
					control={form.control}
					name="email"
					render={({ field }) => (
						<View className="space-y-[6px]">
							<Text className="text-sm text-off-black">Email</Text>
							<TextInput
								placeholder="Enter your email address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="password"
					render={({ field }) => (
						<View className="space-y-[6px]">
							<Text className="text-sm text-off-black">Password</Text>
							<PasswordInput
								placeholder="********"
								value={field.value}
								onChangeText={field.onChange}
								textContentType="password"
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="flex-row justify-end mb-3">
				<Link
					href="/forgot-password"
					className="text-primary text-sm text-right"
				>
					Forgot Password
				</Link>
			</View>
			<StyledButton onPress={form.handleSubmit(submit)} title="Continue" />
		</View>
	);
};

export default EmailSignInForm;
