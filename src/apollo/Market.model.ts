export interface getMarketBuyListInterface {}

export interface marketBuyInterface {
	id: number;
}

export interface getMarketSellListInterface {}

export interface marketSellInterface {
	id: number;
}

export interface marketBuyData {
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

export interface marketSellData {
	id: number;
	object: number;
	objectListData: {
		id: number;
		owner_type: number;
		owner: number;
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
		quality: number;
		status: number;
		usury: number;
		alias: string;
		img: string;
		comment: string;
		comment_master: string;
		charges: number;
		worn: boolean;
		worn_part: number;
		hidden: boolean;
		expiry: string;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
	};
	price: number;
	selled_to: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}
