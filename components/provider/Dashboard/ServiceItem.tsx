import { Image, Pressable, Text, View } from "react-native";

function ServiceComponent() {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 space-y-2">
			<View>
				<Image
					source={require("../../../assets/images/client/preview_1.png")}
					className="w-full h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-base font-regular text-off-black">
					Real estate survey assistance
				</Text>
				<Text className="text-support text-sm font-regular">
					Buy or survey a property in Nigeria, obtain survey papers and
					engineering consultation.
				</Text>
			</View>
			<Pressable className="p-1 bg-[#F7EFDE] rounded justify-center items-center">
				<Text className="text-center text-service-primary text-sm font-regular">
					Edit Service
				</Text>
			</Pressable>
		</View>
	);
}
export default ServiceComponent;
