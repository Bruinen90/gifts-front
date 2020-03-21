import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Home from './pages/Home/Home';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './common/theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CreateDraw from './pages/CreateDraw/CreateDraw';
import MyDraws from './pages/MyDraws/MyDraws';
import Wishlist from './pages/Wishlist/Wishlist';
import Friends from './pages/Friends/Friends';

axios.defaults.baseURL = 'http://localhost:8080/';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch({ type: 'USER_AUTOLOGIN_WATCHER' });
			dispatch({ type: 'FETCH_USER_DRAWS_LIST_WATCHER' });
		}
	}, [dispatch]);
	return (
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
	);
};

export default App;
