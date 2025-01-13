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
			<View className="">
				<HomeTabs
					tab={tab}
					setTab={setTab}
					tab1title="Ongoing"
					tab2title="Recommended"
				/>
			</View>
		</View>
	);
};

export default HomeContent;
