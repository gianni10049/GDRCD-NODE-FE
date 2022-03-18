import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './Apollo/Apollo';

const client = createApolloClient();

ReactDOM.render(
	<ApolloProvider client={client}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
