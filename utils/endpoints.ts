import { AxiosError, AxiosResponse } from "axios";
import { baseInstance } from "./axiosSetup";

class API {
	async phoneSignup(data: {
		type: "client" | "service";
		payload: { phone: string };
	}): Promise<
		AxiosResponse<{ data: { token: PhoneRegistrationSignup }; message: string }>
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
		type: "client" | "service";
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
}

export const Api = new API();
