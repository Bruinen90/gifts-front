import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';
import { useForm, Controller } from 'react-hook-form';
// import { RHFInput } from 'react-hook-form-input';

// MUI
import {
	Typography,
	CardContent,
	CardActions,
	FormControlLabel,
	Switch,
	TextField,
	Box,
	FormControl,
	Input,
	InputLabel,
	InputAdornment,
	IconButton,
	FormHelperText,
} from '@material-ui/core';

// Components
import { CenteredCard } from '../CenteredCard/CenteredCard';
import { ButtonWithLoader } from '../ButtonWithLoader/ButtonWithLoader';

// Types
import { State } from '../../types/State';
import { Edit, Cancel } from '@material-ui/icons';

export const EmailSettings: React.FC = () => {
	const dispatch = useDispatch();
	// Set unsubcribed from redux as default, but manage it in local state of useForm hook
	const user = useSelector((state: State) => state.auth);
	const localError = useSelector((state: State) => state.localError);
	const success = useSelector((state: State) => state.success);
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		getValues,
		control,
	} = useForm();
	const [emailInEdit, setEmailInEdit] = useState(false);

	const onSubmit = async (data: any) => {
		console.log(data);
		const payload = {
			...data,
			oldEmail: user.email,
		};
		dispatch({
			type: watcherTypes.WATCH_CHANGE_USER_EMAIL,
			payload: payload,
		});
	};

	const handleStartEditingEmail = () => {
		setEmailInEdit(true);
	};

	const handleCancelEditingEmail = () => {
		setEmailInEdit(false);
		setValue('email', user.email);
	};

	useEffect(() => {
		setValue('email', user.email);
		setValue('unsubscribed', user.unsubscribed);
	}, [setValue, user.email, user.unsubscribed]);

	useEffect(() => {
		if (success.id === 'email-updated') {
			setEmailInEdit(false);
		}
	}, [success]);

	return (
		<CenteredCard>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent>
					<Typography variant="h3">Powiadomienia email</Typography>
					<Box
						padding={0.5}
						display="flex"
						flexDirection="column"
						maxWidth="400px"
					>
						<FormControl margin="normal" disabled={!emailInEdit}>
							<InputLabel htmlFor="email">
								Twój adres email
							</InputLabel>
							<Input
								id="email"
								error={errors.hasOwnProperty('email')}
								inputRef={register()}
								name="email"
								type="email"
								autoComplete="off"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="Edytuj adres email"
											onClick={
												emailInEdit
													? handleCancelEditingEmail
													: handleStartEditingEmail
											}
										>
											{emailInEdit ? (
												<Cancel color="secondary" />
											) : (
												<Edit />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
							{errors.email && (
								<FormHelperText>
									Podaj prawidłowy adres email
								</FormHelperText>
							)}
						</FormControl>

						{emailInEdit && (
							<TextField
								error={
									localError.errorCode ===
									'invalid-change-email-password'
								}
								helperText={
									localError.errorCode ===
									'invalid-change-email-password'
										? 'Podane hasło jest nieprawidłowe'
										: 'Aby zmienić email podaj swoje hasło'
								}
								label="Hasło"
								margin="normal"
								inputRef={register({
									required: getValues().email !== user.email,
									minLength: 5,
								})}
								name="password"
								type="password"
								autoComplete="off"
							/>
						)}
						<FormControlLabel
							control={
								<Controller
									as={<Switch checked={true}/>}
									type="checkbox"
									name="unsubscribed"
									control={control}
								/>
							}
							label="Nie chcę otrzymywać powiadomień na email"
						/>
					</Box>
				</CardContent>

				<CardActions>
					<ButtonWithLoader
						variant="contained"
						color="primary"
						type="submit"
						loadingType="edited-record"
						recordId="change-email-button"
					>
						Zapisz zmiany
					</ButtonWithLoader>
				</CardActions>
			</form>
		</CenteredCard>
	);
};
