import ConfirmService from "@/components/client/booking/ConfirmService";
import ReviewService from "@/components/client/booking/ReviewService";
import VendorProfile from "@/components/client/VendorProfile";
import ReviewComplete from "@/components/ReviewComplete";
import StatusPill from "@/components/StatusPill";
import Success from "@/svgs/Success";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	TouchableWithoutFeedback
} from "@gorhom/bottom-sheet";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import {
	Alert,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


const Track = () => {
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
		handlePresentModalPress();
	}, []);

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
								<VendorProfile />
							</View>
							<View className="space-y-3 mb-6">
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Status
									</Text>
									<StatusPill title="Pending" />
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Request Type
									</Text>
									<Text className="font-regular text-sm text-off-black text-right">
										Real estate survey assistance
									</Text>
								</View>

								<View className="flex-row justify-between items-center">
									<Text className="text-support text-sm font-regular mr-4">
										Date Requested
									</Text>
									<Text className="font-regular text-sm text-off-black text-right">
										20 Nov. 11:30AM
									</Text>
								</View>
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
											<TextInput
												placeholder="Island Lagos, Nigeria"
												className="flex-1 text-base"
												readOnly
											/>
										</View>
									</View>
									<View>
										<Text className="text-sm text-off-black font-regular mb-[6px]">
											How soon do you need this?
										</Text>
										<View className="flex-row border p-2 border-inner-background-light">
											<TextInput
												placeholder="In 3 days"
												className="flex-1 text-base text-off-black placeholder:text-off-black"
												readOnly
											/>
										</View>
									</View>
									<View>
										<Text className="text-sm text-off-black font-regular mb-[6px]">
											Message
										</Text>
										<View className="flex-row border p-2 border-inner-background-light h-[158px]">
											<TextInput
												placeholder="In 3 days"
												className="flex-1 text-off-black placeholder:text-off-black text-base"
												multiline
												readOnly
											/>
										</View>
									</View>
								</View>
							</View>
						</View>
						<ConfirmService
							compRef={bottomSheetModalRef}
							openRatings={handlePresentReviewModalPress}
						/>
						<ReviewService
							compRef={bottomSheetReviewModalRef}
							showCompletionModal={showCompletionModal}
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
