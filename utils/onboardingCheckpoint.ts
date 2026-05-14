import AsyncStorage from "@react-native-async-storage/async-storage";

const CHECKPOINT_KEY = "onboardingCheckpoint";

export interface OnboardingCheckpoint {
	userType: "client" | "service";
	phase: "phone-verification" | "email";
	step?: number;
}

export async function saveOnboardingCheckpoint(
	checkpoint: OnboardingCheckpoint,
): Promise<void> {
	await AsyncStorage.setItem(CHECKPOINT_KEY, JSON.stringify(checkpoint));
}

export async function getOnboardingCheckpoint(): Promise<OnboardingCheckpoint | null> {
	try {
		const val = await AsyncStorage.getItem(CHECKPOINT_KEY);
		return val ? (JSON.parse(val) as OnboardingCheckpoint) : null;
	} catch {
		return null;
	}
}

export async function clearOnboardingCheckpoint(): Promise<void> {
	await AsyncStorage.removeItem(CHECKPOINT_KEY);
}
