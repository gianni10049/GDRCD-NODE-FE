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

export interface accountTableData {
	id: number;
	username: string;
	email: string;
	password: string;
	active: boolean;
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

export interface characterPointsTableData {
	id: number;
	character: number;
	life: number;
	stamina: number;
	exp_total: number;
	exp_usable: number;
	resources: number;
	weight: number;
	stat_points: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface characterDamageTableData {
	id: number;
	character: number;
	part: number;
	points: number;
	description: string;
	title: string;
	solved: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface characterPercentagesData {
	life_calc?: singlePercentageData;
	stamina_calc?: singlePercentageData;
	furtivity_calc?: singlePercentageData;
	find_calc?: singlePercentageData;
	investigate_calc?: singlePercentageData;
	initiative_calc?: singlePercentageData;
	price_calc?: singlePercentageData;
	research_calc?: singlePercentageData;
}

export interface characterData {
	id: number;
	account: number;
	name: string;
	nickname: string;
	surname: string;
	fullname: string;
	age: number;
	mini_avatar: string;
	profilePic: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

interface singlePercentageData {
	total: number;
	max_value: number;
}
