import { styled } from '@material-ui/styles';
import { Theme, Box, Grid } from '@material-ui/core';

export const BoxCont = styled(Box)(({ theme }: { theme: Theme }) => ({
	padding: theme.spacing(6),
	[theme.breakpoints.up('sm')]: {
		maxWidth: '1440px',
		margin: 'auto',
		padding: theme.spacing(12),
	},
	[theme.breakpoints.up('lg')]: {
		// To compensate translateY(200px) of some elements
		marginBottom: '200px',
	},
}));

export const GuideBox = styled(Grid)(({ theme }: { theme: Theme }) => ({
	[theme.breakpoints.up('lg')]: {
		'&:nth-child(3n -1), &:last-child': {
			transform: 'translateY(200px)',
		},
	},
}));

export const GuideImgContainter = styled('div')(
	({ theme }: { theme: Theme }) => ({
		textAlign: 'center',
		[theme.breakpoints.up('sm')]: {
			height: '350px',
			display: 'flex',
			alignItems: 'flex-end',
		},
	})
);

export const GuideImg = styled('img')(({ theme }: { theme: Theme }) => ({
	width: '70%',
	margin: 'auto',
	marginBottom: theme.spacing(3),
}));
