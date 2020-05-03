import { styled } from '@material-ui/core';
import { inherits } from 'util';

export const FooterCont = styled('footer')(({ theme }) => ({
	backgroundColor: '#444',
	color: theme.palette.primary.contrastText,
	minHeight: '250px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	padding: theme.spacing(4),
	paddingTop: theme.spacing(8),
}));

export const LogoCont = styled('div')(({ theme }) => ({
	marginBottom: theme.spacing(6),
	justifySelf: 'center',
}));

export const CreatorLink = styled('a')(({ theme }) => ({
	fontSize: theme.typography.fontSize/1.33,
	color: 'inherit',
	textDecoration: 'none',
	display: 'block',
	marginTop: 'auto',
}));
