import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SearchLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="category/[query]" />
			<Stack.Screen name="search-text/index" />
		</Stack>
	);
};

export default SearchLayout;
