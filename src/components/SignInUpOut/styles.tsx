import { styled } from '@material-ui/core';

export const LogoutBox = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '200px',
	margin: '0 auto',
	[theme.breakpoints.up('lg')]: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		maxWidth: 'initial',
		marginLeft: theme.spacing(2),
	},
}));
