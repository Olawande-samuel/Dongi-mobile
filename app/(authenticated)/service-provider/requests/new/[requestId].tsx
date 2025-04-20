import AppModal from "@/components/AppModal";
import StatusPill from "@/components/StatusPill";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewRequest = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [acceptanceModalVisible, setAcceptanceModalVisible] = useState(false);
	const [rejectionModalVisible, setRejectionModalVisible] = useState(false);

	const params = useLocalSearchParams();

	const { data, isLoading } = useQuery({
		queryKey: ["get request by id", params.requestId as string],
		queryFn: () => Api.getRequestById(params.requestId as string),
	});

	const result = data?.data?.data;

	const { mutate, isPending } = useMutation({
		mutationFn: Api.acceptServiceRequest,
		onError: (err) => {
			handleError(err);
		},
		onSuccess: (res) => {
			setModalVisible(true);
		},
	});
	const { mutate: rejectMutation, isPending: isRejectPending } = useMutation({
		mutationFn: Api.rejectServiceRequest,
		onError: (err) => {
			handleError(err);
		},
		onSuccess: (res) => {
			setModalVisible(true);
		},
	});

	function acceptRequest() {
		setAcceptanceModalVisible(true);
	}

	function rejectRequest() {
		setRejectionModalVisible(true);
	}

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView className="flex-1 bg-white px-6 pb-4 gap-x-3">
					<View className="mt-9 mb-6">
						<View className="flex-row justify-between gap-4 mb-[10px]">
							<View className="flex-row items-center max-w-[65%]">
								<Image
									className="h-9 w-9 large:h-[42px] large:w-[42px] rounded-full"
									source={require("../../../../../assets/images/client/temp_user_sq.png")}
									resizeMode="cover"
								/>
								<View className="ml-2 space-y-1">
									<Text
										className="text-sm large:text-base font-regular text-off-black"
										// numberOfLines={1}
										// ellipsizeMode="tail"
									>
										{result?.provider_id || ""}
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
									<Text className="font-regular text-xs large:text-sm text-off-black">
										{result?.location || ""}
									</Text>
								</View>
								<Text className="text-xs text-end font-regular text-primaryII">
									{moment(result?.created_at).fromNow()}
								</Text>
							</View>
						</View>
					</View>
					<View className="space-y-2 large:space-y-3 mb-6">
						<View className="flex-row justify-between items-center">
							<Text className="text-support text-xs large:text-sm font-regular mr-4">
								Status
							</Text>
							<StatusPill title={result?.status || ""} />
						</View>
						<View className="flex-row justify-between items-center">
							<Text className="text-support text-xs large:text-sm font-regular mr-4">
								Request Type
							</Text>
							<Text className="font-regular text-xs large:text-sm text-off-black text-right">
								Real estate survey assistance
							</Text>
						</View>

						<View className="flex-row justify-between items-center">
							<Text className="text-support text-xs large:text-sm font-regular mr-4">
								Date Requested
							</Text>
							<Text className="font-regular text-xs large:text-sm text-off-black text-right">
								{moment(result?.created_at).format("DD MMM • hh:mmA")}
							</Text>
						</View>
					</View>
					<View className="space-y-5 py-3 mb-[14px] ">
						<Text className="text-xs large:text-sm text-off-black font-regular">
							Request
						</Text>
						<View>
							<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
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
								<Text className="flex-1 text-sm large:text-base">
									{result?.location || ""}
								</Text>
							</View>
						</View>
						<View>
							<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
								How soon do you need this?
							</Text>
							<View className="flex-row border p-2 border-inner-background-light">
								<Text className="flex-1 text-sm large:text-base text-off-black placeholder:text-off-black">
									{result?.deadline || ""}
								</Text>
							</View>
						</View>
						<View>
							<Text className="text-xs large:text-sm text-off-black font-regular mb-[6px]">
								Message
							</Text>
							<View className="flex-row border p-2 border-inner-background-light h-[158px]">
								<Text className="flex-1 text-off-black placeholder:text-off-black text-sm large:text-base">
									{result?.message || ""}
								</Text>
							</View>
						</View>
					</View>
					<View className="mb-6 flex-row space-x-3">
						<Pressable
							onPress={acceptRequest}
							className="bg-success-500 py-2 large:py-[10px] flex-1 px-1 rounded border-[0.5px] border-primary"
						>
							<Text className="text-center text-white text-sm large:text-base font-regular">
								Accept Request
							</Text>
						</Pressable>
						<Pressable
							onPress={rejectRequest}
							className="bg-white border-[0.5px] border-support flex-1 py-2 large:py-[10px] px-1 rounded"
						>
							<Text className="text-center text-support text-sm large:text-base font-regular">
								Deny Request
							</Text>
						</Pressable>
					</View>
					<AppModal
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						title={`Congratulations you have accepted ${
							result?.customer_id || ""
						}’s request`}
						onPress={() => setModalVisible(false)}
					/>
					{/* confirm acceptance modal*/}
					<AppModal
						modalVisible={acceptanceModalVisible}
						setModalVisible={setAcceptanceModalVisible}
						title={`Are you sure you want to accept ${
							result?.customer_id || ""
						}’s request? You'll be charge an acceptance fee`}
						onPress={() => mutate(params.requestId as string)}
						loading={isPending}
					/>
					{/* confirm rejection modal*/}
					<AppModal
						modalVisible={rejectionModalVisible}
						setModalVisible={setRejectionModalVisible}
						title={`Are you sure you want to reject ${
							result?.customer_id || ""
						}’s request?`}
						onPress={() => rejectMutation(params.requestId as string)}
						loading={isPending}
						type="warning"
					/>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default NewRequest;
