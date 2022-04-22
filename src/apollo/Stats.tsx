import { gql } from '@apollo/client';

const LIST_STATS = gql`
	query listStats($token: String!) {
		listStats(token: $token) {
			createdAt
			deletedAt
			description
			id
			max_lvl
			min_lvl
			name
			registration
			updatedAt
			upgradable
			usable
		}
	}
`;

export { LIST_STATS };
