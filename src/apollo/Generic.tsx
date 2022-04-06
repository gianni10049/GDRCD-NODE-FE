import { gql } from '@apollo/client';

const TOKEN_CONTROL = gql`
	query tokenControl(
		$token: String!
		$character_needed: Boolean!
		$account_needed: Boolean!
	) {
		tokenControl(
			token: $token
			character_needed: $character_needed
			account_needed: $account_needed
		) {
			response
			responseStatus
		}
	}
`;

export { TOKEN_CONTROL };
