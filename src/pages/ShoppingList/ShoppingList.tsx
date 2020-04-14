import React from 'react';

// MUI
import { Typography } from '@material-ui/core';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';

export const ShoppingList: React.FC = () => {
	return (
		<PageWrapper>
			<Typography variant="h2" align="center">
				Lista zakupów
			</Typography>
		</PageWrapper>
	);
};
