import { gql } from '@apollo/client';
import { GQLmutation, GQLQuery } from './GQL';
import {
	getMarketBuyListInterface,
	getMarketSellListInterface,
	marketBuyInterface,
	marketSellInterface,
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
	mutation marketBuyItem($token: String!, $id: ID!) {
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

const MARKET_SELL_LIST = gql`
	query getMarketSellList($token: String!) {
		characterConnected(token: $token) {
			getMarketSellList {
				id
				object
				objectListData {
					id
					owner_type
					owner
					object
					objectData {
						id
						name
						description
						img
						type
						quality
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
					quality
					qualityData {
						id
						name
						description
						createdAt
						updatedAt
						deletedAt
					}
					status
					statusData {
						id
						name
						description
						createdAt
						updatedAt
						deletedAt
					}
					usury
					alias
					img
					comment
					comment_master
					charges
					worn
					worn_part
					hidden
					expiry
					createdAt
					updatedAt
					deletedAt
				}
				price
				createdAt
				updatedAt
				deletedAt
			}
		}
	}
`;

const MARKET_SELL_ITEM = gql`
	mutation marketSell($token: String!, $id: ID!) {
		characterConnectedMutation(token: $token) {
			marketSellItem(id: $id) {
				response
				responseStatus
				list {
					id
					object
					objectListData {
						id
						owner_type
						owner
						object
						objectData {
							id
							name
							description
							img
							type
							quality
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
						quality
						qualityData {
							id
							name
							description
							createdAt
							updatedAt
							deletedAt
						}
						status
						statusData {
							id
							name
							description
							createdAt
							updatedAt
							deletedAt
						}
						usury
						alias
						img
						comment
						comment_master
						charges
						worn
						worn_part
						hidden
						expiry
						createdAt
						updatedAt
						deletedAt
					}
					price
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

export const marketBuyItem = async (data: marketBuyInterface) => {
	return await GQLmutation(MARKET_BUY_ITEM, data);
};

export const getMarketSellList = async (data: getMarketSellListInterface) => {
	return await GQLQuery(MARKET_SELL_LIST, data);
};

export const marketSellItem = async (data: marketSellInterface) => {
	return await GQLmutation(MARKET_SELL_ITEM, data);
};
