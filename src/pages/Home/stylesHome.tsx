import { styled } from '@material-ui/core/styles';

import { Container, Typography, Box } from '@material-ui/core';

export const MainContainer = styled(Container)(({ theme }) => ({
	backgroundColor: '#333',
	minHeight: 'calc(100vh - 64px)',
	padding: '3vh 0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
	[theme.breakpoints.up('sm')]: {
		padding: '10vh 0',
	},
}));

export const MyBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center',
	alignItems: 'center',
	[theme.breakpoints.up('lg')]: {
		maxWidth: '40vw',
	},
}));

export const GiftIllustration = styled('img')(({ theme }) => ({
	maxHeight: '25vh',
	position: 'relative',
	zIndex: 1,
	[theme.breakpoints.up('sm')]: {
		maxHeight: '33vh',
	},
}));

export const Header = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	margin: theme.spacing(4),
	fontFamily: 'Poiret One, cursive',
	fontSize: '2.5rem',
}));

export const DescriptionBox = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	marginBottom: theme.spacing(4),
	width: '70%',
	textAlign: 'justify',
	fontWeight: 'lighter',

	[theme.breakpoints.up('sm')]: {
		fontSize: '1.25rem',
	},
}));
