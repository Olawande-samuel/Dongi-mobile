import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";

const FormSchema = z.object({
	phone: z.string().min(10).max(15),
});
type FormType = z.infer<typeof FormSchema>;
const PhoneSignup = () => {
	const [show, setShow] = useState(false);
	const [countryCode, setCountryCode] = useState("+234");
	const [countryFlag, setCountryFlag] = useState("🇳🇬");

	console.log({ countryFlag });

	const form = useForm<FormType>({
		defaultValues: {
			phone: "",
		},
		resolver: zodResolver(FormSchema),
	});

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
			<Pressable className="mt-[13px] bg-off-black rounded p-1">
				<Text className="text-white  text-base px-1 py-[10px] text-center ">
					Continue
				</Text>
			</Pressable>
		</View>
	);
};

export default PhoneSignup;
