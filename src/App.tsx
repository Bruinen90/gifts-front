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

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CreateDraw from './pages/CreateDraw/CreateDraw';
import MyDraws from './pages/MyDraws/MyDraws';
import Wishlist from './pages/Wishlist/Wishlist';
import Friends from './pages/Friends/Friends';

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
						<Route path="/nowe-losowanie" component={CreateDraw} />
						<Route path="/moje-losowania" component={MyDraws} />
						<Route path="/lista-zyczen" component={Wishlist} />
						<Route path="/znajomi" component={Friends} />
						<Route path="/" component={Home} />
					</Switch>
					{/* End off app */}
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
