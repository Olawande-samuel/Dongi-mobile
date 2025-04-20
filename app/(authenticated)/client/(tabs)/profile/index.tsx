import DeleteAccount from "@/components/client/profile/DeleteAccount";
import DeleteAccountModal from "@/components/client/profile/DeleteAccountModal";
import Links from "@/components/client/profile/Links";
import SignOut from "@/components/client/profile/SignOut";
import SignOutConfirmModal from "@/components/client/profile/SignOutConfirmModal";
import useUserInfo from "@/hooks/useUserInfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = require("../../../../../assets/images/client/profile/profile.png");
const security = require("../../../../../assets/images/client/profile/security.png");
const becoming = require("../../../../../assets/images/client/profile/becoming.png");
const help = require("../../../../../assets/images/client/profile/help.png");
const legal = require("../../../../../assets/images/client/profile/legal.png");

const Profile = () => {
	const bottomSheetModalSignOutRef = useRef<BottomSheetModal>(null);
	const bottomSheetModalDeleteAccountRef = useRef<BottomSheetModal>(null);

	const { data, isLoading } = useUserInfo();

	const handleSignoutModalPress = useCallback(() => {
		bottomSheetModalSignOutRef.current?.present();
	}, []);
	const handleDeleteAccountModalPress = useCallback(() => {
		bottomSheetModalDeleteAccountRef.current?.present();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1 bg-white border-t border-outer-light pt-[18px] px-6"
			>
				<View className="flex-row gap-x-3 mb-[36px]">
					<View className="w-[60px] h-[60px] rounded-full bg-primary">
						<Text className="uppercase text-[42px] font-bold text-white text-center ">
							R
						</Text>
					</View>
					<View>
						<Text className="text-base font-semibold text-off-black mb-2">
							{`${data?.firstname || ""} ${data?.lastname || ""}`}
						</Text>
						<Text className="text-base text-support font-normal font-regular">
							{data?.email ||""}
						</Text>
					</View>
				</View>
				<View className="space-y-9">
					<View className="space-y-4">
						<View>
							<Links
								title="Profile"
								link="/client/profile-info"
								source={profile}
							/>
						</View>
						<View>
							<Links
								title="Security"
								link="/client/profile-info/security"
								source={security}
							/>
						</View>
					</View>
					<View>
						<View className="">
							<Links
								title="Become a service provider"
								link="/client/profile/becoming"
								source={becoming}
							/>
						</View>
					</View>
					<View>
						<View className="mb-4">
							<Links
								title="Help"
								link="/client/profile-info/help"
								source={help}
							/>
						</View>
						<View className="mb-4">
							<Links
								title="Legal"
								link="/client/profile-info/legal"
								source={legal}
							/>
						</View>
					</View>
					<View className="space-y-4">
						<View className="">
							<SignOut showPrompt={handleSignoutModalPress} />
						</View>
						<View className="">
							<DeleteAccount showPrompt={handleDeleteAccountModalPress} />
						</View>
					</View>
				</View>
				<SignOutConfirmModal compRef={bottomSheetModalSignOutRef} />
				<DeleteAccountModal compRef={bottomSheetModalDeleteAccountRef} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
