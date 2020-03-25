import { styled } from '@material-ui/core/styles';

export const MyForm = styled('form')(({ theme }) => ({
	margin: `${theme.spacing(3)}px auto`,
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '400px',
}));
