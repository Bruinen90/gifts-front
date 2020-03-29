import React from 'react';
import { StateInterface } from '../../interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// MUI
import {
	Hidden,
	ButtonGroup,
	Button,
	Box,
	Typography,
} from '@material-ui/core';

const SignInUpOut = () => {
	const dispatch = useDispatch();
	const username = useSelector((state: StateInterface) => state.username);

	const handleLogout = () => {
		dispatch({ type: 'USER_LOGOUT_WATCHER' });
	};
	return (
		<Hidden smDown>
			{username ? (
				<Box display="flex" alignItems="flex-end">
					<Box marginRight={2}>
						<Typography>Witaj {username}</Typography>
					</Box>
					<Button
						color="inherit"
						variant="outlined"
						onClick={handleLogout}
					>
						Wyloguj się
					</Button>
				</Box>
			) : (
				<ButtonGroup>
					<Button
						component={RouterLink}
						to="/logowanie"
						color="secondary"
						variant="contained"
					>
						Zaloguj się
					</Button>
					<Button
						component={RouterLink}
						to="/rejestracja"
						color="secondary"
						variant="contained"
					>
						Utwórz konto
					</Button>
				</ButtonGroup>
			)}
		</Hidden>
	);
};

export default SignInUpOut;
