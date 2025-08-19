import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";
import React from "react";

const SearchLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="category/[query]"
				options={{
					headerTitle: "History",
					headerLeft: () => <BackButton />,
					headerShadowVisible: false,
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen name="search-text/index" />
		</Stack>
	);
};

export default SearchLayout;
