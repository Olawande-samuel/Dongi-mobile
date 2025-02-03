import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { AxiosError } from "axios";
import { toast } from "sonner-native";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}

export const handleError = (err: any) => {
	if (err?.isAxiosError) {
		const axiosError = err as AxiosError<{ message: string }>;
		console.error(err.response);
		const errorMessage =
			axiosError.response?.data?.message || axiosError.message;
		toast.error(errorMessage);
	} else {
		const error = err as Error;
		toast.error(error.message);
	}
};
