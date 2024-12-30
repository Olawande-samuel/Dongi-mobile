import React from "react";
import { View } from "react-native";
import HomeTop from "./HomeTop";
import HomeCategory from "./HomeCategory";
import HomeTabs from "./HomeTabs";

const HomeContent = ({
	setTab,
	tab,
}: {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<View>
			<HomeTop />
			<HomeCategory />
			<HomeTabs tab={tab} setTab={setTab} />
		</View>
	);
};

export default HomeContent;
