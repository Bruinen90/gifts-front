import React from 'react';

// MUI
import { Typography } from '@material-ui/core';

// Styles
import * as Styled from './stylesFooter';

// Components
import LogoBox from '../LogoBox/LogoBox';

const Footer: React.FC = () => (
	<Styled.FooterCont>
		<Styled.LogoCont>
			<LogoBox />
		</Styled.LogoCont>
		<Styled.CreatorLink href="https://www.bruinen.pl/">
			©Bruinen web development
		</Styled.CreatorLink>
	</Styled.FooterCont>
);

export default Footer;
