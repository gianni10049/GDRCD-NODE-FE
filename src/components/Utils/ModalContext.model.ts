import { routeData } from '../../routes/routes.model';

export interface ModalContextProviderData {
	children: any;
	routeData: routeData;
}

export interface ModalContextModals {
	[key: string]: any;
	loading: boolean;
	setModalState?: any;
	modalState?: modalList;
}

export interface modalList {
	[key: string]: any;
	character_page?: modalContentData;
	character_resources?: modalContentData;
}

export interface modalContentData {
	[key: string]: any;
	open?: boolean;
	title?: string;
	component?: any;
	options?: object;
}
