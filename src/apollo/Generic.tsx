import { gql } from '@apollo/client';

const TOKEN_CONTROL = gql`
	query routeControl(
		$token: String!
		$character_needed: Boolean!
		$account_needed: Boolean!
	) {
		routeControl(
			token: $token
			character_needed: $character_needed
			account_needed: $account_needed
		) {
			response
			responseStatus
		}
	}
`;

const GET_PARTS_LIST = gql`
	query getPartsList($token: String!, $characterId: ID!) {
		getPartsList(token: $token, characterId: $characterId) {
			response
			responseStatus
			table {
				id
				name
				description_it
				description_eng
				icon
				partDamages {
					id
					part
					character
					points
					description
					solved
					createdAt
					updatedAt
					deletedAt
				}
				max_points
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_PARTS_DAMAGE = gql`
	query getCharDamageByPart(
		$token: String!
		$characterId: ID!
		$partId: ID!
	) {
		getCharDamageByPart(
			token: $token
			characterId: $characterId
			partId: $partId
		) {
			response
			responseStatus
			damages {
				id
				character
				part
				points
				title
				description
				solved
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

export { TOKEN_CONTROL, GET_PARTS_LIST, GET_PARTS_DAMAGE };
