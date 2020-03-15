import React, { useState, useEffect, SyntheticEvent } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button,
	Box,
	FormHelperText,
} from '@material-ui/core';

// Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

//Styles
import * as Styled from './stylesSignup';

interface FormInput {
	value: string;
	isValid: boolean;
	changed: boolean;
}

interface FormFields {
	userName: FormInput;
	email: FormInput;
	password: FormInput;
	rePassword: FormInput;
}

interface ValidationProps {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	compareValue?: number | string | boolean;
}

interface ValidationFunctionInput {
	key: keyof FormFields;
	validationProps: ValidationProps;
	value: any;
}

const Signup = () => {
	const [formData, setFormData] = useState<FormFields>({
		userName: { value: '', isValid: false, changed: false },
		email: { value: '', isValid: false, changed: false },
		password: { value: '', isValid: false, changed: false },
		rePassword: { value: '', isValid: false, changed: false },
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		const formValidity = Object.values(formData).every(
			value => value.isValid
		);
		setFormIsValid(formValidity);
	}, [formData]);

	const handleChange = (keyName: keyof FormFields) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormData({
			...formData,
			[keyName]: {
				value: event.target.value,
				isValid: true,
				changed: true,
			},
		});
	};

	const handleTogglePasswordVisibility = () => {
		setPasswordVisible(prev => !prev);
	};

	const handleValidate = ({
		key,
		validationProps,
		value,
	}: ValidationFunctionInput) => {
		let isValid = true;
		Object.keys(validationProps).forEach(validationKey => {
			switch (validationKey) {
				case 'required':
					if (value.length === 0) {
						isValid = false;
					}
					break;
				case 'minLength':
					if (value.length < validationProps.minLength!) {
						isValid = false;
					}
					break;
				case 'maxLength':
					if (value.length > validationProps.maxLength!) {
						isValid = false;
					}
					break;
				case 'compareValue':
					if (value !== validationProps.compareValue) {
						isValid = false;
					}
					break;
			}
		});
		setFormData(prev => ({
			...prev,
			[key]: { ...prev[key], isValid: isValid },
		}));
	};

	const handleSubmitForm = (event: SyntheticEvent) => {
		event.preventDefault();
		console.log('Submiting form');
	};

	return (
		<Styled.Wrapper>
			<Styled.SignupForm onSubmit={handleSubmitForm}>
				<TextField
					label="Nazwa użytkownika"
					value={formData.userName.value}
					onChange={handleChange('userName')}
					onBlur={event =>
						handleValidate({
							key: 'userName',
							validationProps: { required: true, minLength: 3 },
							value: event.target.value,
						})
					}
					margin="normal"
					error={
						!formData.userName.isValid && formData.userName.changed
					}
					helperText={
						!formData.userName.isValid &&
						formData.userName.changed &&
						'Nazwa użytkownika powinna mieć co najmniej 3 znaki'
					}
				/>
				<TextField
					label="Adres email"
					value={formData.email.value}
					onChange={handleChange('email')}
					onBlur={event =>
						handleValidate({
							key: 'email',
							validationProps: { required: true, minLength: 8 },
							value: event.target.value,
						})
					}
					margin="normal"
					error={!formData.email.isValid && formData.email.changed}
					helperText={
						!formData.email.isValid &&
						formData.email.changed &&
						'Podaj prawidłowy adres email'
					}
				/>
				<FormControl
					margin="normal"
					error={
						!formData.password.isValid && formData.password.changed
					}
				>
					<InputLabel htmlFor="password">Hasło</InputLabel>
					<Input
						id="password"
						type={passwordVisible ? 'text' : 'password'}
						value={formData.password.value}
						onChange={handleChange('password')}
						onBlur={event =>
							handleValidate({
								key: 'password',
								validationProps: {
									required: true,
									minLength: 5,
								},
								value: event.target.value,
							})
						}
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
					{!formData.password.isValid &&
						formData.password.changed && (
							<FormHelperText>
								Hasło powinno zawierać co najmniej 5 znaków
							</FormHelperText>
						)}
				</FormControl>
				<FormControl
					margin="normal"
					error={
						!formData.rePassword.isValid &&
						formData.rePassword.changed
					}
				>
					<InputLabel htmlFor="rePassword">Powtórz hasło</InputLabel>
					<Input
						id="rePassword"
						type={passwordVisible ? 'text' : 'password'}
						value={formData.rePassword.value}
						onChange={handleChange('rePassword')}
						onBlur={event =>
							handleValidate({
								key: 'rePassword',
								validationProps: {
									compareValue: formData.password.value,
								},
								value: event.target.value,
							})
						}
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
					{!formData.rePassword.isValid &&
						formData.rePassword.changed && (
							<FormHelperText>
								Hasła muszą być takie same
							</FormHelperText>
						)}
				</FormControl>
				<Box mt={2} mx="auto">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={!formIsValid}
					>
						Utwórz konto
					</Button>
				</Box>
			</Styled.SignupForm>
		</Styled.Wrapper>
	);
};
export default Signup;