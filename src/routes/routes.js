import Page404 from '../components/404/404';
import Homepage from '../components/Homepage/homepage';

const routes = [
	{
		path: '',
		key: 'homepage',
		component: <Homepage />,
		private: false,
	},
	{
		path: '404',
		key: 'error',
		component: <Page404 />,
		private: false,
	},
];

export default routes;
