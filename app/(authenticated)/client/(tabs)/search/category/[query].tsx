import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/client/search/Search";
import ServiceItem from "@/components/client/search/ServiceItem";

const Query = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<FlatList
				data={[1, 2, 3]}
				renderItem={() => <ServiceItem />}
				ListHeaderComponent={<Search />}
				keyExtractor={(item) => item.toString()}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Query;
