import { gql } from '@apollo/client';

const GET_ABILITY = gql`
	query getAbility($token: String!, $abilityId: ID!, $characterId: ID) {
		getAbility(
			token: $token
			abilityId: $abilityId
			characterId: $characterId
		) {
			id
			name
			description {
				eng
				it
			}
			icon
			stat
			castable
			max_level
			visible
			createdBy
			createdAt
			updatedAt
			deletedAt
			statData {
				createdAt
				deletedAt
				description {
					eng
					it
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
			characterAbilityData {
				id
				character
				ability
				value
				createdAt
				updatedAt
				deletedAt
			}
			abilityToDetailData {
				id
				ability
				level
				description {
					eng
					it
				}
				price
				bonus
				createdBy
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

export { GET_ABILITY };