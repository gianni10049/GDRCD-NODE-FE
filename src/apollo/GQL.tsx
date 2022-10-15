import { createApolloClient } from './Apollo';

const client = createApolloClient();

export const GQLQuery = async (body: any, vars?: object) => {
	const token = localStorage.getItem('token') ?? '';

	let query = await client
		.query({
			query: body,
			variables: {
				...vars,
				token: token,
			},
			fetchPolicy: 'network-only',
		})
		.then(({ data }) => {
			return data;
		});

	if (query.accountConnected) {
		return query.accountConnected;
	} else if (query.characterConnected) {
		return query.characterConnected;
	} else {
		return query;
	}
};

export const GQLmutation = async (body: any, vars: object) => {
	const token = localStorage.getItem('token') ?? '';

	let mutation = await client
		.mutate({
			mutation: body,
			variables: {
				...vars,
				token: token,
			},
			fetchPolicy: 'network-only',
		})
		.then(({ data }) => {
			return data;
		});

	if (mutation.characterConnectedMutation) {
		return mutation.characterConnectedMutation;
	} else if (mutation.accountConnectedMutation) {
		return mutation.accountConnectedMutation;
	} else {
		return mutation;
	}
};
