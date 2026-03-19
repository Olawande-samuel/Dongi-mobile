import { UserType } from "@/types";
import AsyncStorage, {
	useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	user: { token: string } | null;
	userType: UserType | null;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
	logout: VoidFunction;
	handleLogin: (token: string, type: UserType) => Promise<void>;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<{ token: string } | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userType, setUserType] = useState<UserType | null>(null);

	const { getItem: getUserType, setItem: storeUserType } =
		useAsyncStorage("userType");

	useEffect(() => {
		async function loadUserType() {
			const storedType = await getUserType();
			if (storedType) {
				setUserType(storedType as UserType);
			}
		}
		loadUserType();
	}, [getUserType]);

	const queryClient = useQueryClient();

	const checkAuthState = async () => {
		try {
			const storedUser = await AsyncStorage.getItem("user");
			if (storedUser) {
				const result = JSON.parse(storedUser);
				setUser({ token: result.token });
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Error checking auth state:", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuthState();
	}, []);

	async function handleLogin(token: string, type: UserType) {
		await AsyncStorage.setItem("user", JSON.stringify({ token }));
		await storeUserType(type);
		setUser({ token });
		setUserType(type);
	}

	async function logout() {
		queryClient.clear();
		await AsyncStorage.removeItem("user");
		await AsyncStorage.removeItem("userType");
		setUser(null);
		setUserType(null);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				userType,
				isLoading,
				setUser,
				logout,
				handleLogin,
				isAuthenticated: !!user,
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
