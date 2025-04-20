import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import useUserInfo from "@/hooks/useUserInfo";
import { useAuth } from "@/context/Auth";

const Index = () => {
	const { data, isLoading } = useUserInfo();
	const { userType } = useAuth();
	return (
		<View className="flex-1 bg-white px-6 pt-[18px]">
			<View className="flex-row items-center gap-x-6 mb-5">
				<Text className="text-muted font-regular text-sm w-[110px]">
					Profile Picture
				</Text>
				<View className="w-[60px] h-[60px] rounded-full bg-primary">
					<Text className="uppercase text-[42px] font-bold text-white text-center ">
						{data?.firstname?.split("")[0] || ""}
					</Text>
				</View>
			</View>
			<View className="space-y-5">
				<View className="flex-row items-center gap-x-6">
					<Text className="text-muted font-regular text-sm w-[110px]">
						Full Name
					</Text>
					<View className="flex-row items-center gap-2 flex-1 justify-between">
						<Text
							className="text-sm text-off-black font-regular"
							numberOfLines={1}
						>
							{`${data?.firstname || ""} ${data?.lastname || ""}`}
						</Text>
						<View>
							<Image
								source={require("../../../../assets/images/client/edit.png")}
								className="w-6 h-6"
							/>
						</View>
					</View>
				</View>
				<View className="flex-row items-center gap-x-6">
					<Text className="text-muted font-regular text-sm w-[110px]">
						Email address
					</Text>
					<View className="flex-row items-center gap-2 flex-1 justify-between">
						<Text
							className="text-sm text-off-black font-regular"
							numberOfLines={1}
						>
							{data?.email || ""}
						</Text>
						<Link href="/client/profile-info/change-email">
							<Image
								source={require("../../../../assets/images/client/edit.png")}
								className="w-6 h-6"
							/>
						</Link>
					</View>
				</View>
				<View className="flex-row items-center gap-x-6">
					<Text className="text-muted font-regular text-sm w-[110px]">
						Phone Number
					</Text>
					<View className="flex-row items-center gap-2 flex-1 justify-between">
						<Text
							className="text-sm text-off-black font-regular"
							numberOfLines={1}
						>
							{data?.phone || ""}
						</Text>
						<View>
							<Image
								source={require("../../../../assets/images/client/edit.png")}
								className="w-6 h-6"
							/>
						</View>
					</View>
				</View>
				<View className="flex-row items-center gap-x-6">
					<Text className="text-muted font-regular text-sm w-[110px]">
						Gender
					</Text>
					<View className="flex-row items-center gap-2 flex-1 justify-between">
						<Text className="text-sm text-off-black font-regular">
							{data?.gender || ""}
						</Text>
						<View>
							<Image
								source={require("../../../../assets/images/client/edit.png")}
								className="w-6 h-6"
							/>
						</View>
					</View>
				</View>
				{userType === "service" && (
					<View className="flex-row items-center gap-x-6">
						<Text className="text-muted font-regular text-sm w-[110px]">
							ID Verification
						</Text>
						<View className="flex-row items-center gap-2 flex-1 justify-between">
							<Text className="text-sm text-off-black font-regular">NIN</Text>
							<View>
								<Image
									source={require("../../../../assets/images/client/edit.png")}
									className="w-6 h-6"
								/>
							</View>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default Index;
