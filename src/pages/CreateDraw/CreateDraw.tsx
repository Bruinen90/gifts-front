import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

//Styles
import * as Styled from './stylesCreateDraw';

// MUI
import {
	Typography,
	TextField,
	InputAdornment,
	Button,
	Box,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Date picker
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';

// Types
import { DrawInterface } from '../../types/Draw';
import { User, UsersListType } from '../../types/User';
import { State } from '../../types/State';

// Components
import FindUser from '../../components/FindUser/FindUser';
import UsersList from '../../components/UsersList/UsersList';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

interface CreateDrawLocationState {
	edit: boolean;
	originalData: {
		_id: string;
		title: string;
		price: number;
		participants: User[];
		date: Date;
	};
}

// Default row date calculation
const TOMMOROW = new Date();
TOMMOROW.setDate(TOMMOROW.getDate() + 1);

const CreateDraw: React.FC = () => {
	const theme = useTheme();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const loggedUser: User = useSelector((state: State) => ({
		...(state.auth as User), // If you are on CreateDraw page you have to be logged in => there is logged user
	}));

	// Participants
	const [participants, setParticipants] = useState<UsersListType>(
		loggedUser._id ? [loggedUser] : []
	);

	const handleAddParticipant = (participant: User) => {
		setParticipants((prev: UsersListType) => [...prev, participant]);
	};

	const handleRemoveParticipant = (removedParticipant: User) => {
		setParticipants((prev: UsersListType) =>
			prev.filter(
				participant => participant._id !== removedParticipant._id
			)
		);
	};

	// Default add logged in user to new draw when component mounts and _id if fetched from DB
	const loggedUserId = loggedUser._id;
	useEffect(() => {
		if (loggedUserId && participants.length === 0) {
			setParticipants([loggedUser]);
		}
	}, [loggedUser, loggedUserId, participants.length]);

	// Validation
	const {
		handleSubmit,
		register,
		errors,
		triggerValidation,
		setValue,
		watch,
		reset,
	} = useForm({
		defaultValues: {
			title: '',
			price: '',
			date: location.state
				? (location.state as CreateDrawLocationState).originalData.date
				: TOMMOROW,
		},
	});

	// Logic for edit mode
	const [originalId, setOriginalID] = useState<string | null>();
	useEffect(() => {
		if (location) {
			if (!location.state) {
				// New draw - clear form
				reset();
				setParticipants([]);
				setOriginalID(null);
			} else {
				const locState = location.state as CreateDrawLocationState;
				const originalData = locState.originalData;
				setValue('title', originalData.title);
				setValue('price', originalData.price.toString());
				setParticipants(originalData.participants);
				setOriginalID(originalData._id);
			}
		}
	}, [location, reset, setValue]);

	const { date } = watch();

	const onSubmit = (formData: any) => {
		const payload: DrawInterface = {
			...formData,
			price: parseInt(formData.price),
			creator: loggedUser,
			participants: participants,
		};
		if (originalId) {
			payload._id = originalId;
		}
		dispatch({ type: 'CREATE_DRAW_WATCHER', payload: payload });
		history.push('/moje-losowania', {
			drawTitle: formData.title,
			edit: originalId && true,
		});
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
		setValue('date', date);
		triggerValidation('date');
	};

	const handleCancelChanges = () => {
		history.push('/moje-losowania');
	};

	return (
		// Custom wrapper breaks react-hook-form lib, gotta check on that
		<PageWrapper>
			<Typography variant="h4" component="h2" align="center">
				{originalId ? 'Edytuj ' : 'Utwórz '} losowanie
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
					autoComplete="off"
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
					autoComplete="off"
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker-inline"
						label="Data losowania"
						value={date}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'wybierz datę',
						}}
						name="date"
						error={errors.hasOwnProperty('date')}
						helperText={
							errors.date &&
							'Losowanie nie może odbyć się w przeszłości'
						}
						autoOk={true}
						minDate={TOMMOROW}
					/>
				</MuiPickersUtilsProvider>
				<FindUser
					handleUserClicked={handleAddParticipant}
					removedFromResults={participants}
					header="Dodaj uczestników"
				/>
				{participants.length > 0 && (
					<>
						<Typography variant="h6" component="h6">
							Lista uczestników
						</Typography>
						<UsersList
							listType="removingUsers"
							usersList={participants}
							handleUserClicked={handleRemoveParticipant}
						/>
					</>
				)}
				<Box
					display="flex"
					justifyContent="space-around"
					style={{ marginTop: theme.spacing(2) }}
				>
					<Button type="submit" color="primary" variant="contained">
						{originalId ? 'Zapisz zmiany' : 'Utwórz losowanie'}
					</Button>
					<Button
						onClick={handleCancelChanges}
						color="secondary"
						variant="contained"
					>
						Anuluj
					</Button>
				</Box>
			</Styled.MyForm>
		</PageWrapper>
	);
};
export default CreateDraw;
