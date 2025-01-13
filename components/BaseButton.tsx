import { View, Text, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	className?: string;
	
}
const BaseButton = ({ children, className }: Props) => {
	return (
		<Pressable className={`rounded px-1 py-[10px] ${className}`}>
			<Text className="text-base text-center">{children}</Text>
		</Pressable>
	);
};

export default BaseButton;
