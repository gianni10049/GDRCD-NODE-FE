import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
