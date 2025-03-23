import {
	View,
	Text,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StyledButton from "../StyledButton";

import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { toast } from "sonner-native";
import { handleError } from "@/utils";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EvilIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import useTempUser from "@/hooks/useTempUser";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const FormSchema = z.object({
	firstname: z.string().min(2, "First Name is required").trim(),
	lastname: z.string().min(2, "Last Name is required").trim(),
	email: z
		.string()
		.email()
		.transform((val) => val.toLowerCase()),
	businessName: z.string(),
	gender: z.union([z.literal("MALE"), z.literal("FEMALE"), z.literal("OTHER")]),
	location: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

function EmailForm() {
	const form = useFormContext();
	return (
		<View className="flex-1">
			<View className="flex-row mb-5 gap-4">
				<View className="flex-1">
					<Controller
						control={form.control}
						name="firstname"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">First Name</Text>
								<TextInput
									placeholder="Enter first name"
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
						name="lastname"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">Last Name</Text>
								<TextInput
									placeholder="Enter last name"
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
							<View>
								<SelectDropdown
									data={[
										{ title: "Male", value: "MALE" },
										{ title: "Female", value: "FEMALE" },
										{ title: "Other", value: "OTHER" },
									]}
									onSelect={(selectedItem) => {
										field.onChange(selectedItem.value);
									}}
									renderButton={(selectedItem, isOpened) => {
										return (
											<View
												className="p-2 rounded flex-1"
												style={{
													paddingHorizontal: 8,
													paddingVertical: 10,
													borderRadius: 4,
													borderWidth: 1,
													borderColor: "#f2f2f2",
													flexDirection: "row",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<Text
													className="text-sm text-off-black"
													style={{
														fontSize: 16,
														color: "#c6c6c6",
														// fontWeight: 400,
													}}
												>
													{(selectedItem && selectedItem.title) ||
														"Select your gender"}
												</Text>
												<EvilIcons
													name={isOpened ? "chevron-up" : "chevron-down"}
													size={24}
												/>
											</View>
										);
									}}
									renderItem={(item, index, isSelected) => {
										return (
											<View
												className="p-3"
												style={{
													...(isSelected && {
														backgroundColor: "#D2D9DF",
													}),
													padding: 12,
												}}
											>
												<Text className="text-sm text-off-black">
													{item.title}
												</Text>
											</View>
										);
									}}
									showsVerticalScrollIndicator={false}
									// dropdownStyle={styles.dropdownMenuStyle}
								/>
							</View>
						</View>
					)}
				/>
			</View>
			<View className="mb-5 flex-1">
				<View className="space-y-[6px]">
					<Text className="text-sm text-off-black">Location</Text>
					<View>
						<GooglePlacesAutocomplete
							placeholder="Search"
							onFail={(error) => {
								console.log("failed", error);
								toast.error("An error occurred fetching your location");
							}}
							onPress={(data) => {
								form.setValue("location", data.description);
							}}
							query={{
								key: process.env.EXPO_PUBLIC_GOOGLE_API,
								language: "en",
							}}
							styles={{
								textInput: {
									borderWidth: 1,
									borderColor: "#f2f2f2",
									padding: 2,
									color: "#99a2b3",
									borderRadius: 4,
									fontSize: 16,
								},
							}}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

const EmailSignupForm = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { setItem } = useAsyncStorage("tempUser");
	const globalContext = useGlobalContext();
	const { setIsLoading } = globalContext;
	const { data } = useTempUser();

	const form = useForm<FormType>({
		defaultValues: {
			firstname: "",
			lastname: "",
			businessName: "",
			location: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { mutate } = useMutation({
		mutationFn: Api.registerUserInfo,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function submit(val: FormType) {
		const payload = { ...val, user_id: data.userId };
		mutate(
			{ type: "service", payload },
			{
				onSuccess: () => {
					toast.success("Registered Successfully");
					setItem(JSON.stringify({ ...data, email: val.email }));
					nextStep((step) => step + 1);
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}
	return (
		<View className="flex-1">
			<FormProvider {...form}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={{ flex: 1 }}
				>
					<TouchableWithoutFeedback
						className="flex-1"
						onPress={Keyboard.dismiss}
					>
						<FlatList
							data={[]}
							ListHeaderComponent={() => <EmailForm />}
							renderItem={() => null}
							showsVerticalScrollIndicator={false}
						/>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
				<StyledButton
					title="Continue"
					className="mb-3"
					onPress={form.handleSubmit(submit)}
				/>
			</FormProvider>
		</View>
	);
};

export default EmailSignupForm;
