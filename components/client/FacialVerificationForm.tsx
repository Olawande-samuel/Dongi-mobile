import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "nativewind";
import {
	Camera,
	CameraType,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Svg, { Path } from "react-native-svg";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const FacialVerificationForm = () => {
	const [facing, setFacing] = useState<CameraType>("front");
	const [permission, requestPermission] = useCameraPermissions();

	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [faceDetected, setFaceDetected] = useState(false);
	const cameraRef = useRef(null);

	
	function handleFacesDetected({ faces }: { faces: any[] }) {
		if (faces.length > 0) {
			const face = faces[0];
			const { bounds } = face;
			const { origin, size } = bounds;

			if (
				origin.x > 50 &&
				origin.y > 100 &&
				origin.x + size.width < 300 &&
				origin.y + size.height < 400
			) {
				setFaceDetected(true);
			} else {
				setFaceDetected(false);
			}
		} else {
			setFaceDetected(false);
		}
	}

	if (!permission) {
		return <StyledView />;
	}
	if (!permission.granted) {
		return (
			<StyledView>
				<StyledText className="text-center text-red-500">
					We need your permission to show the camera
				</StyledText>
				<Button onPress={requestPermission} title="grant permission" />
			</StyledView>
		);
	}

	return (
		<StyledView className="flex-1">
			<CameraView facing={facing} className="flex-1" ref={cameraRef}>
				<StyledView className="absolute inset-0 justify-center items-center">
					<Svg height="100%" width="100%" viewBox="0 0 350 500">
						<Path
							d="M175 100 C 100 100 50 175 50 250 C 50 325 100 400 175 400 C 250 400 300 325 300 250 C 300 175 250 100 175 100"
							fill="none"
							stroke={faceDetected ? "#22c55e" : "white"}
							strokeWidth="3"
						/>
					</Svg>
					<StyledText
						className={`absolute bottom-5 left-5 right-5 text-center text-lg font-bold ${
							faceDetected ? "text-green-500" : "text-white"
						}`}
					>
						{faceDetected
							? "Face Detected"
							: "Position your face within the outline"}
					</StyledText>
				</StyledView>
			</CameraView>
			<StyledTouchableOpacity
				className={`absolute bottom-8 self-center p-4 rounded-lg ${
					faceDetected ? "bg-green-500" : "bg-green-300"
				}`}
				// onPress={capturePhoto}
				// disabled={!faceDetected}
			>
				<StyledText className="text-white text-lg font-bold">
					Capture
				</StyledText>
			</StyledTouchableOpacity>
		</StyledView>
	);
};

export default FacialVerificationForm;
