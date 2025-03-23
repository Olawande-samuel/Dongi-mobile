import useUserType from "@/hooks/useUserType";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";

const FormSchema = z.object({
	email: z.string().email(),
});

type FormType = z.infer<typeof FormSchema>;

const ForgotPasswordForm = () => {
	const { userType } = useUserType();
	const form = useForm<FormType>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { setIsLoading } = useGlobalContext();
	const { mutate } = useMutation({
		mutationFn: Api.forgotPassword,
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
					console.log({ res });
					router.push("/(auth)/reset-password");
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}
	return (
		<View className="flex-1">
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
								autoCapitalize="none"
							/>
						</View>
					)}
				/>
				{form.formState.errors?.email && (
					<Text className="text-xs text-red-400">
						{form.formState.errors?.email.message ?? ""}
					</Text>
				)}
			</View>

			<Pressable
				onPress={form.handleSubmit(submit)}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center mb-3"
			>
				<Text className="text-white">Submit</Text>
			</Pressable>
		</View>
	);
};

export default ForgotPasswordForm;
