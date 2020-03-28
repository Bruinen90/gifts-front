import React from 'react';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';

//Styles
import * as Styled from './stylesPageWrapper';

const PageWrapper: React.FC = ({ children }) => {
	const theme = useTheme();
	return (
		<Styled.MyContainer>
			<Styled.MyPaper>{children}</Styled.MyPaper>
		</Styled.MyContainer>
	);
};

export default PageWrapper;
