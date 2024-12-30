import HomeContent from "@/components/client/dashboard/HomeContent";
import ServiceCard from "@/components/client/dashboard/ServiceCard";
import React, { useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	const [tab, setTab] = useState(1);
	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar />
			<FlatList
				data={[1, 2, 3, 4]}
				renderItem={() => <ServiceCard />}
				ListHeaderComponent={<HomeContent tab={tab} setTab={setTab} />}
				keyExtractor={(item) => item.toString()}
			/>
		</SafeAreaView>
	);
};

export default Home;
