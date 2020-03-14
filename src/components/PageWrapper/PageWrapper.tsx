import React from 'react';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';

//Styles
import * as Styled from './stylesPageWrapper';

const PageWrapper: React.FC = ({ children }) => {
	const theme = useTheme();
	const withPaper = useMediaQuery(theme.breakpoints.up('sm'));
	return (
		<Styled.MyContainer>
			{withPaper ? (
				<Styled.MyPaper>{children}</Styled.MyPaper>
			) : (
				<>{children}</>
			)}
		</Styled.MyContainer>
	);
};

export default PageWrapper;
