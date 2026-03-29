import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";
import PasswordInput from "../PasswordInput";
import StyledButton from "../StyledButton";

const FormSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.regex(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+\-_=~`{}|\\:;'"<>,./]).{8,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
				},
			),
		confirmPassword: z.string(),
	})
	.refine((val) => val.password === val.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

type FormType = z.infer<typeof FormSchema>;

const SetupPassword = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const router = useRouter();
	const globalContext = useGlobalContext();
	const { data } = useTempUser();
	const pathname = usePathname();
	const userType = pathname.includes("/clients") ? "client" : "service";

	const form = useForm<FormType>({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.createPassword,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function handleSubmit(val: FormType) {
		mutate(
			{ type: userType, payload: { ...val, user_id: data.userId } },
			{
				onSuccess: () => {
					toast.success("Password Set Successfully");
					if (userType === "client") {
						nextStep((prev) => prev + 1);
					} else {
						// Service providers go to sign-in after setting up password
						router.replace("/(auth)/service-provider/sign-in");
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
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="password"
						render={({ field }) => (
							<View className="gap-y-[6px]">
								<Text className="text-sm text-off-black">
									Create your password
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
					{form.formState.errors?.password && (
						<Text className="text-xs text-red-400">
							{form.formState.errors?.password.message ?? ""}
						</Text>
					)}
				</View>
				<View className="mb-5">
					<Controller
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<View className="gap-y-[6px]">
								<Text className="text-sm text-off-black">Confirm Password</Text>
								<PasswordInput
									placeholder="********"
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light"
								/>
							</View>
						)}
					/>
					{form.formState.errors?.confirmPassword && (
						<Text className="text-xs text-red-400">
							{form.formState.errors?.confirmPassword.message ?? ""}
						</Text>
					)}
				</View>
			</View>
			<StyledButton
				title="Continue"
				onPress={form.handleSubmit(handleSubmit)}
			/>
		</View>
	);
};

export default SetupPassword;
