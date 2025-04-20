import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/client/search/Search";
import ServiceItem from "@/components/client/search/ServiceItem";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";

const SearchText = () => {
	const params = useLocalSearchParams();

	const searchValue = params.query;

	const { data, isLoading } = useQuery({
		queryKey: ["query services", searchValue],
		queryFn: () => Api.searchService({ query: searchValue as string }),  
		enabled: !!params.query,
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
