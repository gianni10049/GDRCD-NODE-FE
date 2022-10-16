export interface getMarketBuyListInterface {}

export interface marketBuyListInterface {
	id: number;
}

export interface marketData {
	id: number;
	object: number;
	objectData: {
		id: number;
		name: string;
		description: string;
		img: string;
		type: number;
		typeData: {
			id: number;
			name: string;
			description: string;
			createdAt: string;
			updatedAt: string;
			deletedAt: string;
		};
		quality: number;
		qualityData: {
			id: number;
			name: string;
			description: string;
			createdAt: string;
			updatedAt: string;
			deletedAt: string;
		};
		charges: number;
		wearable: boolean;
		concealable: boolean;
		customizable: boolean;
		usable: boolean;
		cumulative: boolean;
		droppable: boolean;
		creatable: boolean;
		findable: boolean;
		transportable: boolean;
		sellable: boolean;
		marketable: boolean;
		price: number;
		createdBy: number;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
	};
	total: number;
	remained: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}
