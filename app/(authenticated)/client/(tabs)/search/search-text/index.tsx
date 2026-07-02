import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/client/search/Search";
import ServiceItem from "@/components/client/search/ServiceItem";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";

const SearchText = () => {
	const params = useLocalSearchParams();

	const searchValue = params.query;

	const { location, errorMsg: locationError } = useCurrentLocation();
	const lat = location?.coords.latitude.toString();
	const lng = location?.coords.longitude.toString();
	// wait for the location attempt to settle so results are proximity-based;
	// if permission is denied we still search, just without coordinates
	const locationReady = !!location || !!locationError;

	const { data, isLoading } = useQuery({
		queryKey: ["query services", searchValue, lat, lng],
		queryFn: () => Api.searchService({ query: searchValue as string, lat, lng }),
		enabled: !!params.query && locationReady,
	});

	const [activeTab, setActiveTab] = useState(1);

	const services = data?.data?.data?.services || [];
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<FlatList
				data={services}
				renderItem={({ item }) => <ServiceItem {...item} />}
				ListHeaderComponent={
					<Search
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						searchValue={searchValue as string}
					/>
				}
				keyExtractor={(item) => item.toString()}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default SearchText;
