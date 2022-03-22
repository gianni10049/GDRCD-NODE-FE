// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from 'react';
import { TOKEN_CONTROL } from '../../Apollo/Generic';
import { GQLQuery } from '../../Apollo/GQL';
import Page404 from '../404/404';

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

export const RouteControl = ({ children }) => {
	const auth = useAuth();

	if (auth.auth) {
		return <>{children}</>;
	}

	if (auth.inProgress) {
		return <></>;
	}

	return <Page404 code={403} />;
};
