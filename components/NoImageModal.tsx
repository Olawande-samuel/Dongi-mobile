import { View, Text, Pressable } from "react-native";
import React from "react";
import ModalComp from "@/components/Modal";
import Success from "@/svgs/Success";
import StyledButton from "./StyledButton";
import Warning from "@/svgs/Warning";

interface Props {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	onPress: VoidFunction;
	title: string;
	subtitle?: string;
	buttonText?: string;
	loading?: boolean;
	type?: "warning" | "success";
}
const NoImageModal = ({
	modalVisible,
	setModalVisible,
	buttonText,
	title,
	onPress,
	loading,
	subtitle,
	type = "success",
}: Props) => {
	return (
		<ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible}>
			<View className="w-full gap-y-8" style={{ padding: 16 }}>
				<View className="gap-y-3 ">
					<Text className="text-center text-2xl">Alert</Text>
					<Text className="text-sm large:text-base font-regular text-off-black text-center">
						{title}
					</Text>
					{subtitle && (
						<Text className="text-sm large:text-base font-regular text-off-black text-center">
							{subtitle}
						</Text>
					)}
				</View>
				<View className="mt-auto mb-2">
					<StyledButton
						onPress={onPress}
						textClassName="font-regular text-base"
						title={buttonText ?? "Continue"}
						isLoading={loading}
					/>
				</View>
			</View>
		</ModalComp>
	);
};

export default NoImageModal;
