type PhoneRegistrationSignup = {
	code: string;
	created_at: string;
	expired_at: string;
	id: number;
	key: string;
	status: string;
	type: string;
	updated_at: string;
	user_id: string;
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
	newPassword: string;
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
