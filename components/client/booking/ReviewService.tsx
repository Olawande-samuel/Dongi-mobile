import { View, Text, Pressable, TextInput } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import StyledButton from "@/components/StyledButton";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/utils/endpoints";
import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";

const FormSchema = z.object({
	rate: z.string(),
	message: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

function ReviewService({
	compRef,
	showCompletionModal,
	bookingId,
}: {
	compRef: React.RefObject<BottomSheetModal>;
	showCompletionModal: VoidFunction;
	bookingId: string;
}) {
	const { dismissAll } = useBottomSheetModal();
	const snapPoints = useMemo(() => ["50%"], []);

	const globalContext = useGlobalContext();

	const { setIsLoading } = globalContext;

	const handleClosePress = useCallback(() => {
		dismissAll();
	}, [dismissAll]);

	const form = useForm<FormType>({
		defaultValues: {
			rate: "",
			message: "",
		},
		resolver: zodResolver(FormSchema),
	});

	const { mutate } = useMutation({
		mutationFn: Api.rateService,
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
	});

	function handleSubmit(val: FormType) {
		mutate(
			{ id: bookingId, payload: val },
			{
				onSuccess: (res) => {
					toast.success(res?.data?.message || "Rating submitted successfully");
					dismissAll();
					showCompletionModal();
				},
			}
		);
	}

	return (
		<BottomSheetModal
			ref={compRef}
			index={0}
			snapPoints={snapPoints}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					opacity={0.2}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
		>
			<BottomSheetScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1 rounded-t-xl"
			>
				<View className="flex-1 px-6">
					<View className=" flex-row mb-[18px] pb-2 border-b border-outer-light justify-between items-center">
						<View />
						<View>
							<Text className="text-center text-base text-off-black font-regular">
								Review
							</Text>
						</View>
						<Pressable onPress={handleClosePress}>
							<Ionicons name="close-circle-outline" color="#676B83" size={24} />
						</Pressable>
					</View>
					<View>
						<Controller
							control={form.control}
							name="rate"
							render={({ field }) => (
								<View className="mb-5">
									<Text className="text-center text-base font-regular mb-2">
										Rate your experience with John Musa
									</Text>
									<View className="flex-row justify-center gap-x-1">
										<AirbnbRating
											onFinishRating={field.onChange}
											showRating={false}
											defaultRating={0}
										/>
									</View>
									{form.formState.errors?.rate && (
										<Text className="text-xs text-red-400">
											{form.formState.errors?.rate.message ?? ""}
										</Text>
									)}
								</View>
							)}
						/>
						<Controller
							control={form.control}
							name="message"
							render={({ field }) => (
								<View className="space-y-5 px-6 mb-[25px]">
									<Text className="text-sm text-off-black font-regular mb-[6px]">
										Write a review
									</Text>
									<View className="flex-row border p-2 border-inner-background-light h-[158px]">
										<TextInput
											placeholder="Mr John did a fantastic job ..."
											className="flex-1 text-muted placeholder:text-muted text-base"
											multiline
											textAlignVertical="top"
											value={field.value}
											onChangeText={field.onChange}
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
				</View>
				<View className="mt-auto px-6 mb-2">
					<StyledButton
						title="Send"
						onPress={form.handleSubmit(handleSubmit)}
					/>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}

export default ReviewService;
