import { View, Text, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props extends PropsWithChildren {
	steps: number;
	title: string;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
}
const SignUpHeader = ({ steps, setSteps, title, children }: Props) => {
	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable
					onPress={() => {
						if (steps > 1) {
							setSteps((prev) => prev - 1);
						}
					}}
				>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">{title}</Text>
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
			{children}
		</View>
	);
};

export default SignUpHeader;
