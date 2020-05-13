import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Typography } from '@material-ui/core';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage';

// Types
import { State } from '../../types/State';
import {
	ReservationStatusSetterType,
	ReservationPayload,
} from '../../types/Reservations';
import WishesList from '../../components/WishesList/WishesList';

// Images
import NoData from '../../img/undraw_no_data.svg';

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
            wishTitle: shoppingList?.find(wish => wish._id === wishId)!.title,
		};
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
			{shoppingList && (shoppingList.length > 0 ?
            <WishesList wishesList={populatedShoppingList!} viewMode="guest" setReservedStatus={handleSetReservationStatus} /> :
            <EmptyListMessage
				imageUrl={NoData}
				message="Tutaj pojawią się prezenty, których chęć zakupu zadeklarujesz"
			/>)}
		</PageWrapper>
	);
};
