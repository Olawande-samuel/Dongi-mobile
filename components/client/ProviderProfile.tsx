import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
	business_logo: string;
	first_name: string;
	last_name: string;
	business_name: string;
	brief_introduction: string;
	service_name: string;
}

const ProviderProfile = ({
	business_logo,
	first_name,
	last_name,
	business_name,
	brief_introduction,
	service_name,
}: Props) => {
	return (
		<View className="flex-row mb-5">
			<View className="mr-4">
				<Image
					source={{
						uri:
							business_logo ||
							`https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
					}}
					className="w-[100px] h-[100px] rounded-full"
					width={100}
					height={100}
				/>
			</View>
			<View className="flex-1 py-[6px] gap-y-2">
				<Text className="text-base font-semibold text-off-black">
					{business_name || `${first_name} ${last_name}`}
				</Text>
				<Text className="text-sm font-regular text-support" numberOfLines={3}>
					{brief_introduction || ""}
				</Text>
				<View className="flex-row items-center gap-x-1">
					<Ionicons name="construct-outline" size={14} color="#6B7280" />
					<Text className="text-xs text-muted">{service_name}</Text>
				</View>
			</View>
		</View>
	);
};

export default ProviderProfile;
