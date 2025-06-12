import {
	ICategoryServices,
	ICompletedRequest,
	IProviderService,
	IRequestInfo,
	IService,
	IUser,
	OngoingRequest,
} from "@/types";
import { AxiosResponse } from "axios";
import { authInstance, baseInstance } from "./axiosSetup";

class API {
	async phoneSignup(data: {
		type: USERTYPE;
		payload: { phone: string };
	}): Promise<
		AxiosResponse<{
			data: { token: string; user: PhoneRegistrationSignup };
			message: string;
		}>
	> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/register-phone`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async phoneOTPVerification(data: {
		type: USERTYPE;
		payload: { code: string; phone: string; user_id: string };
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/verify-phone`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async registerUserInfo(data: {
		type: USERTYPE;
		payload: CustomerRegistrationPayload;
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/register-user-info`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async createPassword(data: {
		type: USERTYPE;
		payload: CreatePasswordPayload;
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/create-password`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async verifyEmail(data: {
		type: USERTYPE;
		payload: VerifyEmail;
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/verify-email`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async resendToken(data: {
		type: USERTYPE;
		payload: ResendToken;
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/resend-token`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async forgotPassword(data: {
		type: USERTYPE;
		payload: { email: string };
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/forgot-password`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async resetPassword(data: {
		type: USERTYPE;
		payload: ResetPasswordPayload;
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/reset-password`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async login(data: {
		type: USERTYPE;
		payload: { email: string; password: string };
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/${
				data.type === "client" ? "customer" : "service-provider"
			}/login`;
			const response = await baseInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async uploadUserPhoto(data: FormData): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/customer/upload-facial-capture`;
			const response = await baseInstance.post(endpoint, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async registerBusinessInfo(data: FormData): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/service-provider/register-business-info`;
			const response = await baseInstance.post(endpoint, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async registerVerificationDocs(data: FormData): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/service-providers/upload-verification-docs`;
			const response = await baseInstance.post(endpoint, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getServiceCategories(): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/categories`;
			const response = await baseInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getUserProfile(
		userType: USERTYPE
	): Promise<AxiosResponse<{ data: IUser }>> {
		try {
			const endpoint = `/${
				userType === "client" ? "customer" : "service-provider"
			}/dashboard/profile`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getClientServiceCategories(): Promise<
		AxiosResponse<{
			data: {
				categories: IService[];
			};
		}>
	> {
		try {
			const endpoint = `/categories`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getCategoryServices(id: string): Promise<
		AxiosResponse<{
			data: {
				services: ICategoryServices[];
			};
		}>
	> {
		try {
			const endpoint = `/services/category/${id}`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async requestService(data: {
		id: string;
		payload: {
			deadline: string;
			location: string;
			latitude: number;
			longitude: number;
			message: string;
		};
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/requests/${data.id}`;
			const response = await authInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getPendingRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: OngoingRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/customer/pending`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getOngoingRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: OngoingRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/customer/ongoing`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getCompletedRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: ICompletedRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/customer/completed`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getRequestById(id: string): Promise<
		AxiosResponse<{
			data: IRequestInfo;
		}>
	> {
		try {
			const endpoint = `/requests/${id}`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async rateService(data: {
		id: string;
		payload: { rate: string; message: string };
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/rate/${data.id}`;
			const response = await authInstance.post(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async searchService(query: {
		query?: string;
		category?: string;
		lat?: string;
		lng?: string;
	}): Promise<
		AxiosResponse<{
			data: {
				services: ICategoryServices[];
			};
		}>
	> {
		const queryString = Object.entries(query)
			.filter(([_, value]) => value !== undefined)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");
		try {
			const endpoint = `/services/search?${queryString}`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getProviderPendingRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: OngoingRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/customer/pending`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getProviderOngoingRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: OngoingRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/ongoing`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getProviderCompletedRequests(): Promise<
		AxiosResponse<{
			data: {
				requests: ICompletedRequest[];
			};
		}>
	> {
		try {
			const endpoint = `/requests/completed`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async acceptServiceRequest(id: string): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/requests/accept/${id}`;
			const response = await authInstance.post(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async rejectServiceRequest(id: string): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/requests/decline/${id}`;
			const response = await authInstance.post(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getProvidersServices(providerId: string): Promise<
		AxiosResponse<{
			data: {
				services: IProviderService[];
			};
		}>
	> {
		try {
			const endpoint = `/services/provider/${providerId}`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getServices(): Promise<
		AxiosResponse<{
			data: {
				services: IProviderService[];
			};
		}>
	> {
		try {
			const endpoint = `/services`;
			const response = await authInstance.get(endpoint);
			console.log({ response: JSON.stringify(response, null, 2) });
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getServiceById(serviceId: string): Promise<
		AxiosResponse<{
			data: IProviderService;
		}>
	> {
		try {
			const endpoint = `/services/${serviceId}`;
			const response = await authInstance.get(endpoint);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async createNewService(data: {
		category_id: string;
		description: string;
		starting_price?: number;
		name: string;
		images: string[];
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/services`;
			const response = await authInstance.post(endpoint, data);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async editService(data: {
		serviceId: string;
		payload: {
			category_id: string;
			description: string;
			starting_price?: number;
			name: string;
			images: string[];
		};
	}): Promise<AxiosResponse<any>> {
		try {
			const endpoint = `/services/${data.serviceId}`;
			const response = await authInstance.put(endpoint, data.payload);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	
}

export const Api = new API();
