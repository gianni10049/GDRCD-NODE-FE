export interface ModalContextProviderData {
	children: any;
}

export interface ModalContextModals {
	loading: boolean;
	setModalState: any;
	modalState: {
		character_page?: modalContentData;
		character_resources?: modalContentData;
	};
}

export interface modalContentData {
	open?: boolean;
	options?: {
		character?: number;
	};
}
