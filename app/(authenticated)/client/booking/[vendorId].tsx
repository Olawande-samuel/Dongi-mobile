import VendorProfile from "@/components/client/VendorProfile";
import { Ionicons } from "@expo/vector-icons";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface ISearchParams {
	vendorId: string;
	id?: string;
	name?: string;
	service?: string;
	rating?: number;
	reviews?: number;
	price?: string;
	location?: string;
	customers?: number;
}

function ServiceComponent() {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 space-y-2">
			<View>
				<Image
					source={require("../../../../assets/images/client/preview_1.png")}
					className="w-full h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-base font-regular text-off-black">
					Real estate survey assistance
				</Text>
				<Text className="text-support text-sm font-regular">
					Buy or survey a property in Nigeria, obtain survey papers and
					engineering consultation.
				</Text>
			</View>
			<Pressable>
				<Text className="text-center text-primary text-sm font-regular">
					Request
				</Text>
			</Pressable>
		</View>
	);
}
const VendorBooking = () => {
	const params = useLocalSearchParams() as unknown as ISearchParams;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<GestureHandlerRootView className="flex-1 bg-white">
				<BottomSheetModalProvider>
					<ScrollView
						className="bg-white flex-1 pt-[18px] border-t border-outer-light px-6"
						showsVerticalScrollIndicator={false}
					>
						<View className="flex-1 bg-white ">
							<VendorProfile />
							<Pressable
								onPress={handlePresentModalPress}
								className="mb-6 py-3 px-1 bg-off-black rounded"
							>
								<Text className="text-base font-regular text-center text-white">
									Request a custom service
								</Text>
							</Pressable>
							<View className="flex-1 mb-6">
								<Text className="text-center text-sm text-off-black font-regular mb-3">
									Services
								</Text>
								<View className="bg-inner-background-light flex-1 p-2 rounded-lg">
									{[...Array(3)].map((item) => (
										<ServiceComponent key={item} />
									))}
								</View>
							</View>
							<View className="mb-6">
								<Text className="text-center text-sm text-off-black font-regular mb-3">
									Bio
								</Text>
								<Text className="text-sm text-support leading-[22.4px] font-regular">
									Navigating the real estate market can be overwhelming—but it
									doesn’t have to be. As an experienced real estate consultant,
									I specialize in helping clients buy and sell property with
									confidence. I provide personalized advice, market analysis,
									and negotiation strategies to ensure you get the best deal
									possible.
								</Text>
							</View>
							<Pressable
								onPress={handlePresentModalPress}
								className="border-[0.5px] border-primary px-1 py-3 rounded"
							>
								<Text className="text-center text-primary text-base ">
									Need a custom service?
								</Text>
							</Pressable>
						</View>
						<RequestService compRef={bottomSheetModalRef} />
					</ScrollView>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

function RequestService({
	compRef,
}: {
	compRef: React.RefObject<BottomSheetModal>;
}) {
	const { dismiss } = useBottomSheetModal();

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleClosePress = useCallback(() => {
		dismiss();
	}, [dismiss]);
	const snapPoints = useMemo(() => ["35%", "45%", "75"], []);

	return (
		<BottomSheetModal
			snapPoints={snapPoints}
			ref={compRef}
			index={0}
			onChange={handleSheetChanges}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					opacity={0.2}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
		>
			<BottomSheetView className="flex-1 rounded-t-xl">
				<View className="px-6 flex-row mb-[18px] pb-2 border-b border-outer-light justify-between items-center">
					<View />
					<View>
						<Text className="text-center text-base text-off-black font-regular">
							Send Request
						</Text>
						<Text className="text-center text-muted text-sm font-regular ">
							Custom Request
						</Text>
					</View>
					<Pressable onPress={handleClosePress}>
						<Ionicons name="close-circle-outline" color="#676B83" size={24} />
					</Pressable>
				</View>
				<View className="space-y-5 px-6 mb-[149px]">
					<View>
						<Text className="text-sm text-off-black font-regular mb-[6px]">
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
							<TextInput
								placeholder="Island Lagos, Nigeria"
								className="flex-1 text-base"
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
								className="flex-1 text-base text-muted placeholder:text-muted"
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
								className="flex-1 text-muted placeholder:text-muted text-base"
								multiline
							/>
						</View>
					</View>
				</View>
				<View className="mt-auto px-6 mb-2">
					<Pressable className="bg-primary py-[10px] px-1 rounded">
						<Text className="text-center text-white text-base font-regular">
							Send
						</Text>
					</Pressable>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
}
export default VendorBooking;
