import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import {
	Card,
	CardHeader,
	CardContent,
	Box,
	Typography,
	CardActions,
	Button,
} from '@material-ui/core';

// Components
import WishesModal from '../WishesModal/WishesModal';

// Types
import { Wish } from '../../interfaces/WishTypes';
import { ReservationStatusSetterType } from '../../interfaces/Reservations';

interface DrawResultsProps {
	_id: string;
	username: string;
	drawId: string;
	gift?: Wish;
}

const DrawResults: React.FC<DrawResultsProps> = ({
	_id,
	username,
	drawId,
	gift,
}) => {
	const dispatch = useDispatch();
	const [wishesDialogOpened, setWishesDialogOpened] = useState(false);

	const handleToggleWishesDialog = () => {
		setWishesDialogOpened(prev => !prev);
	};

	const handleSetReservationStatus: ReservationStatusSetterType = ({
		wishId,
		reserved,
	}) => {
		dispatch({
			type: 'RESERVE_WISH_WATCHER',
			payload: { drawId: drawId, wishId: wishId, reserved: reserved },
		});
	};
	return (
		<>
			<Card variant="outlined">
				<CardHeader
					title="Wyniki losowania"
					titleTypographyProps={{
						align: 'center',
						color: 'primary',
						style: {
							textTransform: 'uppercase',
							fontWeight: 'lighter',
						},
					}}
				/>
				<CardContent>
					<Box textAlign="center">
						<Typography
							color="textSecondary"
							variant="overline"
							component="div"
						>
							Losowanie zakończone! Wylosowałeś użytkownika:
						</Typography>
						<Typography
							variant="h3"
							component="div"
							style={{ fontWeight: 'lighter' }}
						>
							{username}
						</Typography>
						{gift && (
							<>
								<Typography
									color="textSecondary"
									variant="overline"
									component="div"
								>
									Zadeklarowałeś, że kupisz:
								</Typography>
								<Typography>{gift.title}</Typography>
							</>
						)}
					</Box>
				</CardContent>
				<CardActions>
					<Button
						color="primary"
						style={{ margin: 'auto' }}
						onClick={handleToggleWishesDialog}
					>
						Zobacz listę życzeń
					</Button>
				</CardActions>
			</Card>
			{wishesDialogOpened && (
				<WishesModal
					username={username}
					_id={_id}
					opened={wishesDialogOpened}
					toggle={handleToggleWishesDialog}
					setReservedStatus={(payload)=>handleSetReservationStatus(payload)}
				/>
			)}
		</>
	);
};

export default DrawResults;
