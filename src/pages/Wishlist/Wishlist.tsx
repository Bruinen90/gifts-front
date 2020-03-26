import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// Types
import { StateInterface } from '../../interfaces/interfaces';

// MUI
import { Box, Typography, Button } from '@material-ui/core';

// Components
import WishesList from '../../components/WishesList/WishesList';

const Wishlist: React.FC = () => {
	const history = useHistory();
	const usersWishes = useSelector(
		(state: StateInterface) => state.usersWishes
	);

	const navigateToUserWishes = () => {
		history.push('/nowe-zyczenie');
	};
	return (
		<>
			<Typography variant="h2" component="h2">
				Lista życzeń
			</Typography>
			{usersWishes ? (
				<>
					<Button
						color="primary"
						variant="contained"
						onClick={navigateToUserWishes}
					>
						Dodaj nowe życzenie
					</Button>
					<WishesList wishesList={usersWishes} viewMode="creator" />
				</>
			) : (
				<Box
					margin="2rem"
					minHeight="10rem"
					display="flex"
					justifyContent="space-around"
					alignItems="center"
					flexDirection="column"
				>
					<Typography>
						Nie posiadasz jeszcze żadnych życzeń.
					</Typography>
					<Button
						color="primary"
						variant="contained"
						onClick={navigateToUserWishes}
					>
						Dodaj pierwsze życzenie
					</Button>
				</Box>
			)}
		</>
	);
};
export default Wishlist;
