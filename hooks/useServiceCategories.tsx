import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useServiceCategories = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["get service categories"],
		queryFn: Api.getClientServiceCategories,
	});
	return {
		data: data?.data,
		isLoading: isLoading,
		error: error,
	};
};

export default useServiceCategories;
