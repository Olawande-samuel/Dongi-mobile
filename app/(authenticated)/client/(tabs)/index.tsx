import HomeContent from "@/components/client/dashboard/HomeContent";
import ServiceCard from "@/components/client/dashboard/ServiceCard";
import OngoingCard from "@/components/client/history/OngoingCard";
import React, { useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	const [tab, setTab] = useState(1);
	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={[1, 2, 3, 4]}
				renderItem={() => (tab === 1 ? <OngoingCard /> : <ServiceCard />)}
				ListHeaderComponent={<HomeContent tab={tab} setTab={setTab} />}
				keyExtractor={(item) => item.toString()}
				contentContainerStyle={{
					paddingHorizontal: 24,
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;
