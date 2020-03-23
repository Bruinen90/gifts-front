import React, { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Date-fns
import { format } from 'date-fns';

// Mui
import {
	Typography,
	Paper,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';

// Icons
import { MoreVert, AddCircle, Edit, Delete } from '@material-ui/icons';

// Types
import { User } from '../../interfaces/interfaces';

interface DrawRowProps {
	title: string;
	date: Date;
	_id: String | undefined;
	results?: User;
}

const DrawRow = ({ title, date, _id, results }: DrawRowProps) => {
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
		<>
			<Paper>
				<ListItem key={123}>
					<ListItemText
						primary={title}
						secondary={format(date, 'dd/MM/yyy')}
					/>
					<Typography>{results && results.username}</Typography>
					<ListItemSecondaryAction>
						<div>
							<IconButton
								edge="end"
								aria-label="dodaj uczetników/edytuj/usuń losowanie"
								onClick={handleOpenMenu}
							>
								<MoreVert />
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
									<ListItemText>Usuń losowanie</ListItemText>
								</MenuItem>
							</Menu>
						</div>
					</ListItemSecondaryAction>
				</ListItem>
			</Paper>
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
		</>
	);
};
export default DrawRow;
