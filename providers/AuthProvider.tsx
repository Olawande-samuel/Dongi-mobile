import React, { createContext, PropsWithChildren, useContext } from "react";

type contextStore = {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	user: any;
	setUser: (value: any) => void;
};

const Context = createContext<contextStore | null>(null);

function useAuthContext() {
	return useContext(Context);
}

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [loggedInUser, setLoggedInUser] = React.useState(null);

	function setUser(user: any) {
		setUser(user);
	}
	function setIsUserLoggedIn(val: boolean) {
		setIsLoggedIn(val);
	}

	return (
		<Context.Provider
			value={{
				isLoggedIn,
				user: loggedInUser,
				setUser: setUser,
				setIsLoggedIn: setIsUserLoggedIn,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default AuthProvider;
