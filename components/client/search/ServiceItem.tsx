import { ICategoryServices } from "@/types";
import React from "react";
import { View } from "react-native";
import ServiceCard from "../dashboard/ServiceCard";

const ServiceItem = (props: ICategoryServices) => {
	return (
		<View className="px-3 mb-6">
			<ServiceCard {...props} />
		</View>
	);
};

export default ServiceItem;
