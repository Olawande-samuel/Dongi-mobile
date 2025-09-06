import { cn } from "@/utils";
import { usePathname } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Pressable,
	PressableProps,
	Text,
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
	// const { userType } = useAuth();
	const pathname = usePathname();
	const userType = pathname.includes("client") ? "client" : "service";

	// const { userType: tempUserType } = useTempStore();

	// const user_type = tempUserType || userType;

	return (
		<Pressable
			{...props}
			onPress={onPress}
			className={cn(
				` rounded px-1 py-2 large:py-[10px] mt-auto justify-center items-center`,
				userType === "service" ? "bg-service-primary" : "bg-primary",
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
