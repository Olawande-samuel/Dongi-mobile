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
		new_password: z.string().regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/, {
			message: "Password must be a minimum of 8 alphanumeric characters",
		}),
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
