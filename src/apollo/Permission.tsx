import { gql } from '@apollo/client';

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

export { PERMISSION_CONTROL, IS_MINE_CHARACTER };
