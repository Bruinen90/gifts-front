import React from 'react';

//Styles
import * as Styled from './stylesPageWrapper';

interface PageWrapperProps {
	children: any;
	maxWidth?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, maxWidth }) => {
	return (
		<Styled.MyContainer style={{ maxWidth: maxWidth }}>
			<Styled.MyPaper>{children}</Styled.MyPaper>
		</Styled.MyContainer>
	);
};
