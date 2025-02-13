import { FormType } from "@/app/(auth)/reset-password/_layout";
import { router } from "expo-router";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

const ResetPasswordForm = () => {
	const form = useFormContext<FormType>();

	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="new_password"
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
						name="confirm_password"
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
				onPress={() => {
					console.log("clicked");
					router.push("/(auth)/reset-password/otp-verification");
				}}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
			>
				<Text className="text-white">Create new password</Text>
			</Pressable>
		</View>
	);
};

export default ResetPasswordForm;
