import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const FormSchema = z
	.object({
		token: z.string(),
		new_password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.regex(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+\-_=~`{}|\\:;'"<>,./]).{8,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
				},
			),
		confirm_password: z.string(),
	})
	.refine((val) => val.new_password === val.confirm_password, {
		message: "Passwords don't match",
		path: ["confirm_password"],
	});
export type FormType = z.infer<typeof FormSchema>;

const ResetPasswordLayout = () => {
	const form = useForm<FormType>({
		defaultValues: {
			token: "",
			new_password: "",
			confirm_password: "",
		},
		resolver: zodResolver(FormSchema),
	});

	return (
		<SafeAreaView className="flex-1 bg-white px-6" edges={["top", "bottom"]}>
			<FormProvider {...form}>
				<Slot />
			</FormProvider>
		</SafeAreaView>
	);
};

export default ResetPasswordLayout;
