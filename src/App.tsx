import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Home from './pages/Home/Home';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './common/theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as watchersTypes from './store/actions/watcherTypes';

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CreateDraw from './pages/CreateDraw/CreateDraw';
import MyDraws from './pages/MyDraws/MyDraws';
import Wishlist from './pages/Wishlist/Wishlist';
import CreateWish from './pages/CreateWish/CreateWish';
import { Friends } from './pages/Friends/Friends';
import { ShoppingList } from './pages/ShoppingList/ShoppingList';
import { ErrorPrompt } from './components/ErrorPrompt/ErrorPrompt';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { NewPassword } from './pages/NewPassword/NewPassword';
import { EmailSentConfirmation } from './pages/EmailSentConfirmation/EmailSentConfirmation';

axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.baseURL = "https://bez-niespodzianek.herokuapp.com/";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch({ type: 'USER_AUTOLOGIN_WATCHER' });
			dispatch({ type: 'FETCH_USER_DRAWS_LIST_WATCHER' });
			dispatch({ type: 'FETCH_USER_WISHES_WATCHER' });
			dispatch({ type: watchersTypes.WATCH_GET_INVITATIONS });
			dispatch({ type: watchersTypes.WATCH_FETCH_USER_FRIENDS });
			dispatch({ type: watchersTypes.WATCH_FETCH_SHOPPING_LIST });
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
					<Route path="/edytuj-losowanie" component={CreateDraw} />
					<Route path="/moje-losowania" component={MyDraws} />
					<Route path="/nowe-zyczenie" component={CreateWish} />
					<Route path="/edytuj-zyczenie" component={CreateWish} />
					<Route path="/lista-zyczen" component={Wishlist} />
					<Route path="/moi-znajomi" component={Friends} />
					<Route path="/lista-zakupow" component={ShoppingList} />
					<Route path="/zresetuj-haslo" component={ResetPassword} />
					<Route path="/utworz-haslo" component={NewPassword} />
					<Route
						path="/wyslano-link"
						component={EmailSentConfirmation}
					/>
					<Route path="/" component={Home} />
				</Switch>
				<ErrorPrompt />
				{/* End off app */}
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
