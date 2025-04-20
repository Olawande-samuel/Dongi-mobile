import Links from "@/components/client/profile/Links";
import RouteHeader from "@/components/shared/RouteHeader";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const privacy = require("../../../../../assets/images/client/profile/privacy-policy.png");
const terms = require("../../../../../assets/images/client/profile/terms.png");
const Legal = () => {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["bottom", "top"]}>
			<View className="flex-1 bg-white px-4 large:px-6">
				<RouteHeader title="Legal" />
				<View className="flex-1 bg-white  pt-[18px]">
					<View>
						<View className="mb-4">
							<Links
								title="Privacy Policy"
								link="/client/profile-info/help"
								source={privacy}
							/>
						</View>
						<View className="mb-4">
							<Links
								title="Terms of use"
								link="/client/profile-info/legal"
								source={terms}
							/>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Legal;
