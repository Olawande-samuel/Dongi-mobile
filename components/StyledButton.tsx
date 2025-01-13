import useUserType from "@/hooks/useUserType";
import { cn } from "@/utils";
import React from "react";
import { Pressable, Text, StyleSheet, PressableProps } from "react-native";

interface StyledButtonProps extends PressableProps {
	title: string;
	onPress: () => void;
	textClassName?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
	title,
	onPress,
	textClassName,
	className,
	...props
}) => {
	const { userType } = useUserType();
	console.log({ userType });
	const background = `bg-${userType}-primary`;
	console.log({ background });
	return (
		<Pressable
			className={cn(
				` rounded px-1 py-[10px] mt-auto justify-center items-center`,
				background,
				className
			)}
			onPress={onPress}
			{...props}
		>
			<Text className={cn("text-white text-base font-regular", textClassName)}>
				{title}
			</Text>
		</Pressable>
	);
};

export default StyledButton;
