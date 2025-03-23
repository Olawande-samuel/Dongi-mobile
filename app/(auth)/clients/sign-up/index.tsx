import PhoneSignup from "@/components/client/PhoneSignup";
import SocialSignIn from "@/components/client/SocialSignIn";
import { Link } from "expo-router";
import React from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
	return (
		<SafeAreaView edges={["top"]} className="bg-white flex-1 px-4 pb-4">
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{
					flex: 1,
				}}
			>
				{/* <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}> */}
				<ScrollView
					className="flex-1 bg-white"
					showsVerticalScrollIndicator={false}
				>
					<View className="h-[150px] mb-6 justify-center items-center">
						<Image
							source={require("../../../../assets/images/icon.png")}
							width={124.97}
							height={113.97}
							resizeMode="contain"
							className="max-w-full w-[125px] h-[114px]"
						/>
					</View>

					<View className="flex-1 mb-6">
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
				</ScrollView>
				{/* </TouchableWithoutFeedback> */}
			</KeyboardAvoidingView>
			<View className="">
				<Text className="text-sm text-center text-support">
					By creating a new account, you agree to Dongi's{" "}
					<Link href="/">
						<Text className="underline text-sm">Terms & Conditions </Text>
					</Link>
					and
					<Link href="/">
						<Text className="underline text-sm"> Privacy Policy</Text>
					</Link>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;
