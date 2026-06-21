import ReviewService from "@/components/client/booking/ReviewService";
import HistoryDetailUserCard from "@/components/client/history/HistoryDetailUserCard";
import ReviewComplete from "@/components/ReviewComplete";
import { Api } from "@/utils/endpoints";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Details = () => {
	const params = useLocalSearchParams();
	const id = params.id;
	const { data: completedData, isLoading: isCompletedRequestLoading } =
		useQuery({
			queryKey: ["fetch completed requests"],
			queryFn: Api.getCompletedRequests,
			enabled: !!id,
		});

	const info = completedData?.data?.data?.requests?.find(
		(item) => item.uuid === params.id,
	);

	const reviewModalRef = useRef<BottomSheetModal>(null);
	const [completionModalVisible, setCompletionModalVisible] = useState(false);

	const showCompletionModal = useCallback(() => {
		setCompletionModalVisible(true);
	}, []);

	useEffect(() => {
		if (info && !info?.rating?.customer_rating) {
			reviewModalRef.current?.present();
		}
	}, [info]);

	return (
		<GestureHandlerRootView className="flex-1 bg-white">
			<BottomSheetModalProvider>
		<ScrollView
			className="flex-1 bg-white px-6 pt-[18px]"
			showsVerticalScrollIndicator={false}
		>
			<HistoryDetailUserCard
				name={info?.provider?.name || ""}
				image={info?.provider?.image || ""}
				status={info?.status || ""}
				ratings={info?.rating?.customer_rating || 0}
				service_name={info?.service?.name || ""}
			/>
			<View className="flex-1 mt-6 gap-y-5">
				<View className="gap-y-3">
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Request Type
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							{info?.service?.name || ""}
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Date Requested
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							{moment(info?.created_at).format("DD MMM • hh:mmA")}
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Date Completed
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							{moment(info?.completed_at).format("DD MMM • hh:mmA")}
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Location
						</Text>
						<Text
							className="w-[70%] font-regular text-sm text-off-black text-right"
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{info?.location || ""}
						</Text>
					</View>
				</View>
				<View className="h-1 w-full bg-[#FAFAFA]"></View>
				<View className="h-[186px] gap-y-2">
					<Text className="text-support font-regular text-sm">Message</Text>
					<View className="flex-1">
						<Text className="text-sm font-regular text-off-black">
							{info?.message || ""}
						</Text>
					</View>
				</View>
				<View className="h-[186px] gap-y-2">
					<Text className="text-support font-regular text-sm">Your Review</Text>
					<View className="flex-1 justify-start">
						<Text>{info?.rating?.customer_message || ""}</Text>
					</View>
				</View>
				<View className="h-[186px] gap-y-2">
					<Text className="text-support font-regular text-sm">
						Service Provider's Review
					</Text>
					<View className="flex-1">
						<Text className="flex-1 placeholder:text-muted">
							{info?.provider_rating_status?.split("_").join(" ") || ""}
						</Text>
					</View>
				</View>
			</View>
			</ScrollView>
			<ReviewService
				compRef={reviewModalRef}
				showCompletionModal={showCompletionModal}
				bookingId={id as string}
			/>
			<ReviewComplete
				modalVisible={completionModalVisible}
				setModalVisible={setCompletionModalVisible}
			/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default Details;
