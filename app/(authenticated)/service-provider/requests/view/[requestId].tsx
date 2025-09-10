import ServiceCompletedModal from "@/components/ServiceCompletedModal";
import RouteHeader from "@/components/shared/RouteHeader";
import StatusPill from "@/components/StatusPill";
import StyledButton from "@/components/StyledButton";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ongoing = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const params = useLocalSearchParams();

	const { data, isLoading } = useQuery({
		queryKey: ["get request by id", params.requestId as string],
		queryFn: () => Api.getRequestById(params.requestId as string),
	});

	const result = data?.data?.data;

	const { setIsLoading } = useGlobalContext();

	const { mutate, isPending } = useMutation({
		mutationFn: Api.confirmServiceCompletion,
		onSuccess: (res) => {
			console.log({ res });
			setModalVisible(true);
		},
		onError: (err) => handleError(err),
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function markAsCompleted() {
		mutate(result?.uuid as string);
	}

	return (
		<SafeAreaView className="flex-1 bg-white px-4 large:px-6" edges={["top"]}>
			<RouteHeader
				title="Ongoing Request"
				subTitle={result?.service?.name || ""}
			/>
			<ScrollView
				className="flex-1 bg-white  pb-4"
				showsVerticalScrollIndicator={false}
			>
				<View className="py-6 border-b border-outer-light mb-3">
					<View className="flex-row justify-between gap-x-4 flex-wrap mb-[10px]">
						<View className="flex-row items-center">
							<Image
								className="h-[42px] w-[42px] rounded-full"
								source={require("../../../../../assets/images/client/temp_user_sq.png")}
								resizeMode="cover"
							/>
							<View className="ml-2 space-y-1">
								<Text className="text-sm large:text-base font-regular text-off-black">
									{`${result?.customer?.first_name || ""} ${
										result?.customer?.last_name || ""
									}`}
								</Text>
								<Text className="text-[10px] large:text-xs font-regular text-support">
									{result?.customer?.phone || ""}
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
								<Text
									className="font-regular text-xs large:text-sm text-off-black"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{result?.customer?.location || ""}
								</Text>
							</View>
							<Text className="text-[10px] large:text-xs text-end font-regular text-primaryII">
								{moment(result?.created_at).format("DD MMM • hh:mmA")}
							</Text>
						</View>
					</View>
				</View>
				<View className="space-y-5 py-3 mb-6 ">
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
								{result?.customer?.location || ""}
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
				<View className="space-y-3 mb-32 large:mb-[153px]">
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
							{result?.service?.name || ""}
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
				<View className="mb-6">
					<StyledButton
						disabled={isPending}
						title="Mark as Completed"
						onPress={markAsCompleted}
					/>
				</View>
				<ServiceCompletedModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					customerName={`${result?.customer?.first_name || ""} ${
						result?.customer?.last_name || ""
					}`}
					onPress={() =>
						router.push({
							pathname: "/service-provider/history/[requestId]",
							params: {
								requestId: result?.uuid,
							},
						})
					}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Ongoing;
