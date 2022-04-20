import { createApolloClient } from './Apollo';

const client = createApolloClient(),
	token = localStorage.getItem('token') ?? '';

export const GQLQuery = async (body: any, vars?: object) => {
	return client
		.query({
			query: body,
			variables: {
				...vars,
				token: token,
			},
		})
		.then(({ data }) => {
			return data;
		});
};

export const GQLmutation = async (body: any, vars: object) => {
	return client
		.mutate({
			mutation: body,
			variables: {
				...vars,
				token: token,
			},
		})
		.then(({ data }) => {
			return data;
		});
};
