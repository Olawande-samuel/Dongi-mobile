import { View, Text, TouchableOpacity, Button, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "nativewind";
import {
	Camera,
	CameraType,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Svg, { Defs, Mask, Path, Rect } from "react-native-svg";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SvgHeadMask = () => {
	return (
		<Svg height="100%" width="100%">
			<Defs>
				<Mask id="mask" x="0" y="0" height="100%" width="100%">
					<Rect height="100%" width="100%" fill="#fff" />
					<Path
						d="M50 20 
               Q60 20 65 25 
               Q75 35 75 50 
               Q75 65 65 75 
               Q60 80 50 80 
               Q40 80 35 75 
               Q25 65 25 50 
               Q25 35 35 25 
               Q40 20 50 20 Z"
						fill="black"
						scale="0.8"
						x="10%"
						y="10%"
					/>
				</Mask>
			</Defs>
			<Rect
				height="100%"
				width="100%"
				fill="rgba(0, 0, 0, 0.8)"
				mask="url(#mask)"
				fillOpacity="0"
			/>
		</Svg>
	);
};

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
		<StyledView className="flex-1 relative">
			<StyledView className="flex-1 border border-red-400 relative">
				{/* <Image
					source={require("../../assets/images/client/face-impose.png")}
					className="w-4/5 h-4/5 border border-red-400 "
					resizeMode="contain"
				/> */}
				{/* <StyledText
					className={`absolute bottom-5 left-5 right-5 text-center text-lg font-bold ${
						faceDetected ? "text-green-500" : "text-white"
					}`}
				>
					{faceDetected
						? "Face Detected"
						: "Position your face within the outline"}
				</StyledText> */}
				<CameraView facing={facing} className="flex-1 border border-green-500" ref={cameraRef}>
					<SvgHeadMask />
				</CameraView>
			</StyledView>
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
