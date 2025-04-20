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
	buttonText?: string;
	loading?: boolean;
	type?: "warning" | "success";
}
const AppModal = ({
	modalVisible,
	setModalVisible,
	buttonText,
	title,
	onPress,
	loading,
	type = "success",
}: Props) => {
	return (
		<ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible}>
			<View className="space-y-3 w-full" style={{ padding: 16 }}>
				<View className="justify-center items-center">
					{type === "success" ? <Success isServiceProvider /> : <Warning />}
				</View>
				<Text className="text-sm large:text-base font-regular text-off-black text-center">
					{title}
				</Text>
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

export default AppModal;
