import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Image,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { toast } from "sonner-native";
import { z } from "zod";
import StyledButton from "../StyledButton";
import useUserType from "@/hooks/useUserType";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { handleError } from "@/utils";

const FormSchema = z.object({
	phone: z.string().min(10).max(15),
});
type FormType = z.infer<typeof FormSchema>;

const PhoneSignup = () => {
	const { userType } = useUserType();

	const [show, setShow] = useState(false);
	const [countryCode, setCountryCode] = useState("+234");
	const [countryFlag, setCountryFlag] = useState("🇳🇬");
	const globalContext = useGlobalContext();
	const { setItem } = useAsyncStorage();

	if (!globalContext) return null;

	const { setIsLoading } = globalContext;

	const form = useForm<FormType>({
		defaultValues: {
			phone: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: Api.phoneSignup,
		onMutate: () => {
			setIsLoading(true);
		},
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function handleSubmit(val: FormType) {
		mutate(
			{
				type: "client",
				payload: { phone: countryCode.concat(val.phone) },
			},
			{
				onSuccess: (res) => {
					console.log({ res });
					toast.success(res.data.message);
					setItem(
						"tempUser",
						JSON.stringify({
							phone: countryCode.concat(val.phone),
							userId: res.data.data.token.user_id ?? "",
						})
					);
					router.push("/clients/otp-verification");
				},
				onError: (err) => {
					console.log(err);
					toast.error(err.message);
					handleError(err);
				},
			}
		);
	}

	return (
		<View>
			<Controller
				control={form.control}
				name="phone"
				render={({ field }) => (
					<View className="">
						<Text className="text-off-black mb-[6px]">
							Enter your phone number
						</Text>
						<View className="flex-row w-full">
							<View className="mr-[6px]">
								<TouchableOpacity
									onPress={() => setShow(true)}
									className="bg-[#FCFCFD] p-[10px] flex-row items-center"
								>
									<Text className="mr-2 text-2xl">{countryFlag}</Text>
									<Text className="text-off-black text-base">
										{countryCode}
									</Text>
								</TouchableOpacity>
								<CountryPicker
									show={show}
									lang="en"
									// when picker button press you will get the country object with dial code
									pickerButtonOnPress={(item) => {
										setCountryCode(item.dial_code);
										setCountryFlag(item.flag);
										setShow(false);
									}}
								/>
							</View>
							<TextInput
								className="flex-1 p-2 rounded border border-[#f2f2f2]"
								value={field.value}
								onChangeText={field.onChange}
								inputMode="tel"
								textContentType="telephoneNumber"
								keyboardType="phone-pad"
							/>
						</View>
					</View>
				)}
			/>
			<StyledButton
				onPress={form.handleSubmit(handleSubmit)}
				title="Continue"
			/>
		</View>
	);
};

export default PhoneSignup;
