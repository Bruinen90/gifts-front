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
// import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { useTheme } from '@material-ui/core/styles';

// Date picker
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';

// Types
import { DrawInterface } from '../../interfaces/interfaces';

const CreateDraw = () => {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		errors,
		triggerValidation,
		setValue,
	} = useForm();
	const theme = useTheme();

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const onSubmit = (data: any) => {
		console.log(data);
		const payload: DrawInterface = {
			...data,
		};
		dispatch({ type: 'CREATE_DRAW_WATCHER', payload: payload });
	};

	const handleTriggerValidation = async (
		event: React.FocusEvent<HTMLInputElement>
	) => {
		triggerValidation(event.target.getAttribute('name')!);
	};

	// Register datepicker in validate hook
	useEffect(() => {
		register(
			{ name: 'date', type: 'text' },
			{
				validate: {
					inTheFuture: (value: Date) => {
						if (!value) {
							return false;
						}
						const now = new Date();
						return value.getTime() > now.getTime();
					},
				},
			}
		);
	}, [register]);

	const handleDateChange = (date: any) => {
		setSelectedDate(date);
		setValue('date', date);
		triggerValidation('date');
	};

	return (
		// Custom wrapper breaks react-hook-form lib, gotta check on that
		<>
			<Typography variant="h4" component="h2" align="center">
				Utwórz losowanie
			</Typography>
			<Styled.MyForm onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={errors.hasOwnProperty('title')}
					helperText={
						errors.title &&
						'Tytuł losowania powinen zawierać co najmniej 3 znaki'
					}
					label="Nazwa losowania"
					margin="normal"
					inputRef={register({ required: true, minLength: 3 })}
					name="title"
					onBlur={handleTriggerValidation}
				/>
				<TextField
					error={errors.hasOwnProperty('price')}
					helperText={
						errors.price && 'Podaj maksymalną cenę prezentu'
					}
					type="number"
					label="Maksymalna cena prezentu"
					margin="normal"
					inputRef={register({ required: true })}
					name="price"
					onBlur={handleTriggerValidation}
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
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'wybierz datę',
						}}
						// inputRef={register}
						name="date"
                        error={errors.hasOwnProperty('date')}
                        helperText={errors.date && 'Wybrana data powinna być w przyszłości'}
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
