import { AxiosError, AxiosResponse } from "axios";
import { baseInstance } from "./axiosSetup";

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
}

export const Api = new API();
