import AsyncStorage, {
	useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import useCustomAsyncStorage from "@/hooks/useAsyncStorage";
import { useQueryClient } from "@tanstack/react-query";
import { router, useRootNavigationState, useSegments } from "expo-router";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import useUserType from "@/hooks/useUserType";

interface AuthContextType {
	user: { token: string } | null;
	userType: string | null;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
	setUserType: React.Dispatch<React.SetStateAction<string | null>>;
	logout: VoidFunction;
	handleLogin: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const { userType: OG_UserType } = useUserType();
	const [user, setUser] = useState<{ token: string } | null>(null);
	const [userType, setUserType] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { removeItem } = useAsyncStorage("user");

	const { getItem } = useCustomAsyncStorage();
	const isReturningUser = getItem("hasAccount");

	const queryClient = useQueryClient();

	const segments = useSegments();
	const navigationState = useRootNavigationState();

	const loadUserData = async () => {
		try {
			const data = await AsyncStorage.getItem("user");
			const type = await AsyncStorage.getItem("userType");
			if (data) {
				const result = JSON.parse(data);
				setUser({ token: result.token });
				setUserType(type || "client");
			} else {
				setUser({ token: "" });
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		if (!navigationState?.key || isLoading) return;

		const inAuthGroup = segments[0] === "(auth)";
		if (!user?.token) {
			// Redirect to auth if user is not logged in and trying to access protected routes
			if (!inAuthGroup) {
				if (OG_UserType === "client") {
					router.replace("/clients/sign-in");
				} else if (OG_UserType === "service") {
					router.replace("/service-provider/sign-in");
				}
			}
		} else if (user && inAuthGroup) {
			// Redirect to dashboard if user is logged in and trying to access auth routes
			if (userType === "client") {
				router.replace("/client/(tabs)");
			} else if (userType === "service") {
				router.replace("/service-provider/(tabs)");
			}
		}
	}, [segments, navigationState?.key, user, userType]);

	async function handleLogin(token: string) {
		setUser({ token: token });
		loadUserData();
	}

	async function logout() {
		queryClient.clear();
		await AsyncStorage.removeItem("user");
		loadUserData();
		console.log("calling");
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				userType,
				isLoading,
				setUser,
				setUserType,
				logout,
				handleLogin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
