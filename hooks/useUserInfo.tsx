import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import useUserType from "./useUserType";

const useUserInfo = () => {
	const { userType } = useUserType();

	const { data, isLoading, error } = useQuery({
		queryKey: ["get user info", userType],
		queryFn: () => Api.getUserProfile(userType),
		enabled: !!userType,
	});

	return {
		data: data?.data?.data || null,
		isLoading: isLoading,
		error: error,
	};
};

export default useUserInfo;
