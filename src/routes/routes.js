import Page404 from '../components/404/404';
import Homepage from '../components/Homepage/homepage';
import CharacterSelect from '../components/Homepage/charSelect';
import { Main } from '../components/Main/Main';

const routes = [
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
		path: 'main',
		key: 'main',
		component: <Main />,
		account_needed: true,
		character_needed: true,
		modal: false,
		nav: true,
	},
	{
		path: '404',
		key: 'error',
		component: <Page404 code={404} />,
		account_needed: false,
		character_needed: false,
		modal: false,
		nav: false,
	},
];

export default routes;
