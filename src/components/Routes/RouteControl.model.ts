export interface ProvideAuthData {
	children?: any;
	character_needed: boolean;
	account_needed: boolean;
}

export interface tokenControlData {
	character_needed: boolean;
	account_needed: boolean;
}

export interface RouteControlData {
	children: any;
	data: {
		nav: boolean;
	};
}

export interface AuthDataResponse {
	auth: any;
	inProgress: boolean;
}
