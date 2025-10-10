import ConfirmService from "@/components/client/booking/ConfirmService";
import ReviewService from "@/components/client/booking/ReviewService";
import VendorProfile from "@/components/client/VendorProfile";
import ReviewComplete from "@/components/ReviewComplete";
import StatusPill from "@/components/StatusPill";
import { handleContactPress } from "@/utils";
import { Api } from "@/utils/endpoints";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Track = () => {
	const params = useLocalSearchParams();
	const bookingId = params?.["booking-id"];
	const serviceId = params?.["service_id"];
	const providerId = params?.["provider_id"];

	const { data, isLoading } = useQuery({
		queryKey: ["get request detail", bookingId as string],
		queryFn: () => Api.getRequestById(bookingId as string),
	});

	const { data: services, isLoading: isServicesLoading } = useQuery({
		queryKey: ["get provider services", providerId],
		queryFn: () => Api.getProvidersServices(providerId as string),
	});

	const serviceInfo = services?.data?.data?.services.find(
		(item) => item.uuid === serviceId
	);

	const bookingInfo = data?.data?.data;

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const bottomSheetReviewModalRef = useRef<BottomSheetModal>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handlePresentReviewModalPress = useCallback(() => {
		bottomSheetReviewModalRef.current?.present();
	}, []);

	const showCompletionModal = useCallback(() => {
		setModalVisible(true);
	}, []);

	useEffect(() => {
		if (
			bookingInfo?.status === "COMPLETED" &&
			!bookingInfo?.is_confirmed_completed
		) {
			handlePresentModalPress();
		}
	}, [data?.data.data.status]);

	console.log({ bookingInfo });

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<GestureHandlerRootView className="flex-1 bg-white">
				<BottomSheetModalProvider>
					<ScrollView
						className="bg-white flex-1 pt-[18px] border-t border-outer-light px-6"
						showsVerticalScrollIndicator={false}
					>
						<View className="flex-1 bg-white">
							<View className="mb-6">
								{serviceInfo && <VendorProfile {...serviceInfo} />}
							</View>
							<View className="space-y-3 mb-6">
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Status
									</Text>
									<StatusPill title={bookingInfo?.status || ""} />
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Request Type
									</Text>
									<Text className="font-regular text-sm text-off-black text-right">
										{serviceInfo?.name || ""}
									</Text>
								</View>

								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Date Requested
									</Text>
									<Text className="font-regular text-sm text-off-black text-right">
										{moment(bookingInfo?.created_at).format("DD MMM • hh:mmA")}
									</Text>
								</View>
								{bookingInfo?.status === "ACCEPTED" && (
									<View className="flex-row justify-between items-center">
										<Text className="text-support text-sm font-regular mr-4">
											Phone Number
										</Text>
										<Pressable
											onPress={() =>
												handleContactPress(
													`tel:+${bookingInfo?.provider?.phone}`
												)
											}
										>
											<Text className="font-regular text-sm text-off-black text-right">
												{bookingInfo?.provider?.phone || ""}
											</Text>
										</Pressable>
									</View>
								)}
							</View>
							<View className="flex-1">
								<View className="space-y-5 py-3 mb-[149px]">
									<Text className="text-sm text-off-black font-regular">
										Request
									</Text>
									<View>
										<Text className="text-sm text-off-black font-regular mb-[6px]">
											Where are you located?
										</Text>
										<View className="flex-row items-center border p-2 border-inner-background-light">
											<Image
												source={require("../../../../../assets/images/location.png")}
												width={18}
												height={18}
												resizeMode="contain"
												className="w-[18px] h-[18px] mr-[6px]"
											/>
											<Text className="flex-1 text-base">
												{bookingInfo?.location || ""}
											</Text>
											{/* <TextInput
												placeholder="Island Lagos, Nigeria"
												className="flex-1 text-base"
												readOnly
											/> */}
										</View>
									</View>
									<View>
										<Text className="text-sm text-off-black font-regular mb-[6px]">
											How soon do you need this?
										</Text>
										<View className="flex-row border p-2 border-inner-background-light">
											<Text className="flex-1 text-base text-off-black placeholder:text-off-black">
												{bookingInfo?.deadline || ""}
											</Text>
										</View>
									</View>
									<View>
										<Text className="text-sm text-off-black font-regular mb-[6px]">
											Message
										</Text>
										<View className="flex-row border p-2 border-inner-background-light h-[158px]">
											<Text className="flex-1 text-off-black placeholder:text-off-black text-base">
												{bookingInfo?.message || ""}
											</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
						<ConfirmService
							compRef={bottomSheetModalRef}
							openRatings={handlePresentReviewModalPress}
							providerName={`${bookingInfo?.provider?.first_name || ""} ${
								bookingInfo?.provider?.last_name || ""
							} `}
							serviceName={serviceInfo?.name || ""}
						/>
						<ReviewService
							compRef={bottomSheetReviewModalRef}
							showCompletionModal={showCompletionModal}
							bookingId={bookingId as string}
						/>
						<ReviewComplete
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
						/>
					</ScrollView>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

export default Track;
