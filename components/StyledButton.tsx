import useUserType from "@/hooks/useUserType";
import { useTempStore } from "@/store/temp-user-store";
import { cn } from "@/utils";
import React from "react";
import {
	Pressable,
	Text,
	StyleSheet,
	PressableProps,
	ActivityIndicator,
} from "react-native";

interface StyledButtonProps extends PressableProps {
	title: string;
	onPress: () => void;
	textClassName?: string;
	isLoading?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
	title,
	onPress,
	textClassName,
	className,
	isLoading,
	...props
}) => {
	const { userType } = useUserType();
	const { userType: tempUserType } = useTempStore();

	const user_type = tempUserType || userType;

	return (
		<Pressable
			{...props}
			onPress={onPress}
			className={cn(
				` rounded px-1 py-2 large:py-[10px] mt-auto justify-center items-center`,
				user_type === "service" ? "bg-service-primary" : "bg-primary",
				className
			)}
		>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Text
					className={cn(
						"text-white text-sm large:text-base font-regular",
						textClassName
					)}
				>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

export default StyledButton;
