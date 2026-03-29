import EmptyList from "@/svgs/EmptyList";
import { SIZES } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

function EmptyServices() {
	return (
		<View className="flex-1 justify-center items-center gap-y-2 bg-light px-2">
			<View className=" justify-center items-center py-3">
				<EmptyList />
				<Text className="text-center text-xs large:text-sm font-regular text-service-primary max-w-[250px]">
					You do not have any service available, kindly create a service
				</Text>
			</View>
			<Pressable
				onPress={() => router.push("/service-provider/services/add-new")}
				className="flex-row mt-2 justify-center items-center py-1 large:py-2 w-full gap-x-[10px] bg-service-primary rounded"
			>
				<Text className="text-white text-sm large:text-base text-center font-regular">
					Add a new service
				</Text>
				<Ionicons name="add" color="white" size={SIZES ? 24 : 16} />
			</Pressable>
			<View className="flex-row justify-center items-center gap-x-1 py-3 mt-2 ">
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
export default EmptyServices;
