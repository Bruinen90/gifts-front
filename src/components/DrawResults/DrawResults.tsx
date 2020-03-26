import React, { useState } from 'react';
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
}

const DrawResults: React.FC<DrawResultsProps> = ({ _id, username }) => {
	const [wishesDialogOpened, setWishesDialogOpened] = useState(false);

	const handleToggleWishesDialog = () => {
		setWishesDialogOpened(prev => !prev);
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
				/>
			)}
		</>
	);
};

export default DrawResults;
