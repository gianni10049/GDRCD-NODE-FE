import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function createApolloClient() {
	const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						characterConnected: {
							merge(existing, incoming) {
								return incoming;
							},
						},
						accountConnected: {
							merge(existing, incoming) {
								return incoming;
							},
						},
					},
				},
				Mutation: {
					fields: {
						characterConnectedMutation: {
							merge(existing, incoming) {
								return incoming;
							},
						},
					},
				},
			},
		}),
	});
}

export { createApolloClient };
