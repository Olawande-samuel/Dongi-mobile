import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import RouteHeader from "@/components/shared/RouteHeader";

const Index = () => {
	return (
		<SafeAreaView className="flex-1 bg-white " edges={["top"]}>
			<View className="flex-1 px-4 large:px-6">
				<RouteHeader title="Profile" />
				<View className="flex-1 bg-white  pt-[18px]">
					<View className="flex-row items-center gap-x-6 mb-5">
						<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
							Profile Picture
						</Text>
						<View className="w-14 large:w-[60px] h-14 large:h-[60px] items-center justify-center rounded-full bg-primary">
							<Text className="uppercase text-[36px] large:text-[42px] font-bold text-white text-center ">
								R
							</Text>
						</View>
					</View>
					<View className="space-y-5">
						<View className="flex-row items-center gap-x-6">
							<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
								Full Name
							</Text>
							<View className="flex-row items-center gap-2 flex-1 justify-between">
								<Text
									className="text-xs large:text-sm text-off-black font-regular"
									numberOfLines={1}
								>
									Rebecca Anyaoku
								</Text>
								<View>
									<Image
										source={require("../../../../assets/images/client/edit.png")}
										className="w-4 h-4 large:w-6 large:h-6"
									/>
								</View>
							</View>
						</View>
						<View className="flex-row items-center gap-x-6">
							<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
								Email address
							</Text>
							<View className="flex-row items-center gap-2 flex-1 justify-between">
								<Text
									className="text-xs large:text-sm text-off-black font-regular"
									numberOfLines={1}
								>
									Rebecca@gmail.com
								</Text>
								<Link href="/service-provider/profile/change-email">
									<Image
										source={require("../../../../assets/images/client/edit.png")}
										className="w-4 h-4 large:w-6 large:h-6"
									/>
								</Link>
							</View>
						</View>
						<View className="flex-row items-center gap-x-6">
							<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
								Phone Number
							</Text>
							<View className="flex-row items-center gap-2 flex-1 justify-between">
								<Text
									className="text-xs large:text-sm text-off-black font-regular"
									numberOfLines={1}
								>
									123312121
								</Text>
								<View>
									<Image
										source={require("../../../../assets/images/client/edit.png")}
										className="w-4 h-4 large:w-6 large:h-6"
									/>
								</View>
							</View>
						</View>
						<View className="flex-row items-center gap-x-6">
							<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
								Gender
							</Text>
							<View className="flex-row items-center gap-2 flex-1 justify-between">
								<Text className="text-xs large:text-sm text-off-black font-regular">
									Female
								</Text>
								<View>
									<Image
										source={require("../../../../assets/images/client/edit.png")}
										className="w-4 h-4 large:w-6 large:h-6"
									/>
								</View>
							</View>
						</View>
						<View className="flex-row items-center gap-x-6">
							<Text className="text-muted font-regular text-xs large:text-sm w-[110px]">
								ID Verification
							</Text>
							<View className="flex-row items-center gap-2 flex-1 justify-between">
								<Text className="text-xs large:text-sm text-off-black font-regular">
									NIN
								</Text>
								<View>
									{/* <Image
										source={require("../../../../assets/images/client/edit.png")}
										className="w-4 h-4 large:w-6 large:h-6"
									/> */}
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Index;
