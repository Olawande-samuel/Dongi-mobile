import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["get user info"],
		queryFn: () => Api.getUserProfile(),
	});

	return {
		data: data?.data?.data || null,
		isLoading: isLoading,
		error: error,
	};
};

export default useUserInfo;
