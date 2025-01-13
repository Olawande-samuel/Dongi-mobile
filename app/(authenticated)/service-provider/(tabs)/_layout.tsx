import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import Home from "@/svgs/Home";
import Search from "@/svgs/Search";
import Profile from "@/svgs/Profile";
import History from "@/svgs/History";
import Services from "@/svgs/Services";
import useUserType from "@/hooks/useUserType";

const Layout = () => {
	const { userType } = useUserType();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: userType === "client" ? "#18658B" : "#E4AE1B",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => <Home isActive={focused} />,
				}}
			/>
			<Tabs.Screen
				name="services"
				options={{
					title: "Services",
					tabBarIcon: ({ focused }) => <Services isActive={focused} />,
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
