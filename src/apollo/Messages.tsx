import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	deleteConvInput,
	deleteMessageInput,
	getFrequenciesInput,
	getMessagesInput,
	getMessagesSendersInput,
	sendFrequencyMessageInput,
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

const DELETE_MESSAGE = gql`
	mutation deleteMessage($token: String!, $message: ID!) {
		deleteMessage(token: $token, message: $message) {
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

const DELETE_CONV = gql`
	mutation deleteConv($token: String!, $sender: ID!, $type: String!) {
		deleteConv(token: $token, sender: $sender, type: $type) {
			response
			responseStatus
		}
	}
`;

const GET_FREQUENCIES = gql`
	query getFrequencies($token: String!) {
		getFrequencies(token: $token) {
			id
			name
			frequency
			type
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

const GET_FREQUENCIES_MESSAGES = gql`
	query getFrequencyMessages($token: String!, $frequency: Int!) {
		getFrequencyMessages(token: $token, frequency: $frequency) {
			response
			responseStatus
			messages {
				id
				text
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
				frequency
				type
				createdAt
				updatedAt
				deletedAt
			}
			frequency {
				id
				name
				frequency
				type
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const SEND_FREQUENCY_MESSAGE = gql`
	mutation sendFrequencyMessage(
		$token: String!
		$frequency: Int!
		$text: String!
	) {
		sendFrequencyMessage(
			token: $token
			frequency: $frequency
			text: $text
		) {
			id
			text
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
			frequency
			type
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

export const deleteMessage = async (data: deleteMessageInput) => {
	return await GQLmutation(DELETE_MESSAGE, data);
};

export const deleteConv = async (data: deleteConvInput) => {
	return await GQLmutation(DELETE_CONV, data);
};

export const getFrequencies = async (data: getFrequenciesInput) => {
	return await GQLQuery(GET_FREQUENCIES, data);
};

export const getFrequencyMessages = async (data: getFrequenciesInput) => {
	return await GQLQuery(GET_FREQUENCIES_MESSAGES, data);
};

export const sendFrequencyMessages = async (
	data: sendFrequencyMessageInput
) => {
	return await GQLmutation(SEND_FREQUENCY_MESSAGE, data);
};
