/** @format */

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
console.log('started react');
ReactDOM.render(
	<StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>,
	rootElement
);
reportWebVitals(console.log);
