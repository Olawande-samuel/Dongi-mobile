import AsyncStorage, {
	useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	user: { token: string } | null;
	userType: USERTYPE;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
	setUserType: (value: string, callback?: any) => Promise<void>;
	logout: VoidFunction;
	handleLoginToken: (token: string) => void;
	isAuthenticated: boolean;
	userRoute: "service" | "client" | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<{ token: string } | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [loginUserType, setLoginUserType] = useState<USERTYPE | null>(null);
	const pathname = usePathname();

	const { getItem, setItem: setUserType } = useAsyncStorage("userType");

	useEffect(() => {
		async function getUserType() {
			const userType = await getItem();
			if (userType) {
				setLoginUserType(userType as USERTYPE);
			}
		}

		getUserType();
	}, [getItem]);

	const userRoute = pathname.includes("/client")
		? "client"
		: pathname.includes("/service-provider")
		? "service"
		: null;

	const queryClient = useQueryClient();

	const checkAuthState = async () => {
		try {
			const user = await AsyncStorage.getItem("user");
			if (user) {
				const result = JSON.parse(user);
				setUser({ token: result.token });
			} else {
				setUser(null);
			}
		} catch (error) {
			console.log({ error });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// AsyncStorage.removeItem("userType");
		// Check if user is already logged in when app starts
		checkAuthState();
	}, []);

	async function handleLoginToken(token: string) {
		setUser({ token: token });
		checkAuthState();
	}

	async function logout() {
		queryClient.clear();
		await AsyncStorage.removeItem("user");
		await AsyncStorage.removeItem("userType");
		checkAuthState();
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				userRoute,
				userType: loginUserType || null,
				isLoading,
				setUser,
				setUserType,
				logout,
				handleLoginToken,
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
