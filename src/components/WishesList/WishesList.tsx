import React from 'react';
import { useDispatch } from 'react-redux';

// Types
import { WishesListProps } from '../../types/WishTypes';

// MUI
import { Grid } from '@material-ui/core';

// Components
import WishBox from '../WishBox/WishBox';

const WishesList: React.FC<WishesListProps> = ({
	wishesList,
	viewMode,
	setReservedStatus,
	inModal,
}) => {
	const dispatch = useDispatch();
	const handleDeleteWish = (wishId: string) => {
		dispatch({ type: 'DELETE_WISH_WATCHER', payload: { wishId: wishId } });
	};
	return (
		<Grid
			container
			spacing={2}
			style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}
		>
			{wishesList.map(wish => (
				<WishBox
					wish={wish}
					drawData={wish.drawData}
					key={wish._id}
					view={viewMode === 'creator' ? 'full' : 'simple'}
					deleteWish={_ => handleDeleteWish(wish._id)}
					setReservedStatus={setReservedStatus}
					oneColumn={inModal}
				/>
			))}
		</Grid>
	);
};

export default WishesList;
