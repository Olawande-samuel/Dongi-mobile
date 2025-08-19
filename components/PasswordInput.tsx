import { cn } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { View, Text, TextInputProps } from "react-native";

const PasswordInput = (props: TextInputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className="relative">
			<TextInput
				{...props}
				className={cn(
					"p-2 text-sm large:text-base text-black font-regular rounded border border-inner-light",
					props.className
				)}
				secureTextEntry={!showPassword}
				textContentType="password"
			/>
			<View className="absolute top-4 right-2 ">
				{showPassword ? (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Feather name="eye-off" size={18} color="#000" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Feather name="eye" size={18} color="#000" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};
export default PasswordInput;
