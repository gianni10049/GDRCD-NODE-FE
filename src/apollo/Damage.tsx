import { gql } from '@apollo/client';

const GET_DAMAGE = gql`
	query getDamage($token: String!, $damageId: ID!) {
		getDamage(token: $token, damageId: $damageId) {
			response
			responseStatus
			damage {
				id
				character
				part
				points
				description
				title
				solved
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const SET_DAMAGE_SOLVED = gql`
	mutation setDamageSolved($token: String!, $damageId: ID!) {
		setDamageSolved(token: $token, damageId: $damageId) {
			response
			responseStatus
			damage {
				id
				character
				part
				points
				description
				title
				solved
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

export { GET_DAMAGE, SET_DAMAGE_SOLVED };
