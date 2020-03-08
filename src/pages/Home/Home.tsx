import React, { useState } from 'react';

import * as Styled from './stylesHome';
import NavBar from '../../components/NavBar/NavBar';

const Home = () => {
	const [] = useState();
	return (
		<>
			<NavBar />
			<Styled.MainContainer component="main" maxWidth="sm">
				<Styled.MainHeader>Welcome</Styled.MainHeader>
			</Styled.MainContainer>
		</>
	);
};
export default Home;
