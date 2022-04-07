// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from 'react';
import { TOKEN_CONTROL } from '../../apollo/Generic';
import { GQLQuery } from '../../apollo/GQL';
import Page404 from '../404/404';
import Header from '../Core/Header';
import { Box, Container } from '@chakra-ui/react';
import PlaceholderImage from '../../static/images/patterns/pattern9.png';
import {
	AuthDataResponse,
	ProvideAuthData,
	RouteControlData,
	tokenControlData,
} from './RouteControl.model';

const authContext = createContext<AuthDataResponse>({
	auth: false,
	inProgress: true,
});

export function ProvideAuth(data: ProvideAuthData) {
	let auth = useProvideAuth({
		account_needed: data.account_needed,
		character_needed: data.character_needed,
	});
	return (
		<authContext.Provider value={auth}>
			{data.children}
		</authContext.Provider>
	);
}

export const useAuth: any = () => {
	return useContext(authContext);
};

const getTokenControl = async (data: tokenControlData) => {
	return await GQLQuery(TOKEN_CONTROL, data);
};

function useProvideAuth(props: ProvideAuthData) {
	const [auth, setAuth] = useState(null);
	const [inProgress, setInProgress] = useState(true);

	useEffect(() => {
		getTokenControl({
			character_needed: props.character_needed,
			account_needed: props.account_needed,
		}).then((response) => {
			let data = response.routeControl;
			setAuth(data.response);
			setInProgress(false);
			return auth;
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return { auth, inProgress };
}

export const RouteControl = (props: RouteControlData) => {
	const auth = useAuth();

	if (auth.auth) {
		if (props.data.nav) {
			return (
				<>
					<Box id={'ct-main-navigation-bar'} gap={4}>
						{/*LEFT*/}
						<Header />
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
							<Container maxW={'1440px'}>
								{props.children}
							</Container>
						</Box>
					</Box>
				</>
			);
		} else {
			return <>{props.children}</>;
		}
	}

	if (auth.inProgress) {
		return <></>;
	}

	return <Page404 code={403} />;
};
