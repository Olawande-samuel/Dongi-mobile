type USERTYPE = "client" | "service" | null;

type PhoneRegistrationSignup = {
	address: string | null;
	business_logo: string | null;
	certificate_of_expertise_url: string | null;
	created_at: string;
	device_info: string | null;
	email: string | null;
	email_verified_at: string | null;
	face_capture_url: string | null;
	first_name: string | null;
	gender: string | null;
	id: 3;
	ip_address: string | null;
	last_name: string | null;
	means_of_identification: string | null;
	means_of_identification_url: string | null;
	onboarding_step: 1;
	password: string | null;
	phone_number: string;
	phone_verified_at: string | null;
	updated_at: string;
	user_type: string;
	uuid: string;
};

type CustomerRegistrationPayload = {
	user_id: string;
	firstname: string;
	lastname: string;
	email: string;
	gender: string;
	location: string;
};
type CreatePasswordPayload = {
	user_id: string;
	password: string;
	confirmPassword: string;
};
type ResetPasswordPayload = {
	token: string;
	new_password: string;
};
type ResendToken = {
	type: string;
	user_id: string;
	phone: string;
};
type VerifyEmail = {
	user_id: string;
	email: string;
	code: string;
};
