import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import { updateStatInput } from './Stats.model';

const LIST_STATS = gql`
	query listStats($token: String!) {
		characterConnected(token: $token) {
			listStats {
				createdAt
				deletedAt
				description {
					it
					eng
				}
				id
				max_level
				min_level
				name
				registration
				updatedAt
				upgradable
				usable
			}
		}
	}
`;

const UPDATE_STAT = gql`
	mutation updateStat($token: String!, $character: ID!, $stat: ID!) {
		characterConnectedMutation(token: $token) {
			updateStat(character: $character, stat: $stat) {
				response
				responseStatus
			}
		}
	}
`;

export const listStats = async () => {
	return await GQLQuery(LIST_STATS);
};

export const updateStat = async (data: updateStatInput) => {
	return await GQLmutation(UPDATE_STAT, data);
};

export { LIST_STATS };
