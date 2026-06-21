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
	isError?: boolean;
}
const AppModal = ({
	modalVisible,
	setModalVisible,
	buttonText,
	title,
	onPress,
	loading,
	subtitle,
	type = "success",
	isError,
}: Props) => {
	return (
		<ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible}>
			<View className="gap-y-3 w-full" style={{ padding: 16 }}>
				<View className="justify-center items-center">
					{type === "success" ? (
						<Success isServiceProvider />
					) : (
						<Warning isError={isError} />
					)}
				</View>
				<Text className="text-sm large:text-base font-regular text-off-black text-center">
					{title}
				</Text>
				{subtitle && (
					<Text className="text-sm large:text-base font-regular text-off-black text-center">
						{subtitle}
					</Text>
				)}
				<View className="mt-auto mb-2 gap-y-2">
					<StyledButton
						onPress={onPress}
						textClassName="font-regular text-base"
						title={buttonText ?? "Continue"}
						isLoading={loading}
					/>
					<Pressable onPress={() => setModalVisible(false)} className="py-3 items-center">
						<Text className="text-sm font-regular text-off-black">Cancel</Text>
					</Pressable>
				</View>
			</View>
		</ModalComp>
	);
};

export default AppModal;
