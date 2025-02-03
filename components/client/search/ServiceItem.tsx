import { View, Text } from "react-native";
import React from "react";
import ServiceCard from "../dashboard/ServiceCard";

const ServiceItem = () => {
	return (
		<View className="px-3 mb-6">
			<ServiceCard />
		</View>
	);
};

export default ServiceItem;
