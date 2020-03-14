import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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

interface NewDrawForm {
	title: string;
	price: '' | number;
}

const defaultFormData: NewDrawForm = {
	title: '',
	price: '',
};

const CreateDraw = () => {
	const dispatch = useDispatch();
	const theme = useTheme();

	const [formData, setFormData] = useState(defaultFormData);

	const handleChange = (keyName: keyof NewDrawForm) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormData({ ...formData, [keyName]: event.target.value });
	};

	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date('2020-12-24T21:11:54')
	);

	const handleFormSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const payload = {
			...formData,
			date: selectedDate,
		};
		console.log('POSTing data: ', payload, ' to the API');
		dispatch({ type: 'CREATE_DRAW_WATCHER', payload: payload });
	};

	return (
		<PageWrapper>
			<Typography variant="h4" component="h2" align="center">
				Utwórz losowanie
			</Typography>
			<Styled.MyForm onSubmit={handleFormSubmit}>
				<TextField
					label="Nazwa losowania"
					value={formData.title}
					onChange={handleChange('title')}
					margin="normal"
				/>
				<TextField
					label="Maksymalna cena prezentu"
					value={formData.price}
					onChange={handleChange('price')}
					margin="normal"
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
		</PageWrapper>
	);
};
export default CreateDraw;
