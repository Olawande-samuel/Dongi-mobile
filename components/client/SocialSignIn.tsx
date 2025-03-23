import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import useUserType from "@/hooks/useUserType";

const SocialSignIn = ({ isLogin = false }: { isLogin: boolean }) => {
	const { userType } = useUserType();
	return (
		<View className="space-y-2">
			<Pressable className="mb-2 flex-row items-center bg-[#1FB4FF1A] rounded px-1 py-[10px] justify-center">
				<Image
					source={require("../../assets/images/apple.png")}
					className="w-6 h-6 mr-3 "
				/>
				<Text className="text-primary text-base">
					{isLogin ? "Sign in" : "Sign up"} with Apple
				</Text>
			</Pressable>
			<Pressable className="mb-2 flex-row items-center bg-[#1FB4FF1A] rounded px-1 py-[10px] justify-center">
				<Image
					source={require("../../assets/images/google.png")}
					className="w-6 h-6 mr-3 "
				/>
				<Text className="text-primary text-base">
					{isLogin ? "Sign in" : "Sign up"} with Google
				</Text>
			</Pressable>
			{/* <Link
				asChild
				href={
					isLogin
						? userType === "client"
							? `/(auth)/clients/sign-in/email`
							: `/(auth)/service-provider/sign-in/email`
						: userType === "client"
						? "/(auth)/clients/sign-up/email"
						: "/(auth)/service-provider/sign-up/email"
				}
			>
				<Pressable className="mb-2 flex-row items-center bg-[#1FB4FF1A] rounded px-1 py-[10px] justify-center">
					<Image
						source={require("../../assets/images/email.png")}
						className="w-6 h-6 mr-3 "
					/>
					<Text className="text-primary text-base">
						{isLogin ? "Sign in" : "Sign up"} with Email
					</Text>
				</Pressable>
			</Link> */}
		</View>
	);
};

export default SocialSignIn;
