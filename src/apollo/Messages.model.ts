import { characterData } from './Tables.model';

export interface getMessagesSendersInput {}

export interface getMessagesInput {
	recipient: number;
	type: string;
}

export interface messageData {
	id: number;
	sender: number;
	recipient: number;
	group: number;
	text: string;
	recipientData: characterData;
	senderData: characterData;
	readData: [messagesReadData];
	deleteData: [messagesDeleteData];
	new_on: boolean;
	new_off: boolean;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface radioFrequenciesData {
	id: number;
	name: string;
	frequency: number;
	type: string;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface radioFrequencieMessagesData {
	id: number;
	sender: number;
	frequency: number;
	type: string;
	text: string;
	senderData: characterData;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface messagesReadData {
	id: number;
	message: number;
	character: number;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface messagesDeleteData {
	id: number;
	message: number;
	character: number;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface sendMessageInput {
	text: string;
	recipient: number;
	type: string;
}

export interface deleteMessageInput {
	message: number;
}

export interface deleteConvInput {
	sender: number;
	type: string;
}

export interface getFrequenciesInput {}

export interface getFrequenciesMessagesInput {
	frequency: number;
}

export interface sendFrequencyMessageInput {
	frequency: number;
	text: string;
}
