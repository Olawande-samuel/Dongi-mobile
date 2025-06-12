import HomeTopComponent from "@/components/provider/Dashboard/HomeTopComponent";
import PendingRequestCard from "@/components/provider/Dashboard/PendingRequestsCard";
import RequestCard from "@/components/provider/Dashboard/RequestCard";
import { OngoingRequest, ServiceProviderOngoingRequest, ServiceProviderPendingRequest } from "@/types";
import { SIZES } from "@/utils/constants";
import { Api } from "@/utils/endpoints";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, RefreshControl, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
	const [tab, setTab] = useState(1);
	const queryClient = useQueryClient();

	const result = useQueries({
		queries: [
			{
				queryKey: ["get provider ongoing requests"],
				queryFn: Api.getProviderOngoingRequests,
			},
			{
				queryKey: ["get provider pending requests"],
				queryFn: Api.getProviderPendingRequests,
			},
		],
		combine: (results) => {
			return {
				data: results.map((result) => result.data?.data.data.requests),
				isPending: results.some((result) => result.isPending),
				isSuccess: results.every((result) => result.isSuccess),
				isError: results.some((result) => result.isError),
				errors: results.map((result) => result.error).filter(Boolean),
			};
		},
	});

	const data = result?.data.flatMap((item) => item?.flatMap((item) => item));

	console.log({ data, result });

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar />
			<FlatList
				data={result.data[tab - 1] || []}
				renderItem={({ item }) =>
					tab === 1 ? (
						<RequestCard activeTab={tab} {...(item as ServiceProviderOngoingRequest)} />
					) : (
						<PendingRequestCard
							activeTab={tab}
							{...(item as ServiceProviderPendingRequest)}
						/>
					)
				}
				ListHeaderComponent={
					<HomeTopComponent
						tab={tab}
						setTab={setTab}
						totalOngoing={result.data?.[0]?.length || 0}
						totalPending={result.data?.[1]?.length || 0}
					/>
				}
				keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
				contentContainerStyle={{
					paddingHorizontal: SIZES.height > 700 ? 24 : 16,
				}}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={result.isPending}
						onRefresh={() => {
							queryClient.invalidateQueries({
								queryKey: ["get provider pending requests"],
							});
							queryClient.invalidateQueries({
								queryKey: ["get provider ongoing requests"],
							});
						}}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Index;
