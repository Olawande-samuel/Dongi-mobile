export type UserType = "client" | "service";

export interface IService {
	created_at: string;
	description: string;
	id: number;
	image: string;
	name: string;
	status: string;
	updated_at: string;
	uuid: string;
}

export interface ICategoryServices {
	category_id: string;
	created_at: string;
	description: string;
	id: number;
	images: string[];
	name: string;
	provider: { name: string; image: string };
	provider_id: string;
	starting_price: string;
	status: string;
	updated_at: string;
	uuid: string;
}

export interface OngoingRequest {
	created_at: string;
	customer_id: string;
	deadline: string;
	id: number;
	latitude: string;
	location: string;
	longitude: string;
	message: string;
	provider: {
		name: string;
		image: string;
		email: string;
		location: string;
	};
	provider_id: string;
	service_id: string;
	status: string;
	updated_at: string;
	uuid: string;
}

export interface ICompletedRequest {
	id: number;
	uuid: string;
	provider_id: string;
	customer_id: string;
	service_id: string;
	location: string;
	latitude: string;
	longitude: string;
	deadline: string;
	message: string;
	status: string;
	created_at: string;
	updated_at: string;
	rating: {
		total_rating: number;
		average_rating: number;
	};
	provider: {
		name: string;
		image: string;
		email: string;
		location: string;
	};
}

export interface IRequestInfo {
	created_at: string;
	customer_id: string;
	deadline: string;
	id: 11;
	latitude: string;
	location: string;
	longitude: string;
	message: string;
	provider_id: string;
	service_id: string;
	status: string;
	updated_at: string;
	uuid: string;
}

export interface IUser {
	user: {
		id: number;
		uuid: string;
		phone: string;
		email: string;
		firstname: string;
		lastname: string;
		gender: string;
		location: string;
		latitude: number;
		longitude: number;
		email_verified_at: string;
		phone_verified_at: string;
		category_of_service: string;
		business_name?: string | null;
		certificate?: string | null;
		business_logo?: string | null;
		brief_introduction?: string | null;
		bio?: string | null;
		identification_type?: string | null;
		identification_doc_url?: string | null;
		certificate_of_expertise_url?: string | null;
		flagged?: boolean;
		created_at: string;
		updated_at: string;
	};
	rating?: {
		total_rating: number;
		average_rating: number;
	};
	wallet?: {
		account_number: string;
		balance: number;
		bank_name: string;
	};
	jobs_completed?: number;
}

export interface IServiceListItem {
	id: number;
	uuid: string;
	provider_id: string;
	category_id: string;
	name: string;
	description: string;
	images: string[];
	status: string;
	created_at: string;
	updated_at: string;
}

export interface IProviderService {
	category_id: string;
	created_at: string;
	description: string;
	id: number;
	images: string[];
	name: string;
	provider: { name: string; image: string };
	provider_id: string;
	starting_price: string;
	status: string;
	updated_at: string;
	uuid: string;
}
