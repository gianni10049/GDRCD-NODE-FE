export interface ModalContextProviderData {
	children: any;
}

export interface ModalContextModals {
	loading: boolean;
	setModalState: any;
	modalState: {
		test: boolean;
		test2: boolean;
	};
}
