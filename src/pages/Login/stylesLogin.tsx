import { styled, Paper } from '@material-ui/core';

export const Wrapper = styled(Paper)(({ theme }) => ({
	maxWidth: '400px',
    margin: 'auto',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 6),
}));

export const LoginForm = styled('form')({
	display: 'flex',
	flexDirection: 'column',
});
