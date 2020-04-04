import React, { useState } from 'react';
import { useHistory } from 'react-router';

// Date-fns
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';

// Mui
import {
	Grid,
	IconButton,
	Menu,
	MenuItem,
	ListItemText,
	ListItemIcon,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Card,
	CardHeader,
	CardActions,
	CardContent,
	List,
	ListItem,
} from '@material-ui/core';

// Icons
import {
	MoreVert,
	Edit,
	Delete,
	ExitToApp,
	Event,
	People,
	VpnKey,
	MonetizationOn,
} from '@material-ui/icons';

// Types
import { User, DrawResultsInterface } from '../../interfaces/interfaces';
import DrawResults from '../DrawResults/DrawResults';

type DrawFunction = (drawId: string, drawTitle: string) => void;

interface DrawRowProps {
	date: Date;
	title: string;
	_id: string | undefined;
	results?: DrawResultsInterface;
	participants: [User];
	creator: User;
	adminMode: boolean;
	price: number;
	deleteDraw: DrawFunction;
	exitDraw: DrawFunction;
	runDraw: DrawFunction;
}

const DrawRow: React.FC<DrawRowProps> = ({
	title,
	date,
	_id,
	results,
	creator,
	adminMode,
	price,
	participants,
	deleteDraw,
	exitDraw,
	runDraw,
}) => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	type DrawFunction = (event: React.MouseEvent<HTMLElement>) => void;

	interface ConfirmationDialogInterface {
		opened: boolean;
		title?: string;
		description?: string;
		acceptText?: string;
		cancelText?: string;
		confirmFunction?: DrawFunction;
	}

	const [confirmationDialog, setConfirmationDialog] = useState<
		ConfirmationDialogInterface
	>({ opened: false });

	const openConfirmationDialog = ({
		title,
		description,
		confirmFunction,
		acceptText,
		cancelText,
	}: {
		title: string;
		description: string;
		cancelText: string;
		acceptText: string;
		confirmFunction: DrawFunction;
	}) => {
		setConfirmationDialog({
			opened: true,
			title: title,
			description: description,
			confirmFunction: confirmFunction,
			cancelText: cancelText,
			acceptText: acceptText,
		});
	};

	const handleCloseConfirmationDialog = () => {
		setConfirmationDialog({
			opened: false,
		});
	};

	const handleDeleteDraw = () => {
		const confirmed = () => {
			deleteDraw(_id as string, title);
			handleCloseConfirmationDialog();
		};

		openConfirmationDialog({
			title: 'Czy na pewno chcesz usunąć losowanie?',
			description:
				'Po usunięciu losowanie nie będzie możliwości jego przywrócenia, wszystkie związane z nim ustawienia oraz informacjie zostaną bezpowrotnie utracone',
			acceptText: 'Usuń',
			cancelText: 'Anuluj',
			confirmFunction: confirmed,
		});
	};

	const handleExitDraw = () => {
		const confirmed = () => {
			exitDraw(_id as string, title);
			handleCloseConfirmationDialog();
		};
		openConfirmationDialog({
			title: 'Czy na pewno chcesz opuścić losowanie?',
			description:
				'Po opuszczeniu losowania nie ma możliwości powrotu innej niż dodanie użytkownika ponownie przez twórcę losowania',
			acceptText: 'Opuść losowanie',
			cancelText: 'Anuluj',
			confirmFunction: confirmed,
		});
	};

	const handleRunDraw = () => {
		const confirmed = () => {
			runDraw(_id!, title);
			handleCloseConfirmationDialog();
		};
		openConfirmationDialog({
			title: 'Czy na pewno chcesz przeprowadzić losowanie teraz?',
			description:
				'Po przeprowadzeniu losowanie wszyscy jego uczestnicy poznają jego wyniki i nie będzie możliwości jego edycji, w tym dodania kolejnych uczestników',
			acceptText: 'Przeprowadź losowanie teraz',
			cancelText: 'Anuluj',
			confirmFunction: confirmed,
		});
	};

	const handleEditDraw = () => {
		history.push('/edytuj-losowanie', {
			editing: true,
			originalData: {
				_id: _id,
				title: title,
				price: price,
				participants: participants,
				date: date,
			},
		});
	};

	return (
		<Grid item xs={12} lg={6}>
			<Card>
				<CardHeader
					title={title}
					action={
						adminMode && (
							<div>
								<IconButton
									edge="end"
									aria-label="dodaj uczetników/edytuj/usuń losowanie"
									onClick={handleOpenMenu}
								>
									<MoreVert fontSize="large" />
								</IconButton>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleEditDraw}>
										<ListItemIcon>
											<Edit />
										</ListItemIcon>
										<ListItemText>
											Edytuj losowanie
										</ListItemText>
									</MenuItem>
									<MenuItem onClick={handleDeleteDraw}>
										<ListItemIcon>
											<Delete />
										</ListItemIcon>
										<ListItemText>
											Usuń losowanie
										</ListItemText>
									</MenuItem>
								</Menu>
							</div>
						)
					}
				/>
				<CardContent>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6}>
							<List>
								<ListItem>
									<ListItemIcon>
										<Event />
									</ListItemIcon>
									<ListItemText
										primary={format(date, 'd MMMM yyyy', {
											locale: plLocale,
										})}
										secondary="data losowania"
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<People />
									</ListItemIcon>
									<ListItemText
										primary={participants.length}
										secondary="liczba uczestników"
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<MonetizationOn />
									</ListItemIcon>
									<ListItemText
										primary={price + ' zł'}
										secondary="maksymalna cena prezentu"
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<VpnKey />
									</ListItemIcon>
									<ListItemText
										primary={creator.username}
										secondary="administrator"
									/>
								</ListItem>
							</List>
						</Grid>
						{results !== undefined && (
							<Grid item xs={12} md={6}>
								<DrawResults
									_id={results._id}
									username={results.username}
									drawId={_id!}
									gifts={results.gifts}
								/>
							</Grid>
						)}
					</Grid>
				</CardContent>
				{!results && (
					<CardActions>
						{adminMode ? (
							<>
								<Button
									onClick={handleRunDraw}
									variant="contained"
									color="primary"
								>
									Losuj teraz
								</Button>
								<Button
									startIcon={<Edit />}
									color="primary"
									onClick={handleEditDraw}
								>
									Edytuj
								</Button>
								<Button
									startIcon={<Delete />}
									color="secondary"
									onClick={handleDeleteDraw}
								>
									Usuń
								</Button>
							</>
						) : (
							<Button
								startIcon={<ExitToApp />}
								color="secondary"
								onClick={handleExitDraw}
							>
								Wypisz się
							</Button>
						)}
					</CardActions>
				)}
			</Card>
			{/* Delete draw confirmation box */}
			<Dialog
				open={confirmationDialog.opened}
				onClose={handleCloseConfirmationDialog}
			>
				<DialogTitle id="alert-dialog-slide-title">
					{confirmationDialog.title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{confirmationDialog.description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={confirmationDialog.confirmFunction!}
						color="primary"
					>
						{confirmationDialog.acceptText}
					</Button>
					<Button
						onClick={handleCloseConfirmationDialog}
						color="secondary"
					>
						{confirmationDialog.cancelText!}
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};
export default DrawRow;
