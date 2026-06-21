import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const useTransactionHistory = () => {
	const { data, isLoading } = useQuery({
		queryFn: Api.fetchTransactions,
		queryKey: ["get transaction history"],
	});

	return {
		isLoading,
		data: data?.data?.data.transactions || [],
		pagination: data?.data?.data.pagination,
	};
};
export default useTransactionHistory;
