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

export { CHAR_LIST, SET_CHAR, GET_CHAR };
