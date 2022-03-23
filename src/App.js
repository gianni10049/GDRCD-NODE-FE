import './static/css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProvideAuth, RouteControl } from './components/Routes/RouteControl';
import routes from './routes/routes';

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
									<RouteControl data={r}>
										{r.component}
									</RouteControl>
								</ProvideAuth>
							}
						/>
					);
				})}
			</Routes>
		</Router>
	);
}

export default App;
