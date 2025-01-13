import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import HistoryDetailUserCard from "@/components/client/history/HistoryDetailUserCard";

const Details = () => {
	return (
		<ScrollView
			className="flex-1 bg-white px-6 pt-[18px]"
			showsVerticalScrollIndicator={false}
		>
			<HistoryDetailUserCard />
			<View className="flex-1 mt-6 space-y-5">
				<View className="space-y-3">
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Request Type
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							Real estate survey assistance
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Date Requested
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							10 Nov. 11:30AM
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Date Completed
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							20 Nov. 11:30AM
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-support text-sm font-regular mr-4">
							Location
						</Text>
						<Text className="font-regular text-sm text-off-black text-right">
							Island Lagos, Nigeria
						</Text>
					</View>
				</View>
				<View className="h-1 w-full bg-[#FAFAFA]"></View>
				<View className="h-[186px] space-y-2">
					<Text className="text-support font-regular text-sm">Message</Text>
					<View className="flex-1">
						<Text className="text-sm font-regular text-off-black">
							Hello John, I need assistance with real estate survey, here’s is
							some info about my project
						</Text>
					</View>
				</View>
				<View className="h-[186px] space-y-2">
					<Text className="text-support font-regular text-sm">Your Review</Text>
					<View className="flex-1 justify-start">
						<TextInput
							className="flex-1 placeholder:text-muted text-top"
							placeholder="Mr John did a fantastic job ..."
							multiline
						/>
					</View>
				</View>
				<View className="h-[186px] space-y-2">
					<Text className="text-support font-regular text-sm">
						Service Provider's Review
					</Text>
					<View className="flex-1">
						<TextInput
							className="flex-1 placeholder:text-muted"
							placeholder="Working with Rebecca was ..."
							multiline
							readOnly
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default Details;
