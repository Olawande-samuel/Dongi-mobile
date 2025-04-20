import BackButton from "@/components/BackButton";
import ReviewService from "@/components/client/booking/ReviewService";
import ReviewClient from "@/components/provider/Dashboard/ReviewClient";
import ReviewComplete from "@/components/ReviewComplete";
import RouteHeader from "@/components/shared/RouteHeader";
import StatusPill from "@/components/StatusPill";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ServiceId = () => {
	const bottomSheetReviewModalRef = useRef<BottomSheetModal>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const showCompletionModal = useCallback(() => {
		setModalVisible(true);
	}, []);

	useEffect(() => {
		let timeout = setTimeout(() => {
			bottomSheetReviewModalRef.current?.present();
		}, 3000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom", "top"]}>
			<GestureHandlerRootView className="flex-1 bg-white">
				<BottomSheetModalProvider>
					<View className="px-4 large:px-6 flex-1">
						<RouteHeader title="Completed" />
						<ScrollView
							className="flex-1 bg-white  pb-4 space-y-6 pt-[18px]"
							showsVerticalScrollIndicator={false}
						>
							<View>
								<View className="flex-row justify-between gap-x-4 flex-wrap mb-[10px]">
									<View className="flex-row items-center">
										<Image
											className=" h-9 large:h-[42px]  w-9 large:w-[42px] rounded-full"
											source={require("../../../../assets/images/client/temp_user_sq.png")}
											resizeMode="cover"
										/>
										<View className="ml-2 space-y-1">
											<Text className="text-sm large:text-base font-regular text-off-black">
												Rebecca Anyaoku
											</Text>
											<Text className="text-[10px] large:text-xs font-regular text-support">
												Real estate agent
											</Text>
										</View>
									</View>
									<View className="space-y-1">
										<View className="flex-row items-center justify-end">
											<Image
												source={require("../../../../assets/images/location.png")}
												width={18}
												height={18}
												resizeMode="contain"
												className="w-[18px] h-[18px] mr-[6px]"
											/>
											<Text className="font-regular text-xs large:text-sm text-off-black">
												Lagos
											</Text>
										</View>
										<Text className="text-xs text-end font-regular text-primaryII">
											20 Nov • 08:30AM
										</Text>
									</View>
								</View>
							</View>
							<View className="space-y-3">
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-xs large:text-sm font-regular mr-4">
										Request Type
									</Text>
									<Text className="font-regular text-xs large:text-sm text-off-black text-right">
										Real estate survey assistance
									</Text>
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-xs large:text-sm font-regular mr-4">
										Date Requested
									</Text>
									<Text className="font-regular text-xs large:text-sm text-off-black text-right">
										10 Nov. 11:30AM
									</Text>
								</View>
							</View>
							<View className="space-y-5 py-3 mb-6  ">
								<Text className="text-xs large:text-sm text-off-black font-regular">
									Request
								</Text>
								<View>
									<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
										Where are you located?
									</Text>
									<View className="flex-row items-center border p-2 border-inner-background-light">
										<Image
											source={require("../../../../assets/images/location.png")}
											width={18}
											height={18}
											resizeMode="contain"
											className="w-[18px] h-[18px] mr-[6px]"
										/>
										<Text className="flex-1 text-sm large:text-base">
											Island Lagos, Nigeria
										</Text>
									</View>
								</View>
								<View>
									<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
										How soon do you need this?
									</Text>
									<View className="flex-row border p-2 border-inner-background-light">
										<Text className="flex-1 text-sm large:text-base text-off-black placeholder:text-off-black">
											In 3 days
										</Text>
									</View>
								</View>
								<View>
									<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
										Message
									</Text>
									<View className="flex-row border p-2 border-inner-background-light ">
										<Text className="flex-1 text-off-black placeholder:text-off-black text-sm large:text-base">
											I’m planning to sell my property but need advice on
											pricing and staging. Can you assist with marketing it to
											attract potential buyers?
										</Text>
									</View>
								</View>
							</View>
							<View className="space-y-3 mb-32 large:mb-[153px]">
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-xs large:text-sm font-regular mr-4">
										Status
									</Text>
									<StatusPill title="Completed" />
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-xs large:text-sm font-regular mr-4">
										Request Type
									</Text>
									<Text className="font-regular text-xs large:text-sm text-off-black text-right">
										Real estate survey assistance
									</Text>
								</View>

								<View className="flex-row justify-between items-center">
									<Text className="text-support text-xs large:text-sm font-regular mr-4">
										Date Requested
									</Text>
									<Text className="font-regular text-xs large:text-sm text-off-black text-right">
										20 Nov. 11:30AM
									</Text>
								</View>
							</View>
							<ReviewClient
								compRef={bottomSheetReviewModalRef}
								showCompletionModal={showCompletionModal}
								clientId=""
							/>
							<ReviewComplete
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
							/>
						</ScrollView>
					</View>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

export default ServiceId;
