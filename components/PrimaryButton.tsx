import { View, Text, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";

interface Props {
	className?: string;
	onPress: VoidFunction;
	title: string;
}
const PrimaryButton = ({ title, className, ...rest }: Props) => {
	return (
		<Pressable
			className={`rounded px-1 py-[10px] bg-primary ${className}`}
			{...rest}
		>
			<Text className="text-base font-regular text-center text-white">
				{title}
			</Text>
		</Pressable>
	);
};

export default PrimaryButton;
