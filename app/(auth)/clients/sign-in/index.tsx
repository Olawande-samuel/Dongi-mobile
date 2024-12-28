import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneSignup from "@/components/client/PhoneSignup";
import SocialSignIn from "@/components/client/SocialSignIn";
import { Link } from "expo-router";

const PhoneSignIn = () => {
	return (
		<SafeAreaView edges={["top", "bottom"]} className="bg-white flex-1 px-6">
			<View className="flex-1 bg-white">
				<View className="h-[150px] mb-6 justify-center items-center">
					<Image
						source={require("../../../../assets/images/icon.png")}
						width={124.97}
						height={113.97}
						resizeMode="contain"
						className="max-w-full w-[125px] h-[114px]"
					/>
				</View>
				<View className="flex-1">
					<View className="mb-6">
						<PhoneSignup />
					</View>
					<View className="items-center mb-3">
						<Text className="text-center text-sm text-[#99a2b3]">or</Text>
					</View>
					<View className="mb-6">
						<SocialSignIn isLogin={true} />
					</View>
					<View>
						<Text className="text-muted text-center">
							Don't have an account?{" "}
							<Link href="/clients/sign-up">
								<Text className="text-primary">Sign up</Text>
							</Link>{" "}
							now.
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default PhoneSignIn;
