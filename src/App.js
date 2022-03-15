import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';

function App() {
	return (
		<Router>
			<Routes>
				{routes.map((r) => {
					return (
						<Route
							path={r.path}
							key={r.key}
							element={r.component}
						/>
					);
				})}
			</Routes>
		</Router>
	);
}

export default App;
