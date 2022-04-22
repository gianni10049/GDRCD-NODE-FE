import { gql } from '@apollo/client';

const LIST_STATS = gql`
	query listStats($token: String!) {
		listStats(token: $token) {
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
`;

export { LIST_STATS };
