import { styled } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

export const MyContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(2),
}))

export const MyPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
}));
