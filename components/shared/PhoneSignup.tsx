import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useGradualAnimation } from "@/hooks/useGradualAnimation";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { toast } from "sonner-native";
import { z } from "zod";
import StyledButton from "../StyledButton";
import FacialVerification from "../client/FacialVerification";

const FormSchema = z.object({
	phone: z.string().min(10).max(15),
});
type FormType = z.infer<typeof FormSchema>;

const PhoneSignup = ({ userType }: { userType: "service" | "client" }) => {
	const { height } = useGradualAnimation();
	const [show, setShow] = useState(false);
	const [countryCode, setCountryCode] = useState("+234");
	const [countryFlag, setCountryFlag] = useState("🇳🇬");
	const globalContext = useGlobalContext();
	const { setItem } = useAsyncStorage();

	const { setIsLoading } = globalContext;

	const keyboardPadding = useAnimatedStyle(() => {
		return {
			height: height.value,
		};
	}, []);

	const form = useForm<FormType>({
		defaultValues: {
			phone: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { mutate } = useMutation({
		mutationFn: Api.phoneSignup,
		onMutate: () => {
			setIsLoading(true);
		},
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function handleSubmit(val: FormType) {
		if (userType === "client") {
			mutate(
				{
					type: "client",
					payload: { phone: countryCode.concat(val.phone) },
				},
				{
					onSuccess: (res) => {
						toast.success(res.data.message);
						const tempUser = {
							phone: countryCode.concat(val.phone),
							userId: res.data.data.user.uuid ?? "",
						};
						setItem("tempUser", JSON.stringify(tempUser));
						router.push("/clients/phone-verification");
					},
					onError: (err) => {
						handleError(err);
					},
				},
			);
			return;
		}
		if (userType === "service") {
			mutate(
				{
					type: "service",
					payload: { phone: countryCode.concat(val.phone) },
				},
				{
					onSuccess: (res) => {
						toast.success(res.data.message);

						const tempUser = {
							phone: countryCode.concat(val.phone),
							userId: res.data.data.user.uuid ?? "",
						};

						setItem("tempUser", JSON.stringify(tempUser));
						router.push("/service-provider/phone-verification");
					},
					onError: (err) => {
						toast.error(err.message);
						handleError(err);
					},
				},
			);
		}
	}

	return (
		<View className="00">
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
			</View>
			<View className="mt-4" style={{ marginTop: 13 }}>
				<StyledButton
					onPress={form.handleSubmit(handleSubmit)}
					// onPress={() => {
					// 	router.push("/clients/sign-up/email");
					// }}
					title="Continue"
				/>
			</View>
			<Animated.View style={keyboardPadding} />
		</View>
	);
};

export default PhoneSignup;
