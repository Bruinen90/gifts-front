import React from 'react';
import { useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import { ListItem, Grid, ListItemText, Button } from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

interface InvitationBoxProps {
	_id: string;
	username: string;
	email: string;
	invited: boolean;
}

const InvitationBox: React.FC<InvitationBoxProps> = ({
	_id,
	username,
	email,
	invited,
}) => {
	const dispatch = useDispatch();
	const handleAcceptInvitation = () => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: {
				invitationId: _id,
				decision: 'accept',
				invitedUser: username,
			},
		});
	};

	const handleRejectInvitation = () => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: {
				invitationId: _id,
				decision: 'reject',
				invitedUser: username,
			},
		});
	};

	const handleCancelInvitation = () => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: {
				invitationId: _id,
				decision: 'cancel',
				invitedUser: username,
			},
		});
	};
	return (
		<ListItem style={{ position: 'relative' }}>
			<Grid container alignItems="center">
				<Grid item xs={12} sm={6}>
					<ListItemText primary={username} secondary={email} />
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					style={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					{invited ? (
						<>
							<Button
								color="primary"
								variant="contained"
								onClick={handleAcceptInvitation}
								startIcon={<Check />}
								size="small"
								style={{ marginRight: '8px' }}
							>
								Akceptuj
							</Button>
							<Button
								color="secondary"
								onClick={handleRejectInvitation}
								startIcon={<Close />}
								size="small"
							>
								Odrzuć
							</Button>
						</>
					) : (
						<Button
							color="secondary"
							startIcon={<Close />}
							size="small"
							onClick={handleCancelInvitation}
						>
							Anuluj
						</Button>
					)}
				</Grid>
			</Grid>
			<LoadingOverlay recordId={_id} indicatorSize={20} />
		</ListItem>
	);
};
export default InvitationBox;
