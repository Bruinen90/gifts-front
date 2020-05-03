import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';

// MUI
import { Typography, TextField, Button } from '@material-ui/core';

export const ResetPassword: React.FC = () => {
	const history = useHistory();
	const { handleSubmit, register, errors } = useForm();

	const onSubmit = async (formData: any) => {
		const { email } = formData;
		const graphQLquery = {
			query: `
            mutation{sendResetPasswordEmail(email: "${email}") {success}}
        `,
		};
		try {
			const response = await axios.post('/graphql', graphQLquery);
			if (response.data.data.sendResetPasswordEmail.success) {
				history.push('/wyslano-link');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<PageWrapper>
			<Typography variant="h1" align="center">
				Zresetuj hasło
			</Typography>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '400px',
					margin: '2rem auto',
				}}
			>
				<Typography>
					Jeśli zapomniałeś hasła możesz je zresetować, aby odzyskać
					dostęp do swojego konta. Link otrzymasz na adres email
					podany podczas rejestracji
				</Typography>
				<TextField
					label="Twój adres email"
					error={errors.hasOwnProperty('email')}
					helperText={errors.email && 'Podaj prawidłowy adres email'}
					margin="normal"
					inputRef={register({
						required: true,
						pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					})}
					name="email"
				/>
				<Button variant="contained" color="primary" type="submit">
					Zresetuj hasło
				</Button>
			</form>
		</PageWrapper>
	);
};
