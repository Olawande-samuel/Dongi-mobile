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
	ActivityIndicator,
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectDropdown from "react-native-select-dropdown";
import { toast } from "sonner-native";
import { z } from "zod";
import FormError from "../FormError";

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
		city: z.string(),
		state: z.string(),
		country: z.string(),
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

const GENDER_OPTIONS = [
	{ title: "Male", value: "MALE" },
	{ title: "Female", value: "FEMALE" },
	{ title: "Other", value: "OTHER" },
] as const;

const EmailForm = () => {
	const form = useFormContext();
	const [isFetching, setIsFetching] = React.useState(false);

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
									data={GENDER_OPTIONS as any}
									defaultValue={
										GENDER_OPTIONS.find((o) => o.value === field.value) ?? null
									}
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
				<View className="min-h-[200px]">
					<GooglePlacesAutocomplete
						placeholder="Enter your location"
						debounce={300}
						enablePoweredByContainer
						onFail={(error) => {
							setIsFetching(false);
							console.log(error);
							toast.error("An error occurred fetching your location");
						}}
						fetchDetails
						textInputProps={{
							onChangeText: (text) => {
								setIsFetching(text.length > 0);
								form.setValue("location", text);
							},
						}}
						renderRightButton={() =>
							isFetching ? (
								<ActivityIndicator
									size="small"
									color="#18658B"
									style={{ marginRight: 8, alignSelf: "center" }}
								/>
							) : null
						}
						onPress={(data, detail) => {
							setIsFetching(false);
							const components = detail?.address_components ?? [];
							const city =
								components.find((c) => c.types.includes("locality"))
									?.long_name ?? "";
							const state =
								components.find((c) =>
									c.types.includes("administrative_area_level_1"),
								)?.long_name ?? "";
							const country =
								components.find((c) => c.types.includes("country"))
									?.long_name ?? "";
							form.setValue("location", data.description);
							form.setValue("latitude", detail?.geometry.location.lat);
							form.setValue("longitude", detail?.geometry.location.lng);
							form.setValue("city", city);
							form.setValue("state", state);
							form.setValue("country", country);
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
				{form.formState?.errors?.location ? (
					<FormError
						value={form.formState.errors?.location?.message as string}
					/>
				) : null}
			</View>
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
		mode: "onChange",
	});

	console.log(form.getValues(), form.formState.errors);

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
