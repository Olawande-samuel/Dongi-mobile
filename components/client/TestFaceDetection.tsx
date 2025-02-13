import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Oval, Group } from "@shopify/react-native-skia";
import { Camera, CameraView } from "expo-camera";
import { Button } from "react-native";

const { width, height } = Dimensions.get("window");

const TestFaceDetection = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);

	async function requestPermission() {
		const { status } = await Camera.getCameraPermissionsAsync();
		setHasPermission(status === "granted");
	}

	const faceWidth = width * 0.7;
	const faceHeight = height * 0.5;

	if (!hasPermission) {
		return (
			<View className="flex-1">
				<Text className="text-center text-red-500">
					We need your permission to show your camera
				</Text>
				<Button onPress={requestPermission} title="Grant Permission" />
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
