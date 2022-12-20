import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Types
import { WishesListProps } from '../../types/WishTypes';
import { State } from '../../types/State';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import { Grid, CircularProgress, Card, Button, Box } from '@material-ui/core';
import { History } from '@material-ui/icons';

// Components
import { WishBox } from '../WishBox/WishBox';

const DAY = 1000 * 60 * 60 * 24;
const TODAY = new Date().getTime();

export const WishesList: React.FC<WishesListProps> = ({
	wishesList,
	viewMode,
	allWishes,
	setReservedStatus,
	setWishAsDone,
	inModal,
}) => {
	const currentWishes = wishesList.filter(wish => {
		const updateDate = new Date(wish.updatedAt);
		const isOutdated = updateDate.getTime() + 120 * DAY < TODAY;
		return !(isOutdated || wish.done);
	});

	const [showOldWishes, setShowOldWishes] = useState(false);
	const [wishesToDisplay, setWishesToDisplay] = useState(currentWishes);

	const toggleOldWishes = () => {
		setWishesToDisplay(
			showOldWishes
				? currentWishes
				: wishesList.sort((wishA, wishB) =>
						wishA.updatedAt > wishB.updatedAt ? -1 : 1
				  )
		);
		setShowOldWishes(prev => !prev);
	};

	const outdatedWishesCount = wishesList.length - currentWishes.length;
	// const wishesToDisplay =
	// 	showOldWishes || allWishes ? wishesList : currentWishes;

	const dispatch = useDispatch();
	const handleDeleteWish = (wishId: string, wishTitle: string) => {
		dispatch({
			type: watcherTypes.WATCH_DELETE_WISH,
			payload: { wishId, wishTitle },
		});
	};

	const loadingState = useSelector((state: State) => state.loading);

	return (
		<>
			<Grid
				container
				spacing={2}
				style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}
			>
				{loadingState.loading &&
					loadingState.category === 'wishes' &&
					loadingState.type === 'new-record' && (
						<Grid
							item
							xs={12}
							sm={inModal ? 12 : 6}
							style={{ width: '100%', position: 'relative' }}
						>
							<Card
								style={{
									height: '100%',
									minHeight: '300px',
									display: 'flex',
									flex: '1',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CircularProgress size={90} />
							</Card>
						</Grid>
					)}
				{wishesToDisplay.map(wish => (
					<WishBox
						wish={wish}
						drawData={wish.drawData}
						key={wish._id}
						view={viewMode === 'creator' ? 'full' : 'simple'}
						deleteWish={() =>
							handleDeleteWish(wish._id, wish.title)
						}
						setReservedStatus={setReservedStatus}
						setWishAsDone={setWishAsDone}
						oneColumn={inModal}
					/>
				))}
			</Grid>
			{!allWishes && (
				<Box textAlign='center' marginY={3}>
					{outdatedWishesCount > 0 && (
						<Button
							variant='contained'
							color={showOldWishes ? 'secondary' : 'primary'}
							startIcon={<History />}
							onClick={toggleOldWishes}
						>
							{showOldWishes ? 'Ukryj' : 'Pokaż'} starsze prezenty
							({outdatedWishesCount})
						</Button>
					)}
				</Box>
			)}
		</>
	);
};
