import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import {
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Box,
	FormHelperText,
} from '@material-ui/core';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/State';

// Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

//Styles
import * as Styled from './stylesLogin';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { ButtonWithLoader } from '../../components/ButtonWithLoader/ButtonWithLoader';

interface FormFields {
	user: string;
	password: string;
}

const Login = () => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const [errorMessage, userId] = useSelector((state: State) => [
		state.auth.loginError,
		state.auth._id,
	]);

	const [formData, setFormData] = useState<FormFields>({
		user: '',
		password: '',
	});
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handleChange = (keyName: keyof FormFields) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormData({ ...formData, [keyName]: event.target.value });
	};

	const handleTogglePasswordVisibility = () => {
		setPasswordVisible((prev: boolean) => !prev);
	};

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();
		dispatch({
			type: 'LOGIN_USER_WATCHER',
			payload: { username: formData.user, password: formData.password },
		});
	};
	useEffect(() => {
		if (!errorMessage && userId) {
			history.push('/' + location.search.split('?target=')[1]);
		}
	}, [errorMessage, history, location.search, userId]);

	return (
		<PageWrapper maxWidth="600px">
			<Typography variant="h1" align="center">
				Logowanie
			</Typography>
			<Styled.LoginForm onSubmit={handleLogin}>
				<TextField
					label="Login/email"
					value={formData.user}
					onChange={handleChange('user')}
					margin="normal"
					error={errorMessage === 'User not found'}
					helperText={
						errorMessage === 'User not found' &&
						'Użytkownik nie istnieje'
					}
				/>
				<FormControl
					margin="normal"
					error={errorMessage === 'Invalid password'}
				>
					<InputLabel htmlFor="password">Hasło</InputLabel>
					<Input
						id="password"
						type={passwordVisible ? 'text' : 'password'}
						value={formData.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="Pokaż hasło"
									edge="end"
									onClick={handleTogglePasswordVisibility}
								>
									{passwordVisible ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
					{errorMessage === 'Invalid password' && (
						<FormHelperText>
							Podane hasło jest nieprawidłowe
						</FormHelperText>
					)}
				</FormControl>
				<Box mt={2} mx="auto">
					<ButtonWithLoader
						variant="contained"
						color="primary"
						type="submit"
						loadingType="other"
						loadingCategory="auth"
						style={{ minWidth: '200px' }}
					>
						Zaloguj
					</ButtonWithLoader>
				</Box>
				<Box my={4} mx="auto">
					<Typography align="center">
						<Link to="/zresetuj-haslo">Nie pamiętasz hasła?</Link>
						<br />
						Nie masz konta?{' '}
						<Link to="/rejestracja">Zarejestruj się</Link>
					</Typography>
				</Box>
			</Styled.LoginForm>
		</PageWrapper>
	);
};
export default Login;
