import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback,
	Pressable,
} from "react-native";
import React from "react";
import Success from "@/svgs/Success";
import StyledButton from "./StyledButton";
import useUserType from "@/hooks/useUserType";

function ReviewComplete({
	modalVisible,
	setModalVisible,
}: {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { userType } = useUserType();
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
				<View
					className="flex-1 justify-center items-center"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<View
						className="bg-white w-[90%] rounded-2xl items-center"
						style={{
							width: "90%",
							borderRadius: 24,
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 4,
							elevation: 5,
						}}
					>
						<View className="space-y-3 w-full" style={{ padding: 16 }}>
							<View className="justify-center items-center">
								<Success isServiceProvider={userType === "service"} />
							</View>
							<Text className="text-base font-regular text-off-black text-center">
								Thank you for your review
							</Text>
							<View className="mt-auto mb-2">
								<StyledButton title="Continue" onPress={() => {}} />
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

export default ReviewComplete;
