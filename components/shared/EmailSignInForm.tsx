import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import StyledButton from "../StyledButton";
import useUserType from "@/hooks/useUserType";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailSignInForm = () => {
	const { setIsLoading } = useGlobalContext();
	const { userType } = useUserType();
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
					console.log(res);
					if (userType === "client") {
						router.replace("/(authenticated)/client");
					} else {
						router.replace("/(authenticated)/service-provider");
					}
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}
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
							<TextInput
								secureTextEntry
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
