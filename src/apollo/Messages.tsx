import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	changeCloseInput,
	changeImportantInput,
	deleteConvInput,
	deleteMessageInput,
	getForumsInput,
	getForumsPostsInput,
	getFrequenciesInput,
	getMessagesInput,
	getMessagesSendersInput,
	getPostInput,
	newCommentInput,
	newPostInput,
	sendFrequencyMessageInput,
	sendMessageInput,
} from './Messages.model';

const GET_MESSAGES_SENDERS = gql`
	query getMessagesSenders($token: String!) {
		characterConnected(token: $token) {
			getMessagesSenders {
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
	}
`;

const GET_MESSAGES = gql`
	query getMessages($token: String!, $recipient: ID!, $type: String!) {
		characterConnected(token: $token) {
			getMessages(recipient: $recipient, type: $type) {
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
	}
`;

const SEND_MESSAGE = gql`
	mutation sendMessage(
		$token: String!
		$text: String!
		$recipient: ID!
		$type: String!
	) {
		characterConnectedMutation(token: $token) {
			sendMessage(text: $text, recipient: $recipient, type: $type) {
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
	}
`;

const DELETE_MESSAGE = gql`
	mutation deleteMessage($token: String!, $message: ID!) {
		characterConnectedMutation(token: $token) {
			deleteMessage(message: $message) {
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
	}
`;

const DELETE_CONV = gql`
	mutation deleteConv($token: String!, $sender: ID!, $type: String!) {
		characterConnectedMutation(token: $token) {
			deleteConv(sender: $sender, type: $type) {
				response
				responseStatus
			}
		}
	}
`;

const GET_FREQUENCIES = gql`
	query getFrequencies($token: String!) {
		characterConnected(token: $token) {
			getFrequencies {
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

const GET_FREQUENCIES_MESSAGES = gql`
	query getFrequencyMessages($token: String!, $frequency: Int!) {
		characterConnected(token: $token) {
			getFrequencyMessages(frequency: $frequency) {
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
	}
`;

const SEND_FREQUENCY_MESSAGE = gql`
	mutation sendFrequencyMessage(
		$token: String!
		$frequency: Int!
		$text: String!
	) {
		characterConnectedMutation(token: $token) {
			sendFrequencyMessage(frequency: $frequency, text: $text) {
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
	}
`;

const GET_FORUMS = gql`
	query getForums($token: String!) {
		characterConnected(token: $token) {
			getForums {
				id
				name
				description
				logo
				type
				visible
				total_pages
				total_results
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_POSTS = gql`
	query getPosts($token: String!, $forum: ID!, $page: Int!) {
		characterConnected(token: $token) {
			getPosts(forum: $forum, page: $page) {
				posts {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
					}
				}
				total_pages
				total_results
			}
		}
	}
`;

const GET_POST = gql`
	query getPost($token: String!, $post: ID!, $page: Int!) {
		characterConnected(token: $token) {
			getPost(post: $post, page: $page) {
				post {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
						characterData {
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
					}
				}
				total_results
				total_pages
			}
		}
	}
`;

const NEW_POST = gql`
	mutation newPost(
		$token: String!
		$forum: ID!
		$title: String!
		$text: String!
	) {
		characterConnectedMutation(token: $token) {
			newPost(forum: $forum, title: $title, text: $text) {
				posts {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
					}
				}
				total_pages
				total_results
			}
		}
	}
`;

const NEW_COMMENT = gql`
	mutation newComment($token: String!, $post: ID!, $text: String!) {
		characterConnectedMutation(token: $token) {
			newComment(post: $post, text: $text) {
				post {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
						characterData {
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
					}
				}
				total_results
				total_pages
			}
		}
	}
`;

const CHANGE_CLOSED = gql`
	mutation updatePostClose($token: String!, $post: ID!) {
		characterConnectedMutation(token: $token) {
			updatePostClose(post: $post) {
				post {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
						characterData {
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
					}
				}
				total_results
				total_pages
			}
		}
	}
`;

const CHANGE_IMPORTANT = gql`
	mutation updatePostImportant($token: String!, $post: ID!) {
		characterConnectedMutation(token: $token) {
			updatePostImportant(post: $post) {
				post {
					id
					character
					forum
					title
					text
					closed
					important
					visible
					createdAt
					updatedAt
					deletedAt
					characterData {
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
					commentsData {
						id
						post
						character
						text
						createdAt
						updatedAt
						deletedAt
						characterData {
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
					}
				}
				total_results
				total_pages
			}
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

export const getForums = async (data: getForumsInput) => {
	return await GQLQuery(GET_FORUMS, data);
};

export const getPosts = async (data: getForumsPostsInput) => {
	return await GQLQuery(GET_POSTS, data);
};

export const getPost = async (data: getPostInput) => {
	return await GQLQuery(GET_POST, data);
};

export const newPost = async (data: newPostInput) => {
	return await GQLmutation(NEW_POST, data);
};

export const newComment = async (data: newCommentInput) => {
	return await GQLmutation(NEW_COMMENT, data);
};

export const changeClose = async (data: changeCloseInput) => {
	return await GQLmutation(CHANGE_CLOSED, data);
};

export const changeImportant = async (data: changeImportantInput) => {
	return await GQLmutation(CHANGE_IMPORTANT, data);
};
