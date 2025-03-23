import { Api } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useUserType from "./useUserType";

const useUserInfo = () => {
	const { userType } = useUserType();
	const { data, isLoading, error } = useQuery({
		queryKey: ["get user info"],
		queryFn: () => Api.getUserProfile(userType),
	});
	return {
		data: data?.data,
		isLoading: isLoading,
		error: error,
	};
};

export default useUserInfo;
