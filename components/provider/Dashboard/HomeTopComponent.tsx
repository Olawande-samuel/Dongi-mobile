import * as Clipboard from "expo-clipboard";
import HomeTabs from "@/components/client/dashboard/HomeTabs";
import HomeUserInfo from "@/components/client/dashboard/HomeUserInfo";
import useUserInfo from "@/hooks/useUserInfo";
import Copy from "@/svgs/Copy";
import Star from "@/svgs/Star";
import Users from "@/svgs/Users";
import { formatCurrency } from "@/utils";
import { SIZES } from "@/utils/constants";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import AccountApproved from "./AccountApproved";
import { toast } from "sonner-native";

const HomeTopComponent = ({
	setTab,
	tab,
	totalOngoing,
	totalPending,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
	totalOngoing: number;
	totalPending: number;
}) => {
	const { data, isLoading } = useUserInfo();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		bottomSheetModalRef.current?.present();
	}, []);
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
						<Text className="text-off-black text-4xl large:text-[42px] text-center font-bold">
							{formatCurrency(data?.wallet?.balance || 0)}
						</Text>
					</View>
				</View>
				<View className="flex-row gap-x-2">
					<View className="bg-light flex-1 p-2 rounded-[2px] border border-outer-light">
						<View className="flex-row gap-x-1 mb-3 items-center">
							<Users />
							<Text className="font-regular text-xs large:text-sm text-off-black">
								Jobs Completed
							</Text>
						</View>
						<View>
							<Text className="large:text-base text-off-black font-regular">
								{data?.jobs_completed || 0}
							</Text>
						</View>
					</View>
					<View className="bg-light flex-1 p-2 rounded-[2px] border border-outer-light">
						<View className="flex-row gap-x-1 mb-3 items-center">
							<Star />
							<Text className="font-regular text-xs large:text-sm text-off-black ">
								Rating
							</Text>
						</View>
						<View>
							<Text className="large:text-base text-off-black font-regular">
								{data?.rating?.average_rating || 5} (
								{data?.rating?.total_rating || 0})
							</Text>
						</View>
					</View>
				</View>
				<View className="flex-row justify-center gap-x-1 bg-[#F7EFDE] p-2 rounded items-center">
					<Text className="text-xs large:text-sm font-normal text-center text-service-primary font-regular">
						Paystack-Titan
					</Text>
					<Text className="text-xs large:text-sm font-semibold text-service-primary">
						{data?.wallet?.account_number || ""}
					</Text>
					<Pressable
						onPress={async () => {
							if (data?.wallet?.account_number) {
								await Clipboard.setStringAsync(
									data?.wallet?.account_number || ""
								);
								// Clipboard.setString(data?.wallet?.account_number || "");
								toast.success("Account number copied to clipboard");
							}
						}}
					>
						<Copy />
					</Pressable>
				</View>
			</View>
			<View className="mb-9">
				<Pressable
					onPress={() =>
						router.push("/(authenticated)/service-provider/profile/public-view")
					}
					className="flex-row justify-between p-1 items-center"
				>
					<View />
					<Text className="text-primary text-sm text-center font-regular">
						View public profile
					</Text>
					<AntDesign
						name="arrowright"
						size={SIZES.height > 700 ? 24 : 16}
						color="#18658B"
					/>
				</Pressable>
			</View>
			<View className="mb-3">
				<View className="">
					<HomeTabs
						tab1title={`Ongoing (${totalOngoing})`}
						tab2title={`Requests (${totalPending})`}
						tab={tab}
						setTab={setTab}
					/>
				</View>
			</View>
			<AccountApproved compRef={bottomSheetModalRef} />
		</View>
	);
};

export default HomeTopComponent;
