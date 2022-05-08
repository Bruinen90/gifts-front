import React from 'react';
import { useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import { ListItem, Grid, ListItemText, Button } from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';

// Components
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';

interface InvitationBoxProps {
	_id: string;
	username: string;
	email: string;
	invited: boolean;
}

type InvitationDecionType = 'accept' | 'reject' | 'cancel';

export const InvitationBox: React.FC<InvitationBoxProps> = ({
	_id,
	username,
	email,
	invited,
}) => {
	const dispatch = useDispatch();
	const handleInvitationDecision = (decision: InvitationDecionType) => {
		dispatch({
			type: watcherTypes.WATCH_SET_INVITATION_DECISION,
			payload: {
				invitationId: _id,
				invitedUser: username,
				decision,
			},
		});
	};
	return (
		<ListItem style={{ position: 'relative' }}>
			<Grid container alignItems='center'>
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
								color='primary'
								variant='contained'
								onClick={() =>
									handleInvitationDecision('accept')
								}
								startIcon={<Check />}
								size='small'
								style={{ marginRight: '8px' }}
							>
								Akceptuj
							</Button>
							<Button
								color='secondary'
								onClick={() =>
									handleInvitationDecision('reject')
								}
								startIcon={<Close />}
								size='small'
							>
								Odrzuć
							</Button>
						</>
					) : (
						<Button
							color='secondary'
							startIcon={<Close />}
							size='small'
							onClick={() => handleInvitationDecision('cancel')}
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
