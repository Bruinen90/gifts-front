import { styled } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

export const MyContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(2),
	[theme.breakpoints.down('sm')]: {
		margin: 0,
		padding: 0,
	},
}));

export const MyPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	[theme.breakpoints.down('sm')]: {
		borderRadius: 0,
		boxShadow: 'none',
		margin: 0,
		backgroundColor: theme.palette.background.default,
	},
}));
