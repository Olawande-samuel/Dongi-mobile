import { View, Text, TextInput } from "react-native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Search() {
	return (
		<Svg width={18} height={18} viewBox="0 0 25 24" fill="none">
			<Path
				d="M11.875 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
				stroke="#1A1B23"
				strokeWidth={1.5}
			/>
			<Path
				d="M20.375 20l2 2"
				stroke="#1A1B23"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</Svg>
	);
}
const SearchBar = () => {
	return (
		<View>
			<View className="border flex-row items-center justify-between border-muted rounded-lg  px-3 py-[2px]">
				<TextInput className="flex-1 py-2" placeholder="I am looking for..." />
				<Search />
			</View>
		</View>
	);
};

export default SearchBar;
