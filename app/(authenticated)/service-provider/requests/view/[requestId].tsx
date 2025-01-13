import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import StatusPill from "@/components/StatusPill";
import StyledButton from "@/components/StyledButton";
import ServiceCompletedModal from "@/components/ServiceCompletedModal";
import { SafeAreaView } from "react-native-safe-area-context";

const Ongoing = () => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<ScrollView className="flex-1 bg-white px-6 pb-4">
				<View className="py-6 border-b border-outer-light mb-3">
					<View className="flex-row justify-between gap-x-4 flex-wrap mb-[10px]">
						<View className="flex-row items-center">
							<Image
								className="h-[42px] w-[42px] rounded-full"
								source={require("../../../../../assets/images/client/temp_user_sq.png")}
								resizeMode="cover"
							/>
							<View className="ml-2 space-y-1">
								<Text className="text-base font-regular text-off-black">
									Rebecca Anyaoku
								</Text>
								<Text className="text-xs font-regular text-support">
									Real estate agent
								</Text>
							</View>
						</View>
						<View className="space-y-1">
							<View className="flex-row items-center justify-end">
								<Image
									source={require("../../../../../assets/images/location.png")}
									width={18}
									height={18}
									resizeMode="contain"
									className="w-[18px] h-[18px] mr-[6px]"
								/>
								<Text className="font-regular text-sm text-off-black">
									Lagos
								</Text>
							</View>
							<Text className="text-xs text-end font-regular text-primaryII">
								20 Nov • 08:30AM
							</Text>
						</View>
					</View>
				</View>
				<View className="space-y-5 py-3 mb-6 ">
					<Text className="text-sm text-off-black font-regular">Request</Text>
					<View>
						<Text className="text-sm text-off-black font-regular mb-[6px]">
							Where are you located?
						</Text>
						<View className="flex-row items-center border p-2 border-inner-background-light">
							<Image
								source={require("../../../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<TextInput
								placeholder="Island Lagos, Nigeria"
								className="flex-1 text-base"
								readOnly
							/>
						</View>
					</View>
					<View>
						<Text className="text-sm text-off-black font-regular mb-[6px]">
							How soon do you need this?
						</Text>
						<View className="flex-row border p-2 border-inner-background-light">
							<TextInput
								placeholder="In 3 days"
								className="flex-1 text-base text-off-black placeholder:text-off-black"
								value=""
								readOnly
							/>
						</View>
					</View>
					<View>
						<Text className="text-sm text-off-black font-regular mb-[6px]">
							Message
						</Text>
						<View className="flex-row border p-2 border-inner-background-light h-[158px]">
							<TextInput
								placeholder="In 3 days"
								className="flex-1 text-off-black placeholder:text-off-black text-base"
								multiline
								value="I’m planning to sell my property but need advice on pricing and staging. Can you assist with marketing it to attract potential buyers?"
								readOnly
							/>
						</View>
					</View>
				</View>
				<View className="space-y-3 mb-[153px]">
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Status
						</Text>
						<StatusPill title="Pending" />
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Request Type
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							Real estate survey assistance
						</Text>
					</View>

					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Date Requested
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							20 Nov. 11:30AM
						</Text>
					</View>
				</View>
				<View className="mb-6">
					<StyledButton
						title="Mark as Completed"
						onPress={() => setModalVisible(true)}
					/>
				</View>
				<ServiceCompletedModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Ongoing;
