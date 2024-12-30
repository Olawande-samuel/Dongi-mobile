import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import Home from "@/svgs/Home";
import Search from "@/svgs/Search";
import Profile from "@/svgs/Profile";
import History from "@/svgs/History";

const Layout = () => {
	return (
		<Tabs
			screenOptions={{ headerShown: false, tabBarActiveTintColor: "#18658B" }}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => <Home isActive={focused} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ focused }) => <Search isActive={focused} />,
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "History",
					tabBarIcon: ({ focused }) => <History isActive={focused} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => <Profile isActive={focused} />,
				}}
			/>
		</Tabs>
	);
};

export default Layout;
