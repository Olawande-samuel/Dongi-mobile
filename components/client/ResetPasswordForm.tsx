import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";

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

const ResetPasswordForm = () => {
	const form = useForm<FormType>({
		defaultValues: {
			confirmPassword: "",
			password: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function submit(val: FormType) {}
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
				onPress={() => router.push("/(auth)/clients/sign-in/email")}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
			>
				<Text className="text-white">Create new password</Text>
			</Pressable>
		</View>
	);
};

export default ResetPasswordForm;
