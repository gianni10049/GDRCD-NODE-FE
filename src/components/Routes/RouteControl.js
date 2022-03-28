// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from 'react';
import { TOKEN_CONTROL } from '../../apollo/Generic';
import { GQLQuery } from '../../apollo/GQL';
import Page404 from '../404/404';
import Header from '../Core/Header';
import { Box, Container } from '@chakra-ui/react';
import PlaceholderImage from '../../static/images/patterns/pattern9.png';

const authContext = createContext(false);

export function ProvideAuth({ children, character_needed, account_needed }) {
	let auth = useProvideAuth({ character_needed, account_needed });
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth({ character_needed, account_needed }) {
	const [auth, setAuth] = useState(null);
	const [inProgress, setInProgress] = useState(true);

	useEffect(() => {
		GQLQuery(TOKEN_CONTROL, {
			character_needed,
			account_needed,
		}).then((vals) => {
			let data = vals.tokenControl;
			setAuth(data.response);
			setInProgress(false);
			return auth;
		});
	});
	// Return the user object and auth methods
	return { auth, inProgress };
}

export const RouteControl = ({ children, data }) => {
	const auth = useAuth();
	const actual_url = window.location.pathname;

	if (auth.auth) {
		if (data.nav) {
			return (
				<>
					<Box id={'ct-main-navigation-bar'} gap={4}>
						{/*LEFT*/}
						<Header actual_url={actual_url} />
						{/*RIGHT*/}
						<Box
							bg={'green.800'}
							w={'full'}
							minH={'100vh'}
							bgImg={PlaceholderImage}
							bgSize={'50px'}
							backgroundRepeat={'repeat'}
							id={'global_windows'}>
							{/*RIGHT content*/}
							<Container maxW={'1440px'}>{children}</Container>
						</Box>
					</Box>
				</>
			);
		} else {
			return <>{children}</>;
		}
	}

	if (auth.inProgress) {
		return <></>;
	}

	return <Page404 code={403} />;
};
