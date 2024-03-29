import Page404 from '../components/404/404';
import Homepage from '../components/Homepage/homepage';
import CharacterSelect from '../components/Homepage/charSelect';
import Logout from '../components/Utils/Logout';
import React from 'react';
import { routeData } from './routes.model';
import { Main } from '../components/Main/Main';
import { CharCreate } from '../components/Homepage/charCreate';

const routes: routeData[] = [
	{
		path: '',
		key: 'homepage',
		component: <Homepage />,
		account_needed: false,
		character_needed: false,
		modal: false,
		nav: false,
	},
	{
		path: 'charSelect',
		key: 'charSelect',
		component: <CharacterSelect />,
		account_needed: true,
		character_needed: false,
		modal: false,
		nav: false,
	},
	{
		path: 'charCreate',
		key: 'charCreate',
		component: <CharCreate />,
		account_needed: true,
		character_needed: false,
		modal: false,
		nav: false,
	},
	{
		path: 'main',
		key: 'main',
		component: <Main />,
		account_needed: true,
		character_needed: true,
		modal: true,
		nav: true,
	},
	{
		path: '404',
		key: '404',
		component: <Page404 code={404} />,
		account_needed: false,
		character_needed: false,
		modal: false,
		nav: false,
	},
	{
		path: 'logout',
		key: 'logout',
		component: <Logout />,
		account_needed: false,
		character_needed: false,
		modal: false,
		nav: false,
	},
];

export default routes;
