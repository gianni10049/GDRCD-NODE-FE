import { abilityTableData, statTableData } from './Tables.model';

export interface characterTableData {
	id?: number;
	name?: string;
	nickname?: string;
	surname?: string;
	age?: number;
	mini_avatar?: string;
	profilePic?: string;
	active?: boolean;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string | null;
}

export interface characterStatTableData {
	id: number;
	character: number;
	stat: number;
	value: number;
	characterData: characterTableData;
	statData: statTableData;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface characterAbilityTableData {
	id: number;
	character: number;
	ability: number;
	value: number;
	characterData: characterTableData;
	abilityData: abilityTableData;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface getCharacterPointsInput {
	characterId: number;
}

export interface characterListByAccount {}

export interface setCharacterInput {
	characterId: number;
}

export interface getCharacterDataInput {
	characterId: number;
}

export interface getCharacterStatsInput {
	characterId: number;
}

export interface getCharacterAbiInput {
	characterId: number;
}

export interface getCharacterPointsInput {
	characterId: number;
}

export interface getCharacterPercentagesInput {
	characterId: number;
}
