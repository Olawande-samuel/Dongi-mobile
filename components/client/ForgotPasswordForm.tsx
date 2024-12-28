import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";

const FormSchema = z.object({
	email: z.string().email(),
});

type FormType = z.infer<typeof FormSchema>;

const ForgotPasswordForm = () => {
	const form = useForm<FormType>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function submit(val: FormType) {}
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
								className="p-2 text-muted text-base rounded border border-light-border"
							/>
						</View>
					)}
				/>
			</View>

			<Pressable
				onPress={() => router.push("/clients/reset-password")}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
			>
				<Text className="text-white">Submit</Text>
			</Pressable>
		</View>
	);
};

export default ForgotPasswordForm;
