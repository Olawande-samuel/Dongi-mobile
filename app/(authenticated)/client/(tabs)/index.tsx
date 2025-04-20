import HomeContent from "@/components/client/dashboard/HomeContent";
import ServiceCard from "@/components/client/dashboard/ServiceCard";
import OngoingCard from "@/components/client/history/OngoingCard";
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

	const { data, isLoading } = useQuery({
		queryKey: ["fetch pending requests"],
		queryFn: Api.getPendingRequests,
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
				data={tab === 1 ? data?.data.data.requests : []}
				renderItem={({ item }) =>
					tab === 1 ? <OngoingCard {...item} /> : <ServiceCard />
				}
				ListHeaderComponent={<HomeContent tab={tab} setTab={setTab} />}
				ListEmptyComponent={
					isLoading ? <ActivityIndicator /> : <EmptyComponent />
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

function EmptyComponent() {
	return (
		<View className="flex-1 items-center justify-center py-10">
			<View className="items-center">
				<Image
					source={require("../../../../assets/images/not-found.png")}
					className="w-[100px] h-[100px]"
				/>
				<Text className="text-[#cccccc] mt-3 text-sm font-regular text-center">
					You do not have any ongoing request
				</Text>
			</View>
		</View>
	);
}
