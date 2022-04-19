import { gql } from '@apollo/client';

const CHAR_LIST = gql`
	query charactersList($token: String!) {
		charactersList(token: $token) {
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
				id
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
				statData {
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
				value
				createdAt
				updatedAt
				deletedAt
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
				description
				icon
				stat
				castable
				max_level
				visible
				createdBy
				createdAt
				updatedAt
				deletedAt
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
					description
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

export { CHAR_LIST, SET_CHAR, GET_CHAR, GET_CHAR_STATS, GET_CHAR_ABILITY };
