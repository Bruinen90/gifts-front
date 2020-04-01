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

interface DrawRowProps {
	date: Date;
	title: string;
	_id: string | undefined;
	results?: DrawResultsInterface;
	participants: [User];
	creator: User;
	adminMode: boolean;
	price: number;
	deleteDraw: (drawId: string, drawTitle: string) => void;
	exitDraw: (drawId: string, drawTitle: string) => void;
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
}) => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [confirmationDialogOpened, setConfirmationDialogOpened] = useState(
		false
	);

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleToggleConfirmationDialog = () => {
		setConfirmationDialogOpened(prev => !prev);
	};

	const handleDeleteDraw = () => {
		deleteDraw(_id as string, title);
		handleToggleConfirmationDialog();
	};

	const handleExitDraw = () => {
		exitDraw(_id as string, title);
		// handleToggleConfirmationDialog();
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
									<MenuItem
										onClick={handleToggleConfirmationDialog}
									>
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
									startIcon={<Edit />}
									color="primary"
									onClick={handleEditDraw}
								>
									Edytuj
								</Button>
								<Button
									startIcon={<Delete />}
									color="secondary"
									onClick={handleToggleConfirmationDialog}
								>
									Usuń
								</Button>
							</>
						) : (
							<Button
								startIcon={<ExitToApp />}
								color="secondary"
								onClick={handleToggleConfirmationDialog}
							>
								Wypisz się
							</Button>
						)}
					</CardActions>
				)}
			</Card>
			{/* Delete draw confirmation box */}
			<Dialog
				open={confirmationDialogOpened}
				onClose={handleToggleConfirmationDialog}
			>
				<DialogTitle id="alert-dialog-slide-title">
					Czy na pewno chcesz {adminMode ? 'usunąć ' : 'opuścić '}
					losowanie?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{adminMode
							? `Po usunięciu losowanie nie będzie możliwości jego
						przywrócenia, wszystkie związane z nim ustawienia oraz
						informacjie zostaną bezpowrotnie utracone`
							: `Po opuszczeniu losowania nie ma innej możliwości powrotu niż dodanie użytkownika przez jego administratora`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleToggleConfirmationDialog}
						color="primary"
					>
						Anuluj
					</Button>
					<Button
						onClick={adminMode ? handleDeleteDraw : handleExitDraw}
						color="secondary"
					>
						{adminMode ? 'Usuń losowanie' : 'Opuść losowanie'}
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};
export default DrawRow;
