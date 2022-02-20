import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

// MUI
import {
	TextField,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Box,
	FormHelperText,
	Snackbar,
	Typography,
	Link,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

//Styles
import * as Styled from './stylesSignup';

// Components
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { ButtonWithLoader } from '../../components/ButtonWithLoader/ButtonWithLoader';

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

interface SignupEffectInterface {
	alertVisible: boolean;
	success?: boolean;
	message?: string;
	invalidField?: keyof FormFields | null;
}

export const Signup: React.FC = () => {
	const history = useHistory();
	const [formData, setFormData] = useState<FormFields>({
		userName: { value: '', isValid: false, changed: false },
		email: { value: '', isValid: false, changed: false },
		password: { value: '', isValid: false, changed: false },
		rePassword: { value: '', isValid: false, changed: false },
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	// After sign up message logic
	const [signupEffect, setSignupEffect] = useState<SignupEffectInterface>({
		alertVisible: false,
	});

	const handleToggleSignUpPrompt = () => {
		setSignupEffect(prev => ({
			...prev,
			alertVisible: !prev.alertVisible,
		}));
	};

	useEffect(() => {
		const formValues: FormInput[] = Object.values(formData);
		const formValidity = formValues.every(
			(value: FormInput) => value.isValid
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
		setPasswordVisible((prev: boolean) => !prev);
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
		setFormData((prev: FormFields) => ({
			...prev,
			[key]: { ...prev[key], isValid: isValid },
		}));
	};

	const handleSubmitForm = async (event: SyntheticEvent) => {
		event.preventDefault();
		const graphqlQuery = {
			query: `
                mutation {
                    createUser(userInput: 
                        {
                            username: "${formData.userName.value}", 
                            email: "${formData.email.value}", 
                            password: "${formData.password.value}"
                        }
                    ) 
                {
                    _id username email password
                }}
            `,
		};
		setLoading(true);
		try {
			const response = await axios.post('graphql', graphqlQuery);
			if (response.status < 400) {
				console.log('RESPONSE OK');
				setSignupEffect({
					alertVisible: true,
					success: true,
					message:
						'Poprawnie utworzono użytkownika, teraz możesz się zalogować',
				});
				setTimeout(() => history.push('/logowanie'), 3000);
			}
		} catch (error) {
			let errorMessage;
			let invalidField: keyof FormFields | undefined;
			switch (error.response.data.errors[0].message) {
				case 'Login taken':
					errorMessage =
						'Użytkownik o takiej nazwie już istnieje, wybierz inną nazwę użytkownika';
					invalidField = 'userName';
					setFormData((prev: FormFields) => ({
						...prev,
						userName: { ...prev.userName, isValid: false },
					}));
					break;
				case 'Email taken':
					errorMessage =
						'Na podany adres email założono już konto, zaloguj się';
					invalidField = 'email';
					setFormData((prev: FormFields) => ({
						...prev,
						email: { ...prev.userName, isValid: false },
					}));
					break;
				default:
					errorMessage =
						'Wystapił błąd, poczekaj chwilę i spróbuj ponownie';
			}
			const newSignupEffect: SignupEffectInterface = {
				alertVisible: true,
				success: false,
				message: errorMessage,
			};
			if (invalidField) {
				newSignupEffect.invalidField = invalidField;
			}
			setSignupEffect(newSignupEffect);
		}
		setLoading(false);
	};

	const Alert = (props: AlertProps) => {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	};
	return (
		<PageWrapper maxWidth='600px'>
			<Typography variant='h1'>Utwórz konto</Typography>
			<Styled.SignupForm onSubmit={handleSubmitForm}>
				<TextField
					label='Nazwa użytkownika'
					value={formData.userName.value}
					onChange={handleChange('userName')}
					onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
						handleValidate({
							key: 'userName',
							validationProps: {
								required: true,
								minLength: 3,
								maxLength: 30,
							},
							value: event.target.value,
						})
					}
					margin='normal'
					error={
						!formData.userName.isValid && formData.userName.changed
					}
					helperText={
						!formData.userName.isValid &&
						formData.userName.changed &&
						(signupEffect.invalidField === 'userName'
							? 'Wybrana nazwa użytkownika jest już zajęta'
							: 'Nazwa użytkownika powinna zawierać od 3 do 30 znaków')
					}
				/>
				<TextField
					type='email'
					label='Adres email'
					value={formData.email.value}
					onChange={handleChange('email')}
					onBlur={event =>
						handleValidate({
							key: 'email',
							validationProps: { required: true, minLength: 8 },
							value: event.target.value,
						})
					}
					margin='normal'
					error={!formData.email.isValid && formData.email.changed}
					helperText={
						!formData.email.isValid &&
						formData.email.changed &&
						(signupEffect.invalidField === 'email'
							? 'Adres email znajduje się już w bazie - zaloguj się lub wybierz inny adres'
							: 'Podaj prawidłowy adres email')
					}
				/>
				<FormControl
					margin='normal'
					error={
						!formData.password.isValid && formData.password.changed
					}
				>
					<InputLabel htmlFor='password'>Hasło</InputLabel>
					<Input
						id='password'
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
							<InputAdornment position='end'>
								<IconButton
									aria-label='Pokaż hasło'
									edge='end'
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
						autoComplete='off'
					/>
					{!formData.password.isValid &&
						formData.password.changed && (
							<FormHelperText>
								Hasło powinno zawierać co najmniej 5 znaków
							</FormHelperText>
						)}
				</FormControl>
				<FormControl
					margin='normal'
					error={
						!formData.rePassword.isValid &&
						formData.rePassword.changed
					}
				>
					<InputLabel htmlFor='rePassword'>Powtórz hasło</InputLabel>
					<Input
						id='rePassword'
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
							<InputAdornment position='end'>
								<IconButton
									aria-label='Pokaż hasło'
									edge='end'
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
						autoComplete='off'
					/>
					{!formData.rePassword.isValid &&
						formData.rePassword.changed && (
							<FormHelperText>
								Hasła muszą być takie same
							</FormHelperText>
						)}
				</FormControl>
				<Box mt={2} mx='auto'>
					<ButtonWithLoader
						variant='contained'
						color='primary'
						type='submit'
						disabled={!formIsValid || signupEffect.success}
						style={{ minWidth: '200px' }}
						componentLoading={loading}
					>
						Utwórz konto
					</ButtonWithLoader>
					<Box textAlign='center' mt={2}>
						<Typography>Masz już konto?</Typography>
						<Link href='./logowanie'>Zaloguj się</Link>
					</Box>
				</Box>
			</Styled.SignupForm>
			<Snackbar
				open={signupEffect.alertVisible}
				autoHideDuration={2500}
				onClose={handleToggleSignUpPrompt}
			>
				<Alert
					onClose={handleToggleSignUpPrompt}
					severity={signupEffect.success ? 'success' : 'error'}
				>
					{signupEffect.message}
				</Alert>
			</Snackbar>
		</PageWrapper>
	);
};
