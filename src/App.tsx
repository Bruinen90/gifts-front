import React from 'react';

import Home from './pages/Home/Home';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './common/theme';

function App() {
	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				{/* App goes here */}
				<Home />
				{/* End off app */}
			</ThemeProvider>
		</>
	);
}

export default App;
