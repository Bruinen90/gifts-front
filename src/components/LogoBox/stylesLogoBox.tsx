import { styled } from '@material-ui/styles';
import { Box, Theme, Typography } from '@material-ui/core';

export const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
	maxHeight: '30px',
	[theme.breakpoints.up('sm')]: {
		height: '2rem',
	},
}));

export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
	textTransform: 'uppercase',
	fontFamily: 'Poiret One, cursive',
	fontSize: '1.33rem',
	lineHeight: '1.2rem',

	[theme.breakpoints.up('sm')]: {
		fontSize: '2rem',
		lineHeight: '1.7rem',
	},
}));

export const GiftIcon = styled('img')(({ theme }: { theme: Theme }) => ({
	height: '24px',
    margin: '0 0.25rem',
    
	[theme.breakpoints.up('sm')]: {
		height: '2rem',
		margin: '0 0.5rem',
	},
}));
