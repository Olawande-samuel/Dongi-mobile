import { IProviderService } from "@/types";
import { cn } from "@/utils";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

function ServiceComponent({
	category_id,
	created_at,
	description,
	name,
	uuid,
	images,
}: IProviderService) {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 gap-y-2">
			<View
				className=""
				style={{
					flexDirection: images.length > 1 ? "row" : "column",
				}}
			>
				{!images ? (
					<Image
						source={require("../../../assets/images/client/preview_1.png")}
						className="w-full h-24 large:h-[120px] rounded"
						resizeMode="cover"
					/>
				) : images?.length > 1 ? (
					images.map((item, index) => (
						<Image
							key={index}
							source={{ uri: item }}
							className={cn("h-24 large:h-[120px] rounded")}
							style={{
								width: `${100 / images.length}%`,
							}}
							resizeMode="cover"
						/>
					))
				) : (
					<Image
						source={{ uri: images[0] }}
						className="w-full h-24 large:h-[120px] rounded"
						resizeMode="cover"
					/>
				)}
			</View>
			<View>
				<Text className="text-sm large:text-base font-regular text-off-black">
					{name || ""}
				</Text>
				<Text
					className="text-support text-xs large:text-sm font-regular"
					numberOfLines={3}
				>
					{description || ""}
				</Text>
			</View>
			<Pressable
				onPress={() =>
					router.push({
						pathname: "/service-provider/services/edit/[serviceId]",
						params: {
							serviceId: uuid,
						},
					})
				}
				className="p-1 bg-[#F7EFDE] rounded justify-center items-center"
			>
				<Text className="text-center text-service-primary text-xs large:text-sm font-regular">
					Edit Service
				</Text>
			</Pressable>
		</View>
	);
}
export default ServiceComponent;
