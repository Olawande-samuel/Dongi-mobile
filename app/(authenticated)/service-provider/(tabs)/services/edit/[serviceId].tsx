import {
	View,
	Text,
	ScrollView,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import RouteHeader from "@/components/shared/RouteHeader";
import useUserInfo from "@/hooks/useUserInfo";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";

const FormSchema = z.object({
	name: z.string(),
	description: z
		.string()
		.max(600, "Description should not be more than 500 characters"),
	images: z.array(z.string()).min(1, "At least one image is required"),
	category_id: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

type NewImage = {
	uri: string;
	type: string;
	name: string;
	base64?: string | null;
};

const EditService = () => {
	const params = useLocalSearchParams();
	const user = useServiceProviderUserInfo();
	const { pickImage } = useDocumentPicker();
	const [newImages, setNewImages] = useState<NewImage[]>([]);

	const { data, isLoading } = useQuery({
		queryKey: ["get provider service by id", params.serviceId],
		queryFn: () => Api.getServiceById(params.serviceId as string),
		enabled: !!params.serviceId,
	});

	const serviceInfo = data?.data?.data;

	const queryClient = useQueryClient();

	const form = useForm<FormType>({
		defaultValues: {
			name: "",
			description: "",
			images: [],
		},
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		if (serviceInfo) {
			form.reset({
				name: serviceInfo.name,
				description: serviceInfo.description,
				images: serviceInfo.images ?? [],
				category_id: serviceInfo.category.uuid,
			});
		}
	}, [data?.data?.data]);

	const images = form.watch("images") ?? [];

	const { mutate, isPending } = useMutation({
		mutationFn: Api.editService,
		onSuccess: () => {
			toast.success("Service updated successfully");
			setNewImages([]);
			queryClient.invalidateQueries({
				queryKey: ["get all services"],
			});
			router.back();
		},
		onError: (err) => {
			handleError(err);
		},
	});

	function onSubmit(val: FormType) {
		if (serviceInfo) {
			const formData = new FormData();
			formData.append("name", val.name);
			formData.append("description", val.description);
			formData.append("category_id", val.category_id);
			formData.append("userId", user?.data?.user.uuid as string);

			// val.images.forEach((url) => formData.append("existing_images", url));
			newImages.forEach((img, i) =>
				formData.append("service_images", img as any, `service_profile_${i}`),
			);
			mutate({ serviceId: serviceInfo.uuid, formData });
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white px-4 large:px-6  ">
				<RouteHeader title="Services" subTitle="Edit a service" />

				{isLoading ? (
					<ActivityIndicator />
				) : (
					<>
						<ScrollView
							className="flex-1 bg-white py-[18px]"
							showsVerticalScrollIndicator={false}
						>
							<KeyboardAvoidingView
								behavior={Platform.OS === "ios" ? "padding" : undefined}
								style={{
									flex: 1,
								}}
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
											render={({ field }) => {
												const total = images.length + newImages.length;
												return (
													<View className="gap-y-[6px]">
														<Text className="text-xs large:text-sm text-off-black">
															Service images
														</Text>
														<View className="flex-row flex-wrap gap-2">
															{images.map((uri, index) => (
																<View
																	key={uri}
																	className="rounded border border-inner-light overflow-hidden"
																	style={{ width: 100, height: 100 }}
																>
																	<Image
																		source={{ uri }}
																		style={{ width: "100%", height: "100%" }}
																		resizeMode="cover"
																	/>
																	<Pressable
																		onPress={() =>
																			field.onChange(
																				images.filter((_, i) => i !== index),
																			)
																		}
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
															{newImages.map((img, index) => (
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
																		onPress={() =>
																			setNewImages(
																				newImages.filter((_, i) => i !== index),
																			)
																		}
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
															{total < 3 && (
																<Pressable
																	onPress={async () => {
																		const result = await pickImage();
																		if (result) {
																			setNewImages([...newImages, result]);
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
																		Add more
																	</Text>
																</Pressable>
															)}
														</View>
														<Text className="text-muted text-xs font-regular">
															Up to 3 images
														</Text>
													</View>
												);
											}}
										/>
										{form.formState.errors?.images && (
											<Text className="text-xs text-red-400">
												{form.formState.errors?.images.message ?? ""}
											</Text>
										)}
									</View>
								</View>
							</KeyboardAvoidingView>
							<View className="mt-auto mb-6">
								<StyledButton
									title="Next"
									isLoading={isPending}
									onPress={form.handleSubmit(onSubmit)}
								/>
							</View>
						</ScrollView>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default EditService;
