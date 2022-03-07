import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as watcherTypes from '../../store/actions/watcherTypes';

// Types
import { Notification, NotificationType } from '../../types/Notification';

//Styles
import * as Styled from './stylesNotificationsBox';

// Icons
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Button } from '@material-ui/core';

//Types
interface NotificationsBoxProps {
	opened: boolean;
	handleClose: () => void;
	anchorEl: null | HTMLElement;
	notifications: Notification[];
}

const generateIconForNotificationType = (type: NotificationType) => {
	switch (type) {
		case 'drawResults':
			return <ShuffleIcon />;
		case 'inviatationAccept':
			return <PersonAddIcon />;
		case 'invitation':
			return <PersonAddIcon />;
		case 'newDraw':
			return <ShuffleIcon />;
		case 'reservation':
			return <CardGiftcardIcon />;
		default:
			return <InsertPhotoIcon />;
	}
};

const NotificationsBox: React.FC<NotificationsBoxProps> = ({
	opened,
	handleClose,
	anchorEl,
	notifications,
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClickSetAllAsRead = () => {
		dispatch({ type: watcherTypes.WATCH_SET_ALL_NOTIFICATIONS_AS_READ });
	};

	const notificationClicked = ({
		notificationType,
		notificationId,
	}: {
		notificationType: NotificationType;
		notificationId: string;
	}) => {
		console.log(notificationType);
		// Change notification status to "READ" in saga/db
		let target = '';
		switch (notificationType) {
			case 'drawResults':
				target = '/moje-losowania';
				break;
			case 'inviatationAccept':
				target = '/moi-znajomi';
				break;
			case 'invitation':
				target = '/moi-znajomi';
				break;
			case 'newDraw':
				target = '/moje-losowania';
				break;
			case 'reservation':
				target = '/moje-zyczenia';
				break;
			default:
				target = '';
		}
		history.push(target);
	};
	return (
		<Styled.Wrapper
			id='notification-box'
			open={opened}
			onClose={handleClose}
			anchorEl={anchorEl}
		>
			{notifications
				.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
				.map(notification => (
					<Styled.NotificationRow
						key={notification._id}
						divider={true}
						style={{ opacity: notification.read ? 0.33 : 1 }}
						onClick={() =>
							notificationClicked({
								notificationType: notification.type,
								notificationId: notification._id,
							})
						}
					>
						{generateIconForNotificationType(notification.type)}
						<div>
							<Styled.NotificationContent>
								{notification.content}
							</Styled.NotificationContent>
							<Styled.NotificationDate>
								{notification.createdAt.toLocaleString(
									'pl-PL',
									{
										// @ts-ignore
										hour: '2-digit',
										minute: '2-digit',
										day: '2-digit',
										month: 'long',
									}
								)}
							</Styled.NotificationDate>
						</div>
					</Styled.NotificationRow>
				))}
			<Styled.BottomRow>
				<Button
					variant='text'
					onClick={handleClickSetAllAsRead}
					color='primary'
				>
					Oznacz wszystkie jako przeczytane
				</Button>
			</Styled.BottomRow>
		</Styled.Wrapper>
	);
};

export default NotificationsBox;
