import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakraConfig';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apollo/Apollo';
import './i18n';

const client = createApolloClient();

ReactDOM.render(
	<ApolloProvider client={client}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
