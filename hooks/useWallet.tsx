import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useWallet = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["get wallet balance"],
		queryFn: Api.fetchWallet,
	});
	return {
		data: data?.data?.data?.wallet,
		isLoading,
	};
};
export default useWallet;
