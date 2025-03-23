import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Oval, Group } from "@shopify/react-native-skia";
import { Camera, CameraView } from "expo-camera";
import { Button } from "react-native";

const { width, height } = Dimensions.get("window");

const TestFaceDetection = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);

	async function requestPermission() {
		console.log("clicked");
		const { status } = await Camera.getCameraPermissionsAsync();
		setHasPermission(status === "granted");
	}

	const faceWidth = width * 0.7;
	const faceHeight = height * 0.5;

	if (!hasPermission) {
		return (
			<View className="flex-1 border justify-center items-center">
				<View>
					<Text className="text-center text-green-500 mb-4">
						We need your permission to show your camera
					</Text>
					<Pressable
						onPress={requestPermission}
						className="rounded px-1 py-[10px] mt-auto justify-center items-center bg-primary"
					>
						<Text className="text-white text-base font-regular">
							Grant Permission
						</Text>
					</Pressable>
				</View>
			</View>
		);
	}
	return (
		<View className="flex-1 relative">
			<CameraView className="flex-1" facing="front">
				<Canvas style={{ position: "absolute", width, height }}>
					<Group
						blendMode="clear"
						transform={[
							{ translateX: (width - faceWidth) / 2 },
							{ translateY: (height - faceHeight) / 2 },
						]}
					>
						<Oval width={faceWidth} height={faceHeight} />
					</Group>
				</Canvas>
			</CameraView>
		</View>
	);
};

export default TestFaceDetection;
