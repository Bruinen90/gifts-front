import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// Types
import { State } from '../../types/State';

// MUI
import { Box, Typography, Button } from '@material-ui/core';

// Components
import WishesList from '../../components/WishesList/WishesList';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage';

// Images
import NoData from '../../img/undraw_no_data.svg';

const Wishlist: React.FC = () => {
	const history = useHistory();
	const usersWishes = useSelector((state: State) => state.wish.usersWishes);

	const navigateToUserWishes = () => {
		history.push('/nowe-zyczenie');
	};
	return (
		<PageWrapper>
			<Typography variant="h4" component="h2" align="center">
				Twoja lista życzeń
			</Typography>
			<LoadingSpinner type="general">
				{usersWishes && usersWishes.length > 0 ? (
					<>
						<WishesList
							wishesList={usersWishes}
							viewMode="creator"
						/>
						<Box
							display="flex"
							justifyContent="center"
							margin="1rem 0"
						>
							<Button
								color="primary"
								variant="contained"
								onClick={navigateToUserWishes}
							>
								Dodaj nowe życzenie
							</Button>
						</Box>
					</>
				) : (
					<EmptyListMessage
						imageUrl={NoData}
						button={{
							caption: 'Dodaj życzenie',
							action: navigateToUserWishes,
						}}
						message="Nie posiadasz jeszcze żadnych życzeń. Stwórz listę prezentów jakie chcesz otrzymać, aby ułatwić wybór znajomym oraz uniknąć rozczarowań"
					/>
				)}
			</LoadingSpinner>
		</PageWrapper>
	);
};
export default Wishlist;
