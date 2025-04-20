import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

interface props {
	children?: string;
	tintColor?: string;
	title?: string;
	subtitle?: string;
}
const UserInfoDoubleHeader = ({ title, subtitle }: props) => {
	const params = useLocalSearchParams();
	console.log("DOUBLE HEADER, ", params);
	return (
		<View>
			<Text className="text-center text-base text-off-black font-regular">
				{title ?? "John Musa"}
			</Text>
			<Text className="text-center text-muted text-sm font-regular ">
				{subtitle ?? "Real Estate Agent"}
			</Text>
		</View>
	);
};

export default UserInfoDoubleHeader;
