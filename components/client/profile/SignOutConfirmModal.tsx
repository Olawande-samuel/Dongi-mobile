import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { PropsWithChildren, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheetPrompt from "../BottomSheetPrompt";
import Warning from "@/svgs/Warning";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/Auth";

interface Props extends PropsWithChildren {
	compRef: React.RefObject<BottomSheetModal>;
}
const SignOutConfirmModal = ({ compRef }: Props) => {
	const { dismiss } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["60"], []);
	const { logout } = useAuth();
	return (
		<SafeAreaView>
			<BottomSheetPrompt
				title="Sign out"
				compRef={compRef}
				snapPoints={snapPoints}
			>
				<View className="px-6">
					<View className="mb-[18px]">
						<View className="justify-center items-center">
							<Warning />
						</View>
						<Text className="font-base font-regular text-support text-center ">
							Taking this action means you’ll have to sign in when next you open
							this app
						</Text>
					</View>
					<View className="mt-auto flex-row gap-x-3 mb-6">
						<Pressable
							onPress={() => {
								logout();
							}}
							className="bg-primary py-[10px] flex-1 px-1 rounded border-[0.5px] border-primary"
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

export default SignOutConfirmModal;
