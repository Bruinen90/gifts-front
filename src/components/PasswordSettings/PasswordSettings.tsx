import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// MUI
import {
	Typography,
	CardContent,
	CardActions,
	Button,
	TextField,
	Box,
} from '@material-ui/core';

// Components
import { CenteredCard } from '../CenteredCard/CenteredCard';

type ChangeResponse =
	| 'invalid-old-password'
	| 'success'
	| 'server-error'
	| undefined;

export const PasswordSettings: React.FC = () => {
	const history = useHistory();
	const [changeResponse, setChangeResponse] = useState<ChangeResponse>();
	const { register, handleSubmit, errors, getValues } = useForm();
	const onSubmit = async (formData: any) => {
		console.log(formData);
		const { oldPassword, newPassword } = formData;
		const graphQLquery = {
			query: `
			mutation{changePassword(changePasswordInput: 
				{
					newPassword: "${newPassword}",
					oldPassword: "${oldPassword}"
				}
			) {success message}}
        `,
		};
		try {
			const response = await axios.post('/graphql', graphQLquery);
			console.log(response.data);
			if (response.data.data.changePassword.success) {
				history.push('/logowanie');
				// Add prompt about successfully changed password
			} else {
				throw new Error(response.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<CenteredCard>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent>
					<Typography variant="h3">Zmiana hasła</Typography>
					<Box
						padding={0.5}
						display="flex"
						flexDirection="column"
						maxWidth="400px"
					>
						<TextField
							error={changeResponse === 'invalid-old-password'}
							label="Stare hasło"
							margin="normal"
							inputRef={register({
								required: true,
								minLength: 5,
							})}
							name="oldPassword"
							type="password"
							autoComplete="off"
						/>
						<TextField
							label="Nowe hasło"
							error={errors.hasOwnProperty('newPassword')}
							helperText={
								errors.password &&
								'Hasło musi zawierać co najmniej 5 znaków'
							}
							margin="normal"
							inputRef={register({
								required: true,
								minLength: 5,
							})}
							name="newPassword"
							type="password"
						/>
						<TextField
							label="Powtórz nowe hasło"
							error={errors.hasOwnProperty('repassword')}
							helperText={
								errors.repassword &&
								'Hasła muszą być identyczne'
							}
							margin="normal"
							inputRef={register({
								validate: repassword =>
									repassword === getValues().newPassword,
							})}
							name="repassword"
							type="password"
						/>
					</Box>
				</CardContent>

				<CardActions>
					<Button variant="contained" color="primary" type="submit">
						Zapisz zmiany
					</Button>
					<Button component={RouterLink} to="/zresetuj-haslo">
						Zapomniałem hasła
					</Button>
				</CardActions>
			</form>
		</CenteredCard>
	);
};
