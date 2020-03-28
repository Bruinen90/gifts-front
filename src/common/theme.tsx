import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#388e3c',
		},
		secondary: {
			main: '#e53935',
		},
    },
    typography: {
        h4: {
            marginBottom: '2rem',
        }
    }
});
