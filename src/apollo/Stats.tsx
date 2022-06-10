import { gql } from '@apollo/client';
import { GQLQuery } from './GQL';

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

export const listStats = async () => {
	return await GQLQuery(LIST_STATS);
};

export { LIST_STATS };
