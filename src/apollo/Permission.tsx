import { gql } from '@apollo/client';
import { GQLQuery } from './GQL';
import {
	isMineCharacterQueryInput,
	permissionControlQueryInput,
} from './Permission.model';

const PERMISSION_CONTROL = gql`
	query permissionControl($token: String!, $permission: String!) {
		permissionControl(token: $token, permission: $permission) {
			response
			responseStatus
		}
	}
`;

const IS_MINE_CHARACTER = gql`
	query isMineCharacter($token: String!, $characterId: ID!) {
		isMineCharacter(token: $token, characterId: $characterId) {
			response
			responseStatus
		}
	}
`;

export const permissionControlQuery = async (
	data: permissionControlQueryInput
) => {
	return await GQLQuery(PERMISSION_CONTROL, data);
};

export const isMineCharacterQuery = async (data: isMineCharacterQueryInput) => {
	return await GQLQuery(IS_MINE_CHARACTER, data);
};

export { PERMISSION_CONTROL, IS_MINE_CHARACTER };
