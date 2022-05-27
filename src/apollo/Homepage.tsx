import { gql } from '@apollo/client';
import {
	loginDataInterface,
	recPassDataInterface,
	registrationDataInterface,
} from '../components/Homepage/homepage.model';
import { GQLmutation, GQLQuery } from './GQL';

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

const RECPASS = gql`
	query recPass($email: String!) {
		recPass(email: $email) {
			response
			responseStatus
		}
	}
`;

export const getRegistration = async (data: registrationDataInterface) => {
	return await GQLmutation(REGISTRATION, data);
};

export const getLogin = async (data: loginDataInterface) => {
	return await GQLQuery(LOGIN, data);
};

export const getRecPass = async (data: recPassDataInterface) => {
	return await GQLQuery(RECPASS, data);
};

export { REGISTRATION, LOGIN, RECPASS };
