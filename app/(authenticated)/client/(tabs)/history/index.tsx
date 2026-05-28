import HomeTabs from "@/components/client/dashboard/HomeTabs";
import HistoryCard from "@/components/client/history/HistoryCard";
import NoHistory from "@/components/client/history/NoHistory";
import OngoingCard from "@/components/client/history/OngoingCard";
import PendingCard from "@/components/client/history/PendingCard";
import { ICompletedRequest, OngoingRequest } from "@/types";
import { groupByDate } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { RefreshControl } from "react-native";
import {
	ActivityIndicator,
	SectionList,
	Text,
	useWindowDimensions,
	View,
} from "react-native";

const History = () => {
	const [tab, setTab] = useState(1);
	const { height } = useWindowDimensions();

	const queryClient = useQueryClient();

	const { data: pendingData, isLoading: isPendingLoading } = useQuery({
		queryKey: ["fetch pending requests"],
		queryFn: Api.getPendingRequests,
		enabled: tab === 3,
	});

	const { data: ongoingRequestData, isLoading: isOngoingRequestLoading } =
		useQuery({
			queryKey: ["fetch ongoing requests"],
			queryFn: Api.getOngoingRequests,
			enabled: tab === 2,
		});

	const { data: completedData, isLoading: isCompletedRequestLoading } =
		useQuery({
			queryKey: ["fetch completed requests"],
			queryFn: Api.getCompletedRequests,
			enabled: tab === 1,
		});

	const listItems =
		tab === 1
			? groupByDate(completedData?.data.data.requests || [])
			: tab === 2
			? groupByDate(ongoingRequestData?.data.data?.requests || [])
			: groupByDate(pendingData?.data?.data.requests || []);

	const isLoading =
		tab === 1
			? isCompletedRequestLoading
			: tab === 2
			? isOngoingRequestLoading
			: isPendingLoading;

	const emptyText =
		tab === 1
			? "You do not have any completed request"
			: tab === 2
			? "You do not have any ongoing request"
			: "You do not have any pending request";

	return (
		<SectionList
			className="bg-white px-6"
			showsVerticalScrollIndicator={false}
			sections={
				(listItems as Array<{ title: string; data: OngoingRequest[] }>) ||
				(listItems as Array<{ title: string; data: ICompletedRequest[] }>)
			}
			renderItem={({ item }: { item: any }) =>
				tab === 1 ? (
					<HistoryCard {...(item as ICompletedRequest)} />
				) : tab === 2 ? (
					<OngoingCard {...(item as OngoingRequest)} />
				) : (
					<PendingCard {...(item as OngoingRequest)} />
				)
			}
			ListHeaderComponent={
				<HomeTabs
					tab1title="Completed"
					tab2title="Ongoing"
					tab3title="Pending"
					setTab={setTab}
					tab={tab}
				/>
			}
			ListEmptyComponent={
				isLoading ? (
					<ActivityIndicator />
				) : (
					<NoHistory text={emptyText} />
				)
			}
			keyExtractor={(item, index) => String(item.uuid + index)}
			renderSectionHeader={({ section: { title } }) => (
				<View className="py-2 relative mb-4">
					<Text className="text-support text-center text-sm leading-[17.64px]">
						{moment(title).format("MMMM YYYY")}
					</Text>
				</View>
			)}
			contentContainerStyle={{
				minHeight: height - 200,
			}}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={() => {
						if (tab === 1) {
							queryClient.invalidateQueries({
								queryKey: ["fetch completed requests"],
							});
						} else if (tab === 2) {
							queryClient.invalidateQueries({
								queryKey: ["fetch ongoing requests"],
							});
						} else {
							queryClient.invalidateQueries({
								queryKey: ["fetch pending requests"],
							});
						}
					}}
				/>
			}
		/>
	);
};

export default History;
