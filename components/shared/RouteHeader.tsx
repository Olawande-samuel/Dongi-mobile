import { View, Text } from "react-native";
import React from "react";
import BackButton from "../BackButton";

const RouteHeader = ({
	title,
	subTitle,
}: {
	title: string;
	subTitle?: string;
}) => {
	return (
		<View className="flex-row justify-between py-2 items-center border-b border-[#FAFAFA]">
			<BackButton />
			<View className="mx-auto">
				<Text className="text-sm large:text-base text-center text-black font-normal font-regular">
					{title}
				</Text>
				{subTitle && (
					<Text className="text-xs large:text-sm text-[#99A2B3] text-center font-normal font-regular">
						{subTitle}
					</Text>
				)}
			</View>
			<View className="" />
		</View>
	);
};

export default RouteHeader;
