import {
	View,
	Text,
	TextInput,
	Pressable,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EvilIcons, Feather } from "@expo/vector-icons";
import StyledButton from "../StyledButton";
import useDocumentPicker from "@/hooks/useDocumentPicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import useTempUser from "@/hooks/useTempUser";
import { toast } from "sonner-native";
import { router } from "expo-router";
import { handleError } from "@/utils";
import SelectDropdown from "react-native-select-dropdown";

const FormSchema = z.object({
	category_of_service: z.string(),
	business_logo_or_passport_photo: z.object({
		uri: z.string(),
		type: z.string(),
		name: z.string(),
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

	const bannerName = form.watch("business_logo_or_passport_photo")?.name ?? "";

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
		})
	);

	async function onSubmit(val: FormType) {
		const formData = new FormData();
		formData.append("category_of_service", val.category_of_service);
		formData.append("brief_introduction", val.brief_introduction);
		formData.append("bio", val.bio);
		formData.append("user_id", data.userId);
		formData.append(
			"business_logo_or_passport_photo",
			val.business_logo_or_passport_photo.uri
		);

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
				behavior={Platform.OS === "ios" ? "padding" : undefined}
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
								<View className="space-y-[6px]">
									<Text className="text-sm text-off-black">Service Category</Text>
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
							name="business_logo_or_passport_photo"
							render={({ field }) => (
								<View className="space-y-[6px]">
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
										className="relative border border-inner-light rounded py-[19px] px-2 justify-center items-center"
									>
										<Feather
											name="upload-cloud"
											size={32}
											color="#676b83"
											className="mb-[6px]"
										/>
										<Text className=" text-muted text-base text-center font-regular ">
											{bannerName ?? "Upload your business banner"}
										</Text>
									</Pressable>
								</View>
							)}
						/>
						{form.formState.errors?.business_logo_or_passport_photo && (
							<Text className="text-xs text-red-400">
								{form.formState.errors?.business_logo_or_passport_photo
									.message ?? ""}
							</Text>
						)}
					</View>
					<View className="mb-5">
						<Controller
							control={form.control}
							name="bio"
							render={({ field }) => (
								<View className="space-y-[6px]">
									<Text className="text-sm text-off-black">About You</Text>
									<View className="space-y-2">
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
								<View className="space-y-[6px]">
									<Text className="text-sm text-off-black">
										About Your Business
									</Text>
									<View className="space-y-2">
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
			</KeyboardAvoidingView>
			<View className="mt-auto mb-3">
				<StyledButton title="Continue" onPress={form.handleSubmit(onSubmit)} />
			</View>
		</View>
	);
};

export default BusinessInformation;
