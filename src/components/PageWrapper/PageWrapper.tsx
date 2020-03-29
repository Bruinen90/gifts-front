import React from 'react';

//Styles
import * as Styled from './stylesPageWrapper';

const PageWrapper: React.FC = ({ children }) => {
	return (
		<Styled.MyContainer>
			<Styled.MyPaper>{children}</Styled.MyPaper>
		</Styled.MyContainer>
	);
};

export default PageWrapper;
