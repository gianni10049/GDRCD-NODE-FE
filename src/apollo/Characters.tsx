import { gql } from '@apollo/client';

const CHAR_LIST = gql`
	query chactersListByAccount($token: String!) {
		chactersListByAccount(token: $token) {
			id
			name
			surname
			age
			mini_avatar
			profilePic
			nickname
		}
	}
`;

const SET_CHAR = gql`
	query setCharacter($token: String!, $characterId: ID!) {
		setCharacter(token: $token, characterId: $characterId) {
			responseStatus
			response
			token
		}
	}
`;

const GET_CHAR = gql`
	query getCharacter($token: String!, $characterId: ID) {
		getCharacter(token: $token, characterId: $characterId) {
			id
			account
			name
			nickname
			surname
			age
			mini_avatar
			profilePic
			active
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const GET_CHAR_STATS = gql`
	query getCharacterStats($token: String!, $characterId: ID!) {
		getCharacterStats(token: $token, characterId: $characterId) {
			table {
				createdAt
				deletedAt
				description {
					eng
					it
				}
				characterStatData {
					id
					value
					createdAt
					updatedAt
					deletedAt
					character
					characterData {
						id
						account
						name
						nickname
						surname
						age
						mini_avatar
						profilePic
						active
						createdAt
						updatedAt
						deletedAt
					}
					stat
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
			response
			responseStatus
		}
	}
`;

const GET_CHAR_ABILITY = gql`
	query getCharacterAbility($token: String!, $characterId: ID!) {
		getCharacterAbility(token: $token, characterId: $characterId) {
			table {
				id
				name
				description {
					it
					eng
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
			response
			responseStatus
		}
	}
`;

const GET_CHAR_POINTS = gql`
	query getCharacterPoints($token: String!, $characterId: ID!) {
		getCharacterPoints(token: $token, characterId: $characterId) {
			table {
				id
				character
				life
				stamina
				weight
				resources
				exp_total
				exp_usable
				stat_points
				createdAt
				updatedAt
				deletedAt
			}
			response
			responseStatus
		}
	}
`;

const GET_CHAR_PERCENTAGES = gql`
	query getCharacterActionPercentages(
		$token: String!
		$characterId: ID!
		$action: String
	) {
		getCharacterActionPercentages(
			token: $token
			characterId: $characterId
			action: $action
		) {
			percentages {
				life_calc {
					max_value
					total
				}
				stamina_calc {
					max_value
					total
				}
				find_calc {
					max_value
					total
				}
				furtivity_calc {
					max_value
					total
				}
				investigate_calc {
					max_value
					total
				}
				initiative_calc {
					max_value
					total
				}
				price_calc {
					max_value
					total
				}
				research_calc {
					max_value
					total
				}
			}
			response
			responseStatus
		}
	}
`;

export {
	CHAR_LIST,
	SET_CHAR,
	GET_CHAR,
	GET_CHAR_STATS,
	GET_CHAR_ABILITY,
	GET_CHAR_POINTS,
	GET_CHAR_PERCENTAGES,
};
