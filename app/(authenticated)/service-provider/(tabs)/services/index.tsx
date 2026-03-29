import EmptyServices from "@/components/provider/Dashboard/EmptyServices";
import ServiceComponent from "@/components/provider/Dashboard/ServiceItem";
import RouteHeader from "@/components/shared/RouteHeader";
import useServices from "@/hooks/useServices";
import EmptyList from "@/svgs/EmptyList";
import { SIZES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
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

const Services = () => {
	const { isLoading, result } = useServices();

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top"]}>
			<View className="flex-1 bg-white px-4 large:px-6  ">
				<RouteHeader title="Services" />
				{isLoading && <ActivityIndicator />}
				{!result || (result && result?.length === 0) ? (
					<View className="flex-1 bg-white py-[18px] rounded-[9px]">
						<EmptyServices />
					</View>
				) : (
					<ScrollView
						className="flex-1 bg-white py-[18px]"
						showsVerticalScrollIndicator={false}
					>
						<View className="mb-4 flex-1 p-2 bg-inner-light rounded-[9px]">
							<View className="gap-y-2">
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
									className="flex-row mt-2 justify-center items-center py-1 large:py-2 w-full gap-x-[10px] bg-service-primary rounded"
								>
									<Text className="text-white text-sm large:text-base text-center font-regular">
										Add a new service
									</Text>
									<Ionicons name="add" color="white" size={SIZES ? 24 : 16} />
								</Pressable>
							)}
							<View className="flex-row justify-center items-center gap-x-1 py-3 mt-2 ">
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
