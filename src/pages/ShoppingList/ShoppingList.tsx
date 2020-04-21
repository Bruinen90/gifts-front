import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Typography } from '@material-ui/core';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';

// Types
import { State } from '../../types/State';
import {
	ReservationStatusSetterType,
	ReservationPayload,
} from '../../types/Reservations';
import WishesList from '../../components/WishesList/WishesList';

export const ShoppingList: React.FC = () => {
	const dispatch = useDispatch();

	const [shoppingList, drawsData] = useSelector((state: State) => [
		state.wish.shoppingList,
		state.draw.usersDraws,
	]);

	const handleSetReservationStatus: ReservationStatusSetterType = ({
		wishId,
		reserved,
		drawId,
		creatorId,
	}) => {
		const payload: ReservationPayload = {
			wishId: wishId,
			reserved: reserved,
			drawId: drawId,
			creatorId: creatorId,
		};
		console.log('payload: ', payload);
		if (drawId) {
			payload.drawId = drawId;
		}
		dispatch({
			type: 'RESERVE_WISH_WATCHER',
			payload: payload,
		});
	};

	const populatedShoppingList = shoppingList?.map(item => {
		let drawData;
		if (item.forDraw) {
			drawData = drawsData.find(draw => draw._id === item.forDraw);
		}
		if (drawData) {
			return { ...item, drawData: drawData };
		} else return item;
	});
	return (
		<PageWrapper>
			<Typography variant="h2" align="center">
				Lista zakupów
			</Typography>
			{shoppingList && shoppingList.length > 0 && 
            <WishesList wishesList={populatedShoppingList!} viewMode="guest" setReservedStatus={handleSetReservationStatus} />}
		</PageWrapper>
	);
};
