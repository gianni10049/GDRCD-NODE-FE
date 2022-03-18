import { gql } from '@apollo/client';

const CHAR_LIST = gql`
	query charactersList($token: String!) {
		charactersList(token: $token) {
			id
			name
			surname
			age
			miniavatar
			profilePic
			nickname
		}
	}
`;

const SET_CHAR = gql`
	query setCharacter($token: String!, $characterId: Int!) {
		setCharacter(token: $token, characterId: $characterId) {
			responseStatus
			response
			token
		}
	}
`;

export { CHAR_LIST, SET_CHAR };
