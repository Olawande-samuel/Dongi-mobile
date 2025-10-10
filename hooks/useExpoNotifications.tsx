import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { Api } from "@/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const useExpoNotifications = () => {
	const globalContext = useGlobalContext();

	const { setIsLoading } = globalContext;
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldPlaySound: true,
			shouldSetBadge: true,
			shouldShowBanner: true,
			shouldShowList: true,
			shouldShowAlert: true,
		}),
	});

	function handleRegistrationError(errorMessage: string) {
		alert(errorMessage);
		throw new Error(errorMessage);
	}

	const { mutate } = useMutation({
		mutationFn: Api.saveExpoNotificationToken,
		mutationKey: ["save expo notification"],
		onMutate: () => setIsLoading(true),
		onError: () => setIsLoading(false),
		onSettled: () => setIsLoading(false),
	});

	async function registerForPushNotificationsAsync() {
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
				sound: "dongi.wav",
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				handleRegistrationError(
					"Permission not granted to get push token for push notification!"
				);
				return;
			}
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({ projectId })
			).data;

			if (!projectId) {
				handleRegistrationError("Project ID not found");
			}
			try {
				const pushTokenString = (
					await Notifications.getExpoPushTokenAsync({
						projectId,
					})
				).data;

				return pushTokenString;
			} catch (e: unknown) {
				handleRegistrationError(`${e}`);
			}
		} else {
			handleRegistrationError(
				"Must use physical device for push notifications"
			);
		}
	}

	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => {
				setExpoPushToken(token ?? "");
				if (token) {
					mutate({ expo_token: token });
				}
			})
			.catch((error: any) => setExpoPushToken(`${error}`));

		const notificationListener = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		const responseListener =
			Notifications.addNotificationResponseReceivedListener((response) => {});

		return () => {
			notificationListener.remove();
			responseListener.remove();
		};
	}, []);

	console.log("received notification: ", notification);
	return { expoPushToken };
};
export default useExpoNotifications;
