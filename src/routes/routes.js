import Page404 from '../components/404/404';
import Homepage from '../components/Homepage/homepage';
import CharacterSelect from '../components/Homepage/charSelect';

const routes = [
	{
		path: '',
		key: 'homepage',
		component: <Homepage />,
		account_needed: false,
		character_needed: false,
		modal: false,
	},
	{
		path: 'charSelect',
		key: 'charSelect',
		component: <CharacterSelect />,
		account_needed: true,
		character_needed: false,
		modal: false,
	},
	{
		path: 'main',
		key: 'main',
		component: <CharacterSelect />,
		account_needed: true,
		character_needed: true,
		modal: false,
	},
	{
		path: '404',
		key: 'error',
		component: <Page404 />,
		account_needed: false,
		character_needed: false,
		modal: false,
	},
];

export default routes;
