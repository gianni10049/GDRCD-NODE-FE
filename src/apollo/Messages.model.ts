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
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface sendMessageInput {
	text: string;
	recipient: number;
	type: string;
}
