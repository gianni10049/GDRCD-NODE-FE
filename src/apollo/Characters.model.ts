import { statTableData } from './Stat.model';

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
