import { styled } from '@material-ui/core';

export const GlobalWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
    minHeight: 'calc(100vh - 56px)',
    
    [theme.breakpoints.up("sm")]: {
        minHeight: 'calc(100vh - 64px)',
    }
}));
