import { gql } from '@apollo/client';

const STATS_LIST = gql`
	query statsList($token: String!) {
		statsList(token: $token) {
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

export { STATS_LIST };
