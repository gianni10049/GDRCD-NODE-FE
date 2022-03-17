import { gql } from '@apollo/client';

const REGISTRATION = gql`
	mutation registration(
		$username: String!
		$password: String!
		$password_confirm: String!
		$email: String!
	) {
		registration(
			username: $username
			password: $password
			password_confirm: $password_confirm
			email: $email
		) {
			response
			responseStatus
		}
	}
`;

const LOGIN = gql`
	query login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			response
			responseStatus
			token
		}
	}
`;

export { REGISTRATION, LOGIN };
