import { View, Text, TouchableWithoutFeedback, Modal } from "react-native";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComp = ({ modalVisible, setModalVisible, children }: Props) => {
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
						{children}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default ModalComp;
