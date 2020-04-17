import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Dialog, DialogTitle } from '@material-ui/core';

// Types
import { StateInterface } from '../../types/State';
import WishesList from '../WishesList/WishesList';
import {
	ReservationStatusSetterType,
	ReservationPayload,
} from '../../types/Reservations';
import { Wish } from '../../types/WishTypes';
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
			setWishesList(
				fetchedWishesList.map(wish => ({ ...wish, creator: userId }))
			);
		}
	}, [fetchedWishesList, userId]);

	const handleSetReservationStatus: ReservationStatusSetterType = ({
		wishId,
		creatorId,
		reserved,
	}) => {
		const payload: ReservationPayload = {
			wishId: wishId,
			reserved: reserved,
			creatorId: creatorId,
		};
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
                    inModal={true}
				/>
			)}
		</Dialog>
	);
};
export default WishesModal;
