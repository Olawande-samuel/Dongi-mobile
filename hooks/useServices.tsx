import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useServices = () => {
	const { data: services, isLoading } = useQuery({
		queryKey: ["get all services"],
		queryFn: Api.getServices,
	});

	const result = services?.data?.data?.services;
	return {
		result,
		isLoading,
	};
};
export default useServices;
