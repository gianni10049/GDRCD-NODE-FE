import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function createApolloClient() {
	const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});
}

export { createApolloClient };
