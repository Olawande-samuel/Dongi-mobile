import { View, Text, ScrollView, Image } from "react-native";
import React, { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Links from "@/components/client/profile/Links";
import SignOut from "@/components/client/profile/SignOut";
import DeleteAccount from "@/components/client/profile/DeleteAccount";
import SignOutConfirmModal from "@/components/client/profile/SignOutConfirmModal";
import DeleteAccountModal from "@/components/client/profile/DeleteAccountModal";

const profile = require("../../../../../assets/images/client/profile/profile.png");
const security = require("../../../../../assets/images/client/profile/security.png");
const finance = require("../../../../../assets/images/client/profile/finance.png");
const help = require("../../../../../assets/images/client/profile/help.png");
const legal = require("../../../../../assets/images/client/profile/legal.png");

const Profile = () => {
	const bottomSheetModalSignOutRef = useRef<BottomSheetModal>(null);
	const bottomSheetModalDeleteAccountRef = useRef<BottomSheetModal>(null);

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
				<View className="flex-row items-center gap-x-3 mb-[36px]">
					<View className="w-[60px] h-[60px] rounded-full">
						<Image
							className="h-[60px] w-[60px] rounded-full"
							source={require("../../../../../assets/images/client/temp_user_sq.png")}
							resizeMode="contain"
						/>
					</View>
					<View>
						<Text className="text-base font-semibold text-off-black mb-2">
							John Anyaoku
						</Text>
						<Text className="text-base text-support font-normal font-regular">
							Rebeccaanyaoku@gmail.com
						</Text>
					</View>
				</View>
				<View className="space-y-9">
					<View>
						<View className="">
							<Links
								title="Finance"
								link="/service-provider/profile/finance"
								source={finance}
							/>
						</View>
					</View>
					<View className="space-y-4">
						<View>
							<Links
								title="Profile"
								link="/service-provider/profile/info"
								source={profile}
							/>
						</View>
						<View>
							<Links
								title="Security"
								link="/service-provider/profile/security"
								source={security}
							/>
						</View>
					</View>

					<View>
						<View className="mb-4">
							<Links
								title="Help"
								link="/service-provider/profile/help"
								source={help}
							/>
						</View>
						<View className="mb-4">
							<Links
								title="Legal"
								link="/service-provider/profile/legal"
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
