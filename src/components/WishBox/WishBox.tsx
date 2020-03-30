import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// MUI
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from '@material-ui/core';

// Icons
import {
	Edit,
	Delete,
	Check,
	Link,
	MonetizationOn,
	Description,
	LockOpen,
} from '@material-ui/icons';
// Types
import { StateInterface } from '../../interfaces/interfaces';
import { Wish } from '../../interfaces/WishTypes';
import { ReservationStatusSetterType } from '../../interfaces/Reservations';

interface WishBoxProps {
	wish: Wish;
	view: 'full' | 'simple';
	deleteWish: (_: React.MouseEvent) => void;
	setReservedStatus: ReservationStatusSetterType | undefined;
}

const WishBox: React.FC<WishBoxProps> = ({
	wish,
	view,
	deleteWish,
	setReservedStatus,
}) => {
	const history = useHistory();
	const loggedUserId = useSelector((state: StateInterface) => state.userId);
	const handleNavigateToEdit = () => {
		history.push('/edytuj-zyczenie', { originalData: wish });
	};

	const handleReserveWish = () => {
		setReservedStatus &&
			setReservedStatus({ wishId: wish._id, reserved: true });
	};

	const handleCancelReservation = () => {
		setReservedStatus &&
			setReservedStatus({ wishId: wish._id, reserved: false });
	};
	return (
		<Card style={{ margin: '1rem 0', padding: '1rem' }}>
			<CardHeader title={wish.title} />
			<CardContent>
				<List disablePadding>
					<ListItem>
						<ListItemIcon>
							<MonetizationOn />
						</ListItemIcon>
						<ListItemText
							primary={wish.price + ' zł'}
							secondary="Orientacyjna cena"
						/>
					</ListItem>
					{wish.link && (
						<ListItem button component="a" href={wish.link}>
							<ListItemIcon>
								<Link />
							</ListItemIcon>
							<ListItemText primary="Zobacz specyfikację lub zdjęcie" />
						</ListItem>
					)}
					{wish.description && (
						<ListItem>
							<ListItemIcon>
								<Description />
							</ListItemIcon>
							<ListItemText>{wish.description}</ListItemText>
						</ListItem>
					)}
				</List>
			</CardContent>
			<CardActions>
				{view === 'full' ? (
					<>
						<Button
							color="secondary"
							startIcon={<Delete />}
							onClick={deleteWish}
						>
							Usuń
						</Button>
						<Button
							color="primary"
							startIcon={<Edit />}
							onClick={handleNavigateToEdit}
						>
							Edytuj
						</Button>
					</>
				) : wish.reserved && loggedUserId === wish.buyer ? (
					<Button
						color="secondary"
						startIcon={<LockOpen />}
						onClick={handleCancelReservation}
					>
						Anuluj deklarację zakupu
					</Button>
				) : (
					<Button
						color="primary"
						startIcon={<Check />}
						onClick={handleReserveWish}
					>
						Kupię to
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
export default WishBox;
