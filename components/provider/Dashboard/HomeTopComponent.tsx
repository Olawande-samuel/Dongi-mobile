import { View, Text, Pressable } from "react-native";
import React from "react";
import HomeUserInfo from "@/components/client/dashboard/HomeUserInfo";
import Users from "@/svgs/Users";
import Star from "@/svgs/Star";
import Copy from "@/svgs/Copy";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeTabs from "@/components/client/dashboard/HomeTabs";
import { router } from "expo-router";

const HomeTopComponent = ({
	setTab,
	tab,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View className="">
			<View className="mb-[18px]">
				<HomeUserInfo />
			</View>
			<View className="p-2 mb-3 space-y-2 border border-outer-light rounded-lg">
				<View className="rounded-lg bg-light justify-center items-center py-4 px-3">
					<View className="mb-5">
						<Text>Balance</Text>
					</View>
					<View className="flex-row items-end">
						<Text className="text-2xl font-semibold">N</Text>
						<Text className="text-off-black text-[42px] text-center font-bold">
							40000
						</Text>
					</View>
				</View>
				<View className="flex-row gap-x-2">
					<View className="bg-light flex-1 p-2 rounded-[2px] border border-outer-light">
						<View className="flex-row gap-x-1 mb-3 items-center">
							<Users />
							<Text className="font-regular text-sm text-off-black">
								Jobs Completed
							</Text>
						</View>
						<View>
							<Text className="text-base text-off-black font-regular">210</Text>
						</View>
					</View>
					<View className="bg-light flex-1 p-2 rounded-[2px] border border-outer-light">
						<View className="flex-row gap-x-1 mb-3 items-center">
							<Star />
							<Text className="font-regular text-sm text-off-black ">
								Rating
							</Text>
						</View>
						<View>
							<Text className="text-base text-off-black font-regular">
								4.5 (210)
							</Text>
						</View>
					</View>
				</View>
				<View className="flex-row justify-center gap-x-1 bg-[#F7EFDE] p-2 rounded items-center">
					<Text className="text-sm font-normal text-center text-service-primary font-regular">
						Paystack-Titan
					</Text>
					<Text className="text-sm font-semibold text-service-primary">
						0123456789
					</Text>
					<Copy />
				</View>
			</View>
			<Pressable
				onPress={() =>
					router.push("/(authenticated)/service-provider/profile/public-view")
				}
				className="flex-row justify-between p-1 items-center mb-9"
			>
				<View />
				<Text className="text-primary text-sm text-center font-regular">
					View public profile
				</Text>
				<FontAwesome6 name="arrow-right-long" size={24} color="#18658B" />
			</Pressable>
			<View className="mb-3">
				<View className="">
					<HomeTabs tab1title="Ongoing" tab2title="Requests" tab={tab} setTab={setTab} />
				</View>
			</View>
		</View>
	);
};

export default HomeTopComponent;
