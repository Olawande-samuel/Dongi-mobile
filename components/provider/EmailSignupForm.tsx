import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StyledButton from "../StyledButton";

const FormSchema = z.object({
	firstName: z.string().min(2, "First Name is required"),
	lastName: z.string().min(2, "Last Name is required"),
	email: z.string().email(),
	businessName: z.string(),
	gender: z.union([
		z.literal("male"),
		z.literal("female"),
		z.literal("others"),
	]),
	location: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailSignupForm = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const form = useForm<FormType>({
		defaultValues: {
			firstName: "",
			lastName: "",
			businessName: "",
			location: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function submit(val: FormType) {}
	return (
		<View className="flex-1">
			<View className="flex-row mb-5 gap-4">
				<View className="flex-1">
					<Controller
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">First Name</Text>
								<TextInput
									placeholder="Enter your first name"
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light"
								/>
							</View>
						)}
					/>
				</View>

				<View className="flex-1">
					<Controller
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">Last Name</Text>
								<TextInput
									placeholder="Enter your last name"
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light"
								/>
							</View>
						)}
					/>
				</View>
			</View>
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
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="businessName"
					render={({ field }) => (
						<View className="space-y-[6px]">
							<Text className="text-sm text-off-black">Business Name</Text>
							<TextInput
								placeholder="Enter your business name"
								value={field.value}
								onChangeText={field.onChange}
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="gender"
					render={({ field }) => (
						<View className="space-y-[6px]">
							<Text className="text-sm text-off-black">Gender</Text>
							<TextInput
								placeholder="Select your gender"
								value={field.value}
								onChangeText={field.onChange}
								textContentType="givenName"
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="location"
					render={({ field }) => (
						<View className="space-y-[6px]">
							<Text className="text-sm text-off-black">Location</Text>
							<TextInput
								placeholder="Kindly enter you address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
						</View>
					)}
				/>
			</View>
			<View className="mt-auto">
				<StyledButton
					onPress={() => nextStep((prev) => prev + 1)}
					title="Continue"
				/>
			</View>
		</View>
	);
};

export default EmailSignupForm;
