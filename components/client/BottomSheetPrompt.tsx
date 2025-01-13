import { View, Text, Pressable } from "react-native";
import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

interface Props extends PropsWithChildren {
	compRef: React.RefObject<BottomSheetModal>;
	snapPoints?: string[];
	title: string;
}
const BottomSheetPrompt = ({
	compRef,
	children,
	snapPoints: OverrideSnapPoints,
	title,
}: Props) => {
	const { dismiss } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["45%", "60"], []);

	const handleClosePress = useCallback(() => {
		dismiss();
	}, [dismiss]);
	return (
		<BottomSheetModal
			snapPoints={OverrideSnapPoints ?? snapPoints}
			ref={compRef}
			index={0}
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
							{title}
						</Text>
					</View>
					<Pressable onPress={handleClosePress}>
						<Ionicons name="close-circle-outline" color="#676B83" size={24} />
					</Pressable>
				</View>
				{children}
			</BottomSheetView>
		</BottomSheetModal>
	);
};

export default BottomSheetPrompt;
