import BackButton from "@/components/BackButton";
import NoHistory from "@/components/client/history/NoHistory";
import useTransactionHistory from "@/hooks/useTransactionHistory";
import useWallet from "@/hooks/useWallet";
import * as Clipboard from "expo-clipboard";
import Copy from "@/svgs/Copy";
import { ITransaction } from "@/types";
import { cn, formatCurrency, groupByDate } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { Pressable, RefreshControl } from "react-native";
import { SectionList, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

function HeaderComponent() {
	const { data, isLoading } = useWallet();

	return (
		<View className="flex-1 bg-white  pt-[18px]">
			<View className="rounded-lg bg-[#F7EFDE] justify-center items-center py-4 mb-2">
				<View className="mb-5">
					<Text>Balance</Text>
				</View>
				<View className="flex-row items-end">
					<Text className="text-off-black text-4xl large:text-[42px] text-center font-bold">
						{formatCurrency(data?.balance || 0)}
					</Text>
				</View>
			</View>
			{data?.account_number && (
				<View className="bg-[#F7EFDE] p-2 justify-center">
					<View className="flex-row justify-center  rounded items-center">
						<Text className="text-xs mr-1 large:text-sm font-normal text-center text-service-primary font-regular">
							{data?.bank_name || ""}
						</Text>
						<Text className="text-xs large:text-sm font-semibold text-service-primary">
							{data?.account_number || ""}
						</Text>
						<Pressable
							onPress={async () => {
								if (data?.account_number) {
									await Clipboard.setStringAsync(data?.account_number || "");
									toast.success("Account number copied to clipboard");
								}
							}}
						>
							<Copy />
						</Pressable>
					</View>
					<Text className="text-xs large:text-sm text-center font-semibold text-service-primary">
						{data?.paystack_account_data?.account_name || ""}
					</Text>
				</View>
			)}
			<Text className="text-center text-sm text-[#676B83] mt-6 mb-3">
				Transaction History
			</Text>
		</View>
	);
}

function ItemComponent({ amount, type, created_at, reference }: ITransaction) {
	return (
		<View className="p-3 border border-outer-light rounded-lg">
			<View className="flex-row items-start justify-between">
				<View>
					<Text className="text-xs large:text-sm text-black font-regular">
						{type === "DEBIT" ? "Service Deduction" : "Wallet top up"}
					</Text>
					<Text className="text-xs">{reference}</Text>
				</View>
				<View className="align-end">
					<Text
						className={cn(
							"font-semibold text-xs large:text-sm text-error-600 text-right",
							type !== "DEBIT" && "text-success-600",
						)}
					>
						{type === "DEBIT" ? "-" : "+"}
						{formatCurrency(amount)}
					</Text>
					<Text className="text-xs text-right text-support font-regular">
						{moment(created_at).format("DD MMM • hh:mmA")}
					</Text>
				</View>
			</View>
		</View>
	);
}

const Finance = () => {
	const { height } = useWindowDimensions();
	const { isLoading } = useWallet();
	const { data, isLoading: isHistoryPending } = useTransactionHistory();

	console.log({ data });

	const queryClient = useQueryClient();
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom", "top"]}>
			<View className="px-4 large:px-6 flex-1">
				<View className="flex-row justify-between py-2 items-center border-b border-[#FAFAFA]">
					<BackButton />
					<View className="mx-auto">
						<Text className="text-sm text-center large:text-base text-black font-normal font-regular">
							Finance
						</Text>
					</View>
					<View className="" />
				</View>

				<SectionList
					className="bg-white "
					showsVerticalScrollIndicator={false}
					sections={groupByDate(data)}
					renderItem={({ item }) => <ItemComponent {...item} />}
					ListHeaderComponent={<HeaderComponent />}
					ListEmptyComponent={
						<NoHistory text={"You haven't made any transaction"} />
					}
					keyExtractor={(section) => String(section.id)}
					renderSectionHeader={({ section: { title } }) => (
						<View className="py-2 relative mb-4">
							<Text className="text-support text-center text-sm leading-[17.64px]">
								{moment(title).format("MMMM YYYY")}
							</Text>
						</View>
					)}
					contentContainerStyle={{
						minHeight: height - 200,
					}}
					refreshControl={
						<RefreshControl
							refreshing={isLoading || isHistoryPending}
							onRefresh={() => {
								queryClient.invalidateQueries({
									queryKey: ["get transaction history"],
								});
								queryClient.invalidateQueries({
									queryKey: ["get wallet balance"],
								});
							}}
						/>
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Finance;
