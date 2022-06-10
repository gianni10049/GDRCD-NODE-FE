import { gql } from '@apollo/client';
import { GQLQuery } from './GQL';
import { getGroupInput, getGroupsInput } from './Groups.modal';

const GET_GROUPS = gql`
	query getGroups($token: String!) {
		characterConnected(token: $token) {
			getGroups {
				id
				name
				description
				logo
				external_url
				type
				visible
				rolesData {
					id
					group
					name
					description
					logo
					earn
					visible
					createdAt
					updatedAt
					deletedAt
				}
				groupTypeData {
					id
					name
					description
					logo
					createdAt
					updatedAt
					deletedAt
				}
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const GET_GROUP = gql`
	query getGroup($token: String!, $id: ID!) {
		characterConnected(token: $token) {
			getGroup(id: $id) {
				id
				name
				description
				logo
				external_url
				type
				visible
				rolesData {
					id
					group
					name
					description
					logo
					earn
					visible
					createdAt
					updatedAt
					deletedAt
					groupMembers {
						id
						role
						character
						manager
						createdAt
						updatedAt
						deletedAt
						memberData {
							id
							name
							surname
							fullname
							age
							mini_avatar
							profilePic
							nickname
						}
					}
				}
				groupTypeData {
					id
					name
					description
					logo
					createdAt
					updatedAt
					deletedAt
				}
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

export const getGroups = async (data: getGroupsInput) => {
	return await GQLQuery(GET_GROUPS, data);
};

export const getGroup = async (data: getGroupInput) => {
	return await GQLQuery(GET_GROUP, data);
};
