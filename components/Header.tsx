import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

function Header({ title }: { title: string }) {
	const router = useRouter();
	return (
		<View className="flex-row justify-between py-[10px] mb-[23.5px] bg-white">
			<Pressable
				onPress={() => {
					router.back();
				}}
			>
				<Ionicons name="arrow-back" size={24} color="#1A1B23" />
			</Pressable>
			<Text className="text-base text-off-black">{title}</Text>
			<View></View>
		</View>
	);
}
export default Header;
