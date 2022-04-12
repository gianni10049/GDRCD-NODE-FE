export interface loginDataInterface {
	username: string;
	password: string;
}

export interface registrationDataInterface {
	username: string;
	email: string;
	password: string;
	password_confirm: string;
}
export interface recPassDataInterface {
	email: string;
}

export interface fieldData {
	name: string;
	type?: string | 'text' | 'password';
	placeholder: string;
}
