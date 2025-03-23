import { View, Text, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";
import useUserType from "@/hooks/useUserType";
import { router } from "expo-router";
import { cn } from "@/utils";

interface Props extends PropsWithChildren {
	steps: number;
	title: string;
	setSteps: React.Dispatch<React.SetStateAction<number>>;
	totalSteps?: number;
}
const SignUpHeader = ({
	steps,
	setSteps,
	title,
	children,
	totalSteps = 4,
}: Props) => {
	const { userType } = useUserType();

	return (
		<View className="flex-1">
			<View className="flex-row justify-between py-[10px] mb-[23.5px]">
				<Pressable
					onPress={() => {
						if (steps > 1) {
							setSteps((prev) => prev - 1);
						} else {
							router.back();
						}
					}}
				>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<Text className="text-base text-off-black">{title}</Text>
				<View></View>
			</View>
			<View className="flex-row space-x-2 items-center mb-5">
				{Array.from({ length: totalSteps }).map((_, i) => (
					<View
						key={i}
						className={cn(
							"h-1 basis-[20%] rounded-[999px]",
							steps >= i + 1
								? userType === "client"
									? `bg-client-primary`
									: "bg-service-primary"
								: userType === "client"
								? "bg-client-primary-light"
								: "bg-service-primary-light"
						)}
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
