import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import { getDamageInput, setDamageSolvedInput } from './Damage.model';

const GET_DAMAGE = gql`
	query getDamage($token: String!, $damageId: ID!) {
		characterConnected(token: $token) {
			getDamage(damageId: $damageId) {
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
	}
`;

const SET_DAMAGE_SOLVED = gql`
	mutation setDamageSolved($token: String!, $damageId: ID!) {
		characterConnectedMutation(token: $token) {
			setDamageSolved(damageId: $damageId) {
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
	}
`;

export const getDamage = async (data: getDamageInput) => {
	return await GQLQuery(GET_DAMAGE, data);
};

export const setDamageSolved = async (data: setDamageSolvedInput) => {
	return await GQLmutation(SET_DAMAGE_SOLVED, data);
};

export { GET_DAMAGE, SET_DAMAGE_SOLVED };
