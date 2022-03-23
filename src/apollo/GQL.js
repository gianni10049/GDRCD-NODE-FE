import { createApolloClient } from './Apollo';

const client = createApolloClient(),
	token = localStorage.getItem('token') ?? '';

export const GQLQuery = async (body, vars) => {
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

export const GQLmutation = async (body, vars) => {
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
