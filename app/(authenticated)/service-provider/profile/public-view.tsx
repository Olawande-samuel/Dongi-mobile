import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import VendorProfile from "@/components/client/VendorProfile";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import useUserInfo from "@/hooks/useUserInfo";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import DoubleHeader from "@/components/client/DoubleHeader";
import BackButton from "@/components/BackButton";
import { SIZES } from "@/utils/constants";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";

function ServiceComponent() {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 space-y-2">
			<View>
				<Image
					source={require("../../../../assets/images/client/preview_1.png")}
					className="w-full h-20 large:h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-sm large:text-base font-regular text-off-black">
					Real estate survey assistance
				</Text>
				<Text className="text-support text-xs large:text-sm font-regular">
					Buy or survey a property in Nigeria, obtain survey papers and
					engineering consultation.
				</Text>
			</View>
			<Pressable>
				<Text className="text-center text-primary text-xs large:text-sm font-regular">
					Request
				</Text>
			</Pressable>
		</View>
	);
}

const PublicProfile = () => {
	const { data } = useServiceProviderUserInfo();
	const navigation = useNavigation();

	const { data: services, isLoading } = useQuery({
		queryKey: ["get my services", data?.user?.uuid],
		queryFn: () => Api.getProvidersServices(data?.user.uuid || ""),
		enabled: !!data?.user.uuid,
	});

	console.log("user uuid", data?.user.id);
	const result = services?.data?.data?.services;

	console.log("48########", result);

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
								source={require("../../../../assets/images/client/temp_user.png")}
								className="w-16 h-16 large:w-[100px] large:h-[100px] rounded-full"
								width={100}
								height={100}
							/>
						</View>
						<View className="flex-1 py-[6px] space-y-2 ">
							<View>
								<Text className="text-xs large:text-sm font-regular text-support mb-2">
									{data?.user.brief_introduction || ""}
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
							{[...Array(3)].map((item, i) => (
								<ServiceComponent key={i} />
							))}
						</View>
					</View>
					<View className="mb-6">
						<Text className="text-center text-xs large:text-sm text-off-black font-regular mb-3">
							Bio
						</Text>
						<Text className="text-xs large:text-sm text-support leading-5  large:leading-[22.4px] font-regular">
							Navigating the real estate market can be overwhelming—but it
							doesn’t have to be. As an experienced real estate consultant, I
							specialize in helping clients buy and sell property with
							confidence. I provide personalized advice, market analysis, and
							negotiation strategies to ensure you get the best deal possible.
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
