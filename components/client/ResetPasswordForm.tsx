import { FormType } from "@/app/(auth)/reset-password/_layout";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { toast } from "sonner-native";
import PasswordInput from "../PasswordInput";
import StyledButton from "../StyledButton";

const ResetPasswordForm = () => {
	const form = useFormContext<FormType>();
	const params = useLocalSearchParams();
	const userType = params.userType as USERTYPE;

	const { setIsLoading } = useGlobalContext();

	const { mutate } = useMutation({
		mutationFn: Api.resetPassword,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function handleSubmit(val: FormType) {
		mutate(
			{
				type: userType,
				payload: { token: val.token, new_password: val.new_password },
			},
			{
				onSuccess: () => {
					toast.success("Password reset successfully");
					if (userType === "service") {
						router.replace("/(auth)/service-provider/sign-in");
					} else {
						router.replace("/(auth)/clients/sign-in");
					}
				},
				onError: (err) => {
					handleError(err);
				},
			},
		);
	}

	return (
		<View className="flex-1 pb-4">
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={120}
				style={{ flex: 1 }}
			>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View className="flex-1">
						<ScrollView className="flex-1">
							<View className="mb-5">
								<Controller
									control={form.control}
									name="new_password"
									render={({ field }) => (
										<View className="gap-y-[6px]">
											<Text className="text-sm text-off-black">
												Create new password
											</Text>
											<PasswordInput
												placeholder="********"
												value={field.value}
												onChangeText={field.onChange}
												autoFocus
												className="p-2 text-muted text-base rounded border border-inner-light"
											/>
										</View>
									)}
								/>
								{form.formState.errors?.new_password && (
									<Text className="text-xs text-red-400">
										{form.formState.errors.new_password.message ?? ""}
									</Text>
								)}
							</View>
							<View className="mb-5">
								<Controller
									control={form.control}
									name="confirm_password"
									render={({ field }) => (
										<View className="gap-y-[6px]">
											<Text className="text-sm text-off-black">
												Confirm Password
											</Text>
											<PasswordInput
												placeholder="********"
												value={field.value}
												onChangeText={field.onChange}
												className="p-2 text-muted text-base rounded border border-inner-light"
											/>
										</View>
									)}
								/>
								{form.formState.errors?.confirm_password && (
									<Text className="text-xs text-red-400">
										{form.formState.errors.confirm_password.message ?? ""}
									</Text>
								)}
							</View>
						</ScrollView>
						<View className="mt-auto">
							<StyledButton
								title="Create new password"
								onPress={form.handleSubmit(handleSubmit)}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ResetPasswordForm;
