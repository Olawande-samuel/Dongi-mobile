import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import StyledButton from "../StyledButton";
import useDocumentPicker from "@/hooks/useDocumentPicker";

const FormSchema = z.object({
	category_of_service: z.string(),
	business_logo_or_passport_photo: z.string(),
	bio: z.string(),
	brief_introduction: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
const BusinessInformation = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { pickDocument } = useDocumentPicker();

	const form = useForm<FormType>({
		defaultValues: {
			category_of_service: "",
			business_logo_or_passport_photo: "",
			bio: "",
			brief_introduction: "",
		},
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(val: FormType) {
		nextStep((prev) => prev + 1);
	}

	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="category_of_service"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Category of Service
								</Text>
								<TextInput
									placeholder=""
									value={field.value}
									onChangeText={field.onChange}
									className="p-2 text-muted text-base rounded border border-inner-light"
								/>
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
								<Text className="text-sm text-off-black">Business Banner</Text>
								<Pressable
									onPress={async () => {
										const result = await pickDocument();
										console.log({ result });
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
										Upload your business banner
									</Text>
								</Pressable>
							</View>
						)}
					/>
					{form.formState.errors?.business_logo_or_passport_photo && (
						<Text className="text-xs text-red-400">
							{form.formState.errors?.business_logo_or_passport_photo.message ??
								""}
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
										className="p-2 text-muted text-base rounded border border-inner-light h-24"
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
			</View>
			<View className="mt-auto">
				<StyledButton title="Continue" onPress={form.handleSubmit(onSubmit)} />
			</View>
		</View>
	);
};

export default BusinessInformation;
