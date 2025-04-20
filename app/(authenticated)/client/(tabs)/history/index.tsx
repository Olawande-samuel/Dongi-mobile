import HomeTabs from "@/components/client/dashboard/HomeTabs";
import HistoryCard from "@/components/client/history/HistoryCard";
import NoHistory from "@/components/client/history/NoHistory";
import OngoingCard from "@/components/client/history/OngoingCard";
import { ICompletedRequest, OngoingRequest } from "@/types";
import { groupByDate } from "@/utils";
import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import {
	ActivityIndicator,
	SectionList,
	Text,
	useWindowDimensions,
	View,
} from "react-native";

const DATA: any[] = [];
const History = () => {
	const [tab, setTab] = useState(1);
	const { height } = useWindowDimensions();

	const { data, isLoading } = useQuery({
		queryKey: ["fetch pending requests"],
		queryFn: Api.getPendingRequests,
		enabled: tab === 2,
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

	const listItems = groupByDate(
		tab === 1
			? completedData?.data.data.requests || []
			: [
					...(ongoingRequestData?.data.data?.requests || []),
					...(data?.data?.data.requests || []),
			  ]
	);
	return (
		<SectionList
			className="bg-white px-6"
			showsVerticalScrollIndicator={false}
			sections={listItems}
			renderItem={({ item }: { item: any }) =>
				tab === 1 ? (
					<HistoryCard {...(item as ICompletedRequest)} />
				) : (
					<OngoingCard {...(item as OngoingRequest)} />
				)
			}
			ListHeaderComponent={
				<HomeTabs
					tab1title="Completed"
					tab2title="Ongoing"
					setTab={setTab}
					tab={tab}
				/>
			}
			ListEmptyComponent={
				isLoading || isOngoingRequestLoading ? (
					<ActivityIndicator />
				) : (
					<NoHistory
						text={
							tab === 1
								? "You do not have any completed request"
								: "You do not have any ongoing request"
						}
					/>
				)
			}
			keyExtractor={(item, index) => String(item.id + index)}
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
		/>
	);
};

export default History;
