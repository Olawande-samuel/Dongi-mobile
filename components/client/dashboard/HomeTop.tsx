import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import HomeUserInfo from "./HomeUserInfo";

const HomeTop = () => {
	return (
		<View className="py-6">
			<HomeUserInfo />
            <SearchBar />
		</View>
	);
};

export default HomeTop;
