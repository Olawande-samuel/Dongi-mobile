import {
	View,
	Text,
	ScrollView,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
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

const FormSchema = z.object({
	name: z.string(),
	description: z
		.string()
		.max(600, "Description should not be more than 500 characters"),
	images: z.object({
		uri: z.string(),
		type: z.string().optional(),
		name: z.string(),
	}),
	category_id: z.string(),
	starting_price: z.number().optional(),
});

type FormType = z.infer<typeof FormSchema>;

const EditService = () => {
	const params = useLocalSearchParams();
	const { pickImage } = useDocumentPicker();

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
		},
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		if (serviceInfo) {
			form.reset({
				name: serviceInfo.name,
				description: serviceInfo.description,
				...(serviceInfo.images && {
					images: { uri: serviceInfo.images?.[0], name: "service image" },
				}),
				category_id: serviceInfo.category_id,
				starting_price: Number(serviceInfo.starting_price),
			});
		}
	}, [data?.data?.data]);

	console.log({ form: form.formState.errors });

	const bannerName = form.watch("images")?.name ?? "";

	const { mutate, isPending } = useMutation({
		mutationFn: Api.editService,
		onSuccess: () => {
			toast.success("Service updated successfully");
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
			const payload = {
				...val,
				images: [val.images.uri],
			};
			mutate({ serviceId: serviceInfo?.uuid, payload });
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
																field.onChange(result);
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
															{bannerName ?? "Upload your business banner"}
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
