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
			})
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
			const payload = {
				...val,
				images: val.images,
				category_id: userInfo.user.category_of_service,
			};
			const formData = new FormData();
			formData.append("category_id", userInfo.user.category_of_service);
			formData.append("name", val.name);
			formData.append("description", val.description);

			// Append each image to FormData
			val.images.forEach((image, index) => {
				formData.append(
					"service_images",
					image as any,
					`service_profile_${index}`
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
						<View className="mb-4 flex-1 p-2 bg-white rounded-[9px] space-y-4 ">
							<View className="mb-5">
								<Controller
									control={form.control}
									name="name"
									render={({ field }) => (
										<View className="space-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												What is the name of your service?
											</Text>
											<View className="space-y-2">
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
										<View className="space-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												Write a brief description of your service?
											</Text>
											<View className="space-y-2">
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
										<View className="space-y-[6px]">
											<Text className="text-xs large:text-sm text-off-black">
												Upload an image communicating your service
											</Text>
											<Pressable
												onPress={async () => {
													const result = await pickImage();
													if (result) {
														field.onChange([...images, result]);
													}
												}}
												className="relative border border-inner-light rounded py-[19px] px-2 justify-center items-center"
											>
												<Feather
													name="upload-cloud"
													size={SIZES.height > 700 ? 32 : 24}
													color="#676b83"
													className="mb-[6px]"
												/>
												<Text className=" text-muted text-sm large:text-base text-center font-regular ">
													{images.length > 0
														? `${images.length} image${
																images.length > 1 ? "s" : ""
														  } selected`
														: "Upload your business banner"}
												</Text>
											</Pressable>
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
				onPress={() => router.replace("/service-provider/(tabs)/services")}
				title="Congratulations you have successfully created your service"
				buttonText="Continue"
			/>
		</SafeAreaView>
	);
};

export default AddNewService;
