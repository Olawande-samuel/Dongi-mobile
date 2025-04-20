import useUserType from "@/hooks/useUserType";
import History from "@/svgs/History";
import Home from "@/svgs/Home";
import Profile from "@/svgs/Profile";
import Services from "@/svgs/Services";
import { Tabs } from "expo-router";

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
