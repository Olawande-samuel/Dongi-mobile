import BackButton from "@/components/BackButton";
import ServiceComponent from "@/components/provider/Dashboard/ServiceItem";
import RouteHeader from "@/components/shared/RouteHeader";
import EmptyList from "@/svgs/EmptyList";
import { SIZES } from "@/utils/constants";
import { Api } from "@/utils/endpoints";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function EmptyComponent() {
	return (
		<View className="flex-1 justify-center items-center space-y-2 bg-light px-2">
			<View className=" justify-center items-center py-3">
				<EmptyList />
				<Text className="text-center text-xs large:text-sm font-regular text-service-primary max-w-[250px]">
					You do not have any service available, kindly create a service
				</Text>
			</View>
			<Pressable
				onPress={() => router.push("/service-provider/services/add-new")}
				className="flex-row mt-2 justify-center items-center py-1 large:py-2 w-full space-x-[10px] bg-service-primary rounded"
			>
				<Text className="text-white text-sm large:text-base text-center font-regular">
					Add a new service
				</Text>
				<Ionicons name="add" color="white" size={SIZES ? 24 : 16} />
			</Pressable>
			<View className="flex-row justify-center items-center space-x-1 py-3 mt-2 ">
				<Text className="text-xs large:text-sm text-muted font-regular text-center">
					0/3
				</Text>
				<Text className="text-xs large:text-sm text-muted font-regular text-center">
					services
				</Text>
			</View>
		</View>
	);
}

const Services = () => {
	const { data: services, isLoading } = useQuery({
		queryKey: ["get all services"],
		queryFn: Api.getServices,
	});

	const result = services?.data?.data?.services;

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white px-4 large:px-6  ">
				<RouteHeader title="Services" />
				{isLoading && <ActivityIndicator />}
				{!result || (result && result?.length === 0) ? (
					<View className="flex-1 bg-white py-[18px] rounded-[9px]">
						<EmptyComponent />
					</View>
				) : (
					<ScrollView
						className="flex-1 bg-white py-[18px]"
						showsVerticalScrollIndicator={false}
					>
						<View className="mb-4 flex-1 p-2 bg-inner-light rounded-[9px]">
							<View className="space-y-2">
								{result?.map((service, i) => (
									<View key={i}>
										<ServiceComponent {...service} />
									</View>
								))}
							</View>

							{result && result?.length > 0 && result.length < 3 && (
								<Pressable
									onPress={() =>
										router.push("/service-provider/services/add-new")
									}
									className="flex-row mt-2 justify-center items-center py-1 large:py-2 w-full space-x-[10px] bg-service-primary rounded"
								>
									<Text className="text-white text-sm large:text-base text-center font-regular">
										Add a new service
									</Text>
									<Ionicons name="add" color="white" size={SIZES ? 24 : 16} />
								</Pressable>
							)}
							<View className="flex-row justify-center items-center space-x-1 py-3 mt-2 ">
								<Text className="text-sm text-muted font-regular text-center">
									{result?.length || 0}/3
								</Text>
								<Text className="text-sm text-muted font-regular text-center">
									Services
								</Text>
							</View>
						</View>
					</ScrollView>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Services;
