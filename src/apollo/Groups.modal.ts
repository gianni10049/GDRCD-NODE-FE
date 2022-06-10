import { characterData } from './Tables.model';

export interface groupData {
	id: number;
	name: string;
	description: string;
	logo: string;
	external_url: string;
	type: number;
	visible: number;
	rolesData: [groupRolesData];
	groupTypeData: groupTypesData;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface groupMembersData {
	id: number;
	role: number;
	character: number;
	name: string;
	logo: string;
	manager: number;
	groupData: groupData;
	memberData: characterData;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface groupRolesData {
	id: number;
	group: number;
	name: string;
	earn: number;
	description: string;
	logo: string;
	visible: boolean;
	groupData: groupData;
	groupMembers: [groupMembersData];
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface groupTypesData {
	id: number;
	name: string;
	description: string;
	logo: string;
	groupData: [groupData];
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface getGroupsInput {}

export interface getGroupInput {
	id: number;
}
