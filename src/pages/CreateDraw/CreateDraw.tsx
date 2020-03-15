import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

//Styles
import * as Styled from './stylesCreateDraw';

// MUI
import {
	Typography,
	TextField,
	InputAdornment,
	Button,
} from '@material-ui/core';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { useTheme } from '@material-ui/core/styles';

// Date picker
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';

const CreateDraw = () => {
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();
	const theme = useTheme();

	const [selectedDate, setSelectedDate] = useState<Date | null>(
		new Date('2020-12-24T21:11:54')
	);

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		// Custom wrapper breaks react-hook-form lib, gotta check on that
		<>
			<Typography variant="h4" component="h2" align="center">
				Utwórz losowanie
			</Typography>
			<Styled.MyForm onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={errors.title !== undefined}
					helperText={
						errors.title &&
						'Tytuł losowania powinen zawierać co najmniej 3 znaki'
					}
					label="Nazwa losowania"
					margin="normal"
					inputRef={register({ required: true, minLength: 3 })}
					name="title"
				/>
				<TextField
					error={errors.price !== undefined}
					helperText={
						errors.price && 'Podaj maksymalną cenę prezentu'
					}
					type="number"
					label="Maksymalna cena prezentu"
					margin="normal"
					inputRef={register({ required: true })}
					name="price"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">zł</InputAdornment>
						),
					}}
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="MM/dd/yyyy"
						margin="normal"
						id="date-picker-inline"
						label="Data losowania"
						value={selectedDate}
						onChange={setSelectedDate}
						KeyboardButtonProps={{
							'aria-label': 'wybierz datę',
						}}
					/>
				</MuiPickersUtilsProvider>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					style={{ marginTop: theme.spacing(2) }}
				>
					Utwórz losowanie
				</Button>
			</Styled.MyForm>
		</>
	);
};
export default CreateDraw;
