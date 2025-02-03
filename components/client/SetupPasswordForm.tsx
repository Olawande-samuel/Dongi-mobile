import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import useTempUser from "@/hooks/useTempUser";
import { toast } from "sonner-native";
import { handleError } from "@/utils";

const FormSchema = z
	.object({
		password: z.string(),
		confirmPassword: z.string(),
	})
	.refine((val) => val.password === val.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

type FormType = z.infer<typeof FormSchema>;

const SetupPasswordForm = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const globalContext = useGlobalContext();
	const { data } = useTempUser();

	const form = useForm<FormType>({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(FormSchema),
	});

	if (!globalContext) return null;

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.createPassword,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function handleSubmit(val: FormType) {
		mutate(
			{ type: "client", payload: { ...val, user_id: data.userId } },
			{
				onSuccess: (res) => {
					console.log({ res });
					toast.success("Password Set Successfully");
					nextStep((prev) => prev + 1);
				},
				onError: (err) => {
					console.log(err.response);
					handleError(err);
				},
			}
		);
	}
	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="password"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Create your password
								</Text>
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
				<View className="mb-5">
					<Controller
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">Confirm Password</Text>
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
			</View>
			<Pressable
				onPress={form.handleSubmit(handleSubmit)}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
			>
				<Text className="text-white">Continue</Text>
			</Pressable>
		</View>
	);
};

export default SetupPasswordForm;
