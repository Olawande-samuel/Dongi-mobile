import { View } from "react-native";
import { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
} from "react-native-reanimated";

interface AnimatedPulseProps {
	children: React.ReactNode;
}

export default function AnimatedPulse({ children }: AnimatedPulseProps) {
	const opacity = useSharedValue(0.5);

	useEffect(() => {
		opacity.value = withRepeat(
			withTiming(1, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<View>
			<Animated.View style={animatedStyle}>{children}</Animated.View>
		</View>
	);
}
