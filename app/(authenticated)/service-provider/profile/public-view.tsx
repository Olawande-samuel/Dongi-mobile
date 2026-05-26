import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VendorProfile from "@/components/client/VendorProfile";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import useUserInfo from "@/hooks/useUserInfo";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import DoubleHeader from "@/components/shared/DoubleHeader";
import BackButton from "@/components/BackButton";
import { SIZES } from "@/utils/constants";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";
import useServices from "@/hooks/useServices";
import { IProviderService } from "@/types";
import EmptyList from "@/svgs/EmptyList";
import EmptyServices from "@/components/provider/Dashboard/EmptyServices";

function ServiceComponent({
	created_at,
	description,
	name,
	uuid,
	images,
}: IProviderService) {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 gap-y-2">
			<View>
				<Image
					source={require("../../../../assets/images/client/preview_1.png")}
					className="w-full h-20 large:h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-sm large:text-base font-regular text-off-black">
					{name || ""}
				</Text>
				<Text
					className="text-support text-xs large:text-sm font-regular"
					numberOfLines={3}
				>
					{description || ""}
				</Text>
			</View>
			<View>
				<Text
					disabled
					className="text-center text-primary text-xs large:text-sm font-regular"
				>
					Request
				</Text>
			</View>
		</View>
	);
}

const PublicProfile = () => {
	const { data } = useServiceProviderUserInfo();

	const { isLoading, result } = useServices();

	const { data: servicesByCategory } = useQuery({
		queryKey: ["get my services by category", data?.user?.category_of_service],
		queryFn: () =>
			Api.getCategoryServices(data?.user?.category_of_service || ""),
		enabled: !!data?.user.uuid,
	});

	const nameOfService = result?.find(
		(item) => item.category_id === data?.user?.category_of_service,
	);
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom", "top"]}>
			<View className="flex-row justify-between items-center pt-1 px-4 large:px-6">
				<BackButton />
				<DoubleHeader
					title={`${data?.user?.firstname || ""} ${data?.user?.lastname} `}
					subtitle={data?.user?.category_of_service || ""}
				/>
				<Pressable>
					<Octicons
						name="share-android"
						size={SIZES.height > 700 ? 24 : 18}
						color="#676B83"
					/>
				</Pressable>
			</View>
			<ScrollView
				className="bg-white flex-1 pt-[18px] border-t border-outer-light px-4 large:px-6"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-1 bg-white ">
					<View className="flex-row items-center mb-5">
						<View className="mr-4">
							<Image
								source={{ uri: data?.user.business_logo }}
								className="w-16 h-16 large:w-[100px] large:h-[100px] rounded-full"
								width={100}
								height={100}
							/>
						</View>
						<View className="flex-1 py-[6px] gap-y-2 ">
							<View>
								<Text
									className="text-xs large:text-sm font-regular text-support mb-2"
									numberOfLines={2}
								>
									{data?.user.bio || ""}
								</Text>
							</View>
							<View className="flex-row justify-between">
								<View>
									<Text className="text-xs font-regular mb-1 text-muted">
										Customers
									</Text>
									<Text className="text-sm text-center text-off-black">0</Text>
								</View>
								<View>
									<Text className="text-xs font-regular mb-1 text-muted">
										Rating
									</Text>
									<View className="flex-row items-center">
										<Ionicons name="star" color="#FFCE31" />
										<Text className="text-sm text-off-black">
											{data?.rating?.average_rating || 5}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<Pressable
						onPress={() => {}}
						className="mb-6 py-2 large:py-3 px-1 bg-off-black rounded"
					>
						<Text className="text-sm large:text-base font-regular text-center text-white">
							Request a custom service
						</Text>
					</Pressable>
					<View className="flex-1 mb-6">
						<Text className="text-center text-sm text-off-black font-regular mb-3">
							Services
						</Text>
						<View className="bg-inner-background-light flex-1 p-2 rounded-lg">
							{!result || (result && result?.length === 0) ? (
								<View className="flex-1 bg-white py-[18px] rounded-[9px]">
									<EmptyServices />
								</View>
							) : (
								result?.map((item, i) => <ServiceComponent key={i} {...item} />)
							)}
						</View>
					</View>
					<View className="mb-6">
						<Text className="text-center text-xs large:text-sm text-off-black font-regular mb-3">
							Bio
						</Text>
						<Text className="text-xs large:text-sm text-support leading-5  large:leading-[22.4px] font-regular">
							{data?.user?.brief_introduction || ""}
						</Text>
					</View>
					<Pressable className="border-[0.5px] border-primary px-1 py-2 large:py-3 rounded mb-8">
						<Text className="text-center text-primary text-sm large:text-base ">
							Need a custom service?
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PublicProfile;
