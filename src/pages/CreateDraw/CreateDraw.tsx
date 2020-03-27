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
import {
	DrawInterface,
	StateInterface,
	UsersListType,
	User,
} from '../../interfaces/interfaces';

// Components
import FindUser from '../../components/FindUser/FindUser';
import UsersList from '../../components/UsersList/UsersList';

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

const CreateDraw = () => {
	const theme = useTheme();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const loggedUser: User = useSelector((state: StateInterface) => ({
		_id: state.userId!,
		username: state.username!,
		email: state.email!,
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
	useEffect(() => {
		if (location) {
			if (location.state) {
				const locState = location.state as CreateDrawLocationState;
				const originalData = locState.originalData;
				setValue('title', originalData.title);
				setValue('price', originalData.price.toString());
				setParticipants(originalData.participants);
			}
		}
	}, [location, location.state, setValue]);

	const { date } = watch();

	const onSubmit = (formData: any) => {
		const participantsIds = (participants as User[]).map(
			participant => participant._id
		);
		const payload: DrawInterface = {
			...formData,
			price: parseInt(formData.price),
			creator: loggedUser,
			participants: participantsIds,
		};
		dispatch({ type: 'CREATE_DRAW_WATCHER', payload: payload });
		history.push('/moje-losowania', { newDrawTitle: formData.title });
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
					handleAddUserToDraw={handleAddParticipant}
					removedFromResults={participants}
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
