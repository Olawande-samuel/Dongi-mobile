import { View, Text, Pressable, Image } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Delivery from "@/svgs/Delivery";
import StatusPill from "@/components/StatusPill";
import { useLocalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import moment from "moment";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { toast } from "sonner-native";
import { handleError } from "@/utils";

interface Props {
	compRef: React.RefObject<BottomSheetModal>;
	openRatings: VoidFunction;
	providerName: string;
	serviceName: string;
}

function ConfirmService({
	compRef,
	openRatings,
	providerName,
	serviceName,
}: Props) {
	console.log({ providerName });
	const { dismiss } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["90%"], []);

	const { setIsLoading } = useGlobalContext();
	const params = useLocalSearchParams();
	const bookingId = params?.["booking-id"];

	const { data, isLoading } = useQuery({
		queryKey: ["get request detail", bookingId as string],
		queryFn: () => Api.getRequestById(bookingId as string),
	});

	const result = data?.data?.data;

	const handleClosePress = useCallback(() => {
		dismiss();
	}, [dismiss]);

	const { mutate, isPending } = useMutation({
		mutationFn: Api.confirmServiceCompletion,
		mutationKey: ["confirm completion", bookingId],
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function confirmCompletion(action: "CONFIRM" | "REJECT") {
		mutate(
			{ action, requestId: bookingId as string },
			{
				onSuccess: () => {
					toast.success("Request completed successfully!");
					openRatings();
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}

	function denyCompletion() {}

	return (
		<BottomSheetModal
			index={1}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					opacity={0.2}
					appearsOnIndex={1}
					disappearsOnIndex={-1}
				/>
			)}
			ref={compRef}
			snapPoints={snapPoints}
		>
			<BottomSheetScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1 rounded-t-xl"
			>
				<View className="flex-1 mb-6">
					<View className="px-6 flex-row mb-[18px] pb-2 border-b border-outer-light justify-between items-center">
						<View />
						<View>
							<Text className="text-center text-base text-off-black font-regular">
								Confirm Service
							</Text>
						</View>
						<Pressable onPress={handleClosePress}>
							<Ionicons name="close-circle-outline" color="#676B83" size={24} />
						</Pressable>
					</View>
					<View className="px-6">
						<Text className="text-center text-lg font-semibold text-off-black leading-[22.68px]">
							{`${providerName} has completed your ${serviceName} service`}
						</Text>
						<View className="justify-center items-center mb-6">
							<Delivery isServiceProvider={false} />
						</View>
						<View className="rounded-lg p-2 border border-outer-light mb-6">
							<View className="flex-row items-center gap-x-3">
								<View>
									<Image
										className="h-20 w-20"
										source={require("../../../assets/images/client/temp_user_sq.png")}
										resizeMode="contain"
									/>
								</View>
								<View className="space-y-1 flex-1">
									<Text className="text-base font-regular text-off-black">
										{providerName}
									</Text>
									{/* <Text className="text-xs font-regular text-support">
										Real estate agent
									</Text> */}
									<Text className="text-xs font-regular text-support">
										{result?.location || ""}
									</Text>
									<Text className="text-xs font-regular text-support">
										{moment(result?.created_at).format("DD MMM • hh:mmA")}
									</Text>
								</View>
							</View>
						</View>
						<View className="space-y-3">
							<View className="flex-row justify-between items-center">
								<Text className="text-support text-sm font-regular mr-4">
									Status
								</Text>
								<StatusPill title={result?.status || ""} />
							</View>
							<View className="flex-row justify-between items-center">
								<Text className="text-support text-sm font-regular mr-4">
									Request Type
								</Text>
								<Text className="font-regular text-sm text-off-black text-right">
									{serviceName}
								</Text>
							</View>
							<View className="flex-row justify-between items-center">
								<Text className="text-support text-sm font-regular mr-4">
									Date Requested
								</Text>
								<Text className="font-regular text-sm text-off-black text-right">
									{moment(result?.updated_at).format("DD MMM • hh:mmA")}
								</Text>
							</View>

							<View className="flex-row gap-5 items-center ">
								<View className="max-w-[200px] mr-5">
									<Text className="text-support text-sm font-regular mr-4">
										Message
									</Text>
								</View>
								<View className="flex-1">
									<Text
										numberOfLines={1}
										className=" flex-1 font-regular text-sm text-off-black text-right"
									>
										{result?.message || ""}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View className="mt-auto px-6 mb-2 flex-row gap-x-3">
					<Pressable
						onPress={() => confirmCompletion("CONFIRM")}
						className="bg-success-500 py-[10px] flex-1 px-1 rounded border-[0.5px] border-primary"
					>
						<Text className="text-center text-white text-base font-regular">
							Confirm
						</Text>
					</Pressable>
					<Pressable
						onPress={() => confirmCompletion("REJECT")}
						className="bg-white border-[0.5px] border-support flex-1 py-[10px] px-1 rounded"
					>
						<Text className="text-center text-support text-base font-regular">
							Deny
						</Text>
					</Pressable>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}

export default ConfirmService;
