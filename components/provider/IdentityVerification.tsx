import useDocumentPicker from "@/hooks/useDocumentPicker";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { z } from "zod";
import StyledButton from "../StyledButton";

const FormSchema = z.object({
	means_of_verification: z.string().min(3, { message: "Required" }),
	means_of_verification_file: z.object({
		uri: z.string(),
		name: z.string(),
		mimeType: z.string(),
		size: z.number(),
	}),
	certificate_of_expertise_file: z.object({
		uri: z.string(),
		name: z.string(),
		mimeType: z.string(),
		size: z.number(),
	}),
});

type FormType = z.infer<typeof FormSchema>;

const IdentityVerification = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { pickDocument } = useDocumentPicker();
	const form = useForm<FormType>({
		defaultValues: {
			means_of_verification: "",
		},
		resolver: zodResolver(FormSchema),
	});

	console.log(form.formState.errors);

	function submitForm(val: FormType) {
		nextStep((prev) => prev + 1);
	}

	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="means_of_verification"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Choose a means of verification
								</Text>
								<View>
									<SelectDropdown
										data={[
											{ title: "Driver's License", value: "DRIVERS_LICENSE" },
											{ title: "NIN", value: "NIN" },
											{ title: "Other", value: "OTHER" },
										]}
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
														...(isSelected && { backgroundColor: "#D2D9DF" }),
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
									/>
									{form.formState.errors?.means_of_verification && (
										<Text className="text-xs text-red-400">
											{form.formState.errors?.means_of_verification.message ??
												""}
										</Text>
									)}
								</View>
							</View>
						)}
					/>
				</View>
				<View className="mb-5">
					<Controller
						control={form.control}
						name="means_of_verification_file"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">Upload document</Text>
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
								</Pressable>
							</View>
						)}
					/>
					{form.formState.errors?.means_of_verification_file && (
						<Text className="text-xs text-red-400">
							{form.formState.errors?.means_of_verification_file.message ?? ""}
						</Text>
					)}
				</View>
				<View className="mb-5">
					<Controller
						control={form.control}
						name="certificate_of_expertise_file"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Upload Business Certificate
								</Text>
								<Pressable
									onPress={async () => {
										const result = await pickDocument();
										console.log({ bizResult: result });
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
										Upload a certificate of your expertise
									</Text>
								</Pressable>
							</View>
						)}
					/>
					{form.formState.errors?.certificate_of_expertise_file && (
						<Text className="text-xs text-red-400">
							{form.formState.errors?.certificate_of_expertise_file.message ?? ""}
						</Text>
					)}
				</View>
			</View>
			<View className="mt-auto">
				<View className="mb-6">
					<Text className="w-full text-muted text-sm font-regular font-normal text-center">
						Please ensure to upload your government issued verification.
						Verification takes less than 24 hours
					</Text>
				</View>
				<StyledButton title="Verify" onPress={form.handleSubmit(submitForm)} />
			</View>
		</View>
	);
};

export default IdentityVerification;
