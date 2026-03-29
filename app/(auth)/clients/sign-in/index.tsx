import SocialSignIn from "@/components/client/SocialSignIn";
import EmailSignInForm from "@/components/shared/EmailSignInForm";
import { Link } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import {
	Image,
	Keyboard,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import {
	KeyboardAwareScrollView,
	KeyboardToolbar,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const PhoneSignIn = () => {
	return (
		<SafeAreaView edges={["top", "bottom"]} className="bg-white flex-1 px-6">
			<KeyboardAwareScrollView
				bottomOffset={62}
				contentContainerStyle={{
					gap: 16,
					paddingVertical: 16,
				}}
				style={{ flex: 1, marginBottom: 62 }}
				className="flex-1"
				showsVerticalScrollIndicator={true}
			>
				<TouchableWithoutFeedback
					onPress={() => Keyboard.dismiss()}
					className="flex-1"
				>
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
								<EmailSignInForm userType="client" />
							</View>
							{/* <View className="items-center mb-3">
							<Text className="text-center text-sm text-[#99a2b3]">or</Text>
						</View>
						<View className="mb-6">
							<SocialSignIn isLogin={true} />
						</View> */}
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
				</TouchableWithoutFeedback>
			</KeyboardAwareScrollView>
			<KeyboardToolbar />
		</SafeAreaView>
	);
};

export default PhoneSignIn;
