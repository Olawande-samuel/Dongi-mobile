import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
	firstName: z.string().min(2, "First Name is required"),
	lastName: z.string().min(2, "Last Name is required"),
	email: z.string().email(),
	gender: z.union([
		z.literal("male"),
		z.literal("female"),
		z.literal("others"),
	]),
	location: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailSignupForm = () => {
	const form = useForm<FormType>({
		defaultValues: {
			firstName: "",
			lastName: "",

			location: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function submit(val: FormType) {}
	return (
		<View className="flex-1">
			<View className="flex-row justify-between mb-5">
				<Controller
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<View>
							<Text>First Name</Text>
							<TextInput
								placeholder="Enter your first name"
								value={field.value}
								onChangeText={field.onChange}
							/>
						</View>
					)}
				/>
				<Controller
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<View>
							<Text>Last Name</Text>
							<TextInput
								placeholder="Enter your last name"
								value={field.value}
								onChangeText={field.onChange}
							/>
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="email"
					render={({ field }) => (
						<View>
							<Text>Email</Text>
							<TextInput
								placeholder="Enter your email address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
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
						<View>
							<Text>Gender</Text>
							<TextInput
								placeholder="Enter your email address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
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
						<View>
							<Text>Location</Text>
							<TextInput
								placeholder="Kindly enter you address"
								value={field.value}
								onChangeText={field.onChange}
								keyboardType="email-address"
								textContentType="emailAddress"
							/>
						</View>
					)}
				/>
			</View>
			<Pressable className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center">
				<Text className="text-white">Continue</Text>
			</Pressable>
		</View>
	);
};

export default EmailSignupForm;
