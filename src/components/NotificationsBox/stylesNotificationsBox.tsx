import { styled } from '@material-ui/core/styles';

import { Menu, MenuItem } from '@material-ui/core';

export const Wrapper = styled(Menu)({
	marginTop: '3rem',
});

export const NotificationRow = styled(MenuItem)({
	padding: '1rem',
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	columnGap: '1.5rem',
});

export const NotificationContent = styled('p')({});

export const NotificationDate = styled('span')({
	display: 'block',
	opacity: 0.66,
	fontSize: '0.7rem',
	textAlign: 'right',
});

export const BottomRow = styled('div')(({ theme }) => ({
	textAlign: 'right',
	margin: '1rem',
	color: theme.palette.primary.main,
}));
