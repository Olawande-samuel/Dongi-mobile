import HomeTabs from "@/components/client/dashboard/HomeTabs";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";
import Copy from "@/svgs/Copy";
import Star from "@/svgs/Star";
import Users from "@/svgs/Users";
import { formatCurrency } from "@/utils";
import { SIZES } from "@/utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";
import AccountApproved from "./AccountApproved";
import ProviderHomeUserInfo from "./ProviderHomeUserInfo";
import useServices from "@/hooks/useServices";
import useWallet from "@/hooks/useWallet";

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
	const { data, isLoading } = useServiceProviderUserInfo();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { isLoading: isServiceLoading, result } = useServices();

	useEffect(() => {
		const shouldShowModal =
			!isLoading &&
			!isServiceLoading &&
			(!data?.wallet?.balance || data?.wallet?.balance === 0) &&
			Array.isArray(result) &&
			result.length < 1;

		if (shouldShowModal) {
			bottomSheetModalRef.current?.present();
		}
	}, [isLoading, isServiceLoading, data?.wallet?.balance, result]);

	const { data: wallet, isLoading: isWalletLoading } = useWallet();

	return (
		<View className="">
			<View className="mb-[18px]">
				{/* <HomeUserInfo /> */}
				<ProviderHomeUserInfo />
			</View>
			<View className="p-2 mb-3 gap-y-2 border border-outer-light rounded-lg">
				<View className="rounded-lg bg-light justify-center items-center py-4 px-3">
					<View className="mb-5">
						<Text>Balance</Text>
					</View>
					<View className="">
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
								{data?.rating?.average_rating || 0} (
								{data?.rating?.total_rating || 0})
							</Text>
						</View>
					</View>
				</View>
				{wallet?.account_number && (
					<View className="bg-[#F7EFDE] p-2 justify-center">
						<View className="flex-row justify-center  rounded items-center">
							<Text className="text-xs mr-1 large:text-sm font-normal text-center text-service-primary font-regular">
								{wallet?.bank_name || ""}
							</Text>
							<Text className="text-xs large:text-sm font-semibold text-service-primary">
								{wallet?.account_number || ""}
							</Text>
							{wallet?.account_number && (
								<Pressable
									onPress={async () => {
										if (wallet?.account_number) {
											await Clipboard.setStringAsync(
												wallet?.account_number || "",
											);
											toast.success("Account number copied to clipboard");
										}
									}}
								>
									<Copy />
								</Pressable>
							)}
						</View>
						<Text className="text-xs large:text-sm text-center font-semibold text-service-primary">
							{wallet?.paystack_account_data?.account_name || ""}
						</Text>
					</View>
				)}
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
						name="arrow-right"
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
