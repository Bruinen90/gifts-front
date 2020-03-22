import { styled } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

export const UsersList = styled(List)(({ theme }) => ({
	'& li': {
		'&:hover': {
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,

			'& .MuiListItemText-secondary': {
				color: theme.palette.primary.contrastText,
				opacity: 0.8,
			},
			'& .MuiListItemSecondaryAction-root': {
				color: theme.palette.primary.contrastText,
			},
		},
		'& .MuiListItemSecondaryAction-root': {
			color: theme.palette.primary.light,
			pointerEvents: 'none',
		},
	},
}));
