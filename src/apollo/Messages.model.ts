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

export interface forumsData {
	id: number;
	name: string;
	description: string;
	logo: string;
	type: string;
	visible: boolean;
	total_results: number;
	total_pages: number;
	to_read: boolean;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface forumsPostsData {
	id: number;
	character: number;
	forum: number;
	title: string;
	text: string;
	closed: boolean;
	important: boolean;
	visible: boolean;
	characterData: characterData;
	commentsData: [forumsCommentsData];
	to_read: boolean;
	createdAt: number;
	updatedAt: number;
	deletedAt: number;
}

export interface forumsCommentsData {
	id: number;
	post: number;
	character: number;
	text: string;
	characterData: characterData;
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

export interface getForumsInput {}

export interface getForumsPostsInput {
	forum: number;
	page: number;
}

export interface getPostInput {
	post: number;
	page: number;
}

export interface newPostInput {
	forum: number;
	title: string;
	text: string;
}

export interface newCommentInput {
	post: number;
	text: string;
}

export interface changeCloseInput {
	post: number;
}

export interface changeImportantInput {
	post: number;
}

export interface forumPostsResponse {
	posts: forumsPostsData[];
	total_results: number;
	total_pages: number;
}

export interface forumsPostResponse {
	post: forumsPostsData;
	total_results: number;
	total_pages: number;
}
