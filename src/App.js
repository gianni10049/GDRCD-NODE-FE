import './static/css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProvideAuth, RouteControl } from './components/Routes/RouteControl';
import routes from './routes/routes';
import React from 'react';
import { ModalContextProvider } from './components/Utils/ModalsContext';
import Page404 from './components/404/404';

function App() {
	return (
		<Router>
			{/* TODO */}
			{/*<RouteChangeTracker />*/}
			{/*Meta tags*/}
			{/*Toast container*/}

			<Routes>
				{routes.map((r) => {
					return (
						<Route
							path={r.path}
							key={r.key}
							element={
								<ProvideAuth
									character_needed={r.character_needed}
									account_needed={r.account_needed}>
									<ModalContextProvider routeData={r} />
									<RouteControl data={r}>
										{r.component}
									</RouteControl>
								</ProvideAuth>
							}
						/>
					);
				})}

				<Route
					key={'page404All'}
					path='*'
					exact={true}
					element={<Page404 code={404} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
