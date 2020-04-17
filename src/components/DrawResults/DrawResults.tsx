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
import GiftBox from '../GiftBox/GiftBox';

// Types
import { Wish } from '../../types/WishTypes';
import { DrawStatusType } from '../../types/Draw';

interface DrawResultsProps {
	_id: string;
	username: string;
	drawId: string;
	gifts?: Wish[];
	drawStatus: DrawStatusType;
}

const DrawResults: React.FC<DrawResultsProps> = ({
	_id,
	username,
	drawId,
	gifts,
	drawStatus,
}) => {
	const dispatch = useDispatch();

	const [wishesDialogOpened, setWishesDialogOpened] = useState(false);

	const handleToggleWishesDialog = () => {
		setWishesDialogOpened(prev => !prev);
	};

	const handleCancelReservation = (payload: { wishId: string }) => {
		dispatch({
			type: 'RESERVE_WISH_WATCHER',
			payload: {
				drawId: drawId,
				userId: _id,
				wishId: payload.wishId,
				reserved: false,
			},
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
						{drawStatus !== 'archived' &&
							(gifts && gifts.length > 0 ? (
								<>
									<Typography
										color="textSecondary"
										variant="overline"
										component="div"
									>
										Zadeklarowałeś, że kupisz:
									</Typography>
									{gifts.map(gift => (
										<GiftBox
											key={gift._id}
											_id={gift._id}
											title={gift.title}
											description={gift.description}
											price={gift.price}
											link={gift.link}
											cancelReservation={payload =>
												handleCancelReservation(payload)
											}
										/>
									))}
								</>
							) : (
								<Typography
									variant="overline"
									component="div"
									color="secondary"
								>
									Zadeklaruj co kupisz!
								</Typography>
							))}
					</Box>
				</CardContent>
				<CardActions>
					{drawStatus === 'archived' ? (
						<Typography
							color="secondary"
							style={{ margin: 'auto' }}
							variant="button"
						>
							Losowanie archiwalne
						</Typography>
					) : (
						<Button
							color="primary"
							style={{ margin: 'auto' }}
							onClick={handleToggleWishesDialog}
						>
							Zobacz listę życzeń
						</Button>
					)}
				</CardActions>
			</Card>
			{wishesDialogOpened && (
				<WishesModal
					userId={_id}
					drawId={drawId}
					username={username}
					opened={wishesDialogOpened}
					toggle={handleToggleWishesDialog}
				/>
			)}
		</>
	);
};

export default DrawResults;
