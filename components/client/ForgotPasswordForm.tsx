import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { cn, handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { z } from "zod";

const FormSchema = z.object({
	email: z.string().email(),
});

type FormType = z.infer<typeof FormSchema>;

const ForgotPasswordForm = () => {
	const params = useLocalSearchParams();
	const userType = params.userType;

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
		onSettled: () => {
			setIsLoading(false);
			form.reset({
				email: "",
			});
		},
	});

	function submit(val: FormType) {
		mutate(
			{
				type: userType as USERTYPE,
				payload: val,
			},
			{
				onSuccess: (res) => {
					router.push({
						pathname: "/(auth)/reset-password",
						params: {
							userType,
						},
					});
				},
				onError: (err) => {
					handleError(err);
				},
			},
		);
	}

	return (
		<TouchableWithoutFeedback
			className="flex-1 bg-green-500"
			onPress={Keyboard.dismiss}
		>
			<View className="flex-1">
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
					className={cn(
						"bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center mb-3",
						userType === "service" && "bg-service-primary",
					)}
				>
					<Text className="text-white">Submit</Text>
				</Pressable>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ForgotPasswordForm;
