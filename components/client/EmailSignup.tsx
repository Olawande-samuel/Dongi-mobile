import {
	View,
	Text,
	TextInput,
	Pressable,
	ScrollView,
	FlatList,
	KeyboardAvoidingView,
	Platform,
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
import useUserLocation from "@/hooks/useUserLocation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectDropdown from "react-native-select-dropdown";
import { EvilIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { toast } from "sonner-native";
import { handleError } from "@/utils";
import { router } from "expo-router";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

const FormSchema = z.object({
	firstname: z.string().min(2, "First Name is required"),
	lastname: z.string().min(2, "Last Name is required"),
	email: z.string().email(),
	gender: z.union([z.literal("MALE"), z.literal("FEMALE"), z.literal("OTHER")]),
	location: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailSignup = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	// const { errorMsg, location } = useUserLocation();

	const form = useForm<FormType>({
		defaultValues: {
			firstname: "",
			lastname: "",
			location: "",
			email: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { getItem, setItem } = useAsyncStorage();

	const globalContext = useGlobalContext();

	const [phone, setPhone] = useState({ phone: "", userId: "" });

	const { setIsLoading } = globalContext;

	const { mutate } = useMutation({
		mutationFn: Api.registerUserInfo,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	useEffect(() => {
		(async () => {
			const val = await getItem("tempUser");
			if (val) {
				setPhone(JSON.parse(val));
			}
		})();
	}, []);

	console.log(form.getValues());
	console.log(form.formState.errors);

	function submit(val: FormType) {
		console.log(val);
		const payload = { ...val, user_id: phone.userId };
		mutate(
			{ type: "client", payload },
			{
				onSuccess: (res) => {
					console.log({ res });
					toast.success("Registered Successfully");
					setItem("tempUser", JSON.stringify({ ...phone, email: val.email }));
					nextStep((step) => step + 1);
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}
	return (
		<KeyboardAvoidingView
			className="border-4 border-red-400"
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{
				flex: 1,
				backgroundColor: "#FFF",
				paddingHorizontal: 16,
				paddingVertical: 16,
			}}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
				<FormProvider {...form}>
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
									name="lastname"
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
											onChangeText={(text) =>
												field.onChange(text.toLowerCase())
											}
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
													form.setValue("gender", selectedItem.value);
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
						<View className="flex-1">
							<VirtualizedList />
						</View>
						<Pressable
							onPress={form.handleSubmit(submit)}
							className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
						>
							<Text className="text-white">Continue</Text>
						</Pressable>
					</View>
				</FormProvider>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
// autocomplete requires this
function VirtualizedList() {
	return (
		<FlatList
			data={[]}
			ListHeaderComponent={LocationComponent}
			renderItem={() => <Text>Loading</Text>}
		/>
	);
}

function LocationComponent() {
	const { setValue } = useFormContext();
	return (
		<View className="mb-5">
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
							setValue("location", data.description);
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
	);
}

export default EmailSignup;
