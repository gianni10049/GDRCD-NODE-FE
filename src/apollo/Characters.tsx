import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	characterListByAccount,
	createCharacterInput,
	getCharacterAbiInput,
	getCharacterDataInput,
	getCharacterPercentagesInput,
	getCharacterPointsInput,
	getCharacterStatsInput,
	setCharacterInput,
} from './Characters.model';

const CREATE_CHARACTER = gql`
	mutation createCharacter(
		$token: String!
		$name: String!
		$surname: String!
		$age: Int!
	) {
		accountConnectedMutation(token: $token) {
			createCharacter(age: $age, name: $name, surname: $surname) {
				response
				responseStatus
			}
		}
	}
`;

const CHAR_LIST_BY_ACCOUNT = gql`
	query chactersListByAccount($token: String!) {
		accountConnected(token: $token) {
			chactersListByAccount {
				id
				name
				surname
				fullname
				age
				mini_avatar
				profilePic
				nickname
			}
		}
	}
`;

const SET_CHAR = gql`
	mutation setCharacter($token: String!, $characterId: ID!) {
		accountConnectedMutation(token: $token) {
			setCharacter(characterId: $characterId) {
				responseStatus
				response
				token
			}
		}
	}
`;

const GET_CHAR = gql`
	query getCharacter($token: String!, $characterId: ID) {
		accountConnected(token: $token) {
			getCharacter(characterId: $characterId) {
				id
				account
				name
				nickname
				surname
				age
				mini_avatar
				fullname
				profilePic
				active
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_CHAR_STATS = gql`
	query getCharacterStats($token: String!, $characterId: ID!) {
		characterConnected(token: $token) {
			getCharacterStats(characterId: $characterId) {
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
							fullname
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
	}
`;

const GET_CHAR_ABILITY = gql`
	query getCharacterAbility($token: String!, $characterId: ID!) {
		characterConnected(token: $token) {
			getCharacterAbility(characterId: $characterId) {
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
	}
`;

const GET_CHAR_POINTS = gql`
	query getCharacterPoints($token: String!, $characterId: ID!) {
		characterConnected(token: $token) {
			getCharacterPoints(characterId: $characterId) {
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
	}
`;

const GET_CHAR_PERCENTAGES = gql`
	query getCharacterActionPercentages(
		$token: String!
		$characterId: ID!
		$action: String
	) {
		characterConnected(token: $token) {
			getCharacterActionPercentages(
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
	}
`;

const GET_CHAR_LIST = gql`
	query getCharactersList($token: String!) {
		accountConnected(token: $token) {
			getCharactersList {
				id
				account
				name
				nickname
				surname
				age
				mini_avatar
				fullname
				profilePic
				active
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

export const getCharactersList = async () => {
	return await GQLQuery(GET_CHAR_LIST);
};

export const getCharacterPoints = async (data: getCharacterPointsInput) => {
	return await GQLQuery(GET_CHAR_POINTS, data);
};

export const charactersListByAccount = async (data: characterListByAccount) => {
	return await GQLQuery(CHAR_LIST_BY_ACCOUNT, data);
};

export const setCharacter = async (data: setCharacterInput) => {
	return await GQLmutation(SET_CHAR, data);
};

export const getCharacterData = async (data: getCharacterDataInput) => {
	return await GQLQuery(GET_CHAR, data);
};

export const getCharacterStats = async (data: getCharacterStatsInput) => {
	return await GQLQuery(GET_CHAR_STATS, data);
};

export const getCharacterAbi = async (data: getCharacterAbiInput) => {
	return await GQLQuery(GET_CHAR_ABILITY, data);
};

export const getCharacterPercentages = async (
	data: getCharacterPercentagesInput
) => {
	return await GQLQuery(GET_CHAR_PERCENTAGES, data);
};

export const createCharacter = async (data: createCharacterInput) => {
	return await GQLmutation(CREATE_CHARACTER, data);
};
