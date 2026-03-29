import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { cn, handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { EvilIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
} from "react-hook-form";
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { toast } from "sonner-native";
import { z } from "zod";
import FormError from "../FormError";

import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";

const FormSchema = z
	.object({
		firstname: z.string().min(2, "First Name is required"),
		lastname: z.string().min(2, "Last Name is required"),
		email: z.string().email(),
		gender: z.union([
			z.literal("MALE"),
			z.literal("FEMALE"),
			z.literal("OTHER"),
		]),
		location: z.string({ message: "Enter a valid location" }),
		latitude: z.number(),
		longitude: z.number(),
	})
	.refine(
		(data) => {
			// If location is provided, both coordinates must be present
			if (data.location) {
				return data.latitude != null && data.longitude != null;
			}
			return true;
		},
		{
			message: "Enter a valid location",
			path: ["location"],
		},
	);

type FormType = z.infer<typeof FormSchema>;

const EmailForm = () => {
	const form = useFormContext();

	const { locationResults, setTerm, clearSearch, searchDetails, term } =
		useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_API!, {
			language: "en",
			debounce: 300,
		});

	return (
		<View className="flex-1">
			<View className="flex-row mb-5 gap-x-4">
				<View className="flex-1">
					<Controller
						control={form.control}
						name="firstname"
						render={({ field }) => (
							<View className="gap-y-[6px]">
								<Text className="text-sm text-off-black">First Name</Text>
								<TextInput
									placeholder="First name"
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light h-[42px]"
									textContentType="name"
								/>
								{form.formState?.errors?.firstname ? (
									<FormError
										value={form.formState.errors?.firstname?.message as string}
									/>
								) : null}
							</View>
						)}
					/>
				</View>

				<View className="flex-1">
					<Controller
						control={form.control}
						name="lastname"
						render={({ field }) => (
							<View className="gap-y-[6px]">
								<Text className="text-sm text-off-black">Last Name</Text>
								<TextInput
									placeholder="Last name"
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light h-[42px]"
								/>
								{form.formState?.errors?.lastname ? (
									<FormError
										value={form.formState.errors?.lastname?.message as string}
									/>
								) : null}
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
						<View className="gap-y-[6px]">
							<Text className="text-sm text-off-black">Email</Text>
							<TextInput
								placeholder="Enter your email address"
								value={field.value}
								onChangeText={(text) => field.onChange(text.toLowerCase())}
								keyboardType="email-address"
								textContentType="emailAddress"
								className="p-2 text-muted text-base rounded border border-inner-light"
							/>
							{form.formState?.errors?.email ? (
								<FormError
									value={form.formState.errors?.email?.message as string}
								/>
							) : null}
						</View>
					)}
				/>
			</View>
			<View className="mb-5">
				<Controller
					control={form.control}
					name="gender"
					render={({ field }) => (
						<View className="gap-y-[6px]">
							<Text className="text-sm text-off-black">Gender</Text>
							<View style={{ minHeight: 20 }}>
								<SelectDropdown
									data={[
										{ title: "Male", value: "MALE" },
										{ title: "Female", value: "FEMALE" },
										{ title: "Other", value: "OTHER" },
									]}
									onSelect={(selectedItem) => {
										// form.setValue("gender", selectedItem.value);
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
														color: "#99a2b3",
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
								{form.formState?.errors?.gender ? (
									<FormError
										value={form.formState.errors?.gender?.message as string}
									/>
								) : null}
							</View>
						</View>
					)}
				/>
			</View>

			<View className="gap-y-[6px]">
				<Text className="text-sm text-off-black">Location</Text>
				<View>
					<TextInput
						value={term}
						onChangeText={setTerm}
						placeholder="Enter your location"
						className="p-2 text-muted text-base rounded border border-inner-light"
					/>
					<View
						className="px-2 gap-y-2"
						style={{
							backgroundColor: "white",
							elevation: 3, // for Android
							shadowColor: "#000", // for iOS
							shadowOpacity: 0.1,
							shadowRadius: 4,
						}}
					>
						{locationResults.slice(0, 3).map((el, i) => (
							<TouchableOpacity
								key={String(i)}
								className="w-full p-1"
								onPress={async () => {
									console.log("pressed");
									const details = await searchDetails(el.place_id);
									form.setValue("location", details.formatted_address);
									form.setValue("latitude", details?.geometry.location.lat);
									form.setValue("longitude", details?.geometry.location.lng);
									setTerm(details.formatted_address);
								}}
							>
								<Text>{el.description}</Text>
							</TouchableOpacity>
						))}
					</View>

					{form.formState?.errors?.location ? (
						<FormError
							value={form.formState.errors?.location?.message as string}
						/>
					) : null}
				</View>
			</View>

			<View className="flex-1">{/* <VirtualizedList /> */}</View>
		</View>
	);
};

function EmailSignup({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) {
	const { setItem } = useAsyncStorage("tempUser");
	const globalContext = useGlobalContext();
	const { setIsLoading } = globalContext;

	const { data } = useTempUser();

	const form = useForm<FormType>({
		defaultValues: {
			firstname: "",
			lastname: "",
			location: "",
			email: "",
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
			{ type: "client", payload },
			{
				onSuccess: () => {
					toast.success("Registered Successfully");
					setItem(JSON.stringify({ ...data, email: val.email }));
					nextStep((step) => step + 1);
				},
				onError: (err) => {
					handleError(err);
				},
			},
		);
	}

	return (
		<View className="flex-1 pb-5">
			<FormProvider {...form}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={120}
					style={{ flex: 1 }}
				>
					<TouchableWithoutFeedback className="" onPress={Keyboard.dismiss}>
						<FlatList
							data={[]}
							ListHeaderComponent={() => <EmailForm />}
							renderItem={() => null}
							showsVerticalScrollIndicator={false}
							keyboardShouldPersistTaps="always"
						/>
					</TouchableWithoutFeedback>
					<View className="mt-auto">
						<Pressable
							onPress={form.handleSubmit(submit)}
							disabled={!form.formState.isValid}
							className={cn(
								"bg-primary rounded px-1 py-[10px] justify-center items-center disabled:opacity-20",
							)}
						>
							<Text className="text-white">Continue</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</FormProvider>
		</View>
	);
}

export default EmailSignup;
