import {
	View,
	Text,
	ScrollView,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentPicker from "@/hooks/useDocumentPicker";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { SIZES } from "@/utils/constants";
import StyledButton from "@/components/StyledButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { handleError } from "@/utils";
import { toast } from "sonner-native";
import { router } from "expo-router";
import AppModal from "@/components/AppModal";
import RouteHeader from "@/components/shared/RouteHeader";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";
import { useGlobalContext } from "@/providers/GlobalStateProvider";

const FormSchema = z.object({
	name: z.string().trim(),
	description: z
		.string()
		.max(600, "Description should not be more than 500 characters")
		.trim(),
	images: z
		.array(
			z.object({
				uri: z.string(),
				type: z.string(),
				name: z.string(),
				base64: z.string().nullable().optional(),
			}),
		)
		.min(1, "At least one image is required")
		.max(3, "Maximum of three images"),
});

type FormType = z.infer<typeof FormSchema>;

const AddNewService = () => {
	const { pickImage } = useDocumentPicker();
	const [modalVisible, setModalVisible] = useState(false);
	const { data: userInfo } = useServiceProviderUserInfo();

	const { setIsLoading, isLoading } = useGlobalContext();

	const queryClient = useQueryClient();

	const form = useForm<FormType>({
		defaultValues: {
			name: "",
			description: "",
			images: [],
		},
		resolver: zodResolver(FormSchema),
	});

	const images = form.watch("images") || [];

	const { mutate } = useMutation({
		mutationFn: Api.createNewService,
		onSuccess: () => {
			toast.success("Service created successfully");
			queryClient.invalidateQueries({
				queryKey: ["get all services"],
			});
			form.reset({
				description: "",
				name: "",
			});
			setModalVisible(true);
		},
		onError: (err) => {
			handleError(err);
		},
		onMutate: () => {
			setIsLoading(true);
		},
		onSettled: () => setIsLoading(false),
	});

	function onSubmit(val: FormType) {
		if (userInfo?.user?.category_of_service) {
			const formData = new FormData();
			formData.append("category_id", userInfo.user.category_of_service);
			formData.append("name", val.name);
			formData.append("description", val.description);

			console.log({ formData });
			// Append each image to FormData
			val.images.forEach((image, index) => {
				formData.append(
					"service_images",
					image as any,
					`service_profile_${index}`,
				);
			});

			mutate(formData);
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white px-4 large:px-6  ">
				<RouteHeader title="Services" subTitle="Create a service" />
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={{
						flex: 1,
					}}
				>
					<ScrollView
						className="flex-1 bg-white py-[18px]"
						showsVerticalScrollIndicator={false}
					>
						<View className="mb-4 flex-1 p-2 bg-white rounded-[9px] gap-y-4 ">
							<View className="mb-5">
								<Controller
									control={form.control}
									name="name"
									render={({ field }) => (
										<View className="gap-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												What is the name of your service?
											</Text>
											<View className="gap-y-2">
												<TextInput
													multiline
													value={field.value}
													onChangeText={field.onChange}
													className="p-2 text-muted text-sm large:text-base rounded border border-inner-light"
												/>
											</View>
										</View>
									)}
								/>
								{form.formState.errors?.name && (
									<Text className="text-xs text-red-400">
										{form.formState.errors?.name.message ?? ""}
									</Text>
								)}
							</View>
							<View className="mb-5">
								<Controller
									control={form.control}
									name="description"
									render={({ field }) => (
										<View className="gap-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												Write a brief description of your service?
											</Text>
											<View className="gap-y-2">
												<TextInput
													placeholder=""
													multiline
													value={field.value}
													onChangeText={field.onChange}
													className="p-2 text-muted text-sm large:text-base rounded border border-inner-light"
													style={{ height: 96, textAlignVertical: "top" }}
												/>
											</View>
											<Text className="text-muted text-xs font-regular">
												500 characters max
											</Text>
										</View>
									)}
								/>
								{form.formState.errors?.description && (
									<Text className="text-xs text-red-400">
										{form.formState.errors?.description.message ?? ""}
									</Text>
								)}
							</View>
							<View className="mb-5">
								<Controller
									control={form.control}
									name="images"
									render={({ field }) => (
										<View className="gap-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												Upload an image communicating your service
											</Text>
											<View className="flex-row flex-wrap gap-2">
												{images.map((img, index) => (
													<View
														key={img.uri}
														className="rounded border border-inner-light overflow-hidden"
														style={{ width: 100, height: 100 }}
													>
														<Image
															source={{ uri: img.uri }}
															style={{ width: "100%", height: "100%" }}
															resizeMode="cover"
														/>
														<Pressable
															onPress={() => {
																field.onChange(
																	images.filter((_, i) => i !== index),
																);
															}}
															hitSlop={8}
															style={{
																position: "absolute",
																top: 4,
																right: 4,
																backgroundColor: "rgba(0,0,0,0.55)",
																borderRadius: 999,
																padding: 4,
															}}
														>
															<Feather name="x" size={12} color="#fff" />
														</Pressable>
													</View>
												))}
												{images.length < 3 && (
													<Pressable
														onPress={async () => {
															const result = await pickImage();
															if (result) {
																field.onChange([...images, result]);
															}
														}}
														className="border border-inner-light rounded justify-center items-center gap-y-1"
														style={{ width: 100, height: 100 }}
													>
														<Feather
															name="upload-cloud"
															size={SIZES.height > 700 ? 28 : 22}
															color="#676b83"
														/>
														<Text className="text-muted text-xs text-center font-regular">
															{images.length === 0 ? "Add image" : "Add more"}
														</Text>
													</Pressable>
												)}
											</View>
											<Text className="text-muted text-xs font-regular">
												Up to 3 images
											</Text>
										</View>
									)}
								/>
								{form.formState.errors?.images && (
									<Text className="text-xs text-red-400">
										{form.formState.errors?.images.message ?? ""}
									</Text>
								)}
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
				<View className="mt-auto mb-3">
					<StyledButton title="Next" onPress={form.handleSubmit(onSubmit)} />
				</View>
			</View>
			<AppModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onPress={() => router.replace("/service-provider/services")}
				title="Congratulations you have successfully created your service"
				buttonText="Continue"
			/>
		</SafeAreaView>
	);
};

export default AddNewService;
