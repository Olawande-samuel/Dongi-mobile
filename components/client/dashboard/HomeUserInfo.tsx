import useLocation from "@/hooks/useLocation";
import useUserInfo from "@/hooks/useUserInfo";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

const HomeUserInfo = () => {
	const { data, isLoading } = useUserInfo();

	const location = useLocation(
		data?.user.latitude || 0,
		data?.user.longitude || 0
	);

	// if (isLoading) {
	// 	return (
	// 		<View className="mb-4">
	// 			<ActivityIndicator size={14} />;
	// 		</View>
	// 	);
	// }

	console.log({ data });
	return (
		<View className="flex-row items-center mb-4">
			<Text className="mr-4 font-semibold text-base large:text-lg text-black">
				{`Hi, ${data?.user.firstname || ""}`}
			</Text>
			<View className="flex-row items-center ml-auto">
				<Text>at</Text>
				<Pressable
					className="flex-row px-1 py-[7px]"
					onPress={() => router.push("/client/change-location")}
				>
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
						{data?.user.location || ""}
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
