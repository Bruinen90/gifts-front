import React from 'react';

// MUI
import { Dialog, DialogTitle } from '@material-ui/core';

// Types
import WishesList from '../WishesList/WishesList';
import { ReservationStatusSetterType } from '../../interfaces/Reservations';
import { Wish } from '../../interfaces/WishTypes';
interface WishesModalProps {
	username: string;
	opened: boolean;
	toggle: () => void;
	setReservedStatus: ReservationStatusSetterType;
	wishesList: Wish[];
}

const WishesModal: React.FC<WishesModalProps> = ({
	username,
	opened,
	toggle,
	setReservedStatus,
	wishesList,
}) => (
	<Dialog open={opened} onClose={toggle}>
		<DialogTitle>Lista życzeń użytkownika {username}</DialogTitle>
		<WishesList
			wishesList={wishesList}
			viewMode="guest"
			setReservedStatus={setReservedStatus}
		/>
	</Dialog>
);
export default WishesModal;
