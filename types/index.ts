export type UserType = "client" | "service";

export interface IService {
	created_at: string;
	description: string;
	id: number;
	image: string;
	imageUrl: string;
	name: string;
	status: string;
	updated_at: string;
	uuid: string;
}

export interface ICategoryServices {
	average_rating: number;
	category: {
		uuid: string;
		name: string;
		description: string;
		image: string;
		status: string;
	};
	created_at: string;
	description: string;
	id: number;
	images: string[];
	name: string;
	provider: {
		uuid: string;
		business_name: string;
		business_logo: string;
		latitude: string;
		longitude: string;
		firstname: string;
		lastname: string;
	};
	status: string;
	total_completed: number;
	total_ratings: number;
	total_rejected: number;
	total_requests: number;
	unique_customers: number;
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

export interface ServiceProviderPendingRequest {
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
	customer: {
		name: string;
		image: string;
		email: string;
		location: string;
	};
}
export interface ServiceProviderOngoingRequest {
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
}

export interface IServiceProviderCompletedRequest {
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
}
export interface ICompletedRequest {
	uuid: string;
	customer_id: string;
	provider_id: string;
	service_id: string;
	deadline: string;
	location: string;
	longitude: string;
	latitude: string;
	message: string;
	is_confirmed_completed: string | null;
	customer_confirmed_at: string | null;
	customer_rejected_at: string | null;
	completed_at: string | null;
	status: string;
	created_at: string;
	updated_at: string;
	provider: {
		uuid: string;
		name: string;
		business_name: string;
		image: string;
		email: string;
		location: string;
		category_of_service: string;
		brief_introduction: string;
		phone: string;
	};
	service: {
		uuid: string;
		name: string;
		description: string;
	};
	rating: {
		uuid: string;
		customer_rating: number;
		customer_message: string | null;
	};
	provider_rating_status: string;
	customer_rating_status: string;
}

// Detailed request returned by GET /requests/:id
export interface IRequestInfo {
	uuid: string;
	customer_id: string;
	provider_id: string;
	service_id: string;
	deadline: string;
	location: string;
	longitude: string;
	latitude: string;
	message: string;
	accepted_at?: string | null;
	is_confirmed_completed: string | null;
	customer_confirmed_at: string | null;
	customer_rejected_at: string | null;
	completed_at: string | null;
	status: string;
	created_at: string;
	updated_at: string;
	provider: {
		uuid: string;
		first_name: string;
		last_name: string;
		business_name: string;
		business_logo: string;
		location: string;
		category_of_service: string;
		brief_introduction: string;
		phone?: string;
	};
	service: {
		uuid: string;
		name: string;
		description: string;
		images: string[];
	};
	customer: {
		uuid: string;
		first_name: string;
		last_name: string;
		location: string;
		latitude: string;
		longitude: string;
		phone: string;
		email: string;
		image?: string;
	};
	rating: null | {
		uuid: string;
		customer_rating: number;
		customer_message: string | null;
	};
	provider_rating_status: string;
	customer_rating_status: string;
}

// Lightweight request item returned by list endpoints (pending/ongoing)
export interface IRequestListItem {
	uuid: string;
	customer_id: string;
	provider_id: string;
	service_id: string;
	deadline: string;
	location: string;
	longitude: string;
	latitude: string;
	message: string;
	accepted_at?: string | null;
	is_confirmed_completed: string | null;
	customer_confirmed_at: string | null;
	customer_rejected_at: string | null;
	completed_at: string | null;
	status: string;
	created_at: string;
	updated_at: string;
	customer: {
		name: string;
		image: string;
		location: string;
	};
	service?: {
		uuid: string;
		name: string;
		description: string;
		images: string[];
	};
}

export interface IClient {
	user: {
		id: number;
		uuid: string;
		phone: string;
		email: string;
		firstname: string;
		lastname: string;
		gender: string;
		location: string;
		latitude: string;
		longitude: string;
		password: string;
		email_verified_at: string;
		phone_verified_at: string;
		facial_verification_url: string;
		flagged: boolean;
		created_at: string;
		updated_at: string;
	};
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
		category_id?: string;
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
	created_at: string;
	description: string;
	id: number;
	images: string[];
	provider: {
		uuid: string;
		business_name: string;
		firstname: string;
		lastname: string;
		business_logo: string;
		bio: string;
	};
	category: {
		description: string;
		image: string;
		name: string;
		status: string;
		uuid: string;
	};
	name: string;
	status: string;
	total_completed: number;
	total_ratings: number;
	total_rejected: number;
	total_requests: number;
	unique_customers: number;
	updated_at: string;
	uuid: string;
}

export interface IPagination {
	totalRecords: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface IProviderServiceItem {
	id: number;
	uuid: string;
	name: string;
	description: string;
	images: string[];
	status: string;
	created_at: string;
	updated_at: string;
	total_requests: number;
	total_completed: number;
	total_rejected: number;
	unique_customers: number;
	total_ratings: number;
	average_rating: number;
	category: {
		uuid: string;
		name: string;
		description: string;
		image: string;
		status: string;
	};
}

export interface IProviderProfile {
	uuid: string;
	firstname: string;
	lastname: string;
	business_name: string | null;
	business_logo: string;
	gender: string;
	email: string;
	phone: string;
	bio: string;
	brief_introduction: string;
}

export interface IGetProviderServicesResponse {
	services: IProviderServiceItem[];
	provider: IProviderProfile;
	pagination: IPagination;
}






