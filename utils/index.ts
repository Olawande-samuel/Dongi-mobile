import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { AxiosError } from "axios";
import { toast } from "sonner-native";
import moment from "moment";

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

export const formatCurrency = (amount: number | string) => {
	const numericAmount =
		typeof amount === "string" ? parseFloat(amount) : amount;

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(numericAmount);
};

export interface IDatesOptions {
	date?: string | null;
	date_paid?: string | null;
	due_date?: string | null;
	paid_date?: string | null;
	created_at?: string | null;
}
export function groupByDate<T extends IDatesOptions>(
	data: Array<T>
): { title: string; data: T[] }[] {
	if (!data) {
		return [];
	}
	const extractDate = (item: T): string => {
		if (item.date) return item.date;
		if (item.date_paid) return item.date_paid;
		if (item.paid_date) return item.paid_date;
		if (item.due_date) return item.due_date;
		if (item.created_at) return item.created_at;
		return "";
	};
	const groupedData: { [date: string]: T[] } = {};
	data.forEach((item) => {
		const date = moment(extractDate(item)).format("YYYY-MM-DD");
		if (date !== "Invalid date") {
			if (!groupedData[date]) {
				groupedData[date] = [];
			}
			groupedData[date].push(item);
		} else {
			if (!groupedData["Data"]) {
				groupedData["Data"] = [];
			}
			groupedData["Data"].push(item);
		}
	});

	// Sort items within each group by date in descending order
	Object.keys(groupedData).forEach((date) => {
		groupedData[date].sort((a, b) => {
			const dateA = moment(extractDate(a));
			const dateB = moment(extractDate(b));
			return dateB.valueOf() - dateA.valueOf();
		});
	});

	const result = Object.keys(groupedData)
		.sort((a, b) => moment(b).valueOf() - moment(a).valueOf())
		.map((date) => ({
			title: date,
			data: groupedData[date],
		}));

	return result;
}
