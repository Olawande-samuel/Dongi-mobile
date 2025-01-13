import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import ServiceComponent from "@/components/provider/Dashboard/ServiceItem";
import EmptyList from "@/svgs/EmptyList";
import StyledButton from "@/components/StyledButton";
import { Ionicons } from "@expo/vector-icons";

function EmptyComponent() {
	return (
		<View className="flex-1 justify-center items-center space-y-2 bg-light px-2">
			<View className=" justify-center items-center py-3">
				<EmptyList />
				<Text className="text-center text-sm font-regular text-service-primary max-w-[250px]">
					You do not have any service available, kindly create a service
				</Text>
			</View>
			<Pressable className="flex-row justify-center items-center py-2 w-full space-x-[10px] bg-service-primary rounded">
				<Text className="text-white text-base text-center font-regular">
					Add a new service
				</Text>
				<Ionicons name="add" color="white" size={24} />
			</Pressable>
			<View className="flex-row justify-center items-center py-3 mt-2 ">
				<Text className="font-sm text-muted font-regular text-center">0/3</Text>
				<Text className="font-sm text-muted font-regular text-center">
					services
				</Text>
			</View>
		</View>
	);
}

const Services = () => {
	const isEmpty = false;
	if (isEmpty) {
		return (
			<View className="flex-1 px-6 bg-white py-[18px] rounded-[9px]">
				<EmptyComponent />;
			</View>
		);
	}
	return (
		<ScrollView
			className="flex-1 bg-white px-6 py-[18px]"
			showsVerticalScrollIndicator={false}
		>
			<View className="mb-4 flex-1 p-2 bg-inner-light rounded-[9px]">
				<View className="space-y-2">
					{[...Array(3)].map((_, i) => (
						<View key={i}>
							<ServiceComponent />
						</View>
					))}
				</View>
				<View className="flex-row justify-center items-center py-3 mt-2 ">
					<Text className="font-sm text-muted font-regular text-center">
						3/3
					</Text>
					<Text className="font-sm text-muted font-regular text-center">
						Services
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default Services;
