import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	getMarketBuyListInterface,
	marketBuyListInterface,
} from './Market.model';

const MARKET_BUY_LIST = gql`
	query getMarketBuyList($token: String!) {
		characterConnected(token: $token) {
			getMarketBuyList {
				id
				object
				objectData {
					id
					name
					description
					img
					type
					typeData {
						id
						name
						description
						createdAt
						updatedAt
						deletedAt
					}
					quality
					qualityData {
						id
						name
						description
						createdAt
						updatedAt
						deletedAt
					}
					charges
					wearable
					concealable
					customizable
					usable
					cumulative
					droppable
					creatable
					findable
					transportable
					sellable
					marketable
					price
					createdBy
					createdAt
					updatedAt
					deletedAt
				}
				total
				remained
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const MARKET_BUY_ITEM = gql`
	mutation marketBuy($token: String!, $id: ID!) {
		characterConnectedMutation(token: $token) {
			marketBuyItem(id: $id) {
				response
				responseStatus
				list {
					id
					object
					objectData {
						id
						name
						description
						img
						type
						typeData {
							id
							name
							description
							createdAt
							updatedAt
							deletedAt
						}
						quality
						qualityData {
							id
							name
							description
							createdAt
							updatedAt
							deletedAt
						}
						charges
						wearable
						concealable
						customizable
						usable
						cumulative
						droppable
						creatable
						findable
						transportable
						sellable
						marketable
						price
						createdBy
						createdAt
						updatedAt
						deletedAt
					}
					total
					remained
					createdAt
					updatedAt
					deletedAt
				}
			}
		}
	}
`;

export const getMarketBuyList = async (data: getMarketBuyListInterface) => {
	return await GQLQuery(MARKET_BUY_LIST, data);
};

export const marketBuyItem = async (data: marketBuyListInterface) => {
	return await GQLmutation(MARKET_BUY_ITEM, data);
};
