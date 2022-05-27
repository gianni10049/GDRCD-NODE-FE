import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	getDamageListByPartInput,
	getParsListInput,
	sendMoneyInput,
} from './Generic.model';
import { tokenControlData } from '../components/Routes/RouteControl.model';

const GET_ME = gql`
	query getMe($token: String!) {
		getMe(token: $token) {
			response
			responseStatus
			me {
				character {
					id
					name
				}
				account {
					id
					username
				}
			}
		}
	}
`;

const TOKEN_CONTROL = gql`
	query routeControl(
		$token: String!
		$character_needed: Boolean!
		$account_needed: Boolean!
	) {
		routeControl(
			token: $token
			character_needed: $character_needed
			account_needed: $account_needed
		) {
			response
			responseStatus
		}
	}
`;

const GET_PARTS_LIST = gql`
	query getPartsList($token: String!, $characterId: ID!) {
		getPartsList(token: $token, characterId: $characterId) {
			response
			responseStatus
			table {
				id
				name
				description_it
				description_eng
				icon
				partDamages {
					id
					part
					character
					points
					description
					solved
					createdAt
					updatedAt
					deletedAt
				}
				max_points
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_PARTS_DAMAGE = gql`
	query getCharDamageByPart(
		$token: String!
		$characterId: ID!
		$partId: ID!
	) {
		getCharDamageByPart(
			token: $token
			characterId: $characterId
			partId: $partId
		) {
			response
			responseStatus
			damages {
				id
				character
				part
				points
				title
				description
				solved
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const SEND_MONEY = gql`
	mutation sendMoney($token: String!, $character: ID!, $money: String!) {
		sendMoney(token: $token, character: $character, money: $money) {
			response
			responseStatus
		}
	}
`;

export const sendMoney = async (data: sendMoneyInput) => {
	return await GQLmutation(SEND_MONEY, data);
};

export const getMe = async () => {
	return await GQLQuery(GET_ME);
};

export const getPartsList = async (data: getParsListInput) => {
	return await GQLQuery(GET_PARTS_LIST, data);
};

export const getDamageListByPart = async (data: getDamageListByPartInput) => {
	return await GQLQuery(GET_PARTS_DAMAGE, data);
};

export const getTokenControl = async (data: tokenControlData) => {
	return await GQLQuery(TOKEN_CONTROL, data);
};

export { TOKEN_CONTROL, GET_PARTS_LIST, GET_PARTS_DAMAGE, GET_ME, SEND_MONEY };
