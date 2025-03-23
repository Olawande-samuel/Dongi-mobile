import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import useUserInfo from "@/hooks/useUserInfo";

const HomeUserInfo = () => {
	const { data, isLoading } = useUserInfo();
	return (
		<View className="flex-row items-center mb-4">
			<Text className="mr-4 font-semibold text-lg text-black">Hi, James</Text>
			<View className="flex-row items-center ml-auto">
				<Text>at</Text>
				<Pressable className="flex-row px-1 py-[7px]">
					<Image
						source={require("../../../assets/images/location.png")}
						width={18}
						height={18}
						resizeMode="contain"
						className="w-[18px] h-[18px] mr-[6px]"
					/>
					<Text
						className="max-w-[120px] text-off-black mr-[2px] overflow-hidden text-ellipsis"
						numberOfLines={1}
					>
						Island Lagos, Nigeria
					</Text>
					<Image
						source={require("../../../assets/images/arrow-down.png")}
						width={18}
						height={18}
						resizeMode="contain"
						className="w-[18px] h-[18px]"
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default HomeUserInfo;
