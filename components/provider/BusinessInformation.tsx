import useDocumentPicker from "@/hooks/useDocumentPicker";
import useTempUser from "@/hooks/useTempUser";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { toast } from "sonner-native";
import { z } from "zod";
import StyledButton from "../StyledButton";

const FormSchema = z.object({
	category_of_service: z.string(),
	business_logo: z.object({
		uri: z.string(),
		type: z.string(),
		name: z.string(),
		base64: z.string().nullable().optional(),
	}),
	bio: z.string(),
	brief_introduction: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
const BusinessInformation = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { pickImage } = useDocumentPicker();
	const { setIsLoading } = useGlobalContext();
	const { data } = useTempUser();

	const form = useForm<FormType>({
		defaultValues: {
			category_of_service: "",
			bio: "",
			brief_introduction: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const bannerUri = form.watch("business_logo")?.uri ?? "";

	const { data: categories, isLoading } = useQuery({
		queryKey: ["get service categories"],
		queryFn: Api.getServiceCategories,
	});

	const { mutate } = useMutation({
		mutationFn: Api.registerBusinessInfo,
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
		},
	});

	const serviceCategories = categories?.data?.data?.categories?.map(
		(cat: any) => ({
			title: cat.name,
			value: cat.uuid,
		}),
	);

	async function onSubmit(val: FormType) {
		const formData = new FormData();
		formData.append("category_of_service", val.category_of_service);
		formData.append("brief_introduction", val.brief_introduction);
		formData.append("bio", val.bio);
		formData.append("user_id", data.userId);
		formData.append("business_logo", val.business_logo as any);

		// const { uri, type, name, base64 } = val.business_logo;
		// if (base64) {
		// 	const fetchResponse = await fetch(`data:${type};base64,${base64}`);
		// 	const blob = await fetchResponse.blob();
		// 	formData.append("business_logo", blob, name);
		// } else {
		// }

		mutate(formData, {
			onSuccess: (res) => {
				toast.success(res.data.message);
				nextStep((prev) => prev + 1);
			},
			onError: (err) => {
				handleError(err);
			},
		});
	}

	return (
		<View className="flex-1">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={120}
				style={{
					flex: 1,
				}}
			>
				<ScrollView
					className="flex-1 bg-white pb-3"
					showsVerticalScrollIndicator={false}
				>
					<View className="mb-5">
						<Controller
							control={form.control}
							name="category_of_service"
							render={({ field }) => (
								<View className="gap-y-[6px]">
									<Text className="text-sm text-off-black">
										Service Category
									</Text>
									<View>
										<SelectDropdown
											data={serviceCategories || []}
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
																"Select service category"}
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
						{form.formState.errors?.category_of_service && (
							<Text className="text-xs text-red-400">
								{form.formState.errors?.category_of_service.message ?? ""}
							</Text>
						)}
					</View>
					<View className="mb-5">
						<Controller
							control={form.control}
							name="business_logo"
							render={({ field }) => (
								<View className="gap-y-[6px]">
									<Text className="text-sm text-off-black">
										Business Banner
									</Text>
									<Pressable
										onPress={async () => {
											const result = await pickImage();
											if (result) {
												field.onChange(result);
											}
										}}
										className="relative border border-inner-light rounded overflow-hidden"
										style={{ height: 160 }}
									>
										{bannerUri ? (
											<Image
												source={{ uri: bannerUri }}
												style={{ width: "100%", height: "100%" }}
												resizeMode="cover"
											/>
										) : (
											<View className="flex-1 justify-center items-center py-[19px] px-2">
												<Feather
													name="upload-cloud"
													size={32}
													color="#676b83"
													className="mb-[6px]"
												/>
												<Text className="text-muted text-base text-center font-regular">
													Upload your business banner
												</Text>
											</View>
										)}
									</Pressable>
								</View>
							)}
						/>
						{form.formState.errors?.business_logo && (
							<Text className="text-xs text-red-400">
								{form.formState.errors?.business_logo.message ?? ""}
							</Text>
						)}
					</View>
					<View className="mb-5">
						<Controller
							control={form.control}
							name="bio"
							render={({ field }) => (
								<View className="gap-y-[6px]">
									<Text className="text-sm text-off-black">About You</Text>
									<View className="gap-y-2">
										<TextInput
											placeholder="I am ..."
											multiline
											value={field.value}
											maxLength={60}
											onChangeText={field.onChange}
											className="p-2 text-muted text-base rounded border border-inner-light"
										/>
										<Text className="text-muted text-xs font-regular">
											60 characters max
										</Text>
									</View>
								</View>
							)}
						/>
						{form.formState.errors?.bio && (
							<Text className="text-xs text-red-400">
								{form.formState.errors?.bio.message ?? ""}
							</Text>
						)}
					</View>
					<View className="mb-5">
						<Controller
							control={form.control}
							name="brief_introduction"
							render={({ field }) => (
								<View className="gap-y-[6px]">
									<Text className="text-sm text-off-black">
										About Your Business
									</Text>
									<View className="gap-y-2">
										<TextInput
											placeholder=""
											multiline
											value={field.value}
											onChangeText={field.onChange}
											className="p-2 text-muted text-base rounded border border-inner-light"
											style={{ height: 96, textAlignVertical: "top" }}
										/>
									</View>
								</View>
							)}
						/>
						{form.formState.errors?.brief_introduction && (
							<Text className="text-xs text-red-400">
								{form.formState.errors?.brief_introduction.message ?? ""}
							</Text>
						)}
					</View>
				</ScrollView>
				<View className="mt-auto mb-3">
					<StyledButton
						title="Continue"
						onPress={form.handleSubmit(onSubmit)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BusinessInformation;
