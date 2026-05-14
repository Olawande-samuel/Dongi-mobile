import { useAuth } from "@/context/Auth";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { UserType } from "@/types";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
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

const EmailSignInForm = ({ userType }: { userType: UserType }) => {
	const router = useRouter();
	const { handleLogin } = useAuth();

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

	async function submit(val: FormType) {
		mutate(
			{
				type: userType,
				payload: val,
			},
			{
				onSuccess: async (res) => {
					await handleLogin(res.data.data.token, userType);

					if (userType === "client") {
						router.replace("/(authenticated)/client/(tabs)");
					} else {
						router.replace("/(authenticated)/service-provider/(tabs)");
					}
				},
				onError: (err) => {
					handleError(err);
				},
			},
		);
	}

	return (
		<View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="email"
					render={({ field }) => (
						<View className="gap-y-[6px]">
							<Text className="text-sm text-off-black">Email</Text>
							<TextInput
								placeholder="Enter your email address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
								autoFocus
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
						<View className="gap-y-[6px]">
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
					href={{
						pathname: "/forgot-password",
						params: {
							userType,
						},
					}}
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
