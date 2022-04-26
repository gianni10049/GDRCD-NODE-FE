import {
	characterAbilityTableData,
	characterStatTableData,
} from './Characters.model';

export interface abilityTableData {
	id: number;
	name: string;
	description: {
		it: string;
		eng: string;
	};
	icon: string;
	stat: number;
	max_level: number;
	castable: boolean;
	visible: boolean;
	characterAbilityData: characterAbilityTableData[];
	statData: statTableData;
	abilityToDetailData: abilityDetailsTableData[];
	createdBy: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface abilityDetailsTableData {
	id: number;
	ability: number;
	level: number;
	description: {
		it: string;
		eng: string;
	};
	price: number;
	bonus: number;
	createdBy: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface statTableData {
	id: number;
	name: string;
	description: {
		it: string;
		eng: string;
	};
	characterStatData: characterStatTableData[];
	max_level: number;
	min_level: number;
	registration: boolean;
	usable: boolean;
	upgradable: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}
