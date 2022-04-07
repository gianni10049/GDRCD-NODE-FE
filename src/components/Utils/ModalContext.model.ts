export interface ModalContextProviderData {
	children: any;
}

export interface ModalContextModals {
	loading: boolean;
	setModalState?: any;
	modalState?: {
		[key: string]: modalContentData;
		character_page?: modalContentData;
		character_resources?: modalContentData;
	};
}

export interface modalContentData {
	open?: boolean;
	title?: string;
	component?: any;
	options?: object;
}
