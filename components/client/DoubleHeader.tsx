import React from "react";
import { Text, View } from "react-native";

interface props {
	children?: string;
	tintColor?: string;
	title?: string;
	subtitle?: string;
}
const DoubleHeader = ({ title, subtitle }: props) => {
	return (
		<View>
			<Text className="text-center text-xs large:text-base text-off-black font-regular">
				{title}
			</Text>
			{subtitle && (
				<Text className="text-center text-muted text-[10px] large:text-sm font-regular ">
					{subtitle}
				</Text>
			)}
		</View>
	);
};

export default DoubleHeader;
