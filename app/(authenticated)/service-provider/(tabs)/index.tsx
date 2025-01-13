import { View, Text, StatusBar, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestCard from "@/components/provider/Dashboard/RequestCard";
import HomeTopComponent from "@/components/provider/Dashboard/HomeTopComponent";

const Index = () => {
	const [tab, setTab] = useState(1);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar />
			<FlatList
				data={[1, 2, 3, 4]}
				renderItem={() => <RequestCard />}
				ListHeaderComponent={<HomeTopComponent tab={tab} setTab={setTab} />}
				keyExtractor={(item) => item.toString()}
				contentContainerStyle={{
					paddingHorizontal: 24,
				}}
			/>
		</SafeAreaView>
	);
};

export default Index;
