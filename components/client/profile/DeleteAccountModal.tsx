import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { PropsWithChildren, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheetPrompt from "../BottomSheetPrompt";
import Warning from "@/svgs/Warning";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends PropsWithChildren {
	compRef: React.RefObject<BottomSheetModal>;
}
const DeleteAccountModal = ({ compRef }: Props) => {
	const { dismiss } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["60"], []);
	return (
		<SafeAreaView>
			<BottomSheetPrompt
				title="Delete Account"
				compRef={compRef}
				snapPoints={snapPoints}
			>
				<View className="px-6">
					<View className="mb-[18px]">
						<View className="justify-center items-center">
							<Warning isError />
						</View>
						<Text className="font-base font-regular text-support text-center ">
							Taking this action means all your data and history will be deleted
							and cannot be recovered
						</Text>
					</View>
					<View className="mt-auto flex-row gap-x-3 mb-6">
						<Pressable
							// onPress={openRatings}
							className="bg-error-600 py-[10px] flex-1 px-1 rounded border-[0.5px] border-error-600"
						>
							<Text className="text-center text-white text-base font-regular">
								Continue
							</Text>
						</Pressable>
						<Pressable
							onPress={() => dismiss()}
							className="border-[0.5px] border-off-black bg-off-black flex-1 py-[10px] px-1 rounded"
						>
							<Text className="text-center text-white text-base font-regular">
								Cancel
							</Text>
						</Pressable>
					</View>
				</View>
			</BottomSheetPrompt>
		</SafeAreaView>
	);
};

export default DeleteAccountModal;
