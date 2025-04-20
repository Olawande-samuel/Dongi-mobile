import { View, Text } from "react-native";
import React from "react";
import ModalComp from "./Modal";
import Delivery from "@/svgs/Delivery";
import StyledButton from "./StyledButton";

const ServiceCompletedModal = ({
	modalVisible,
	setModalVisible,
	onPress,
}: {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	onPress: VoidFunction;
}) => {
	return (
		<ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible}>
			<View className="space-y-3 w-full" style={{ padding: 16 }}>
				<View className="justify-center items-center mb-6">
					<Delivery isServiceProvider />
				</View>
				<Text className="text-base font-regular text-off-black text-center">
					Congratulations you have marked{" "}
					<Text className="font-bold">Rebecca Anyaoku’s</Text> request complete
				</Text>
				<Text className="text-sm text-support font-regular text-center">
					Kindly wait for our confirmation from Rebecca A. to verify this job
					completed, Thank you
				</Text>
				<StyledButton title="Write a Review" onPress={onPress} />
			</View>
		</ModalComp>
	);
};

export default ServiceCompletedModal;
