import FormError from "@/components/FormError";
import PasswordInput from "@/components/PasswordInput";
import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/context/Auth";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { z } from "zod";

const FormSchema = z
	.object({
		old_password: z.string({ required_error: "Enter current password" }),
		new_password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" })
			.max(12, { message: "Password must be at most 12 characters long" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
				},
			),
		confirm_password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" })
			.max(12, { message: "Password must be at most 12 characters long" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
				},
			),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		path: ["confirm_password"],
		message: "Passwords don't match",
	});

type FormType = z.infer<typeof FormSchema>;

const ChangePassword = () => {
	const globalContext = useGlobalContext();
	const { userType } = useAuth();
	const { isLoading, setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.changePassword,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
		onError: (err) => handleError(err),
		onSuccess: () => {
			toast.success("Password changed successfully");
			form.reset({
				confirm_password: "",
				new_password: "",
				old_password: "",
			});
		},
	});

	const form = useForm<FormType>({
		defaultValues: {
			confirm_password: "",
			new_password: "",
			old_password: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function changePassword(val: FormType) {
		const { new_password, old_password } = val;
		mutate({
			type: userType,
			payload: { new_password, old_password },
		});
	}

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<View className="flex-1 bg-white px-6 pb-4 pt-[18px]">
				<KeyboardAvoidingView
					enabled
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={{
						flex: 1,
					}}
				>
					<View className="gap-y-6">
						<View>
							<Controller
								control={form.control}
								name="old_password"
								render={({ field }) => (
									<View>
										<Text className="text-sm large:text-base mb-[6px]">
											Enter your old password
										</Text>
										<PasswordInput
											value={field.value}
											onChangeText={field.onChange}
										/>
									</View>
								)}
							/>
							{form.formState.errors?.old_password ? (
								<FormError
									value={form.formState.errors?.old_password.message as string}
								/>
							) : null}
						</View>
						<View>
							<Controller
								control={form.control}
								name="new_password"
								render={({ field }) => (
									<View>
										<Text className="text-sm large:text-base mb-[6px]">
											Enter your new password
										</Text>
										<PasswordInput
											value={field.value}
											onChangeText={field.onChange}
										/>
									</View>
								)}
							/>
							{form.formState.errors?.new_password ? (
								<FormError
									value={form.formState.errors?.new_password.message as string}
								/>
							) : null}
						</View>
						<View>
							<Controller
								control={form.control}
								name="confirm_password"
								render={({ field }) => (
									<View>
										<Text className="text-sm large:text-base mb-[6px]">
											Re-enter your new password
										</Text>
										<PasswordInput
											onChangeText={field.onChange}
											value={field.value}
										/>
										{form.formState.errors?.confirm_password ? (
											<FormError
												value={
													form.formState.errors?.confirm_password
														.message as string
												}
											/>
										) : null}
									</View>
								)}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
				<View className="mt-auto">
					<StyledButton
						onPress={form.handleSubmit(changePassword)}
						title="Change Password"
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ChangePassword;
