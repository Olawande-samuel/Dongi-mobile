import { View, Text, Image, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneSignup from "@/components/client/PhoneSignup";
import { Link } from "expo-router";
import SocialSignIn from "@/components/client/SocialSignIn";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const SignUp = () => {
	return (
		<SafeAreaView edges={["top"]} className="bg-white flex-1 px-6 pb-4">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{
					flex: 1,
					backgroundColor: "#FFF",
					paddingHorizontal: 16,
					paddingVertical: 16,
				}}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="flex-1 border border-red-400 bg-white">
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
								<SocialSignIn isLogin={false} />
							</View>
							<View>
								<Text className="text-muted text-center">
									Already have an account?{" "}
									<Link href="/clients/sign-in">
										<Text className="text-primary">Sign in</Text>
									</Link>{" "}
									now.
								</Text>
							</View>
						</View>
						<View className="mt-auto">
							<Text className="text-sm text-center text-support">
								By creating a new account, you agree to Dongi's{" "}
								<Link href="/">
									<Text className="underline">Terms & Conditions </Text>
								</Link>
								and
								<Link href="/">
									<Text className="underline"> Privacy Policy</Text>
								</Link>
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUp;
