import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/utils";

const StatusPill = ({
	title,
	buttonClassName,
}: {
	title: string;
	buttonClassName?: string;
}) => {
	function getPillBGColor() {
		switch (title) {
			case "Pending":
				return "bg-blue-light";
			case "Completed":
				return "bg-success-100";
			case "Cancelled":
				return "bg-danger-100";
			default:
				return "bg-gray-100";
		}
	}
	function getPillDotColor() {
		switch (title) {
			case "Pending":
				return "bg-blue-light-500";
			case "Completed":
				return "bg-success-500";
			case "Cancelled":
				return "bg-danger-500";
			default:
				return "bg-gray-100";
		}
	}
	return (
		<View
			className={cn(
				`flex-row items-center gap-x-1 px-2 py-[5.58px] rounded-[999px] bg-success-100 ${getPillBGColor()}`,
				buttonClassName
			)}
		>
			<View
				className={`h-[7.8px] w-[7.8px] rounded-full ${getPillDotColor()}`}
			></View>
			<Text className="text-xs text-off-black font-regular">{title}</Text>
		</View>
	);
};

export default StatusPill;
