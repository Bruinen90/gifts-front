import React from 'react';
import { useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Button,
} from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';

interface InvitationBoxProps {
	_id: string;
	username: string;
	email: string;
	invited: boolean;
}

const InvitationBox: React.FC<InvitationBoxProps> = ({
	username,
	email,
	invited,
}) => {
	const dispatch = useDispatch();
	const handleAcceptInvitation = () => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: { decision: 'accept' },
		});
	};

	const handleRejectInvitation = () => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: { decision: 'reject' },
		});
	};
	return (
		<ListItem>
			<ListItemText primary={username} secondary={email} />
			<ListItemSecondaryAction>
				{invited ? (
					<>
						<Button
							color="primary"
							variant="contained"
							onClick={handleAcceptInvitation}
							startIcon={<Check />}
						>
							Akceptuj
						</Button>
						<Button
							color="secondary"
							onClick={handleRejectInvitation}
							startIcon={<Close />}
						>
							Odrzuć
						</Button>
					</>
				) : (
					<Button color="secondary" startIcon={<Close />}>
						Anuluj
					</Button>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	);
};
export default InvitationBox;
