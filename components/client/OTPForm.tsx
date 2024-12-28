import { View, Text, Pressable } from "react-native";
import React from "react";
import { OtpInput } from "react-native-otp-entry";

const OTPForm = ({
	nextStep,
}: {
	nextStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-1">
			<View className="flex-1">
				<View className="mb-[6px]">
					<Text className="text-sm text-off-black">
						A code was sent to
						<Text className="font-bold">Reb***ku@gmail.com</Text>
					</Text>
				</View>
				<View>
					<OtpInput
						numberOfDigits={4}
						onTextChange={(text) => console.log(text)}
						type="numeric"
						textInputProps={{
							accessibilityLabel: "One-Time Password",
						}}
						theme={{
							pinCodeContainerStyle: {
								width: 62.25,
								borderRadius: 4,
								borderWidth: 1,
								borderColor: "#F2F2F2",
							},
						}}
					/>
				</View>
			</View>
			<Pressable
				onPress={() => nextStep((prev) => prev + 1)}
				className="bg-primary rounded px-1 py-[10px] mt-auto justify-center items-center"
			>
				<Text className="text-white">Submit</Text>
			</Pressable>
		</View>
	);
};

export default OTPForm;
