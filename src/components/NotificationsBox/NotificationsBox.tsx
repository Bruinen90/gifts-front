import React from 'react';
import { useSelector } from 'react-redux';

// Types
import { Notification, NotificationType } from '../../types/Notification';

//Styles
import * as Styled from './stylesNotificationsBox';

// Icons
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

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
}) => (
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
				>
					{generateIconForNotificationType(notification.type)}
					<div>
						<Styled.NotificationContent>
							{notification.content}
						</Styled.NotificationContent>
						<Styled.NotificationDate>
							{notification.createdAt.toLocaleString('pl-PL', {
								// @ts-ignore
								hour: '2-digit',
								minute: '2-digit',
								day: '2-digit',
								month: 'long',
							})}
						</Styled.NotificationDate>
					</div>
				</Styled.NotificationRow>
			))}
	</Styled.Wrapper>
);

export default NotificationsBox;
