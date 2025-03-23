import {
	CameraType,
	Camera,
	CameraView,
	useCameraPermissions,
	CameraCapturedPicture,
} from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Pressable, Text, View } from "react-native";
import { Canvas, Group, Oval, Rect } from "@shopify/react-native-skia";
import { toast } from "sonner-native";
import { cn, handleError } from "@/utils";
import {
	ImageManipulator,
	SaveFormat,
	manipulateAsync,
	useImageManipulator,
} from "expo-image-manipulator";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { router } from "expo-router";
// import * as ImageManipulator from "expo-image-manipulator";

const { width, height } = Dimensions.get("window");

const FacialVerificationForm = () => {
	const [facing] = useState<CameraType>("front");
	const [permission, requestPermission] = useCameraPermissions();
	const faceWidth = width * 0.8;
	const faceHeight = height * 0.4;
	const [userPhoto, setUserPhoto] = useState<string | undefined>("");
	const [userFile, setUserFile] = useState<any | null>(null);
	const [phone, setPhone] = useState({ phone: "", userId: "" });

	const cameraRef = useRef<CameraView>(null);

	const centerX = width * 0.5 - faceWidth * 0.5;

	const globalContext = useGlobalContext();
	const { getItem, setItem } = useAsyncStorage();

	const { setIsLoading } = globalContext;

	useEffect(() => {
		(async () => {
			const val = await getItem("tempUser");
			if (val) {
				setPhone(JSON.parse(val));
			}
		})();
	}, []);

	const { mutate } = useMutation({
		mutationFn: Api.uploadUserPhoto,
		onMutate: () => setIsLoading(true),
		onSettled: () => {
			setIsLoading(false);
		},
	});

	if (!permission) {
		return <View />;
	}
	if (!permission.granted) {
		return (
			<View className="flex-1 ">
				<Text className="text-center text-primary">
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	async function takePhoto() {
		if (cameraRef.current) {
			try {
				const photo = await cameraRef.current.takePictureAsync({
					quality: 1,
				});
				console.log({ photo });
				if (photo) {
					const actualX = centerX - centerX / 2;
					const croppedPhoto = await ImageManipulator.manipulate(photo.uri)
						.crop({
							originX: width * 0.9,
							originY: 4, // Match the Oval's y position
							width: faceWidth * 4, // Match the Oval's width
							height: faceHeight * 4,
						})
						.resize({
							width: faceWidth, // Match the Oval's width
							height: faceHeight,
						})
						.renderAsync();

					// const format = useImageManipulator(croppedPhoto);
					const result = await croppedPhoto.saveAsync({
						format: SaveFormat.JPEG,
						compress: 0.8,
						base64: true,
					});

					const fileObject = {
						uri: result.uri,
						type: "image/jpeg",
						name: Date.now(),
						lastModified: Date.now(),
					};

					console.log("File created:", fileObject);
					setUserPhoto(result.uri);
					setUserFile(fileObject);
				}
			} catch (error) {
				console.log(error);
				toast.error("An error occurred while taking your picture");
			}
		}
	}

	function uploadUserPhoto() {
		if (userPhoto) {
			const payload = {
				user_id: phone.userId,
				avatar: userPhoto,
			};
			if (userFile) {
				const formdata = new FormData();
				formdata.append("user_id", phone.userId);
				formdata.append("avatar", userFile, userFile.name);

				mutate(formdata, {
					onSuccess: (res) => {
						toast.success(res.data.message);
						setItem("hasAccount", JSON.stringify(true));
						router.push("/clients/sign-in/email");
					},
					onError: (err) => {
						handleError(err);
					},
				});
			}
		}
	}

	return (
		<View className="flex-1 relative">
			<View className="flex-1 ">
				{userPhoto ? (
					<View>
						<Image
							source={{ uri: userPhoto }}
							style={{ height: 300, width: "100%" }}
							resizeMode="contain"
						/>
					</View>
				) : (
					<CameraView facing={facing} className="flex-1" ref={cameraRef}>
						<Canvas
							style={{
								position: "absolute",
								width,
								height,
								top: 0,
								zIndex: 100,
								borderWidth: 1,
								borderColor: "red",
							}}
						>
							<Rect x={0} y={0} width={width} height={height} color="white" />
							<Group blendMode="clear">
								<Oval
									x={centerX}
									y={4}
									width={faceWidth}
									height={faceHeight}
									transform={[{ translateX: -(centerX / 2) }]}
									color="white"
								/>
							</Group>
							<Group>
								<Oval
									x={centerX}
									y={4}
									width={faceWidth}
									height={faceHeight}
									transform={[{ translateX: -(centerX / 2) }]}
									style="stroke"
									strokeWidth={2}
									color="#18658B"
								/>
							</Group>
						</Canvas>
					</CameraView>
				)}
			</View>
			<View className="absolute bottom-8 w-full ">
				{!userPhoto && (
					<Text className="text-center text-sm font-normal text-support px-4 mb-6">
						Kindly confirm if your head is in within the bounds of the border
					</Text>
				)}
				{!userPhoto ? (
					<Pressable
						onPress={takePhoto}
						className="rounded px-1 py-[10px] mt-auto justify-center items-center bg-[#1FB4FF1A] mb-2"
					>
						<Text className="text-primary">Capture</Text>
					</Pressable>
				) : (
					<Pressable
						onPress={() => setUserPhoto("")}
						className="rounded px-1 py-[10px] mt-auto justify-center items-center bg-[#1FB4FF1A] mb-2"
					>
						<Text className="text-primary">Re Take</Text>
					</Pressable>
				)}
				<Pressable
					disabled={!userPhoto}
					onPress={uploadUserPhoto}
					className={cn(
						"rounded px-1 py-[10px] mt-auto justify-center items-center bg-inactive mb-2",
						userPhoto && "bg-primary"
					)}
				>
					<Text className="text-white">Continue</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default FacialVerificationForm;
