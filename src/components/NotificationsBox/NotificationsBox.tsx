import React from 'react';
import { useDispatch } from 'react-redux';
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

	const handleClickSetAllAsRead = () => {
		dispatch({ type: watcherTypes.WATCH_SET_ALL_NOTIFICATIONS_AS_READ });
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
						key={notification.createdAt.toString()}
						divider={true}
						style={{ opacity: notification.read ? 0.33 : 1 }}
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
