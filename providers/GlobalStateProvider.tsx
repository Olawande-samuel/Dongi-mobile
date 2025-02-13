import AnimatedPulse from "@/components/shared/AnimatedPulse";
import React, {
	createContext,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { Image, View } from "react-native";

type context = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<context | null>(null);

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === null) {
		throw new Error(
			"useGlobalContext must be used within a GlobalStateProvider"
		);
	}
	return context;
};

const GlobalStateProvider = ({ children }: PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<GlobalContext.Provider
			value={{
				isLoading,
				setIsLoading,
			}}
		>
			<View className="relative flex-1 ">
				{children}
				{isLoading && (
					<View className="flex-1 justify-center absolute top-0 bottom-0 left-0 right-0 items-center bg-primary/70">
						<View className="h-[150px] mb-6 justify-center items-center">
							<AnimatedPulse>
								<Image
									source={require("../assets/images/icon.png")}
									width={124.97}
									height={113.97}
									resizeMode="contain"
									className="max-w-full w-[125px] h-[114px]"
								/>
							</AnimatedPulse>
						</View>
					</View>
				)}
			</View>
		</GlobalContext.Provider>
		// <View className="flex-1 relative">
		// 	View.
		// </View>
	);
};

export default GlobalStateProvider;
