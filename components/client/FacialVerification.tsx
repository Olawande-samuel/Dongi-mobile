import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import FacialVerificationForm from "./FacialVerificationForm";

import TestFaceDetection from "./TestFaceDetection";

const FacialVerification = ({
	steps,
}: {
	steps: number;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<View>
					<Text className="text-base text-off-black text-center">
						Facial verification
					</Text>
					<Text className="text-sm text-muted text-center">
						Kindly put your face in border
					</Text>
				</View>
				<View></View>
			</View>
			<View className="flex-row space-x-2 items-center mb-5">
				{[...Array(4)].map((_, i) => (
					<View
						key={i}
						className={`h-1 basis-[20%] rounded-[999px] ${
							steps >= i + 1 ? "bg-primary" : "bg-[#1FB4FF1A]"
						}`}
					></View>
				))}

				<View className="basis-[20]%">
					<Text className="ml-1 text-muted">{`${steps}/4`}</Text>
				</View>
			</View>
			<View className="flex-1">
				{/* <TestFaceDetection /> */}
				<FacialVerificationForm />
			</View>
		</View>
	);
};

export default FacialVerification;
