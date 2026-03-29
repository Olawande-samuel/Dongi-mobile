import useDistance from "@/hooks/useDistance";
import useServiceProviderUserInfo from "@/hooks/useServiceProviderUserInfo";
import { ICategoryServices, IRequestInfo } from "@/types";
import { maskEmail } from "@/utils";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props extends IRequestInfo {
	activeTab: number;
}

const PendingRequestCard = ({
	message,
	customer,
	created_at,
	uuid,
	activeTab,
}: Props) => {
	const { data } = useServiceProviderUserInfo();

	console.log({ customer });

	const { distance } = useDistance({
		origin: data?.user?.location as string,
		destination: customer.location,
	});

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname:
						activeTab === 1
							? "/(authenticated)/service-provider/requests/view/[requestId]"
							: "/(authenticated)/service-provider/requests/new/[requestId]",
					params: {
						requestId: uuid,
					},
				})
			}
		>
			<View className="p-3 rounded-lg border border-outer-light mb-5">
				<View className="flex-row items-start justify-between mb-[10px]">
					<View className="flex-row items-center flex-1 min-w-0 pr-2">
						<Image
							className="h-9 w-9 large:h-[42px] large:w-[42px] rounded-full"
							source={require("../../../assets/images/client/temp_user_sq.png")}
							resizeMode="cover"
						/>
						<View className="ml-2 gap-y-1 flex-1 min-w-0">
							<Text
								className="text-sm large:text-base font-regular text-off-black"
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{customer.name || ""}
							</Text>
							<Text
								className="text-[10px] large:text-xs font-regular text-support"
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{maskEmail(customer.email)}
							</Text>
						</View>
					</View>
					<View className="flex-1 min-w-0 gap-y-1 items-end">
						<View className="flex-row items-center justify-end">
							<Image
								source={require("../../../assets/images/location.png")}
								width={18}
								height={18}
								resizeMode="contain"
								className="w-4 h-4 large:w-[18px] large:h-[18px] mr-[6px]"
							/>
							<Text
								className="font-regular text-xs large:text-sm text-off-black"
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{distance ? `${distance} away` : ""}
							</Text>
						</View>
						<Text
							className="text-xs text-end font-regular text-primaryII"
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{moment(created_at).format("DD MMM • hh:mmA")}
						</Text>
					</View>
				</View>
				<View className="border border-inner-light p-2 rounded ">
					<Text
						className="text-sm large:text-base font-regular text-off-black"
						numberOfLines={3}
					>
						{message}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default PendingRequestCard;
