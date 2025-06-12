import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useServiceProviderUserInfo = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["get provider user info"],
		queryFn: () => Api.getProviderUserProfile(),
	});

	return {
		data: data?.data?.data || null,
		isLoading: isLoading,
		error: error,
	};
};

export default useServiceProviderUserInfo;
