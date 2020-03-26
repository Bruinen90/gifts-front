import React, { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Date-fns
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';

// Mui
import {
	Grid,
	Typography,
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
	AddCircle,
	Edit,
	Delete,
	ExitToApp,
	Event,
	People,
	VpnKey,
	MonetizationOn,
} from '@material-ui/icons';

// Types
import { User } from '../../interfaces/interfaces';
import DrawResults from '../DrawResults/DrawResults';

interface DrawRowProps {
	date: Date;
	title: string;
	_id: String | undefined;
	results?: User;
	participants: [User];
	creator: User;
	adminMode: boolean;
	price: number;
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
}) => {
	const dispatch = useDispatch();

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
		dispatch({
			type: 'DELETE_DRAW_WATCHER',
			payload: { drawId: _id },
		});
		handleToggleConfirmationDialog();
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
									<MenuItem onClick={handleClose}>
										<ListItemIcon>
											<AddCircle />
										</ListItemIcon>
										<ListItemText>
											Dodaj użytkowników
										</ListItemText>
									</MenuItem>
									<MenuItem onClick={handleClose}>
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
								/>
							</Grid>
						)}
					</Grid>
				</CardContent>
				<CardActions>
					{adminMode ? (
						<>
							<IconButton color="primary">
								<Edit />
							</IconButton>
							<IconButton
								color="secondary"
								onClick={handleToggleConfirmationDialog}
							>
								<Delete />
							</IconButton>
						</>
					) : (
						<IconButton color="secondary">
							<ExitToApp />
						</IconButton>
					)}
				</CardActions>
			</Card>
			{/* Delete draw confirmation box */}
			<Dialog
				open={confirmationDialogOpened}
				onClose={handleToggleConfirmationDialog}
			>
				<DialogTitle id="alert-dialog-slide-title">
					Czy na pewno chcesz usunąć losowanie?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Po usunięciu losowanie nie będzie możliwości jego
						przywrócenia, wszystkie związane z nim ustawienia oraz
						informacjie zostaną bezpowrotnie utracone
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleToggleConfirmationDialog}
						color="primary"
					>
						Anuluj
					</Button>
					<Button onClick={handleDeleteDraw} color="secondary">
						Usuń
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};
export default DrawRow;
