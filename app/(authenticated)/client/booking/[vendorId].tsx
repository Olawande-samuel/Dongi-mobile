import VendorProfile from "@/components/client/VendorProfile";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useUserInfo from "@/hooks/useUserInfo";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { ICategoryServices } from "@/types";
import { handleError } from "@/utils";
import { Api } from "@/utils/endpoints";
import { Ionicons } from "@expo/vector-icons";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { z } from "zod";

interface ISearchParams {
	vendorId: string;
	serviceId?: string;
	categoryId: string;
}

interface ServiceProps extends ICategoryServices {
	handlePresentModalPress: VoidFunction;
}

function ServiceComponent({
	provider,
	name,
	images,
	starting_price,
	description,
	handlePresentModalPress,
}: ServiceProps) {
	return (
		<View className="bg-white rounded-lg border-outer-light p-3 space-y-2">
			<View>
				<Image
					source={require("../../../../assets/images/client/preview_1.png")}
					className="w-full h-[120px] rounded"
					resizeMode="cover"
				/>
			</View>
			<View>
				<Text className="text-base font-regular text-off-black">
					{name || ""}
				</Text>
				<Text className="text-support text-sm font-regular">
					{description || ""}
				</Text>
			</View>
			<Pressable onPress={handlePresentModalPress}>
				<Text className="text-center text-primary text-sm font-regular">
					Request
				</Text>
			</Pressable>
		</View>
	);
}
const VendorBooking = () => {
	const params = useLocalSearchParams() as unknown as ISearchParams;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const { data, isLoading } = useQuery({
		queryKey: ["get service items", params.categoryId],
		queryFn: () => Api.getCategoryServices(params.categoryId as string),
	});

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const serviceInfo = data?.data?.data?.services.find(
		(item) => item.uuid === params.serviceId
	);
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<GestureHandlerRootView className="flex-1 bg-white">
				<BottomSheetModalProvider>
					<ScrollView
						className="bg-white flex-1 pt-[18px] border-t border-outer-light px-6"
						showsVerticalScrollIndicator={false}
					>
						<View className="flex-1 bg-white ">
							{serviceInfo && <VendorProfile {...serviceInfo} />}
							<Pressable
								onPress={handlePresentModalPress}
								className="mb-6 py-3 px-1 bg-off-black rounded"
							>
								<Text className="text-base font-regular text-center text-white">
									Request a custom service
								</Text>
							</Pressable>
							<View className="flex-1 mb-6">
								<Text className="text-center text-sm text-off-black font-regular mb-3">
									Services
								</Text>
								<View className="bg-inner-background-light flex-1 p-2 rounded-lg">
									{
										serviceInfo && (
											// {/* {[...Array(3)].map((item) => ( */}
											<ServiceComponent
												handlePresentModalPress={handlePresentModalPress}
												{...serviceInfo}
											/>
										)
										// {/* ))} */}
									}
								</View>
							</View>
							<View className="mb-6">
								<Text className="text-center text-sm text-off-black font-regular mb-3">
									Bio
								</Text>
								<Text className="text-sm text-support leading-[22.4px] font-regular">
									Navigating the real estate market can be overwhelming—but it
									doesn’t have to be. As an experienced real estate consultant,
									I specialize in helping clients buy and sell property with
									confidence. I provide personalized advice, market analysis,
									and negotiation strategies to ensure you get the best deal
									possible.
								</Text>
							</View>
							<Pressable
								onPress={handlePresentModalPress}
								className="border-[0.5px] border-primary px-1 py-3 rounded mb-6"
							>
								<Text className="text-center text-primary text-base ">
									Need a custom service?
								</Text>
							</Pressable>
						</View>
						<RequestService
							serviceId={serviceInfo?.uuid || ""}
							compRef={bottomSheetModalRef}
						/>
					</ScrollView>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

const FormSchema = z.object({
	deadline: z.string(),
	location: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	message: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

function RequestService({
	compRef,
	serviceId,
}: {
	serviceId: string;
	compRef: React.RefObject<BottomSheetModal>;
}) {
	const { dismiss } = useBottomSheetModal();
	const { data, isLoading } = useUserInfo();
	const { address, updateLocation, location } = useCurrentLocation();
	const { setIsLoading } = useGlobalContext();

	const form = useForm({
		defaultValues: {
			deadline: "",
			location: data?.location || "",
			latitude: location?.coords.latitude || 0,
			longitude: location?.coords.longitude || 0,
			message: "",
		},
		resolver: zodResolver(FormSchema),
	});

	useEffect(() => {
		if (data?.location) {
			form.setValue("location", data.location);
		}
	}, [data]);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleClosePress = useCallback(() => {
		dismiss();
	}, [dismiss]);

	const snapPoints = useMemo(() => ["35%", "45%", "75"], []);

	const { mutate } = useMutation({
		mutationFn: Api.requestService,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function requestService(val: FormType) {
		mutate(
			{ id: serviceId, payload: val },
			{
				onSuccess: (res) => {
					toast.success(res.data.message);
					router.push("/clients/(tabs)");
				},
				onError: (err) => {
					handleError(err);
				},
			}
		);
	}

	return (
		<BottomSheetModal
			snapPoints={snapPoints}
			ref={compRef}
			index={0}
			onChange={handleSheetChanges}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					opacity={0.2}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
		>
			<BottomSheetView className="flex-1 rounded-t-xl">
				<View className="px-6 flex-row mb-[18px] pb-2 border-b border-outer-light justify-between items-center">
					<View />
					<View>
						<Text className="text-center text-base text-off-black font-regular">
							Send Request
						</Text>
						{/* <Text className="text-center text-muted text-sm font-regular ">
							Custom Request
						</Text> */}
					</View>
					<Pressable onPress={handleClosePress}>
						<Ionicons name="close-circle-outline" color="#676B83" size={24} />
					</Pressable>
				</View>
				<View className="space-y-5 px-6 mb-[149px]">
					<TouchableOpacity
						onPress={() => router.push("/client/change-location")}
					>
						<Text className="text-sm text-off-black font-regular mb-[6px]">
							Where are you located?
						</Text>
						<View className="flex-row items-center border p-2 border-inner-background-light">
							<Image
								source={require("../../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-[18px] h-[18px] mr-[6px]"
							/>
							<Text className="flex-1 text-base">{data?.location || ""}</Text>
							{/* <TextInput
								placeholder="Island Lagos, Nigeria"
								className="flex-1 text-base"
							/> */}
						</View>
					</TouchableOpacity>
					<Controller
						control={form.control}
						name="deadline"
						render={({ field }) => (
							<View>
								<Text className="text-sm text-off-black font-regular mb-[6px]">
									How soon do you need this?
								</Text>
								<View className="flex-row border p-2 border-inner-background-light">
									<TextInput
										placeholder="In 3 days"
										className="flex-1 text-base text-muted placeholder:text-muted"
										onChangeText={field.onChange}
										value={field.value}
									/>
								</View>
								{form.formState.errors?.deadline && (
									<Text className="text-xs text-red-400">
										{form.formState.errors?.deadline.message ?? ""}
									</Text>
								)}
							</View>
						)}
					/>

					<Controller
						control={form.control}
						name="message"
						render={({ field }) => (
							<View>
								<Text className="text-sm text-off-black font-regular mb-[6px]">
									Message
								</Text>
								<View className="flex-row border p-2 border-inner-background-light h-[158px]">
									<TextInput
										placeholder="I want to fix ..."
										className="flex-1 text-muted placeholder:text-muted text-base"
										multiline
										textAlignVertical="top"
										onChangeText={field.onChange}
										value={field.value}
									/>
								</View>
								{form.formState.errors?.message && (
									<Text className="text-xs text-red-400">
										{form.formState.errors?.message.message ?? ""}
									</Text>
								)}
							</View>
						)}
					/>
				</View>
				<View className="mt-auto px-6 mb-2">
					<Pressable
						onPress={form.handleSubmit(requestService)}
						className="bg-primary py-[10px] px-1 rounded"
					>
						<Text className="text-center text-white text-base font-regular">
							Send
						</Text>
					</Pressable>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
}
export default VendorBooking;
