import React, { useState } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button,
	Box,
} from '@material-ui/core';

// Redux
import * as actions from '../../store/actions/actions';
import { useDispatch } from 'react-redux';

// Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

//Styles
import * as Styled from './stylesLogin';

interface FormFields {
	user: string;
	password: string;
}

const Login = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState<FormFields>({
		user: '',
		password: '',
	});
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handleChange = (keyName: keyof FormFields) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// Doesn't work with prev => {... prev} - googles' team used below syntax so it should be fine
		setFormData({ ...formData, [keyName]: event.target.value });
	};

	const handleTogglePasswordVisibility = () => {
		setPasswordVisible(prev => !prev);
	};

	const handleLogin = (event: React.SyntheticEvent) => {
		event.preventDefault();
		dispatch({ type: 'LOGIN_USER_ASYNC' });
	};
	return (
		<Styled.Wrapper>
			<Styled.LoginForm onSubmit={handleLogin}>
				<TextField
					label="Login/email"
					value={formData.user}
					onChange={handleChange('user')}
					margin="normal"
				/>
				<FormControl margin="normal">
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
				</FormControl>
				<Box mt={2} mx="auto">
					<Button variant="contained" color="primary" type="submit">
						Zaloguj
					</Button>
				</Box>
			</Styled.LoginForm>
		</Styled.Wrapper>
	);
};
export default Login;
