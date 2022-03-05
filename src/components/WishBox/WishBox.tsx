import React, { useState } from 'react';
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
	Box,
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
	Done,
	Cancel,
	Photo,
} from '@material-ui/icons';

// Styles
import * as Styled from './styleWishBox';

// Components
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';

// Types
import { State } from '../../types/State';
import { User } from '../../types/User';
import { WishBoxProps } from '../../types/WishTypes';
import { ReservationPayload } from '../../types/Reservations';

export const WishBox: React.FC<WishBoxProps> = ({
	wish,
	view,
	deleteWish,
	setReservedStatus,
	setWishAsDone,
	drawData,
	oneColumn,
}) => {
	const history = useHistory();
	const loggedUserId = useSelector((state: State) => state.auth._id);

	let reservedStatus:
		| 'not-reserved'
		| 'reserved-by-curr-user'
		| 'reserved-by-other-user'
		| 'done' = 'not-reserved';

	if (wish.reserved) {
		if (wish.done) {
			reservedStatus = 'done';
		} else if (wish.buyer && wish.buyer._id === loggedUserId) {
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

	// Done status

	const handleSetAsDone = () => {
		if (setWishAsDone) {
			const { _id, title } = wish;
			setWishAsDone({ _id, title, done: true });
		}
	};

	const handleCancelDone = () => {
		if (setWishAsDone) {
			const { _id, title } = wish;
			setWishAsDone({ _id, title, done: false });
		}
	};

	// Deleting wish
	const [confirmationDialogOpened, setConfirmationDialogOpened] = useState(
		false
	);
	const toggleConfirmationDialog = () => {
		setConfirmationDialogOpened(prev => !prev);
	};

	const handleDeleteWish = () => {
		if (deleteWish) {
			deleteWish();
		}
		toggleConfirmationDialog();
	};

	return (
		<Grid
			item
			xs={12}
			sm={oneColumn ? 12 : 6}
			style={{ width: '100%', position: 'relative' }}
		>
			<Styled.WishCard>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='250px'
					position='relative'
				>
					{reservedStatus === 'reserved-by-other-user' && (
						<Styled.ReservedOverlay>
							<Block fontSize='inherit' />
							<Typography align='center' variant='h4'>
								To życzenie zostało zarezerwowane{' '}
								{wish.buyer &&
									wish.buyer.username &&
									`przez użytkownika ${wish.buyer.username} `}
							</Typography>
						</Styled.ReservedOverlay>
					)}
					{reservedStatus === 'done' && (
						<Styled.ReservedOverlay>
							<Done fontSize='inherit' color='primary' />
							<Typography
								align='center'
								color='primary'
								variant='h4'
							>
								Prezent już wręczony
							</Typography>
						</Styled.ReservedOverlay>
					)}
					{wish.imageUrl ? (
						<CardMedia
							component='img'
							image={wish.imageUrl}
							style={{ height: '250px' }}
						/>
					) : (
						<Photo
							style={{ fontSize: 120, opacity: 0.25 }}
							color='disabled'
						/>
					)}
				</Box>
				<CardHeader title={wish.title} />
				<CardContent style={{ padding: '1rem' }}>
					<List disablePadding>
						<ListItem>
							<ListItemIcon>
								<MonetizationOn />
							</ListItemIcon>
							<ListItemText
								primary={wish.price + ' zł'}
								secondary='Orientacyjna cena'
							/>
						</ListItem>
						{wish.link && (
							<ListItem
								button
								component='a'
								href={wish.link}
								target='_blank'
								rel='noreferrer'
							>
								<ListItemIcon>
									<Link />
								</ListItemIcon>
								<ListItemText primary='Zobacz specyfikację lub zdjęcie' />
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
								color='secondary'
								startIcon={<Delete />}
								onClick={toggleConfirmationDialog}
								disabled={
									reservedStatus === 'reserved-by-other-user'
								}
							>
								Usuń
							</Button>
							<ConfirmationDialog
								title='Usuwanie życzenia'
								description={`Czy na pewno chcesz usunąć życzenie ${wish.title} ze swojej listy?`}
								acceptText='Tak, usuń życzenie'
								confirmFunction={handleDeleteWish}
								toggleDialog={toggleConfirmationDialog}
								opened={confirmationDialogOpened}
							/>
							<Button
								color='primary'
								startIcon={<Edit />}
								onClick={handleNavigateToEdit}
								disabled={
									reservedStatus === 'reserved-by-other-user'
								}
							>
								Edytuj
							</Button>
						</>
					) : reservedStatus === 'reserved-by-curr-user' ? (
						<Box
							display='flex'
							flexDirection='column'
							alignItems='flex-start'
						>
							<Button
								color='primary'
								startIcon={<Done />}
								onClick={handleSetAsDone}
							>
								Prezent już wręczony
							</Button>
							<Button
								color='secondary'
								startIcon={<LockOpen />}
								onClick={handleCancelReservation}
							>
								Anuluj deklarację zakupu
							</Button>
						</Box>
					) : wish.done ? (
						<Box
							display='flex'
							flexDirection='column'
							alignItems='flex-start'
						>
							<Button
								color='secondary'
								startIcon={<Cancel />}
								onClick={handleCancelDone}
							>
								Jednak nie wręczono prezentu
							</Button>
						</Box>
					) : wish.reserved ? (
						<Button disabled startIcon={<Block />}>
							Prezent zarezerwowany przez innego użytkownika
						</Button>
					) : (
						<Button
							color='primary'
							startIcon={<Check />}
							onClick={handleReserveWish}
							disabled={
								reservedStatus === 'reserved-by-other-user'
							}
						>
							Kupię to
						</Button>
					)}
				</CardActions>
				{wish.updatedAt && (
					<Typography
						align='right'
						style={{ fontSize: '0.7rem', margin: '1rem' }}
					>
						Zaktualizowano:{' '}
						{typeof wish.updatedAt === 'string'
							? wish.updatedAt
							: (wish.updatedAt as Date).toLocaleDateString(
									'pl',
									{
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									}
							  )}
					</Typography>
				)}
			</Styled.WishCard>
			<LoadingOverlay recordId={wish._id} />
		</Grid>
	);
};
