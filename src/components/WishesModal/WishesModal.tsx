import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Dialog, DialogTitle } from '@material-ui/core';

// Types
import { StateInterface } from '../../interfaces/interfaces';
import WishesList from '../WishesList/WishesList';
import { ReservationStatusSetterType } from '../../interfaces/Reservations';
import { Wish } from '../../interfaces/WishTypes';
interface WishesModalProps {
	userId: string;
	drawId?: string;
	username: string;
	opened: boolean;
	toggle: () => void;
}

const WishesModal: React.FC<WishesModalProps> = ({
	userId,
	drawId,
	username,
	opened,
	toggle,
}) => {
	const dispatch = useDispatch();
	const [wishesList, setWishesList] = useState<Wish[]>();
	const fetchedWishesList = useSelector((state: StateInterface) => {
		if (
			state.othersWishes &&
			state.othersWishes.find(
				userWishesList => userWishesList.userId === userId
			)
		) {
			return state.othersWishes.find(
				userWishesList => userWishesList.userId === userId
			)!.wishesList;
		} else {
			return undefined;
		}
	});
	useEffect(() => {
		dispatch({
			type: 'FETCH_USER_WISHES_WATCHER',
			payload: { userId: userId },
		});
	}, [userId, dispatch]);

	useEffect(() => {
		if (fetchedWishesList) {
			setWishesList(fetchedWishesList);
		}
	}, [fetchedWishesList]);

	const handleSetReservationStatus: ReservationStatusSetterType = ({
		wishId,
		reserved,
	}) => {
		const payload: {
			userId: string;
			wishId: string;
			reserved: boolean;
			drawId?: string;
		} = { userId: userId, wishId: wishId, reserved: reserved };
		if (drawId) {
			payload.drawId = drawId;
		}
		dispatch({
			type: 'RESERVE_WISH_WATCHER',
			payload: payload,
		});
	};

	return (
		<Dialog open={opened} onClose={toggle}>
			<DialogTitle>Lista życzeń użytkownika {username}</DialogTitle>
			{wishesList && wishesList.length > 0 && (
				<WishesList
					wishesList={wishesList}
					viewMode="guest"
					setReservedStatus={handleSetReservationStatus}
				/>
			)}
		</Dialog>
	);
};
export default WishesModal;
