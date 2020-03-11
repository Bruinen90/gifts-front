import React from 'react';

import Home from './pages/Home/Home';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './common/theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer';

// Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas/sagas';

// Pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NavBar from './components/NavBar/NavBar';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					{/* App goes here */}
					<NavBar />
					<Switch>
						<Route path="/logowanie" component={Login} />
						<Route path="/rejestracja" component={Signup} />
						<Route path="/" component={Home} />
					</Switch>
					{/* End off app */}
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
