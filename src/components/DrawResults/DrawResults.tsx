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

interface DrawResultsProps {
	_id: string;
	username: string;
	drawId: string;
}

const DrawResults: React.FC<DrawResultsProps> = ({ _id, username, drawId }) => {
	const dispatch = useDispatch();
	const [wishesDialogOpened, setWishesDialogOpened] = useState(false);

	const handleToggleWishesDialog = () => {
		setWishesDialogOpened(prev => !prev);
	};

	const handleSetWishAsReserved = (wishId: string) => {
		console.log('reserving wish: ', wishId);
		dispatch({
			type: 'RESERVE_WISH_WATCHER',
			payload: { drawId: drawId, wishId: wishId },
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
					reserveWish={wishId => handleSetWishAsReserved(wishId)}
				/>
			)}
		</>
	);
};

export default DrawResults;
