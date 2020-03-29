import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MUI
import {
	Dialog,
	DialogTitle,
	CircularProgress,
	Typography,
} from '@material-ui/core';

// Types
import { Wish } from '../../interfaces/WishTypes';
import WishesList from '../WishesList/WishesList';
interface WishesModalProps {
	username: string;
	_id: string;
	opened: boolean;
	toggle: () => void;
	reserveWish?: (wishId: string) => void;
}

const WishesModal: React.FC<WishesModalProps> = ({
	username,
	_id,
	opened,
	toggle,
	reserveWish,
}) => {
	const [loading, setLoading] = useState(false);
	const [wishesList, setWishesList] = useState<Wish[]>();
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				setLoading(true);
				const graphqlQuery = {
					query: `
                        {userWishes(userId: "${_id}") {_id title link description price }}
                        `,
				};
				const response = await axios.post('graphql', graphqlQuery);
				const allUserWishes = response.data.data.userWishes;
				setWishesList(allUserWishes);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		};
		fetchAllUsers();
	}, [_id]);
	return (
		<Dialog open={opened} onClose={toggle}>
			<DialogTitle>Lista życzeń użytkownika {username}</DialogTitle>
			{loading ? (
				<CircularProgress />
			) : wishesList ? (
				<WishesList
					wishesList={wishesList}
					viewMode="guest"
					reserveWish={reserveWish}
				/>
			) : (
				<Typography>
					Wystąpił błąd serwera, spróbuj ponownie za jakiś czas
				</Typography>
			)}
		</Dialog>
	);
};
export default WishesModal;
