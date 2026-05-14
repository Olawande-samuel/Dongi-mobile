import NoHistory from "@/components/client/history/NoHistory";
import CategorySearch from "@/components/client/search/CategorySearch";
import ServiceItem from "@/components/client/search/ServiceItem";
import { Api } from "@/utils/endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Query = () => {
	const params = useLocalSearchParams();
	const [activeTab, setActiveTab] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedSearch(searchValue), 400);
		return () => clearTimeout(timer);
	}, [searchValue]);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["get service items", params.query],
		queryFn: () => Api.getCategoryServices(params.query as string),
	});

	const { data: searchResults, isLoading: searchLoading } = useQuery({
		queryKey: ["get search values", debouncedSearch],
		queryFn: () =>
			Api.searchService({
				category: params.query as string,
				query: debouncedSearch,
			}),
		enabled: !!debouncedSearch,
	});

	const services =
		searchResults?.data?.data.services || data?.data?.data?.services || [];
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<FlatList
				data={services}
				renderItem={({ item }) => <ServiceItem {...item} />}
				ListHeaderComponent={
					<CategorySearch
						categoryId={Number(params.query as string)}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						categoryItems={[]}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
				}
				ListEmptyComponent={
					isLoading || searchLoading ? (
						<ActivityIndicator />
					) : (
						<NoHistory text="No service found" />
					)
				}
				keyExtractor={(item) => item.uuid.toString()}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isLoading || searchLoading}
						onRefresh={() => {
							queryClient.invalidateQueries({
								queryKey: ["get service items", params.query],
							});
							queryClient.invalidateQueries({
								queryKey: ["get search values", debouncedSearch],
							});
						}}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Query;
