import HomeContent from "@/components/client/dashboard/HomeContent";
import ServiceCard from "@/components/client/dashboard/ServiceCard";
import OngoingCard from "@/components/client/history/OngoingCard";
import { IProviderService, OngoingRequest } from "@/types";
import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	StatusBar,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	const [tab, setTab] = useState(1);

	const { data: services, isLoading } = useQuery({
		queryKey: ["fetch services"],
		queryFn: Api.getServices,
	});

	const { data: ongoingRequestData, isLoading: isOngoingRequestLoading } =
		useQuery({
			queryKey: ["fetch ongoing requests"],
			queryFn: Api.getOngoingRequests,
		});

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={
					tab === 1
						? ongoingRequestData?.data.data.requests
						: services?.data.data.services
				}
				renderItem={({ item }: { item: any }) =>
					tab === 1 ? (
						<OngoingCard {...(item as OngoingRequest)} />
					) : (
						<ServiceCard {...(item as IProviderService)} />
					)
				}
				ListHeaderComponent={<HomeContent tab={tab} setTab={setTab} />}
				ListEmptyComponent={
					isLoading || isOngoingRequestLoading ? (
						<ActivityIndicator />
					) : (
						<EmptyComponent
							text={
								tab !== 1
									? "No service available"
									: "You do not have any ongoing request"
							}
						/>
					)
				}
				keyExtractor={(item) => item.toString()}
				contentContainerStyle={{
					paddingHorizontal: 24,
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;

function EmptyComponent({ text }: { text?: string }) {
	return (
		<View className="flex-1 items-center justify-center py-10">
			<View className="items-center">
				<Image
					source={require("../../../../assets/images/not-found.png")}
					className="w-[100px] h-[100px]"
				/>
				<Text className="text-[#cccccc] mt-3 text-sm font-regular text-center">
					{text ? text : "You do not have any ongoing request"}
				</Text>
			</View>
		</View>
	);
}
