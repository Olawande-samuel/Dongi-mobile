import NoHistory from "@/components/client/history/NoHistory";
import CategorySearch from "@/components/client/search/CategorySearch";
import ServiceItem from "@/components/client/search/ServiceItem";
import useCurrentLocation from "@/hooks/useCurrentLocation";
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

	const { location, errorMsg: locationError } = useCurrentLocation();
	const lat = location?.coords.latitude.toString();
	const lng = location?.coords.longitude.toString();
	// wait for the location attempt to settle so results are proximity-based;
	// if permission is denied we still search, just without coordinates
	const locationReady = !!location || !!locationError;

	const { data, isLoading } = useQuery({
		queryKey: ["get service items", params.query],
		queryFn: () => Api.getCategoryServices(params.query as string),
	});

	const { data: searchResults, isLoading: searchLoading } = useQuery({
		queryKey: ["get search values", debouncedSearch, lat, lng],
		queryFn: () =>
			Api.searchService({
				category: params.query as string,
				query: debouncedSearch,
				lat,
				lng,
			}),
		enabled: !!debouncedSearch && locationReady,
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
