import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

// MUI
import {
	Grid,
	CardHeader,
	CardContent,
	CardActions,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	CardMedia,
	Typography,
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
	Shuffle,
	Person,
	Block,
} from '@material-ui/icons';

// Types
import { State } from '../../types/State';
import { User } from '../../types/User';
import { WishBoxProps } from '../../types/WishTypes';
import { ReservationPayload } from '../../types/Reservations';

// Styles
import * as Styled from './styleWishBox';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

const WishBox: React.FC<WishBoxProps> = ({
	wish,
	view,
	deleteWish,
	setReservedStatus,
	drawData,
	oneColumn,
}) => {
	const history = useHistory();
	const loggedUserId = useSelector((state: State) => state.auth._id);

	let reservedStatus:
		| 'not-reserved'
		| 'reserved-by-curr-user'
		| 'reserved-by-other-user' = 'not-reserved';

	if (wish.reserved) {
		if (wish.buyer === loggedUserId) {
			reservedStatus = 'reserved-by-curr-user';
		} else {
			reservedStatus = 'reserved-by-other-user';
		}
	}

	const handleNavigateToEdit = () => {
		history.push('/edytuj-zyczenie', { originalData: wish });
	};
	const changeReservationStatus = (newStatus: boolean) => {
		let creatorId = wish.creator;
		if (typeof creatorId !== 'string') {
			creatorId = creatorId._id;
		}
		const payload: ReservationPayload = {
			wishId: wish._id,
			reserved: newStatus,
			wishTitle: wish.title,
			creatorId: creatorId,
		};
		if (wish.forDraw) {
			payload.drawId = wish.forDraw;
		}
		setReservedStatus && setReservedStatus(payload);
	};

	const handleReserveWish = () => {
		changeReservationStatus(true);
	};

	const handleCancelReservation = () => {
		changeReservationStatus(false);
	};

	return (
		<Grid
			item
			xs={12}
			sm={oneColumn ? 12 : 6}
			style={{ width: '100%', position: 'relative' }}
		>
			{reservedStatus === 'reserved-by-other-user' && (
				<Styled.ReservedOverlay>
					<Block fontSize="inherit" />
					<Typography align="center" variant="h4">
						To życzenie zostało już zarezerwowane
					</Typography>
				</Styled.ReservedOverlay>
			)}
			<Styled.WishCard
				reserved={reservedStatus === 'reserved-by-other-user' ? 1 : 0}
			>
				{wish.imageUrl && (
					<CardMedia
						image={wish.imageUrl}
						style={{ height: '250px' }}
					/>
				)}
				<CardHeader title={wish.title} />
				<CardContent style={{ padding: '1rem' }}>
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
								<ListItemText
									style={{
										whiteSpace: 'pre-wrap',
										maxHeight: '200px',
										overflow: 'auto',
									}}
								>
									{wish.description}
								</ListItemText>
							</ListItem>
						)}
						{drawData && (
							<ListItem>
								<ListItemIcon>
									<Shuffle />
								</ListItemIcon>
								<ListItemText>{drawData.title} </ListItemText>
							</ListItem>
						)}
						{(drawData ||
							(wish.creator &&
								typeof wish.creator !== 'string')) && (
							<ListItem>
								<ListItemIcon>
									<Person />
								</ListItemIcon>
								<ListItemText>
									{drawData
										? drawData.results!.username
										: (wish.creator as User).username}{' '}
								</ListItemText>
							</ListItem>
						)}
					</List>
				</CardContent>
				<CardActions style={{ marginTop: 'auto' }}>
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
					) : reservedStatus === 'reserved-by-curr-user' ? (
						<Button
							color="secondary"
							startIcon={<LockOpen />}
							onClick={handleCancelReservation}
						>
							Anuluj deklarację zakupu
						</Button>
					) : wish.reserved ? (
						<Button disabled startIcon={<Block />}>
							Prezent zarezerwowany przez innego użytkownika
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
			</Styled.WishCard>
			<LoadingOverlay recordId={wish._id} />
		</Grid>
	);
};
export default WishBox;
