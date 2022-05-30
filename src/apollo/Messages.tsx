import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	getMessagesInput,
	getMessagesSendersInput,
	sendMessageInput,
} from './Messages.model';

const GET_MESSAGES_SENDERS = gql`
	query getMessagesSenders($token: String!) {
		getMessagesSenders(token: $token) {
			id
			sender
			recipient
			text
			senderData {
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
			new_on
			new_off
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const GET_MESSAGES = gql`
	query getMessages($token: String!, $recipient: ID!, $type: String!) {
		getMessages(token: $token, recipient: $recipient, type: $type) {
			id
			sender
			senderData {
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
			readData {
				id
				message
				character
				createdAt
				updatedAt
				deletedAt
			}
			recipient
			text
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const SEND_MESSAGE = gql`
	mutation sendMessage(
		$token: String!
		$text: String!
		$recipient: ID!
		$type: String!
	) {
		sendMessage(
			token: $token
			text: $text
			recipient: $recipient
			type: $type
		) {
			id
			sender
			senderData {
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
			readData {
				id
				message
				character
				createdAt
				updatedAt
				deletedAt
			}
			recipient
			text
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export const getMessagesSenders = async (data: getMessagesSendersInput) => {
	return await GQLQuery(GET_MESSAGES_SENDERS, data);
};

export const getMessages = async (data: getMessagesInput) => {
	return await GQLQuery(GET_MESSAGES, data);
};

export const sendMessage = async (data: sendMessageInput) => {
	return await GQLmutation(SEND_MESSAGE, data);
};
