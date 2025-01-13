import { View, Text, Image } from "react-native";
import React from "react";

const NoHistory = ({ text }: { text: string }) => {
	return (
		<View className="flex-1 border border-red-400 items-center justify-center">
			<View className="items-center">
				<Image
					source={require("../../../assets/images/not-found.png")}
					className="w-[100px] h-[100px]"
				/>
				<Text className="text-inactive text-sm font-regular text-center">
					{text}
				</Text>
			</View>
		</View>
	);
};

export default NoHistory;
