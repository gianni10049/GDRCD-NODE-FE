import { characterAbilityTableData } from './Characters.model';

export interface abilityTableData {
	id: number;
	name: string;
	description: string;
	icon: string;
	stat: number;
	max_level: number;
	castable: boolean;
	visible: boolean;
	characterAbilityData: characterAbilityTableData[];
	statData: statTableData;
	createdBy: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface abilityDetailsTableData {
	id: number;
	ability: number;
	level: number;
	description: string;
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
	description: string;
	max_level: number;
	min_level: number;
	registration: boolean;
	usable: boolean;
	upgradable: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}
