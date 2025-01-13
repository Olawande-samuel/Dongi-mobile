import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import StyledButton from "../StyledButton";

const FormSchema = z.object({
	category: z.string(),
	banner: z.string(),
	bio: z.string(),
	about: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
const IdentityVerification = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const form = useForm<FormType>({
		defaultValues: {
			category: "",
			banner: "",
			bio: "",
			about: "",
		},
		resolver: zodResolver(FormSchema),
	});
	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-5">
					<Controller
						control={form.control}
						name="category"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Choose a means of verification
								</Text>
								<TextInput
									secureTextEntry
									placeholder="********"
									value={field.value}
									onChangeText={field.onChange}
									textContentType="password"
									className="p-2 text-muted text-base rounded border border-inner-light"
								/>
							</View>
						)}
					/>
				</View>
				<View className="mb-5">
					<Controller
						control={form.control}
						name="category"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">Upload document</Text>
								<Pressable className="relative border border-inner-light rounded py-[19px] px-2 justify-center items-center">
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
				</View>
				<View className="mb-5">
					<Controller
						control={form.control}
						name="bio"
						render={({ field }) => (
							<View className="space-y-[6px]">
								<Text className="text-sm text-off-black">
									Upload Business Certificate
								</Text>
								<Pressable className="relative border border-inner-light rounded py-[19px] px-2 justify-center items-center">
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
				</View>
			</View>
			<View className="mt-auto">
				<View className="mb-6">
					<Text className="w-full text-muted text-sm font-regular font-normal text-center">
						Please ensure to upload your government issued verification.
						Verification takes less than 24 hours
					</Text>
				</View>
				<StyledButton
					title="Verify"
					onPress={() => nextStep((prev) => prev + 1)}
				/>
			</View>
		</View>
	);
};

export default IdentityVerification;
