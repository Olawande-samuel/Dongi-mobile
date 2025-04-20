import StyledButton from "@/components/StyledButton";
import Checkmark from "@/svgs/CheckMark";
import Copy from "@/svgs/Copy";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

function AccountApproved({
	compRef,
}: {
	compRef: React.RefObject<BottomSheetModal>;
}) {
	const { dismissAll } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["50%"], []);

	const handleClosePress = useCallback(() => {
		dismissAll();
	}, [dismissAll]);

	return (
		<BottomSheetModal
			ref={compRef}
			index={0}
			snapPoints={snapPoints}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					opacity={0.2}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
		>
			<BottomSheetScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1 rounded-t-xl"
			>
				<View className="flex-1 px-6">
					<View className=" flex-row mb-[18px] pb-2 border-b border-outer-light justify-between items-center">
						<View />
						<View>
							<Text className="text-center text-base text-off-black font-regular">
								Welcome
							</Text>
						</View>
						<Pressable onPress={handleClosePress}>
							<Ionicons name="close-circle-outline" color="#676B83" size={24} />
						</Pressable>
					</View>

					<View>
						<View className="justify-center items-center mb-7 large:mb-[37px]">
							<Checkmark />
						</View>

						<View className="space-y-4 mb-[30px]">
							<View className="">
								<Text className="text-center font-bold text-sm large:text-base text-primaryII ">
									Congratulations!
								</Text>
								<Text className=" tex-sm large:text-base text-off-black text-center">
									You have been accepted as a service provider and can now
									receive request from customers
								</Text>
							</View>
							<View>
								<Text className="text-center font-medium large:font-bold text-sm large:text-base text-primaryII mb-2">
									Up Next
								</Text>
								<View className="space-y-2">
									<View className="flex-row justify-between items-center">
										<View className="flex-row ">
											<View className="border-[1.5px] mr-3 border-primaryII h-[18px] w-[18px] rounded-full bg-white"></View>
											<Text className="text-xs large:text-sm font-normal font-regular text-off-black">
												Fund your wallet
											</Text>
										</View>
										<AntDesign name="arrowright" size={24} color="#E4AE1B" />
									</View>
									<View className="flex-row justify-between items-center">
										<View className="flex-row ">
											<View className="border-[1.5px] mr-3 border-primaryII h-[18px] w-[18px] rounded-full bg-white"></View>
											<Text className="text-xs large:text-sm font-normal font-regular text-off-black">
												Create at least one service
											</Text>
										</View>
										<AntDesign name="arrowright" size={24} color="#E4AE1B" />
									</View>
									<View className="flex-row justify-between items-center">
										<View className="flex-row ">
											<View className="border-[1.5px] mr-3 border-primaryII h-[18px] w-[18px] rounded-full bg-white"></View>
											<Text className="text-xs large:text-sm font-normal font-regular text-off-black">
												Review your public profile
											</Text>
										</View>
										<AntDesign name="arrowright" size={24} color="#E4AE1B" />
									</View>
								</View>
							</View>

							<View className="flex-row justify-center gap-x-1 bg-[#F7EFDE] p-2 rounded items-center">
								<Copy />
								<Text className="text-xs large:text-sm font-normal text-start text-off-black font-regular">
									You have to fund your account to be charged for requests from
									customers
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View className="mt-auto px-6 mb-2">
					<StyledButton title="Send" onPress={() => {}} />
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}

export default AccountApproved;
